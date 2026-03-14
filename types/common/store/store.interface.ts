export interface DTO_RQ_CreateStore {
	owner: string;
	store_name: string;
	province_id: string;
	business_sector: string;
}

export interface DTO_RP_CreateStore {
	publicId: string;
	storeName: string;
}

export type DTO_RP_DeleteStore = null;

