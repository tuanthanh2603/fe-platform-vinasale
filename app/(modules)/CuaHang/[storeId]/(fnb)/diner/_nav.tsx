"use client";

import Link from "next/link";
import { LayoutGrid, ClipboardList, BookOpen, BarChart2, Settings } from "lucide-react";
import type { NavProps } from "@/components/store/store-shell";

export default function DinerNav({ storeId, pathname, onNavigate }: NavProps) {
  const base = `/store/${storeId}/diner`;
  const items = [
    { href: `${base}/tables`,  label: "Bàn ăn",   icon: LayoutGrid },
    { href: `${base}/orders`,  label: "Đơn hàng", icon: ClipboardList },
    { href: `${base}/menu`,    label: "Thực đơn", icon: BookOpen },
    { href: `${base}/reports`, label: "Báo cáo",  icon: BarChart2 },
    { href: `${base}/settings`,label: "Cài đặt",  icon: Settings },
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
