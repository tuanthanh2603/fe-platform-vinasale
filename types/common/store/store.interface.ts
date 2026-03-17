/* ═══════════════════════════════════════════
 * Store DTOs — field names khớp 1:1 với Backend
 * ═══════════════════════════════════════════ */

// ─── Request ───

export interface CreateStoreRequest {
	owner: string;
	storeName: string;
	businessSector: string;
  }
  
  // ─── Response ───
  
  // BE: CreateStoreResponse.java → { storeId, storeName }
  export interface CreateStoreResponse {
	storeId: string;
	storeName: string;
  }