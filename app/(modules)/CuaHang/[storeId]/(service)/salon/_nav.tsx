"use client";

import Link from "next/link";
import { CalendarCheck, Scissors, Users, Clock, BarChart2, Settings } from "lucide-react";
import type { NavProps } from "@/components/store/store-shell";

export default function SalonNav({ storeId, pathname, onNavigate }: NavProps) {
  const base = `/store/${storeId}/salon`;
  const items = [
    { href: `${base}/appointments`, label: "Lịch hẹn",    icon: CalendarCheck },
    { href: `${base}/services`,     label: "Dịch vụ",     icon: Scissors },
    { href: `${base}/staff`,        label: "Nhân viên",   icon: Users },
    { href: `${base}/shifts`,       label: "Ca làm việc", icon: Clock },
    { href: `${base}/reports`,      label: "Báo cáo",     icon: BarChart2 },
    { href: `${base}/settings`,     label: "Cài đặt",     icon: Settings },
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
