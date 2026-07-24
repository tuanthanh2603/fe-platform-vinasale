"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { apiGet, ApiResponse } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, LogOut, Menu, X, Coffee,
  LayoutDashboard, ShoppingCart, Package,
  Users, UserCheck, Wallet, BarChart2,
  ChevronRight,
} from "lucide-react";
import { storeService } from "@/lib/services/common/store/store.service";

// ─── Types ──────────────────────────────────────────────────────────────────



interface SubItem { label: string; href: string }

interface NavGroup {
  key: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  items: SubItem[];
}

// ─── Nav config ─────────────────────────────────────────────────────────────

function buildNav(base: string): NavGroup[] {
  return [
    {
      key: "overview",
      label: "Tổng quan",
      Icon: LayoutDashboard,
      items: [],
    },
    {
      key: "sales",
      label: "Bán hàng",
      Icon: ShoppingCart,
      items: [
        { label: "POS bán hàng (sơ đồ bàn)", href: `${base}/sales/pos` },
        { label: "Danh sách hóa đơn", href: `${base}/sales/invoices` },
        { label: "Đơn hàng online / delivery", href: `${base}/sales/delivery` },
        { label: "Trả hàng / hủy đơn", href: `${base}/sales/returns` },
      ],
    },
    {
      key: "products",
      label: "Hàng hóa",
      Icon: Package,
      items: [
        { label: "Danh mục menu (món, topping, combo)", href: `${base}/FNB3/DanhMuc` },
        { label: "Nguyên liệu & định lượng", href: `${base}/FNB3/NguyenLieu` },
        { label: "Nhập / Xuất / Kiểm kho", href: `${base}/FNB3/Kho` },
        { label: "Nhà cung cấp", href: `${base}/FNB3/NhaCungCap` },
        { label: "Quản lý lô / hạn sử dụng", href: `${base}/FNB3/Lo` },
      ],
    },
    {
      key: "customers",
      label: "Khách hàng",
      Icon: Users,
      items: [
        { label: "Danh sách khách hàng", href: `${base}/customers/list` },
        { label: "Nhóm KH & thẻ thành viên", href: `${base}/customers/groups` },
        { label: "Tích điểm & voucher", href: `${base}/customers/loyalty` },
        { label: "Khuyến mãi & marketing", href: `${base}/customers/marketing` },
      ],
    },
    {
      key: "staff",
      label: "Nhân viên",
      Icon: UserCheck,
      items: [
        { label: "Danh sách nhân viên", href: `${base}/staff/list` },
        { label: "Chấm công & phân ca", href: `${base}/staff/attendance` },
        { label: "Tính lương & hoa hồng", href: `${base}/staff/payroll` },
        { label: "Phân quyền", href: `${base}/staff/permissions` },
      ],
    },
    {
      key: "cashbook",
      label: "Sổ quỹ",
      Icon: Wallet,
      items: [
        { label: "Phiếu thu / phiếu chi", href: `${base}/cashbook/vouchers` },
        { label: "Sổ quỹ & đối soát kết tiền", href: `${base}/cashbook/reconcile` },
        { label: "Hóa đơn điện tử", href: `${base}/cashbook/einvoice` },
      ],
    },
    {
      key: "reports",
      label: "Báo cáo",
      Icon: BarChart2,
      items: [
        { label: "Báo cáo doanh thu", href: `${base}/reports/revenue` },
        { label: "Báo cáo lợi nhuận", href: `${base}/reports/profit` },
        { label: "Báo cáo kho & nguyên liệu", href: `${base}/reports/inventory` },
        { label: "Báo cáo nhân viên", href: `${base}/reports/staff` },
        { label: "Báo cáo khách hàng", href: `${base}/reports/customers` },
      ],
    },
  ];
}

// ─── Layout ─────────────────────────────────────────────────────────────────

export default function Fnb3Layout({ children }: { children: React.ReactNode }) {
  const { storeId } = useParams<{ storeId: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [storeName, setStoreName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const base = `/CuaHang/${storeId}`;
  const navGroups = useMemo(() => buildNav(base), [base]);

  // Auto-expand the group that owns the current route
  const activeGroupKey = useMemo(() => {
    for (const g of navGroups) {
      if (g.items.some((i) => pathname.startsWith(i.href))) return g.key;
    }
    return null;
  }, [pathname, navGroups]);

  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(activeGroupKey ? [activeGroupKey] : [])
  );

  // Keep expanded when navigating
  useEffect(() => {
    if (activeGroupKey) {
      setOpenGroups((prev) => {
        if (prev.has(activeGroupKey)) return prev;
        const next = new Set(prev);
        next.add(activeGroupKey);
        return next;
      });
    }
  }, [activeGroupKey]);

  useEffect(() => {
    storeService.getStoreDataAPI(storeId).then(result => {
      if (result.success) {
        setStoreName(result.data.name);
      }
    });
  }, [storeId]);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function toggleGroup(key: string) {
    setOpenGroups((prev) => {
      // Nếu group đang mở, đóng nó
      if (prev.has(key)) {
        const next = new Set(prev);
        next.delete(key);
        return next;
      }
      // Nếu chưa mở, đóng tất cả, rồi mở group này
      return new Set([key]);
    });
  }

  const isOverview = pathname === base || pathname === `${base}/`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Store info */}
      <div className="px-4 py-5 border-b border-gray-100">
        <Link
          href="/CuaHang"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft size={13} />
          Tất cả cửa hàng
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Coffee size={13} />
          </div>
          <p className="text-[11px] text-gray-400 uppercase tracking-widest">Cafe, Trà sữa</p>
        </div>
        <h2 className="text-[15px] font-semibold text-gray-900 leading-snug truncate">
          {storeName || "Đang tải..."}
        </h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {navGroups.map(({ key, label, Icon, items }) => {
            const hasChildren = items.length > 0;
            const isOpen = openGroups.has(key);
            const groupActive = hasChildren
              ? items.some((i) => pathname.startsWith(i.href))
              : key === "overview" && isOverview;

            if (!hasChildren) {
              return (
                <li key={key}>
                  <Link
                    href={base}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${groupActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={key}>
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${groupActive && !isOpen
                    ? "bg-gray-900 text-white"
                    : groupActive
                      ? "text-gray-900 bg-gray-50 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="flex-1 text-left">{label}</span>
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>

                {/* Sub-items */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <ul className="mt-0.5 ml-3 pl-3 border-l border-gray-100 space-y-0.5 pb-1">
                    {items.map((sub) => {
                      const subActive = pathname.startsWith(sub.href);
                      return (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`block px-3 py-2 rounded-lg text-[13px] transition-colors leading-snug ${subActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                              }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User + logout */}
      <div className="px-4 py-4 border-t border-gray-100">
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

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
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

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Coffee size={13} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Cafe, Trà sữa</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{storeName}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
