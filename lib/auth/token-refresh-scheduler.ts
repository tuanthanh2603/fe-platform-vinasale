import { getAccessToken } from "@/lib/auth/token-store";
import { doRefreshToken } from "@/lib/api-client";

const REFRESH_BEFORE_MS = 60 * 1000;

let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let refreshRetryCount = 0;
const MAX_REFRESH_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

function decodeTokenExp(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

async function refreshToken(): Promise<void> {
  const newToken = await doRefreshToken();

  if (!newToken) {
    refreshRetryCount++;
    console.log(`⚠️ Refresh thất bại (${refreshRetryCount}/${MAX_REFRESH_RETRIES})`);

    if (refreshRetryCount >= MAX_REFRESH_RETRIES) {
      console.log("❌ Hết lượt retry");
      stopScheduler();
      localStorage.removeItem("auth");
      return;
    }

    refreshTimer = setTimeout(refreshToken, RETRY_DELAY_MS);
    return;
  }

  // Reset retry count khi thành công
  refreshRetryCount = 0;
  console.log("✅ Refresh token thành công");
  // Không gọi scheduleRefresh ở đây vì doRefreshToken đã gọi rồi
}

export function scheduleRefresh(token?: string): void {
  stopScheduler();

  const currentToken = token || getAccessToken();
  if (!currentToken) return;

  const exp = decodeTokenExp(currentToken);
  if (!exp) return;

  const delay = exp - Date.now() - REFRESH_BEFORE_MS;
  const remainingSeconds = Math.round((exp - Date.now()) / 1000);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const refreshDelay = Math.round(delay / 1000);
  const refreshMinutes = Math.floor(refreshDelay / 60);
  const refreshSeconds = refreshDelay % 60;

  console.log(`⏰ Token còn sống: ${minutes} phút ${seconds} giây`);
  console.log(`🔄 Sẽ refresh sau: ${refreshMinutes} phút ${refreshSeconds} giây`);

  if (delay <= 0) {
    console.log("⚠️ Token sắp hết hoặc đã hết → refresh ngay");
    refreshToken();
    return;
  }

  refreshTimer = setTimeout(refreshToken, delay);
}

export function stopScheduler(): void {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}