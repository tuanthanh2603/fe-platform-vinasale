import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api-client";

export interface Category {
	id: number;
	name: string;
	type: string;
	description?: string;
	status: "ACTIVE" | "INACTIVE";
}

export interface CategoryPayload {
	name: string;
	type: string;
	description?: string;
	status: "ACTIVE" | "INACTIVE";
}

export interface CategoryType {
	id: number;
	name: string;
}

function normalizeCategories(payload: unknown): Category[] {
	const toCategory = (item: unknown): Category | null => {
		if (!item || typeof item !== "object") return null;

		const category = item as {
			id?: unknown;
			name?: unknown;
			type?: unknown;
			description?: unknown;
			status?: unknown;
		};

		if (
			typeof category.id !== "number" ||
			typeof category.name !== "string"
		) {
			return null;
		}

		const status = category.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";

		return {
			id: category.id,
			name: category.name,
			type: typeof category.type === "string" && category.type.trim() ? category.type : "Món",
			description: typeof category.description === "string" ? category.description : "",
			status,
		};
	};

	if (Array.isArray(payload)) {
		return payload
			.map((item) => toCategory(item))
			.filter((item): item is Category => item !== null);
	}

	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		Array.isArray((payload as { data?: unknown }).data)
	) {
		return (payload as { data: unknown[] }).data
			.map((item) => toCategory(item))
			.filter((item): item is Category => item !== null);
	}

	return [];
}

function normalizeCategoryTypes(payload: unknown): CategoryType[] {
	const toCategoryType = (item: unknown, index: number): CategoryType | null => {
		if (typeof item === "string") {
			return { id: index + 1, name: item };
		}

		if (!item || typeof item !== "object") return null;

		const typeItem = item as { id?: unknown; name?: unknown };
		if (typeof typeItem.name !== "string" || !typeItem.name.trim()) return null;

		return {
			id: typeof typeItem.id === "number" ? typeItem.id : index + 1,
			name: typeItem.name,
		};
	};

	if (Array.isArray(payload)) {
		return payload
			.map((item, index) => toCategoryType(item, index))
			.filter((item): item is CategoryType => item !== null);
	}

	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		Array.isArray((payload as { data?: unknown }).data)
	) {
		return (payload as { data: unknown[] }).data
			.map((item, index) => toCategoryType(item, index))
			.filter((item): item is CategoryType => item !== null);
	}

	return [];
}

export const categoryService = {
	async fetchCategoriesAPI(storeId: string) {
		const response = await apiGet<unknown>(`/fnb3/category/${storeId}/categories`);
		if (!response.success) {
			throw new Error(response.message || "Không thể tải danh mục.");
		}
		return normalizeCategories(response.data);
	},

	async fetchCategoryTypesAPI(storeId: string) {
		const response = await apiGet<unknown>(`/fnb3/category/${storeId}/category-types`);
		if (!response.success) {
			throw new Error(response.message || "Không thể tải loại danh mục.");
		}
		return normalizeCategoryTypes(response.data);
	},

	async createCategoryTypeAPI(storeId: string, name: string) {
		const response = await apiPost<null>(`/fnb3/category/${storeId}/category-types`, { name });
		if (!response.success) {
			throw new Error(response.message || "Không thể thêm loại danh mục.");
		}
	},

	async updateCategoryTypeAPI(storeId: string, id: number, name: string) {
		const response = await apiPut<null>(
			`/fnb3/category/${storeId}/category-types/${encodeURIComponent(id)}`,
			{ name }
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể cập nhật loại danh mục.");
		}
	},

	async deleteCategoryTypeAPI(storeId: string, id: number) {
		const response = await apiDelete<null>(
			`/fnb3/category/${storeId}/category-types/${encodeURIComponent(id)}`
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể xóa loại danh mục.");
		}
	},

	async createCategoryAPI(storeId: string, payload: CategoryPayload) {
		const response = await apiPost<null>(`/fnb3/category/${storeId}/categories`, payload);
		if (!response.success) {
			throw new Error(response.message || "Không thể thêm danh mục.");
		}
	},

	async updateCategoryAPI(storeId: string, id: number, payload: CategoryPayload) {
		const response = await apiPut<null>(
			`/fnb3/category/${storeId}/categories/${encodeURIComponent(id)}`,
			payload
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể cập nhật danh mục.");
		}
	},

	async deleteCategoryAPI(storeId: string, id: number) {
		const response = await apiDelete<null>(
			`/fnb3/category/${storeId}/categories/${encodeURIComponent(id)}`
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể xóa danh mục.");
		}
	},
};
