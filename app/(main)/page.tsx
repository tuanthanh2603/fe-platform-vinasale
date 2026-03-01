import Link from "next/link";
import BGDesktop from "@/assets/images/bg1.png";
import BGMobile from "@/assets/images/bg-mobile.png";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  CheckCircle2,
  CreditCard,
  Headset,
  Layers,
  ShieldCheck,
  Smartphone,
  Store,
  UtensilsCrossed,
  Scissors,
  Sparkles,
  Zap,
  ChevronDown,
} from "lucide-react";

function SectionTitle({
  pill,
  title,
  desc,
}: {
  pill: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
        <span className="h-2 w-2 rounded-full bg-blue-600" />
        {pill}
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-base text-slate-600">{desc}</p> : null}
    </div>
  );
}

export default function Home() {
  const stats = [
    { k: "Triển khai nhanh", v: "Onboarding chuẩn hoá" },
    { k: "Realtime", v: "Báo cáo tức thời" },
    { k: "Đa chi nhánh", v: "Quản lý tập trung" },
    { k: "Bảo mật", v: "Phân quyền chặt chẽ" },
  ];

  const solutions = [
    {
      title: "Bán buôn & Bán lẻ",
      desc: "Sản phẩm, tồn kho, barcode, đa chi nhánh.",
      icon: <Store size={18} />,
      href: "/solutions/retail",
    },
    {
      title: "Ăn uống & Giải trí",
      desc: "Order nhanh, quản lý bàn, KOT/bếp, combo.",
      icon: <UtensilsCrossed size={18} />,
      href: "/solutions/fnb",
    },
    {
      title: "Dịch vụ & Làm đẹp",
      desc: "Đặt lịch, nhân viên, hoa hồng, gói dịch vụ.",
      icon: <Scissors size={18} />,
      href: "/solutions/service",
    },
  ];

  const omni = [
    {
      title: "Bán đa kênh linh hoạt",
      desc: "Đồng bộ sản phẩm, đơn hàng, khách hàng giữa các kênh.",
      icon: <Layers size={18} />,
    },
    {
      title: "Quản lý tập trung một nơi",
      desc: "Giảm sai sót, tối ưu quy trình, kiểm soát vận hành.",
      icon: <BarChart3 size={18} />,
    },
    {
      title: "Tăng trưởng bền vững",
      desc: "Theo dõi realtime để ra quyết định nhanh và chính xác.",
      icon: <Sparkles size={18} />,
    },
  ];

  const features = [
    {
      title: "Kho thông minh",
      desc: "Nhập/xuất, kiểm kho, cảnh báo tồn thấp.",
      icon: <Boxes size={18} />,
    },
    {
      title: "Thanh toán linh hoạt",
      desc: "Nhiều phương thức, đối soát rõ ràng.",
      icon: <CreditCard size={18} />,
    },
    {
      title: "Phân quyền & nhật ký",
      desc: "Theo vai trò, audit log, an toàn dữ liệu.",
      icon: <ShieldCheck size={18} />,
    },
    {
      title: "Tốc độ & ổn định",
      desc: "Tối ưu thao tác, phù hợp giờ cao điểm.",
      icon: <Zap size={18} />,
    },
    {
      title: "Mobile-friendly",
      desc: "Quản lý mọi lúc, mọi nơi.",
      icon: <Smartphone size={18} />,
    },
    {
      title: "Hỗ trợ tận tâm",
      desc: "Tư vấn triển khai theo ngành, theo quy trình.",
      icon: <Headset size={18} />,
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Đăng ký & cấu hình",
      desc: "Tạo doanh nghiệp, chi nhánh, phân quyền.",
    },
    {
      step: "02",
      title: "Nhập dữ liệu",
      desc: "Sản phẩm/dịch vụ, bảng giá, tồn kho ban đầu.",
    },
    {
      step: "03",
      title: "Vận hành & tối ưu",
      desc: "Bán hàng, báo cáo realtime, cải tiến liên tục.",
    },
  ];

  const pricing = [
    {
      name: "Cơ bản",
      price: "Miễn phí",
      desc: "Phù hợp cửa hàng nhỏ, bắt đầu nhanh.",
      items: ["Bán hàng cơ bản", "Sản phẩm & kho", "Báo cáo tổng quan", "Hỗ trợ tiêu chuẩn"],
      cta: "Dùng thử miễn phí",
      href: "/dang-ky",
      highlight: false,
    },
    {
      name: "Chuyên nghiệp",
      price: "Từ 99K/tháng",
      desc: "Tối ưu vận hành, đa chi nhánh.",
      items: ["Đa chi nhánh", "Phân quyền nâng cao", "Báo cáo theo thời gian thực", "Tích hợp mở rộng"],
      cta: "Bắt đầu ngay",
      href: "/dang-ky",
      highlight: true,
    },
    {
      name: "Cao cấp",
      price: "Liên hệ",
      desc: "Dành cho hệ thống lớn, tuỳ biến sâu.",
      items: ["SLA & hỗ trợ ưu tiên", "Tích hợp theo yêu cầu", "Bảo mật nâng cao", "Tư vấn triển khai"],
      cta: "Nhận tư vấn",
      href: "/lien-he",
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: "VinaSale phù hợp loại hình nào?",
      a: "Phù hợp bán lẻ, F&B, dịch vụ. Bạn có thể bật/tắt module theo ngành khi triển khai.",
    },
    {
      q: "Có dùng thử miễn phí không?",
      a: "Có. Bạn có thể đăng ký để trải nghiệm trước khi chọn gói phù hợp.",
    },
    {
      q: "Dữ liệu có an toàn không?",
      a: "Có cơ chế phân quyền theo vai trò, ghi nhật ký thao tác và thiết kế tách dữ liệu theo tenant.",
    },
    {
      q: "Mất bao lâu để triển khai?",
      a: "Thường từ vài giờ đến vài ngày tuỳ quy mô và dữ liệu ban đầu.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* BG Mobile */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat sm:hidden"
          style={{ backgroundImage: `url(${BGMobile.src})` }}
          aria-hidden="true"
        />
        {/* Overlay gradient nhẹ phía trên để chữ dễ đọc hơn trên mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-transparent sm:hidden" aria-hidden="true" />

        {/* BG Desktop */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
          style={{ backgroundImage: `url(${BGDesktop.src})` }}
          aria-hidden="true"
        />

        <main className="relative z-10 flex min-h-screen flex-col items-center justify-start px-5 pt-35 sm:pt-36 md:pt-40 lg:pt-[7%]">
          <div className="w-full max-w-4xl text-center text-slate-900">

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-black/5 backdrop-blur sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <BadgeCheck size={13} className="shrink-0 text-blue-600 sm:size-4" />
              <span className="leading-snug">
                Nền tảng quản lý bán hàng & vận hành hiện đại
              </span>
            </div>

            {/* Title — tăng line-height mobile, giảm size để không vỡ */}
            <h1 className="mt-5 text-[1.65rem] font-extrabold leading-[1.2] tracking-tight sm:mt-6 sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Nền tảng quản lý{" "}
                <br className="sm:hidden" />
                bán hàng thông minh
              </span>
            </h1>

            {/* Description — giảm padding, text gọn hơn */}
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-600 sm:mt-5 sm:px-6 sm:text-lg md:text-xl">
              Quản lý sản phẩm, kho, đơn hàng, khách hàng{" "}
              <br className="hidden xs:block sm:hidden" />
              và báo cáo realtime.
              <br />
              <span className="text-slate-500">Thiết kế phù hợp từng mô hình kinh doanh.</span>
            </p>

            {/* Stats nhanh — chỉ hiện mobile, tạo trust signal */}
            <div className="mt-6 text-sm text-slate-700">
              Hỗ trợ 24/7 • Tư vấn miễn phí • Đồng hành cùng doanh nghiệp
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/dang-ky"
                className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition active:scale-95 hover:scale-105 hover:shadow-xl sm:w-auto sm:px-8 sm:text-lg text-center"
              >
                🚀 Dùng thử miễn phí
              </Link>

              <Link
                href="/about"
                className="w-full rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-slate-800 backdrop-blur transition active:scale-95 hover:bg-slate-100 sm:w-auto sm:px-8 sm:text-lg text-center"
              >
                Xem giải pháp →
              </Link>
            </div>


          </div>
        </main>
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.v} className="text-center">
                <div className="text-2xl font-extrabold text-slate-900">{s.k}</div>
                <div className="mt-1 text-sm text-slate-600">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle
            pill="Giải pháp theo ngành"
            title="Thiết kế phù hợp từng mô hình kinh doanh"
            desc="Cấu hình nhanh theo ngành — đồng bộ dữ liệu và báo cáo trên một hệ thống."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {solutions.map((it) => (
              <Link
                key={it.title}
                href={it.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                    {it.icon}
                  </div>
                  <div className="text-lg font-bold text-slate-900">{it.title}</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{it.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:text-blue-600">
                  Xem chi tiết <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle
            pill="Vận hành đa kênh"
            title="Mở rộng kênh bán - quản lý tập trung một nơi"
            desc="Một hệ thống duy nhất để đồng bộ dữ liệu bán hàng và tối ưu vận hành."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {omni.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    {f.icon}
                  </div>
                  <div className="text-base font-bold text-slate-900">{f.title}</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle
            pill="Tính năng nổi bật"
            title="Vận hành nhanh hơn, kiểm soát tốt hơn"
            desc="Các module cốt lõi giúp bạn tối ưu bán hàng và ra quyết định dựa trên dữ liệu."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    {f.icon}
                  </div>
                  <div className="text-base font-bold text-slate-900">{f.title}</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle pill="Triển khai" title="Triển khai nhanh, dùng ngay" />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-bold text-blue-600">{s.step}</div>
                <div className="mt-2 text-lg font-bold text-slate-900">{s.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle
            pill="Gói dịch vụ"
            title="Chọn gói phù hợp quy mô của bạn"
            desc="Bạn có thể bắt đầu từ gói cơ bản và nâng cấp khi phát triển."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={[
                  "rounded-3xl border bg-white p-6 shadow-sm",
                  p.highlight ? "border-blue-200 ring-2 ring-blue-100" : "border-slate-200",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-extrabold text-slate-900">{p.name}</div>
                  {p.highlight ? (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Phổ biến
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 text-2xl font-extrabold text-slate-900">{p.price}</div>
                <p className="mt-2 text-sm text-slate-600">{p.desc}</p>

                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {p.items.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-blue-600" />
                      {t}
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.href}
                  className={[
                    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
                    p.highlight
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:scale-[1.01]"
                      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {p.cta} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionTitle pill="FAQ" title="Câu hỏi thường gặp" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
            {faqs.map((f, idx) => (
              <details key={idx} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-900">{f.q}</span>
                  <span className="text-slate-400 transition group-open:rotate-180">
                    <ChevronDown size={18} />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-white shadow-xl">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-white/15 blur-2xl" />

            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Sẵn sàng nâng cấp vận hành doanh nghiệp?
                </h3>
                <p className="mt-3 text-white/90">
                  Bắt đầu trải nghiệm ngay, hoặc để đội ngũ tư vấn triển khai theo ngành.
                </p>

                <ul className="mt-5 space-y-2 text-sm text-white/90">
                  {["Quản lý đa chi nhánh", "Báo cáo realtime", "Phân quyền & bảo mật"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-white" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/dang-ky"
                  className="rounded-full bg-white px-7 py-3 text-center text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02]"
                >
                  Dùng thử miễn phí
                </Link>
                <Link
                  href="/lien-he"
                  className="rounded-full border border-white/40 bg-white/10 px-7 py-3 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Nhận tư vấn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}