import { apiGet } from "@/lib/api-client";
import { ProvinceName } from "@/types/common/location/province.interface";

export async function API_GetProvinces() {
  return apiGet<ProvinceName[]>("/provinces");
}