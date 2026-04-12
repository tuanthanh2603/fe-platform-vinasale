"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  LayoutGrid,
  ClipboardList,
  BookOpen,
  TrendingUp,
  Users,
  Coffee,
  ArrowRight,
  CircleDot,
} from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  iconColor: string;
}

interface QuickAction {
  label: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export default function Fnb3Page() {
  const { storeId } = useParams<{ storeId: string }>();
  const base = `/store/${storeId}/fnb3`;

  const stats: StatCard[] = [
    {
      label: "Bàn đang phục vụ",
      value: "—",
      sub: "Cập nhật theo thời gian thực",
      icon: LayoutGrid,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Đơn hàng hôm nay",
      value: "—",
      sub: "Tổng số đơn trong ngày",
      icon: ClipboardList,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Doanh thu hôm nay",
      value: "—",
      sub: "Chưa có dữ liệu",
      icon: TrendingUp,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Lượt khách hôm nay",
      value: "—",
      sub: "Chưa có dữ liệu",
      icon: Users,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const quickActions: QuickAction[] = [
    {
      label: "Quản lý bàn",
      desc: "Xem trạng thái, mở bàn, chuyển bàn",
      href: `${base}/tables`,
      icon: LayoutGrid,
      color: "hover:border-amber-200 hover:bg-amber-50/50",
    },
    {
      label: "Đơn hàng",
      desc: "Tạo đơn mới, xem đơn đang chạy",
      href: `${base}/orders`,
      icon: ClipboardList,
      color: "hover:border-blue-200 hover:bg-blue-50/50",
    },
    {
      label: "Thực đơn",
      desc: "Quản lý món, giá, danh mục",
      href: `${base}/menu`,
      icon: BookOpen,
      color: "hover:border-green-200 hover:bg-green-50/50",
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
          <Coffee size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Tổng quan</h1>
          <p className="text-sm text-gray-400">Cafe, Trà sữa</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
          >
            <div className={`w-9 h-9 rounded-xl ${s.color} ${s.iconColor} flex items-center justify-center mb-3`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</p>
            <p className="text-xs font-medium text-gray-700 mb-1">{s.label}</p>
            <p className="text-[11px] text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Truy cập nhanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={`group bg-white rounded-2xl border border-gray-100 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${a.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <a.icon size={18} className="text-gray-500 group-hover:text-gray-800 transition-colors" />
                <ArrowRight size={15} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
              <p className="text-sm font-semibold text-gray-900">{a.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Status banner */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <CircleDot size={14} className="text-emerald-500" />
          <span className="text-sm font-semibold text-gray-700">Cửa hàng đang hoạt động</span>
        </div>
        <p className="text-xs text-gray-400 pl-5">
          Dữ liệu thống kê sẽ hiển thị sau khi có giao dịch.
        </p>
      </div>

    </div>
  );
}
