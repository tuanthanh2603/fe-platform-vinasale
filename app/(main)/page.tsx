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
  ArrowUpRight,
  Star,
  TrendingUp,
  Users,
  ShoppingBag,
  Clock,
  Globe,
  Database,
  LineChart,
  Settings,
  Bell,
  FileText,
  Truck,
  Tag,
  Receipt,
  Wallet,
  Lock,
  Eye,
  RefreshCw,
  Wifi,
  Monitor,
  Tablet,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Quote,
  Award,
  Target,
  PieChart,
  LayoutDashboard,
  PackageCheck,
  X,
  Check,
  Minus,
} from "lucide-react";

/* ─── Section Title ─── */
function SectionTitle({
  pill,
  title,
  desc,
  light = false,
}: {
  pill: string;
  title: string;
  desc?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div
        className={[
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase",
          light
            ? "bg-white/10 text-white/90 ring-1 ring-white/20"
            : "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-100/60",
        ].join(" ")}
      >
        <span
          className={[
            "h-1.5 w-1.5 rounded-full",
            light ? "bg-cyan-400" : "bg-gradient-to-r from-blue-600 to-cyan-500",
          ].join(" ")}
        />
        {pill}
      </div>
      <h2
        className={[
          "mt-5 text-3xl font-extrabold tracking-tight md:text-[2.75rem] md:leading-[1.15]",
          light ? "text-white" : "text-slate-900",
        ].join(" ")}
      >
        {title}
      </h2>
      {desc ? (
        <p
          className={[
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/70" : "text-slate-500",
          ].join(" ")}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}

/* ─── Animated Grid Background ─── */
function GridBG({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/* ─── Glow Orb ─── */
function GlowOrb({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  /* ═══════════════════ DATA ═══════════════════ */

  const stats = [
    { icon: <Zap size={20} />, k: "Triển khai nhanh", v: "Onboarding chuẩn hoá", accent: "from-blue-500 to-cyan-400" },
    { icon: <BarChart3 size={20} />, k: "Realtime", v: "Báo cáo tức thời", accent: "from-cyan-500 to-teal-400" },
    { icon: <Layers size={20} />, k: "Đa chi nhánh", v: "Quản lý tập trung", accent: "from-teal-500 to-emerald-400" },
    { icon: <ShieldCheck size={20} />, k: "Bảo mật", v: "Phân quyền chặt chẽ", accent: "from-violet-500 to-blue-400" },
  ];

  const bigNumbers = [
    { value: "500+", label: "Doanh nghiệp tin dùng", icon: <Users size={18} /> },
    { value: "10M+", label: "Đơn hàng đã xử lý", icon: <ShoppingBag size={18} /> },
    { value: "99.9%", label: "Uptime hệ thống", icon: <Wifi size={18} /> },
    { value: "<2s", label: "Thời gian phản hồi", icon: <Clock size={18} /> },
  ];

  const solutions = [
    {
      title: "Bán buôn & Bán lẻ",
      desc: "Sản phẩm, tồn kho, barcode, đa chi nhánh — mọi thứ đồng bộ trên một hệ thống duy nhất.",
      icon: <Store size={22} />,
      href: "/solutions/retail",
      gradient: "from-blue-500 to-cyan-400",
      tag: "Retail",
      highlights: ["Quản lý barcode & SKU", "Đa bảng giá theo nhóm KH", "Tồn kho realtime theo kho", "Báo cáo lãi/lỗ theo sản phẩm"],
    },
    {
      title: "Ăn uống & Giải trí",
      desc: "Order nhanh, quản lý bàn, KOT/bếp, combo — tối ưu quy trình phục vụ giờ cao điểm.",
      icon: <UtensilsCrossed size={22} />,
      href: "/solutions/fnb",
      gradient: "from-orange-500 to-amber-400",
      tag: "F&B",
      highlights: ["Sơ đồ bàn & trạng thái", "In KOT tự động ra bếp/bar", "Combo & topping linh hoạt", "Chia bill & gộp bàn dễ dàng"],
    },
    {
      title: "Dịch vụ & Làm đẹp",
      desc: "Đặt lịch, nhân viên, hoa hồng, gói dịch vụ — kiểm soát chất lượng từng khách hàng.",
      icon: <Scissors size={22} />,
      href: "/solutions/service",
      gradient: "from-violet-500 to-purple-400",
      tag: "Service",
      highlights: ["Đặt lịch hẹn online", "Quản lý hoa hồng nhân viên", "Gói dịch vụ & thẻ thành viên", "Lịch sử chăm sóc khách hàng"],
    },
  ];

  const omni = [
    {
      title: "Bán đa kênh linh hoạt",
      desc: "Đồng bộ sản phẩm, đơn hàng, khách hàng giữa các kênh bán online & offline.",
      icon: <Layers size={22} />,
      num: "01",
      details: ["Tích hợp sàn TMĐT", "Website & app bán hàng", "POS tại cửa hàng", "Social commerce"],
    },
    {
      title: "Quản lý tập trung một nơi",
      desc: "Giảm sai sót, tối ưu quy trình, kiểm soát vận hành từ mọi chi nhánh.",
      icon: <BarChart3 size={22} />,
      num: "02",
      details: ["Dashboard tổng quan", "Phân tích theo chi nhánh", "So sánh hiệu suất", "Cảnh báo bất thường"],
    },
    {
      title: "Tăng trưởng bền vững",
      desc: "Theo dõi realtime để ra quyết định nhanh, chính xác và dựa trên dữ liệu.",
      icon: <Sparkles size={22} />,
      num: "03",
      details: ["Dự báo xu hướng", "Phân tích khách hàng", "Tối ưu tồn kho", "KPI & mục tiêu"],
    },
  ];

  const features = [
    {
      title: "Kho thông minh",
      desc: "Nhập/xuất, kiểm kho, cảnh báo tồn thấp — tự động hoá quy trình kho.",
      icon: <Boxes size={20} />,
      subFeatures: ["Kiểm kho theo lô", "Chuyển kho nội bộ", "Cảnh báo hết hàng", "Theo dõi hạn sử dụng"],
    },
    {
      title: "Thanh toán linh hoạt",
      desc: "Nhiều phương thức, đối soát rõ ràng, tích hợp cổng thanh toán.",
      icon: <CreditCard size={20} />,
      subFeatures: ["Tiền mặt & chuyển khoản", "Ví điện tử & QR Pay", "Trả góp & công nợ", "Đối soát tự động"],
    },
    {
      title: "Phân quyền & nhật ký",
      desc: "Theo vai trò, audit log chi tiết, an toàn dữ liệu tuyệt đối.",
      icon: <ShieldCheck size={20} />,
      subFeatures: ["Phân quyền theo role", "Audit log chi tiết", "Bảo mật 2 lớp", "Tách data theo tenant"],
    },
    {
      title: "Tốc độ & ổn định",
      desc: "Tối ưu thao tác, phù hợp giờ cao điểm, không lag hay gián đoạn.",
      icon: <Zap size={20} />,
      subFeatures: ["Tải trang < 2 giây", "Xử lý nghìn bill/giờ", "Auto-scaling hạ tầng", "Backup liên tục"],
    },
    {
      title: "Mobile-friendly",
      desc: "Quản lý mọi lúc, mọi nơi — giao diện responsive trên mọi thiết bị.",
      icon: <Smartphone size={20} />,
      subFeatures: ["App iOS & Android", "Responsive mọi màn hình", "Thông báo push", "Báo cáo on-the-go"],
    },
    {
      title: "Hỗ trợ tận tâm",
      desc: "Tư vấn triển khai theo ngành, theo quy trình — đồng hành liên tục.",
      icon: <Headset size={20} />,
      subFeatures: ["Hỗ trợ 24/7", "Đào tạo sử dụng", "Cập nhật tính năng", "Tư vấn quy trình"],
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Đăng ký & cấu hình",
      desc: "Tạo doanh nghiệp, chi nhánh, phân quyền trong vài phút. Hệ thống hướng dẫn từng bước.",
      icon: <Settings size={24} />,
      details: ["Tạo tài khoản miễn phí", "Cấu hình cửa hàng", "Phân quyền nhân viên", "Kết nối thiết bị POS"],
      duration: "5 phút",
    },
    {
      step: "02",
      title: "Nhập dữ liệu",
      desc: "Import sản phẩm, bảng giá, tồn kho. Hỗ trợ import từ Excel, CSV hoặc hệ thống cũ.",
      icon: <Database size={24} />,
      details: ["Import từ Excel/CSV", "Migrate hệ thống cũ", "Thiết lập bảng giá", "Kiểm tra & xác nhận"],
      duration: "30 phút",
    },
    {
      step: "03",
      title: "Vận hành & tối ưu",
      desc: "Bán hàng ngay, báo cáo realtime cập nhật liên tục, cải tiến dựa trên data.",
      icon: <TrendingUp size={24} />,
      details: ["Bắt đầu bán hàng ngay", "Theo dõi doanh thu realtime", "Phân tích & tối ưu", "Mở rộng khi sẵn sàng"],
      duration: "Liên tục",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Tuấn",
      role: "Chủ chuỗi 5 cửa hàng thời trang",
      content: "VinaSale giúp tôi quản lý 5 chi nhánh từ một nơi. Báo cáo realtime giúp ra quyết định nhanh hơn rất nhiều. Tồn kho luôn chính xác, không bao giờ hết hàng bất ngờ.",
      rating: 5,
      avatar: "NT",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Trần Thị Hương",
      role: "Quản lý nhà hàng Hải Sản Phố",
      content: "Module F&B rất mạnh — sơ đồ bàn trực quan, in KOT tự động, chia bill nhanh. Giờ cao điểm phục vụ 200+ khách mà nhân viên vẫn thoải mái.",
      rating: 5,
      avatar: "TH",
      color: "from-orange-500 to-amber-400",
    },
    {
      name: "Lê Văn Đức",
      role: "CEO Spa & Beauty Center",
      content: "Tính năng đặt lịch và quản lý hoa hồng nhân viên rất tiện. Khách hàng đặt lịch online, nhân viên nhận thông báo ngay. Doanh thu tăng 35% sau 3 tháng.",
      rating: 5,
      avatar: "LD",
      color: "from-violet-500 to-purple-400",
    },
  ];

  const pricing = [
    {
      name: "Cơ bản",
      price: "Miễn phí",
      period: "",
      desc: "Phù hợp cửa hàng nhỏ, bắt đầu nhanh.",
      items: [
        { text: "1 chi nhánh", included: true },
        { text: "Bán hàng cơ bản", included: true },
        { text: "Quản lý sản phẩm & kho", included: true },
        { text: "Báo cáo tổng quan", included: true },
        { text: "Hỗ trợ qua chat", included: true },
        { text: "Đa chi nhánh", included: false },
        { text: "Phân quyền nâng cao", included: false },
        { text: "API & tích hợp", included: false },
      ],
      cta: "Dùng thử miễn phí",
      href: "/register",
      highlight: false,
    },
    {
      name: "Chuyên nghiệp",
      price: "99K",
      period: "/tháng",
      desc: "Tối ưu vận hành, đa chi nhánh — phổ biến nhất.",
      items: [
        { text: "Tối đa 10 chi nhánh", included: true },
        { text: "Tất cả tính năng Cơ bản", included: true },
        { text: "Phân quyền nâng cao", included: true },
        { text: "Báo cáo realtime", included: true },
        { text: "Tích hợp sàn TMĐT", included: true },
        { text: "Hỗ trợ ưu tiên 24/7", included: true },
        { text: "API mở rộng", included: true },
        { text: "Tư vấn triển khai", included: false },
      ],
      cta: "Bắt đầu ngay",
      href: "/register",
      highlight: true,
    },
    {
      name: "Cao cấp",
      price: "Liên hệ",
      period: "",
      desc: "Dành cho hệ thống lớn, tuỳ biến sâu.",
      items: [
        { text: "Không giới hạn chi nhánh", included: true },
        { text: "Tất cả tính năng Pro", included: true },
        { text: "SLA & hỗ trợ ưu tiên", included: true },
        { text: "Tích hợp theo yêu cầu", included: true },
        { text: "Bảo mật nâng cao", included: true },
        { text: "Tư vấn triển khai 1-1", included: true },
        { text: "Custom domain & branding", included: true },
        { text: "Dedicated server", included: true },
      ],
      cta: "Nhận tư vấn",
      href: "/lien-he",
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: "VinaSale phù hợp loại hình kinh doanh nào?",
      a: "VinaSale phù hợp với hầu hết các mô hình: bán lẻ, chuỗi cửa hàng, F&B (nhà hàng, quán café, trà sữa), dịch vụ (spa, salon, phòng khám). Bạn có thể bật/tắt module theo ngành khi triển khai, và hệ thống sẽ tự cấu hình giao diện, báo cáo phù hợp.",
    },
    {
      q: "Có dùng thử miễn phí không? Thời gian dùng thử bao lâu?",
      a: "Có. Gói Cơ bản hoàn toàn miễn phí, không giới hạn thời gian. Bạn có thể đăng ký và trải nghiệm đầy đủ tính năng cơ bản trước khi quyết định nâng cấp lên gói Chuyên nghiệp hoặc Cao cấp.",
    },
    {
      q: "Dữ liệu có an toàn không? VinaSale bảo mật như thế nào?",
      a: "Dữ liệu được bảo vệ nhiều lớp: phân quyền theo vai trò (RBAC), mã hoá dữ liệu truyền tải (SSL/TLS), ghi nhật ký thao tác (audit log), và thiết kế tách dữ liệu theo tenant. Hệ thống backup tự động hàng ngày và có khả năng khôi phục nhanh chóng.",
    },
    {
      q: "Mất bao lâu để triển khai? Có cần kỹ thuật không?",
      a: "Thường từ vài giờ đến vài ngày tuỳ quy mô. Cửa hàng nhỏ có thể tự setup trong 30 phút. Với hệ thống lớn, đội ngũ VinaSale sẽ hỗ trợ migrate dữ liệu, đào tạo nhân viên và tư vấn quy trình phù hợp.",
    },
    {
      q: "VinaSale có tích hợp với các sàn TMĐT và cổng thanh toán không?",
      a: "Có. VinaSale tích hợp với Shopee, Lazada, TikTok Shop, website bán hàng, và các cổng thanh toán phổ biến như VNPay, MoMo, ZaloPay. Đơn hàng từ tất cả kênh được đồng bộ tự động về một nơi.",
    },
    {
      q: "Khi gặp sự cố, tôi liên hệ hỗ trợ bằng cách nào?",
      a: "Bạn có thể liên hệ qua live chat trên website (phản hồi trong 5 phút), hotline, email, hoặc Zalo. Gói Chuyên nghiệp và Cao cấp được hỗ trợ ưu tiên 24/7 với cam kết thời gian phản hồi.",
    },
  ];

  const partners = ["VNPay", "MoMo", "ZaloPay", "Shopee", "Lazada", "TikTok Shop"];

  return (
    <div className="relative w-full overflow-hidden bg-white">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat sm:hidden"
          style={{ backgroundImage: `url(${BGMobile.src})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80 sm:hidden" aria-hidden="true" />
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
          style={{ backgroundImage: `url(${BGDesktop.src})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden sm:block opacity-[0.02]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <main className="relative z-10 flex min-h-screen flex-col items-center justify-start px-5 pt-32 sm:pt-36 md:pt-40 lg:pt-[7%]">
          <div className="w-full max-w-4xl text-center text-slate-900">
            {/* Badge */}
            <div className="group inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-black/[0.06] backdrop-blur-md transition-all hover:ring-blue-200 sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              Nền tảng quản lý bán hàng & vận hành hiện đại
            </div>

            <h1 className="mt-7 text-[1.75rem] font-extrabold leading-[1.15] tracking-tight sm:mt-8 sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              <span className="block text-slate-900">Quản lý bán hàng</span>
              <span className="mt-1 block bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent sm:mt-2">
                thông minh & hiện đại
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-slate-500 sm:mt-6 sm:text-lg">
              Quản lý sản phẩm, kho, đơn hàng, khách hàng và báo cáo realtime.
              <br className="hidden sm:block" />
              <span className="text-slate-400"> Thiết kế phù hợp từng mô hình kinh doanh.</span>
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 sm:gap-6 sm:text-sm">
              {["Hỗ trợ 24/7", "Tư vấn miễn phí", "Setup trong 30 phút", "Không cần kỹ thuật"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="/register"
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:text-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Dùng thử miễn phí
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                href="/about"
                className="group w-full rounded-2xl border border-slate-200/80 bg-white/80 px-8 py-4 text-base font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:bg-white hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Xem giải pháp
                  <ArrowUpRight size={18} className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-500" />
                </span>
              </Link>
            </div>

            {/* Social proof avatars */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex -space-x-2">
                {["NT", "TH", "LD", "PH", "MK"].map((initials, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-cyan-400 text-[10px] font-bold text-white shadow-sm"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>500+ doanh nghiệp đang sử dụng</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ═══════════════════ STATS + NUMBERS + PARTNERS ═══════════════════ */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-4 rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50/80 to-white p-6 shadow-sm sm:grid-cols-2 md:grid-cols-4 md:p-8">
            {stats.map((s) => (
              <div key={s.v} className="group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-sm`}>
                  {s.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{s.k}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{s.v}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {bigNumbers.map((n) => (
              <div key={n.label} className="group rounded-2xl border border-slate-100 bg-white p-5 text-center transition-all hover:border-blue-100 hover:shadow-md hover:shadow-blue-50">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  {n.icon}
                </div>
                <div className="mt-3 text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent md:text-3xl">
                  {n.value}
                </div>
                <div className="mt-1 text-xs text-slate-500">{n.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">Tích hợp & đối tác tin cậy</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {partners.map((name) => (
                <div
                  key={name}
                  className="flex h-10 items-center rounded-lg bg-slate-50 px-5 text-sm font-semibold text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOLUTIONS ═══════════════════ */}
      <section className="relative overflow-hidden bg-white">
        <GridBG />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionTitle
            pill="Giải pháp theo ngành"
            title="Thiết kế phù hợp từng mô hình kinh doanh"
            desc="Cấu hình nhanh theo ngành — đồng bộ dữ liệu và báo cáo trên một hệ thống."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {solutions.map((it) => (
              <Link
                key={it.title}
                href={it.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${it.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]`} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${it.gradient} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                      {it.icon}
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                      {it.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{it.desc}</p>

                  <div className="mt-5 space-y-2">
                    {it.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 size={13} className="shrink-0 text-emerald-500" />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors group-hover:text-blue-600">
                    Xem chi tiết
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ OMNI-CHANNEL ═══════════════════ */}
      <section className="relative overflow-hidden bg-slate-950">
        <GlowOrb className="h-[500px] w-[500px] bg-blue-600/20 -top-64 -left-64" />
        <GlowOrb className="h-[400px] w-[400px] bg-cyan-500/15 -bottom-48 -right-48" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <SectionTitle
            pill="Vận hành đa kênh"
            title="Mở rộng kênh bán — quản lý tập trung"
            desc="Một hệ thống duy nhất để đồng bộ dữ liệu bán hàng và tối ưu vận hành toàn diện."
            light
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {omni.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.07]"
              >
                <div className="text-xs font-bold tracking-widest text-cyan-400/60">{f.num}</div>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-cyan-400 ring-1 ring-white/10">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{f.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {f.details.map((d) => (
                    <span key={d} className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/50 ring-1 ring-white/[0.08]">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Channel flow visualization */}
          <div className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
            <div className="text-center text-xs font-bold uppercase tracking-widest text-white/30">
              Luồng đồng bộ dữ liệu
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {["POS Cửa hàng", "Website", "Shopee", "Lazada", "TikTok Shop", "Zalo"].map((ch, i) => (
                <div key={ch} className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white/60 ring-1 ring-white/[0.1]">
                    {ch}
                  </div>
                  {i < 5 && <ArrowRight size={14} className="hidden text-white/20 md:block" />}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <div className="rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-5 py-2.5 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/30">
                VinaSale — Trung tâm quản lý
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="relative overflow-hidden bg-white">
        <GridBG />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionTitle
            pill="Tính năng nổi bật"
            title="Vận hành nhanh hơn, kiểm soát tốt hơn"
            desc="Các module cốt lõi giúp bạn tối ưu bán hàng và ra quyết định dựa trên dữ liệu."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-100 transition-all group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-400 group-hover:text-white group-hover:ring-0 group-hover:shadow-md group-hover:shadow-blue-200/40">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-[0.95rem] font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-1.5 pl-[3.75rem]">
                  {f.subFeatures.map((sf) => (
                    <span key={sf} className="text-[11px] text-slate-400">• {sf}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-100 bg-gradient-to-r from-blue-50/50 via-cyan-50/50 to-teal-50/50 p-6 text-center">
            <p className="text-sm font-medium text-slate-600">
              Và còn nhiều tính năng khác:{" "}
              <span className="font-semibold text-slate-900">
                CRM khách hàng, Khuyến mãi, Loyalty & tích điểm, Quản lý ca làm, Báo cáo tuỳ chỉnh, Export PDF/Excel...
              </span>
            </p>
            <Link href="/features" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
              Xem tất cả tính năng <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STEPS ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionTitle
            pill="Triển khai"
            title="Triển khai nhanh, dùng ngay"
            desc="Chỉ 3 bước đơn giản để bắt đầu. Không cần kỹ thuật, không cần cài đặt phức tạp."
          />

          <div className="relative mt-14">
            <div className="absolute top-[3.25rem] hidden h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent md:block" aria-hidden="true" />

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.step} className="group relative">
                  <div className="rounded-3xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110">
                        {s.icon}
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                        {s.duration}
                      </span>
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-500">
                      Bước {s.step}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>

                    <div className="mt-4 space-y-2">
                      {s.details.map((d, i) => (
                        <div key={d} className="flex items-center gap-2.5 text-xs text-slate-500">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-50 text-[10px] font-bold text-slate-400">
                            {i + 1}
                          </div>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="relative overflow-hidden bg-white">
        <GridBG />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionTitle
            pill="Khách hàng nói gì"
            title="Được tin dùng bởi hàng trăm doanh nghiệp"
            desc="Từ cửa hàng nhỏ đến chuỗi lớn, VinaSale giúp tối ưu vận hành và tăng trưởng bền vững."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group rounded-3xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <Quote size={18} />
                </div>
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section className="relative overflow-hidden bg-slate-50/50">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionTitle
            pill="Gói dịch vụ"
            title="Chọn gói phù hợp quy mô của bạn"
            desc="Bắt đầu từ gói cơ bản miễn phí và nâng cấp khi doanh nghiệp phát triển."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={[
                  "group relative overflow-hidden rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1",
                  p.highlight
                    ? "border-blue-200 shadow-xl shadow-blue-100/50 ring-1 ring-blue-100"
                    : "border-slate-200/80 hover:shadow-lg hover:shadow-slate-100",
                ].join(" ")}
              >
                {p.highlight && (
                  <div className="absolute -right-8 top-6 rotate-45 bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Phổ biến
                  </div>
                )}

                <div className="text-sm font-bold uppercase tracking-wider text-slate-400">{p.name}</div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={[
                      "text-3xl font-extrabold",
                      p.highlight ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" : "text-slate-900",
                    ].join(" ")}
                  >
                    {p.price}
                  </span>
                  {p.period && <span className="text-sm text-slate-400">{p.period}</span>}
                </div>
                <p className="mt-2 text-sm text-slate-500">{p.desc}</p>

                <div className="mt-6 h-px bg-slate-100" />

                <ul className="mt-6 space-y-3">
                  {p.items.map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-sm">
                      {item.included ? (
                        <div
                          className={[
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            p.highlight ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-500",
                          ].join(" ")}
                        >
                          <Check size={12} />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                          <Minus size={12} />
                        </div>
                      )}
                      <span className={item.included ? "text-slate-700" : "text-slate-400"}>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.href}
                  className={[
                    "mt-8 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all duration-300",
                    p.highlight
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-400/25 hover:shadow-xl hover:shadow-blue-400/30 hover:-translate-y-0.5"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {p.cta}
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Tất cả các gói bao gồm: cập nhật miễn phí, bảo mật SSL, backup hàng ngày.
              <br />
              <span className="text-slate-400">Không ẩn phí. Huỷ bất kỳ lúc nào.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionTitle
            pill="FAQ"
            title="Câu hỏi thường gặp"
            desc="Mọi thứ bạn cần biết trước khi bắt đầu với VinaSale."
          />
          <div className="mx-auto mt-14 max-w-3xl space-y-3">
            {faqs.map((f, idx) => (
              <details
                key={idx}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 open:shadow-lg open:shadow-slate-100"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
                  <span className="text-sm font-semibold text-slate-800 sm:text-base">{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-open:rotate-180 group-open:bg-blue-50 group-open:text-blue-600">
                    <ChevronDown size={15} />
                  </span>
                </summary>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <div className="mb-4 h-px bg-slate-100" />
                  <p className="text-sm leading-relaxed text-slate-500">{f.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Vẫn còn thắc mắc?{" "}
              <Link href="/lien-he" className="font-semibold text-blue-600 transition-colors hover:text-blue-700">
                Liên hệ đội ngũ tư vấn
              </Link>{" "}
              — phản hồi trong 5 phút.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-10 shadow-2xl sm:p-14 md:p-16">
            <GlowOrb className="h-[400px] w-[400px] bg-blue-600/30 -top-48 -right-48" />
            <GlowOrb className="h-[300px] w-[300px] bg-cyan-500/20 -bottom-32 -left-32" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Sẵn sàng nâng cấp
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    vận hành doanh nghiệp?
                  </span>
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  Bắt đầu trải nghiệm ngay hôm nay, hoặc để đội ngũ tư vấn đồng hành triển khai theo ngành.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Quản lý đa chi nhánh tập trung",
                    "Báo cáo realtime — quyết định nhanh hơn",
                    "Phân quyền & bảo mật nhiều lớp",
                    "Tích hợp đa kênh bán hàng",
                    "Hỗ trợ tận tâm, phản hồi nhanh",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                        <CheckCircle2 size={12} className="text-cyan-400" />
                      </div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row md:flex-col md:items-end lg:flex-row lg:justify-end">
                <Link
                  href="/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-white px-8 py-4 text-center text-sm font-semibold text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    Dùng thử miễn phí
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/lien-he"
                  className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-center text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
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