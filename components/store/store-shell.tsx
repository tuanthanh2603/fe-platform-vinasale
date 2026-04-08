"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { apiGet } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, LogOut, Menu, X } from "lucide-react";

interface StoreInfo {
  id: string;
  name: string;
  businessSector: string;
}

export interface NavProps {
  storeId: string;
  pathname: string;
  onNavigate: () => void;
}

interface StoreShellProps {
  children: React.ReactNode;
  Nav: React.ComponentType<NavProps>;
  sectorLabel: string;
}

export default function StoreShell({ children, Nav, sectorLabel }: StoreShellProps) {
  const params = useParams();
  const storeId = params.storeId as string;
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [storeName, setStoreName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    apiGet<StoreInfo[]>("/store/my-stores").then((res) => {
      if (res.success) {
        const found = res.data.find((s) => s.id === storeId);
        if (found) setStoreName(found.name);
      }
    });
  }, [storeId]);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const navProps: NavProps = {
    storeId,
    pathname,
    onNavigate: () => setSidebarOpen(false),
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-gray-100">
        <Link
          href="/store"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft size={13} />
          Tất cả cửa hàng
        </Link>
        <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-0.5">
          {sectorLabel}
        </p>
        <h2 className="text-[15px] font-semibold text-gray-900 leading-snug truncate">
          {storeName || "Đang tải..."}
        </h2>
      </div>

      <Nav {...navProps} />

      <div className="px-4 py-4 border-t border-gray-100 mt-auto">
        <p className="text-[11px] text-gray-400 truncate mb-3">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={15} />
          Đăng xuất
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-100 shrink-0">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{sectorLabel}</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{storeName}</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
