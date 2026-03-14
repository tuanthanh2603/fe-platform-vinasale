import { apiDelete, apiPost } from "@/lib/api-client";
import {
  DTO_RQ_CreateStore,
  DTO_RP_CreateStore,
  DTO_RP_DeleteStore,
} from "@/types/common/store/store.interface";

export const storeService = {
  createStore(data: DTO_RQ_CreateStore) {
    return apiPost<DTO_RP_CreateStore>("/store/create-store", data);
  },

  deleteStore(storeId: string) {
    return apiDelete<DTO_RP_DeleteStore>(`/store/delete-store/${storeId}`);
  },
};