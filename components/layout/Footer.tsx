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
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Top */}
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={BrandImage}
                alt="VinaSale"
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* ✅ Tên pháp lý đầy đủ */}
            <div className="mt-4 text-sm font-semibold text-slate-900">
              Công ty TNHH Công Nghệ VinaSale
            </div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Nền tảng quản lý bán hàng & vận hành đa kênh cho doanh nghiệp hiện
              đại. Tối ưu quy trình, tăng trưởng doanh thu, kiểm soát hiệu quả.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-slate-400" />
                <a href="tel:1900xxxx" className="hover:text-blue-600 transition">
                  1900 xxxx
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-slate-400" />
                <a
                  href="mailto:support@vinasale.vn"
                  className="hover:text-blue-600 transition"
                >
                  support@vinasale.vn
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-slate-400" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Giải pháp */}
          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-slate-900">
              Giải pháp
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <Link className="hover:text-blue-600 transition" href="#">
                  Bán lẻ & Thương mại
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-600 transition" href="#">
                  F&B
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-600 transition" href="#">
                  Dịch vụ & Lưu trú
                </Link>
              </li>
            </ul>
          </div>

          {/* Công ty */}
          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-slate-900">
              Công ty
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <Link className="hover:text-blue-600 transition" href="#">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-600 transition" href="#">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-600 transition" href="#">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-4">
            <div className="text-sm font-semibold text-slate-900">
              Nhận tư vấn giải pháp
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Đội ngũ chuyên gia của VinaSale sẵn sàng tư vấn và triển khai giải
              pháp phù hợp với mô hình kinh doanh của bạn.
            </p>

            <Link
              href="#"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-95"
            >
              Liên hệ ngay <ArrowRight size={16} />
            </Link>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
                <Facebook size={18} />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
                <Linkedin size={18} />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          {/* ✅ Bản quyền pháp lý */}
          <div>
            © {year} Công ty TNHH Công Nghệ VinaSale. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="hover:text-blue-600 transition" href="#">
              Điều khoản sử dụng
            </Link>
            <Link className="hover:text-blue-600 transition" href="#">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}