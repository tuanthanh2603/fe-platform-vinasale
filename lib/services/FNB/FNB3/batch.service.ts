import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api-client";

export interface Batch {
	id: number;
	code: string;
	ingredientName: string;
	quantity: number;
	unit: string;
	manufactureDate: string;
	expiryDate: string;
	status: "ACTIVE" | "EXPIRED";
}

export interface BatchPayload {
	code: string;
	ingredientName: string;
	quantity: number;
	unit: string;
	manufactureDate: string;
	expiryDate: string;
	status: "ACTIVE" | "EXPIRED";
}

function normalizeBatches(payload: unknown): Batch[] {
	const toBatch = (item: unknown): Batch | null => {
		if (!item || typeof item !== "object") return null;

		const batch = item as {
			id?: unknown;
			code?: unknown;
			ingredientName?: unknown;
			quantity?: unknown;
			unit?: unknown;
			manufactureDate?: unknown;
			expiryDate?: unknown;
			status?: unknown;
		};

		if (
			typeof batch.id !== "number" ||
			typeof batch.code !== "string" ||
			typeof batch.ingredientName !== "string"
		) {
			return null;
		}

		const status = batch.status === "EXPIRED" ? "EXPIRED" : "ACTIVE";

		return {
			id: batch.id,
			code: batch.code,
			ingredientName: batch.ingredientName,
			quantity: typeof batch.quantity === "number" ? batch.quantity : 0,
			unit: typeof batch.unit === "string" ? batch.unit : "",
			manufactureDate:
				typeof batch.manufactureDate === "string" ? batch.manufactureDate : "",
			expiryDate: typeof batch.expiryDate === "string" ? batch.expiryDate : "",
			status,
		};
	};

	if (Array.isArray(payload)) {
		return payload
			.map((item) => toBatch(item))
			.filter((item): item is Batch => item !== null);
	}

	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		Array.isArray((payload as { data?: unknown }).data)
	) {
		return (payload as { data: unknown[] }).data
			.map((item) => toBatch(item))
			.filter((item): item is Batch => item !== null);
	}

	return [];
}

export const batchService = {
	async fetchBatchesAPI(storeId: string) {
		const response = await apiGet<unknown>(`/fnb3/batch/${storeId}/batches`);
		if (!response.success) {
			throw new Error(response.message || "Không thể tải danh sách lô hàng.");
		}
		return normalizeBatches(response.data);
	},

	async createBatchAPI(storeId: string, payload: BatchPayload) {
		const response = await apiPost<null>(`/fnb3/batch/${storeId}/batches`, payload);
		if (!response.success) {
			throw new Error(response.message || "Không thể thêm lô hàng.");
		}
	},

	async updateBatchAPI(storeId: string, id: number, payload: BatchPayload) {
		const response = await apiPut<null>(
			`/fnb3/batch/${storeId}/batches/${encodeURIComponent(id)}`,
			payload
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể cập nhật lô hàng.");
		}
	},

	async deleteBatchAPI(storeId: string, id: number) {
		const response = await apiDelete<null>(
			`/fnb3/batch/${storeId}/batches/${encodeURIComponent(id)}`
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể xóa lô hàng.");
		}
	},
};
