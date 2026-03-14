type ApiFetchOptions = RequestInit;

const API_BASE_URL = "http://localhost:8080/api/v1/";

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedBase = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<ApiResponse<T>> {
  const response = await fetch(buildUrl(path), {
    method: "GET",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  const body = await response.json();

  return body;
}

export const apiGet    = <T>(path: string)                    => apiFetch<T>(path);
export const apiPost   = <T>(path: string, body: unknown)     => apiFetch<T>(path, { method: "POST",   body: JSON.stringify(body) });
export const apiPut    = <T>(path: string, body: unknown)     => apiFetch<T>(path, { method: "PUT",    body: JSON.stringify(body) });
export const apiDelete = <T>(path: string)                    => apiFetch<T>(path, { method: "DELETE" });