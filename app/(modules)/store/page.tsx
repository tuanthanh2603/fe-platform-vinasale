"use client";

import { useEffect, useState, useMemo } from "react";
import { apiGet } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { Store, ChevronRight, LogOut } from "lucide-react";
import { getSectorConfig, getSectorRoute } from "@/constants/business-sector";
import LoadingScreen from "@/components/loading/LoadingScreen";

interface StoreItem {
  id: string;
  name: string;
  role: string;
  level: string;
  businessSector: string;
}

const roleLabels: Record<string, string> = {
  OWNER:   "Chủ sở hữu",
  ADMIN:   "Quản trị viên",
  MANAGER: "Quản lý",
  STAFF:   "Nhân viên",
};

const roleColors: Record<string, string> = {
  OWNER:   "bg-orange-50 text-orange-700 border-orange-100",
  ADMIN:   "bg-red-50 text-red-700 border-red-100",
  MANAGER: "bg-indigo-50 text-indigo-700 border-indigo-100",
  STAFF:   "bg-gray-50 text-gray-600 border-gray-100",
};


export default function StorePage() {
  const { user, logout } = useAuth();
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const accountId = useMemo(() => user?.accountId || "", [user?.accountId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!accountId) {
      setLoading(false);
      return;
    }

    const fetchStores = async () => {
      try {
        const res = await apiGet<StoreItem[]>(`/store/my-stores/${accountId}`);
        if (res.success) {
          setStores(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách store:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [mounted, accountId]);

  // Server và client first render đều trả về LoadingScreen
  // => HTML giống nhau => không bị hydration mismatch
  if (!mounted) {
    return <LoadingScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (stores.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-6 bg-white border border-gray-100 rounded-3xl flex items-center justify-center text-gray-300 shadow-sm">
            <Store size={36} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Chưa có cửa hàng nào
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Bạn chưa tham gia hoặc sở hữu cửa hàng nào.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
          <p
            className="text-xs text-gray-400 uppercase tracking-[0.15em] mb-2"
            suppressHydrationWarning
          >
            {user?.email}
          </p>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Cửa hàng của bạn
            </h1>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>

          <div className="flex items-center gap-6 mt-5" suppressHydrationWarning>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs text-gray-500">{stores.length} cửa hàng</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-xs text-gray-500">
                {stores.filter((s) => s.role === "OWNER").length} sở hữu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store, index) => {
            const sector = getSectorConfig(store.businessSector);
            const { Icon } = sector;
            return (
              <a
                key={store.id ?? `store-${index}`}
                href={`/store/${store.id}/${getSectorRoute(store.businessSector)}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sector.color} group-hover:scale-105 transition-transform duration-200`}>
                    <Icon size={22} />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-100">
                    {store.level}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-[17px] font-semibold text-gray-900 mb-1">
                  {store.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {sector.label}
                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${roleColors[store.role] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
                    {roleLabels[store.role] || store.role}
                  </span>

                  <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-200">
                    <ChevronRight size={14} className="text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}