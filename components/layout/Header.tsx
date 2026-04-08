"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import BrandImage from "@/assets/images/brand.png";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { SECTOR_OPTIONS_BY_GROUP, SECTOR_CONFIG } from "@/constants/business-sector";

const GROUP_META: Record<string, { badge: string; span?: number; itemCols?: number }> = {
  "Bán buôn & Bán lẻ": { badge: "Commerce", span: 2, itemCols: 2 },
  "Ăn uống & Giải trí": { badge: "F&B" },
  "Dịch vụ & Lưu trú":  { badge: "Service" },
};

type MegaGroup = {
  key: string;
  title: string;
  badge?: string;
  span?: number;
  itemCols?: number;
  items: { key: string; label: string; href: string; Icon: React.ComponentType<{ size?: number }> }[];
};

const navLinks = [
  { href: "/service-fee",  label: "Phí dịch vụ" },
  { href: "/support",      label: "Hỗ trợ" },
  { href: "/new",          label: "Tin tức" },
  { href: "/recruitment",  label: "Tuyển dụng" },
  { href: "/about",        label: "Về VinaSale" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const groups: MegaGroup[] = useMemo(
    () =>
      SECTOR_OPTIONS_BY_GROUP.map((g) => ({
        key: g.group,
        title: g.group,
        badge: GROUP_META[g.group]?.badge,
        span: GROUP_META[g.group]?.span,
        itemCols: GROUP_META[g.group]?.itemCols,
        items: g.options.map(({ value, label }) => ({
          key: value,
          label,
          href: `/solutions/${SECTOR_CONFIG[value].route}`,
          Icon: SECTOR_CONFIG[value].Icon,
        })),
      })),
    []
  );

  const dummyMenu: MenuProps = useMemo(() => ({ items: [{ key: "dummy", label: "" }] }), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled || mobileOpen ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <Image src={BrandImage} alt="VinaSale" className="h-14 w-auto sm:h-16" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-3 md:flex">
            <Dropdown
              open={solutionsOpen}
              onOpenChange={setSolutionsOpen}
              trigger={["hover"]}
              placement="bottomLeft"
              menu={dummyMenu}
              dropdownRender={() => (
                <div
                  className="w-250 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <div className="grid grid-cols-4 gap-8">
                    {groups.map((col) => (
                      <div key={col.key} className={col.span === 2 ? "col-span-2" : "col-span-1"}>
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-600/80" />
                            <div className="text-[14px] font-semibold text-slate-900">{col.title}</div>
                            {col.badge && (
                              <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[11px] font-medium text-slate-600">
                                {col.badge}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full w-1/2 rounded-full bg-linear-to-r from-blue-600/80 via-cyan-500/70 to-transparent" />
                          </div>
                        </div>
                        <div className={col.itemCols === 2 ? "grid grid-cols-2 gap-x-4 gap-y-1" : "space-y-1"}>
                          {col.items.map(({ key, href, label, Icon }) => (
                            <Link
                              key={key}
                              href={href}
                              onClick={() => setSolutionsOpen(false)}
                              className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] transition hover:bg-slate-50"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                                <Icon size={18} />
                              </div>
                              <span className="text-slate-700 transition group-hover:text-blue-600">
                                {label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            >
              <span className="cursor-pointer rounded-full px-4 py-1 text-[15px] font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:shadow-sm">
                Giải pháp
              </span>
            </Dropdown>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1 text-[15px] font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:shadow-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300 bg-white/70 px-5 py-2 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-blue-500 hover:text-blue-600 hover:shadow-sm active:scale-95"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <span className="relative z-10">Đăng ký</span>
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 active:scale-95"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 flex h-full w-[80vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 mt-15">
          {/* Giải pháp accordion */}
          <div>
            <button
              onClick={() => setMobileSolutionsOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              <span>Giải pháp</span>
              {mobileSolutionsOpen
                ? <ChevronUp size={18} className="text-slate-400" />
                : <ChevronDown size={18} className="text-slate-400" />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileSolutionsOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-1 space-y-5 pb-2 pl-3">
                {groups.map((col) => (
                  <div key={col.key}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span className="text-[12px] font-semibold uppercase tracking-wide text-slate-400">
                        {col.title}
                      </span>
                      {col.badge && (
                        <span className="rounded-full bg-slate-100 px-1.5 py-[1px] text-[10px] font-medium text-slate-500">
                          {col.badge}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {col.items.map(({ key, href, label, Icon }) => (
                        <Link
                          key={key}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="group flex items-center gap-2 rounded-xl px-2.5 py-2 transition hover:bg-blue-50"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                            <Icon size={18} />
                          </div>
                          <span className="text-[13px] leading-tight text-slate-700 transition group-hover:text-blue-600">
                            {label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-xl px-3 py-3 text-[15px] font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="space-y-2.5 border-t border-slate-100 px-4 py-4">
          <Link
            href="/register"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block w-full rounded-full bg-linear-to-r from-blue-600 to-cyan-500 py-3 text-center text-sm font-semibold text-white shadow-lg active:scale-95"
          >
            Đăng ký
          </Link>
          <Link
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block w-full rounded-full border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
}
