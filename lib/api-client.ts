import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/auth/token-store";
import { scheduleRefresh, stopScheduler } from "@/lib/auth/token-refresh-scheduler";

type ApiFetchOptions = RequestInit;

const API_BASE_URL = "http://localhost:8080/api/v1/";

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedBase = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function isPublicOrAuthPath(path: string): boolean {
  const p = path.toLowerCase();
  return (
    p.includes("/auth/login") ||
    p.includes("/auth/refresh") ||
    p.includes("/auth/register") ||
    p.includes("/auth/forgot-password")
  );
}

function getRefreshToken(): string | null {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;
  const parsed = JSON.parse(auth);
  return parsed.refreshToken || null;
}

function clearAllAuth() {
  clearAccessToken();
  localStorage.removeItem("auth");
  stopScheduler();
}

let refreshPromise: Promise<string | null> | null = null;
let isRedirectingToLogin = false;

function redirectToLoginOnce() {
  clearAllAuth();
  if (typeof window === "undefined") return;
  if (isRedirectingToLogin) return;
  if (window.location.pathname === "/login") return;
  isRedirectingToLogin = true;
  window.location.replace("/login");
}

export async function doRefreshToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return null;

      const response = await fetch(buildUrl("/auth/refresh-token"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });

      if (!response.ok) return null;

      const body = await response.json();
      const newAccessToken = body?.data?.accessToken as string | undefined;

      if (!newAccessToken) return null;

      setAccessToken(newAccessToken);

      // Cập nhật auth với cả accessToken và refreshToken mới
      const auth = localStorage.getItem("auth");
      if (auth) {
        const parsed = JSON.parse(auth);
        parsed.accessToken = newAccessToken;

        // Cập nhật refresh token mới nếu server trả về
        if (body?.data?.refreshToken) {
          parsed.refreshToken = body.data.refreshToken;
        }

        localStorage.setItem("auth", JSON.stringify(parsed));
      }

      // Lên lịch refresh cho token mới
      scheduleRefresh(newAccessToken);
      return newAccessToken;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<ApiResponse<T>> {
  const isPublic = isPublicOrAuthPath(path);
  const token = getAccessToken();

  const response = await fetch(buildUrl(path), {
    method: "GET",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (response.status === 401 && !isPublic) {
    const newToken = await doRefreshToken();

    if (!newToken) {
      redirectToLoginOnce();
      throw new Error("Unauthorized");
    }

    const retryResponse = await fetch(buildUrl(path), {
      method: "GET",
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
        ...(options?.headers ?? {}),
      },
      cache: "no-store",
    });

    if (retryResponse.status === 401) {
      redirectToLoginOnce();
      throw new Error("Unauthorized");
    }

    return retryResponse.json();
  }

  return response.json();
}

export const apiGet = <T>(path: string) => apiFetch<T>(path);
export const apiPost = <T>(path: string, body: unknown) =>
  apiFetch<T>(path, { method: "POST", body: JSON.stringify(body) });
export const apiPut = <T>(path: string, body: unknown) =>
  apiFetch<T>(path, { method: "PUT", body: JSON.stringify(body) });
export const apiDelete = <T>(path: string) => apiFetch<T>(path, { method: "DELETE" });