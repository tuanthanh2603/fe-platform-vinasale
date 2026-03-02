import Image from "next/image";
import AuthSwitcher from "./AuthSwitcher";
import BGLogin from "@/assets/images/bg2.png";
import BrandImage from "@/assets/images/brand.png";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BG FULL SCREEN */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={BGLogin}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* overlay để không bị chói */}
        <div className="absolute inset-0 bg-linear-to-br from-black/50 via-black/30 to-black/50" />
      </div>

      {/* CONTENT */}
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 md:grid-cols-2">
        {/* LEFT cố định */}
        <aside className="relative hidden md:flex p-10 text-white">
          <div className="pointer-events-none absolute inset-6 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm" />

          <div className="relative z-10 flex w-full flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/90">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Secure • Fast • Modern
              </div>

              <Image src={BrandImage} alt="VinaSale" priority className="mt-6 h-auto w-56" />

              <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white">
                Vận hành bán hàng mượt mà, từ quầy đến báo cáo.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
                Đăng nhập để quản lý hàng hóa, đơn hàng, tồn kho và hiệu suất kinh
                doanh trên một nền tảng thống nhất.
              </p>

              <div className="mt-8 grid gap-3">
                <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90">
                  Quản lý đa chi nhánh, đồng bộ dữ liệu tức thì
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90">
                  Phân quyền linh hoạt theo vai trò và phòng ban
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90">
                  Báo cáo trực quan, chính xác và dễ theo dõi
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg border border-white/15 bg-white/10 px-2 py-2 text-white/85">
                  99.9% Uptime
                </div>
                <div className="rounded-lg border border-white/15 bg-white/10 px-2 py-2 text-white/85">
                  Stable Sync
                </div>
                <div className="rounded-lg border border-white/15 bg-white/10 px-2 py-2 text-white/85">
                  Multi Branch
                </div>
              </div>

              <p className="text-xs text-white/60">
                © {new Date().getFullYear()} VinaSale. All rights reserved.
              </p>
            </div>
          </div>
        </aside>

        {/* RIGHT form */}
        <main className="flex items-center justify-center px-4 py-10 md:px-10">
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-md">
            <AuthSwitcher />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}