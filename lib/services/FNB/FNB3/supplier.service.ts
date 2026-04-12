import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api-client";

export interface Supplier {
	id: string;
	name: string;
	contact: string;
	phone: string;
	email: string;
	group: string;
	status: "active" | "inactive";
}

export interface SupplierGroup {
	id: number;
	name: string;
	supplierCount?: number;
}

function normalizeSupplierGroups(payload: unknown): SupplierGroup[] {
	const toGroup = (item: unknown, index: number): SupplierGroup | null => {
		if (typeof item === "string") {
			return { id: index + 1, name: item, supplierCount: 0 };
		}

		if (!item || typeof item !== "object") return null;

		const group = item as { id?: unknown; name?: unknown; supplierCount?: unknown };
		if (typeof group.name !== "string" || !group.name.trim()) return null;

		return {
			id: typeof group.id === "number" ? group.id : index + 1,
			name: group.name,
			supplierCount: typeof group.supplierCount === "number" ? group.supplierCount : 0,
		};
	};

	if (Array.isArray(payload)) {
		return payload
			.map((item, index) => toGroup(item, index))
			.filter((item): item is SupplierGroup => item !== null);
	}

	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		Array.isArray((payload as { data?: unknown }).data)
	) {
		const nestedData = (payload as { data: unknown[] }).data;
		return nestedData
			.map((item, index) => toGroup(item, index))
			.filter((item): item is SupplierGroup => item !== null);
	}

	return [];
}

export const supplierService = {
	async fetchSuppliers(storeId: string) {
		const response = await apiGet<Supplier[]>(`/fnb3/supplier/${storeId}/suppliers`);
		if (!response.success) {
			throw new Error(response.message || "Không thể tải danh sách nhà cung cấp.");
		}
		return response.data ?? [];
	},

	async fetchGroups(storeId: string) {
		const response = await apiGet<unknown>(`/fnb3/supplier/${storeId}/suppliers/groups`);
		if (!response.success) {
			throw new Error(response.message || "Không thể tải danh sách nhóm hàng.");
		}
		return normalizeSupplierGroups(response.data);
	},

	async createSupplier(storeId: string, payload: Supplier) {
		const response = await apiPost<null>(`/fnb3/supplier/${storeId}/suppliers`, payload);
		if (!response.success) {
			throw new Error(response.message || "Không thể thêm nhà cung cấp.");
		}
	},

	async updateSupplier(storeId: string, id: string, payload: Supplier) {
		const response = await apiPut<null>(
			`/fnb3/supplier/${storeId}/suppliers/${encodeURIComponent(id)}`,
			payload
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể cập nhật nhà cung cấp.");
		}
	},

	async deleteSupplier(storeId: string, id: string) {
		const response = await apiDelete<null>(
			`/fnb3/supplier/${storeId}/suppliers/${encodeURIComponent(id)}`
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể xóa nhà cung cấp.");
		}
	},

	async createGroup(storeId: string, name: string) {
		const response = await apiPost<null>(`/fnb3/supplier/${storeId}/suppliers/groups`, {
			name,
		});
		if (!response.success) {
			throw new Error(response.message || "Không thể thêm nhóm hàng.");
		}
	},

	async updateGroup(storeId: string, oldName: string, newName: string) {
		const response = await apiPut<null>(
			`/fnb3/supplier/${storeId}/suppliers/groups/${encodeURIComponent(oldName)}`,
			{
				name: newName,
			}
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể cập nhật nhóm hàng.");
		}
	},

	async deleteGroup(storeId: string, groupId: number) {
		const response = await apiDelete<null>(
			`/fnb3/supplier/${storeId}/suppliers/groups/${groupId}`
		);
		if (!response.success) {
			throw new Error(response.message || "Không thể xóa nhóm hàng.");
		}
	},
};
