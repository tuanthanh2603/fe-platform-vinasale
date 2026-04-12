"use client";

import Link from "next/link";
import Image from "next/image";
import BrandImage from "@/assets/images/brand.png";
import {
  Facebook,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const solutions = [
    { label: "Bán lẻ & Thương mại", href: "/solutions/retail" },
    { label: "F&B — Nhà hàng & Café", href: "/solutions/fnb" },
    { label: "Dịch vụ & Làm đẹp", href: "/solutions/service" },
    { label: "Đa kênh & Omnichannel", href: "/solutions/omnichannel" },
  ];

  const product = [
    { label: "Tính năng", href: "/features" },
    { label: "Bảng giá", href: "/pricing" },
    { label: "Cập nhật mới", href: "/changelog" },
    { label: "API & Tích hợp", href: "/integrations" },
  ];

  const company = [
    { label: "Về chúng tôi", href: "/about" },
    { label: "Tin tức & Blog", href: "/blog" },
    { label: "Tuyển dụng", href: "/careers" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  const socials = [
    { icon: <Facebook size={17} />, href: "#", label: "Facebook" },
    { icon: <Linkedin size={17} />, href: "#", label: "LinkedIn" },
    { icon: <Youtube size={17} />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      

      {/* ─── Main Footer Grid ─── */}
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={BrandImage}
                alt="VinaSale"
                className="h-9 w-auto"
                priority
              />
            </Link>

            <div className="mt-4 text-xs font-medium uppercase tracking-widest text-slate-400">
              Công ty TNHH Công Nghệ VinaSale
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Nền tảng quản lý bán hàng & vận hành đa kênh cho doanh nghiệp hiện
              đại. Tối ưu quy trình, tăng trưởng doanh thu, kiểm soát hiệu quả.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href="tel:0877717575"
                className="group flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-blue-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 ring-1 ring-slate-200/60 transition-all group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-200/60">
                  <Phone size={14} />
                </div>
                <span>0877 71 75 75</span>
              </a>

              <a
                href="mailto:vinasale.platform@gmail.com"
                className="group flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-blue-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 ring-1 ring-slate-200/60 transition-all group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-200/60">
                  <Mail size={14} />
                </div>
                <span>vinasale.platform@gmail.com</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-500">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 ring-1 ring-slate-200/60">
                  <MapPin size={14} />
                </div>
                <span className="leading-relaxed">
                  2555 Quốc lộ 1A, Phường Đông Hưng Thuận, TP.HCM
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 lg:col-span-8">
            {/* Giải pháp */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Giải pháp
              </div>
              <ul className="mt-5 space-y-3">
                {solutions.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      <ChevronRight
                        size={12}
                        className="text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sản phẩm */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Sản phẩm
              </div>
              <ul className="mt-5 space-y-3">
                {product.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      <ChevronRight
                        size={12}
                        className="text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Công ty */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Công ty
              </div>
              <ul className="mt-5 space-y-3">
                {company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      <ChevronRight
                        size={12}
                        className="text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social icons */}
              <div className="mt-8">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Kết nối
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 ring-1 ring-slate-200/60 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:ring-0 hover:shadow-md hover:shadow-blue-200/40"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="relative border-t border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 md:flex-row md:justify-between">
          <div className="order-2 text-xs text-slate-400 md:order-1">
            © {year} Công ty TNHH Công Nghệ VinaSale. All rights reserved.
          </div>

          <div className="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:order-2">
            <Link
              href="/terms"
              className="text-xs text-slate-400 transition-colors hover:text-blue-600"
            >
              Điều khoản sử dụng
            </Link>
            <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
            <Link
              href="/privacy"
              className="text-xs text-slate-400 transition-colors hover:text-blue-600"
            >
              Chính sách bảo mật
            </Link>
            <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
            <Link
              href="/sitemap"
              className="text-xs text-slate-400 transition-colors hover:text-blue-600"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}