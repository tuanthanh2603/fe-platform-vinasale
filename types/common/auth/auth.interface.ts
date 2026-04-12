/* ═══════════════════════════════════════════
 * Auth DTOs — field names khớp 1:1 với Backend
 * ═══════════════════════════════════════════ */

// ─── Form types (chỉ dùng ở FE) ───

export interface RegisterStep1Form {
  owner: string;
  storeName: string;
  storeNameSystem: string;
  businessSector: string;
}

export interface RegisterStep2Form {
  email: string;
  password: string;
  confirmPassword: string;
}

// ─── Register Email API ───

// BE: RegisterEmailRequest.java → { email, password, storeId }
export interface RegisterEmailRequest {
  email: string;
  password: string;
  storeId: string;
}

// BE: RegisterEmailResponse.java → { accountId, email }
export interface RegisterEmailResponse {
  accountId: string;
  email: string;
}

// ─── Verify OTP API ───

// BE: VerifyOtpRequest.java → { email, otp, accountId, storeId }
export interface VerifyOtpRequest {
  email: string;
  otp: string;
  accountId: string;
  storeId: string;
}

// BE: VerifyOtpResponse.java → { success, message }
export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

// ─── Resend OTP API ───

// BE: ResendOtpRequest.java → { email, accountId }
export interface ResendOtpRequest {
  email: string;
  accountId: string;
}

// BE: ResendOtpResponse.java → { success, message }
export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

// ─── Login API ───

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accountId: string;
  email: string;
  refreshToken: string;
}

export interface AuthUser {
  accountId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

// Auth context type
export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (data: AuthUser) => void;
  logout: () => void;
  isHydrated: boolean;
}

export interface LogoutRequest {
  accountId: string;
}