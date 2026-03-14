"use client";

import { useState } from "react";
import { storeService } from "@/lib/services/common/store/store.service";
import {
	DTO_RQ_CreateStore,
	DTO_RP_CreateStore,
	DTO_RP_DeleteStore,
} from "@/types/common/store/store.interface";

export function useStore() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<DTO_RP_CreateStore | null>(null);

	const createStore = async (request: DTO_RQ_CreateStore) => {
		try {
			setIsLoading(true);
			setError(null);
			const result = await storeService.createStore(request);
			setData(result);
			return result;
		} catch (fetchError) {
			const errorMessage = fetchError instanceof Error ? fetchError.message : "Tạo cửa hàng thất bại";
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteStore = async (storeId: number): Promise<DTO_RP_DeleteStore> => {
		try {
			setIsLoading(true);
			setError(null);
			const result = await storeService.deleteStore(storeId);
			return result;
		} catch (fetchError) {
			const errorMessage = fetchError instanceof Error ? fetchError.message : "Xóa cửa hàng thất bại";
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		createStore,
		deleteStore,
		isLoading,
		error,
		data,
	};
}
