import { apiDelete, apiGet, apiPost } from "@/lib/api-client";
import {
  CreateStoreRequest,
  CreateStoreResponse,
  StoreData,
} from "@/types/common/store/store.interface";

export const storeService = {
  createStore(data: CreateStoreRequest) {
    return apiPost<CreateStoreResponse>("/store/create-store", data);
  },

  deleteStore(storeId: string) {
    return apiDelete<null>(`/store/delete-store/${storeId}`);
  },
  getStoreDataAPI(storeId: string) {
    return apiGet<StoreData>(`/store/${storeId}/data`);
  }
};