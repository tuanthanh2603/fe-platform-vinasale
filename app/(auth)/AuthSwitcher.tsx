"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthSwitcher() {
  const pathname = usePathname();
  const isLogin = pathname?.includes("/login");
  const isRegister = pathname?.includes("/register");

  return (
    <div className="mb-6">
      <div className="inline-flex w-full rounded-xl bg-gray-100 p-1">
        <Link
          href="/login"
          rel="noopener noreferrer"
          className={[
            "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition",
            isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
          ].join(" ")}
        >
          Đăng nhập
        </Link>

        <Link
          href="/register"
          rel="noopener noreferrer"
          className={[
            "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition",
            isRegister ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
          ].join(" ")}
        >
          Đăng ký
        </Link>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {isLogin ? "Nhập thông tin để đăng nhập." : "Tạo tài khoản mới để bắt đầu."}
      </p>
    </div>
  );
}