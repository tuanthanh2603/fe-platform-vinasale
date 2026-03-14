import { apiPost } from "@/lib/api-client";
import { DTO_RQ_CreateAccount, DTO_RP_CreateAccount } from "@/types/common/account/account.interface";

export const accountService = {
	createAccount(data: DTO_RQ_CreateAccount) {
		return apiPost<DTO_RP_CreateAccount>("/account/create-account", data);
	},
};
