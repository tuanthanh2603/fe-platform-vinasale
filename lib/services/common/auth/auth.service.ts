import { apiPost } from "@/lib/api-client";
import {
  RegisterEmailRequest,
  RegisterEmailResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
} from "@/types/common/auth/auth.interface";

export const authService = {
  registerEmail(data: RegisterEmailRequest) {
    return apiPost<RegisterEmailResponse>("/auth/register-email", data);
  },

  verifyOtp(data: VerifyOtpRequest) {
    return apiPost<VerifyOtpResponse>("/auth/verify-otp", data);
  },

  resendOtp(data: ResendOtpRequest) {
    return apiPost<ResendOtpResponse>("/auth/resend-otp", data);
  },

  login(data: LoginRequest) {
    return apiPost<LoginResponse>("/auth/login", data);
  },

  logoutAPI(data: string) {
    return apiPost("/auth/logout", { accountId: data });
  }
  
};