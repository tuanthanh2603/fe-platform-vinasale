import { apiPost } from "@/lib/api-client";
import { DTO_RP_Login, DTO_RQ_Login } from "@/types/common/auth/login.interface";
import { DTO_RQ_RegisterStep2Form } from "@/types/common/auth/register.interface";

export const authService = {
	API_RegisterEmail(data: DTO_RQ_RegisterStep2Form) {
		return apiPost<any>("/auth/register-email", data);
	},
	API_VerifyOtp(data: { email: string; otp: string, id: string }) {
		return apiPost<any>("/auth/verify-otp", data);
	},
	API_Login(data: DTO_RQ_Login) {
		return apiPost<DTO_RP_Login>("/auth/login", data);
	}
};