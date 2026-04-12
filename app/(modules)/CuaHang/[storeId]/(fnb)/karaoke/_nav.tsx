"use client";

import Link from "next/link";
import { DoorOpen, ClipboardList, Boxes, BarChart2, Settings } from "lucide-react";
import type { NavProps } from "@/components/store/store-shell";

export default function KaraokeNav({ storeId, pathname, onNavigate }: NavProps) {
  const base = `/store/${storeId}/karaoke`;
  const items = [
    { href: `${base}/rooms`,    label: "Phòng",         icon: DoorOpen },
    { href: `${base}/orders`,   label: "Đơn hàng",      icon: ClipboardList },
    { href: `${base}/packages`, label: "Gói dịch vụ",   icon: Boxes },
    { href: `${base}/reports`,  label: "Báo cáo",       icon: BarChart2 },
    { href: `${base}/settings`, label: "Cài đặt",       icon: Settings },
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
