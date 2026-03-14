export interface DTO_RQ_CreateAccount {
	email: string;
	password: string;
	storeId: string;
}

export interface DTO_RP_CreateAccount {
	userId: string;
	message: string;
}
