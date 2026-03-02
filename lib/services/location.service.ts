import { apiFetch } from "@/lib/api-client";
import { Province } from "@/types/province";

type ProvinceApiItem = {
  code?: string | number;
  id?: string | number;
  provinceCode?: string | number;
  name?: string;
  provinceName?: string;
};

function normalizeProvince(item: ProvinceApiItem): Province | null {
  const code = item.code ?? item.id ?? item.provinceCode;
  const name = item.name ?? item.provinceName;

  if (!code || !name) {
    return null;
  }

  return {
    code: String(code),
    name: String(name),
  };
}

function unwrapProvinceList(payload: unknown): ProvinceApiItem[] {
  if (Array.isArray(payload)) {
    return payload as ProvinceApiItem[];
  }

  if (payload && typeof payload === "object") {
    const data = (payload as { data?: unknown; provinces?: unknown }).data;
    if (Array.isArray(data)) {
      return data as ProvinceApiItem[];
    }

    const provinces = (payload as { provinces?: unknown }).provinces;
    if (Array.isArray(provinces)) {
      return provinces as ProvinceApiItem[];
    }
  }

  return [];
}

export async function API_GetProvinces(): Promise<Province[]> {
  const payload = await apiFetch<unknown>("/provinces");
  return unwrapProvinceList(payload)
    .map(normalizeProvince)
    .filter((province): province is Province => province !== null);
}
