"use client";

import { useState } from "react";
import { accountService } from "@/lib/services/common/account/account.service";
import { DTO_RQ_CreateAccount, DTO_RP_CreateAccount } from "@/types/common/account/account.interface";

export function useAccount() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<DTO_RP_CreateAccount | null>(null);

	const createAccount = async (request: DTO_RQ_CreateAccount) => {
		try {
			setIsLoading(true);
			setError(null);
			const result = await accountService.createAccount(request);
			setData(result);
			return result;
		} catch (fetchError) {
			const errorMessage = fetchError instanceof Error ? fetchError.message : "Tạo tài khoản thất bại";
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		createAccount,
		isLoading,
		error,
		data,
	};
}
