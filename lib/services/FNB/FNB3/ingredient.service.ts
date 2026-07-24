import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api-client";

export interface Ingredient {
	id: number;
	code: string;
	name: string;
	unit: string;
	category: string;
	currentStock: number;
	minimumStock: number;
	status: "ACTIVE" | "INACTIVE";
}

export interface IngredientPayload {
	code: string;
	name: string;
	unit: string;
	category: string;
	currentStock: number;
	minimumStock: number;
	status: "ACTIVE" | "INACTIVE";
}

function normalizeIngredients(payload: unknown): Ingredient[] {
	const toIngredient = (item: unknown): Ingredient | null => {
		if (!item || typeof item !== "object") return null;

		const ingredient = item as {
			id?: unknown;
			code?: unknown;
			name?: unknown;
			unit?: unknown;
			category?: unknown;
			currentStock?: unknown;
			minimumStock?: unknown;
			status?: unknown;
		};

		if (
			typeof ingredient.id !== "number" ||
			typeof ingredient.code !== "string" ||
			typeof ingredient.name !== "string"
		) {
			return null;
		}

		const status = ingredient.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";

		return {
			id: ingredient.id,
			code: ingredient.code,
			name: ingredient.name,
			unit: typeof ingredient.unit === "string" ? ingredient.unit : "",
			category: typeof ingredient.category === "string" ? ingredient.category : "",
			currentStock:
				typeof ingredient.currentStock === "number" ? ingredient.currentStock : 0,
			minimumStock:
				typeof ingredient.minimumStock === "number" ? ingredient.minimumStock : 0,
			status,
		};
	};

	if (Array.isArray(payload)) {
		return payload
			.map((item) => toIngredient(item))
			.filter((item): item is Ingredient => item !== null);
	}

	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		Array.isArray((payload as { data?: unknown }).data)
	) {
		return (payload as { data: unknown[] }).data
			.map((item) => toIngredient(item))
			.filter((item): item is Ingredient => item !== null);
	}

	return [];
}

export const ingredientService = {
	async fetchIngredientsAPI(storeId: string) {
		const response = await apiGet<unknown>(`/fnb3/ingredient/${storeId}/ingredients`);
		if (!response.success) {
			throw new Error(response.message || "Không thể tải danh sách nguyên liệu.");
		}
		return normalizeIngredients(response.data);
	},

	async createIngredientAPI(storeId: string, payload: IngredientPayload) {
		const response = await apiPost<null>(`/fnb3/ingredient/${storeId}/ingredients`, payload);
		if (!response.success) {
			throw new Error(response.message || "Không thể thêm nguyên liệu.");
		}
	},

	async updateIngredientAPI(storeId: string, id: number, payload: IngredientPayload) {
		const response = await apiPut<null>(
			`/fnb3/ingredient/${storeId}/ingredients/${encodeURIComponent(id)}`,
			payload
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể cập nhật nguyên liệu.");
		}
	},

	async deleteIngredientAPI(storeId: string, id: number) {
		const response = await apiDelete<null>(
			`/fnb3/ingredient/${storeId}/ingredients/${encodeURIComponent(id)}`
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể xóa nguyên liệu.");
		}
	},
};
