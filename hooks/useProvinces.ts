"use client";

import { useEffect, useState } from "react";
import { API_GetProvinces } from "@/lib/services/location.service";
import { Province } from "@/types/province";

export function useProvinces() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProvinces = async () => {
      try {
        setIsLoading(true);
        const result = await API_GetProvinces();

        if (isMounted) {
          setProvinces(result);
          setError(null);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Không tải được danh sách tỉnh/thành"
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProvinces();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    provinces,
    isLoading,
    error,
  };
}
