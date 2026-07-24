import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api-client";

export interface WarehouseTransaction {
	id: number;
	code: string;
	type: "IMPORT" | "EXPORT" | "ADJUST";
	itemName: string;
	quantity: number;
	unit: string;
	note?: string;
	status: "DONE" | "DRAFT";
	createdAt?: string;
}

export interface WarehouseTransactionPayload {
	code: string;
	type: "IMPORT" | "EXPORT" | "ADJUST";
	itemName: string;
	quantity: number;
	unit: string;
	note?: string;
	status: "DONE" | "DRAFT";
}

function normalizeTransactions(payload: unknown): WarehouseTransaction[] {
	const toTransaction = (item: unknown): WarehouseTransaction | null => {
		if (!item || typeof item !== "object") return null;

		const transaction = item as {
			id?: unknown;
			code?: unknown;
			type?: unknown;
			itemName?: unknown;
			quantity?: unknown;
			unit?: unknown;
			note?: unknown;
			status?: unknown;
			createdAt?: unknown;
		};

		if (
			typeof transaction.id !== "number" ||
			typeof transaction.code !== "string" ||
			typeof transaction.itemName !== "string"
		) {
			return null;
		}

		const type =
			transaction.type === "EXPORT" || transaction.type === "ADJUST"
				? transaction.type
				: "IMPORT";
		const status = transaction.status === "DRAFT" ? "DRAFT" : "DONE";

		return {
			id: transaction.id,
			code: transaction.code,
			type,
			itemName: transaction.itemName,
			quantity: typeof transaction.quantity === "number" ? transaction.quantity : 0,
			unit: typeof transaction.unit === "string" ? transaction.unit : "",
			note: typeof transaction.note === "string" ? transaction.note : "",
			status,
			createdAt: typeof transaction.createdAt === "string" ? transaction.createdAt : "",
		};
	};

	if (Array.isArray(payload)) {
		return payload
			.map((item) => toTransaction(item))
			.filter((item): item is WarehouseTransaction => item !== null);
	}

	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		Array.isArray((payload as { data?: unknown }).data)
	) {
		return (payload as { data: unknown[] }).data
			.map((item) => toTransaction(item))
			.filter((item): item is WarehouseTransaction => item !== null);
	}

	return [];
}

export const warehouseService = {
	async fetchTransactionsAPI(storeId: string) {
		const response = await apiGet<unknown>(`/fnb3/warehouse/${storeId}/transactions`);
		if (!response.success) {
			throw new Error(response.message || "Không thể tải danh sách giao dịch kho.");
		}
		return normalizeTransactions(response.data);
	},

	async createTransactionAPI(storeId: string, payload: WarehouseTransactionPayload) {
		const response = await apiPost<null>(
			`/fnb3/warehouse/${storeId}/transactions`,
			payload
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể tạo giao dịch kho.");
		}
	},

	async updateTransactionAPI(storeId: string, id: number, payload: WarehouseTransactionPayload) {
		const response = await apiPut<null>(
			`/fnb3/warehouse/${storeId}/transactions/${encodeURIComponent(id)}`,
			payload
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể cập nhật giao dịch kho.");
		}
	},

	async deleteTransactionAPI(storeId: string, id: number) {
		const response = await apiDelete<null>(
			`/fnb3/warehouse/${storeId}/transactions/${encodeURIComponent(id)}`
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể xóa giao dịch kho.");
		}
	},
};
