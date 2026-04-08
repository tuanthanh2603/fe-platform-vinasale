"use client";

import Link from "next/link";
import { Package, ScanLine, Users, Tag, BarChart2, Settings } from "lucide-react";
import type { NavProps } from "@/components/store/store-shell";

export default function CosmeticNav({ storeId, pathname, onNavigate }: NavProps) {
  const base = `/store/${storeId}/cosmetic`;
  const items = [
    { href: `${base}/products`,   label: "Sản phẩm",   icon: Package },
    { href: `${base}/pos`,        label: "Bán hàng",   icon: ScanLine },
    { href: `${base}/customers`,  label: "Khách hàng", icon: Users },
    { href: `${base}/promotions`, label: "Khuyến mãi", icon: Tag },
    { href: `${base}/reports`,    label: "Báo cáo",    icon: BarChart2 },
    { href: `${base}/settings`,   label: "Cài đặt",    icon: Settings },
  ];
  return (
    <nav className="flex-1 px-3 py-4 overflow-y-auto">
      <ul className="space-y-0.5">
        {items.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                pathname.startsWith(href)
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
