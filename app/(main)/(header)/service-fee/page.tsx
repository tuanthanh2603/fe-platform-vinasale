import { ArrowRight, CheckCircle2, CircleDollarSign, Headset, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Cơ bản",
    price: "Miễn phí",
    desc: "Phù hợp cửa hàng nhỏ muốn bắt đầu nhanh.",
    features: [
      "Bán hàng cơ bản tại quầy",
      "Quản lý sản phẩm và tồn kho đơn giản",
      "Báo cáo tổng quan cuối ngày",
      "Hỗ trợ tiêu chuẩn",
    ],
  },
  {
    name: "Chuyên nghiệp",
    price: "Từ 99K/tháng",
    desc: "Dành cho doanh nghiệp cần tối ưu vận hành đa chi nhánh.",
    highlighted: true,
    features: [
      "Quản lý đa chi nhánh tập trung",
      "Phân quyền nhân sự nâng cao",
      "Báo cáo realtime theo chi nhánh/sản phẩm",
      "Tích hợp mở rộng theo nhu cầu",
    ],
  },
  {
    name: "Doanh nghiệp",
    price: "Liên hệ",
    desc: "Giải pháp tuỳ chỉnh cho hệ thống quy mô lớn.",
    features: [
      "SLA hỗ trợ ưu tiên",
      "Tư vấn triển khai theo mô hình vận hành",
      "Tuỳ chỉnh tích hợp hệ thống nội bộ",
      "Nâng cao bảo mật và kiểm soát dữ liệu",
    ],
  },
];

const addOns = [
  "Đào tạo onboarding cho đội ngũ tại chi nhánh",
  "Tư vấn chuẩn hoá quy trình vận hành",
  "Thiết lập báo cáo quản trị theo KPI doanh nghiệp",
  "Hỗ trợ nhập dữ liệu ban đầu",
];

const faqs = [
  {
    q: "Có phát sinh chi phí triển khai không?",
    a: "Tuỳ quy mô và yêu cầu tích hợp. Đội ngũ VinaSale sẽ tư vấn gói phù hợp trước khi triển khai.",
  },
  {
    q: "Có thể nâng cấp gói khi đang sử dụng không?",
    a: "Có. Bạn có thể nâng cấp bất kỳ lúc nào để mở thêm tính năng hoặc tài nguyên.",
  },
  {
    q: "Thanh toán theo tháng hay theo năm?",
    a: "VinaSale hỗ trợ cả chu kỳ tháng và năm, trong đó gói năm có ưu đãi tốt hơn.",
  },
];

export default function ServiceFeePage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pt-28 pb-14 md:pt-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
            <CircleDollarSign size={14} />
            Phí dịch vụ
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Bảng phí linh hoạt theo quy mô kinh doanh
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Chọn gói dịch vụ phù hợp với giai đoạn phát triển của doanh nghiệp và nâng cấp dễ dàng khi mở rộng.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Gói dịch vụ</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-blue-200 bg-linear-to-b from-blue-50 to-cyan-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-2 text-2xl font-extrabold text-slate-900">{plan.price}</div>
                <p className="mt-2 text-sm text-slate-600">{plan.desc}</p>

                <div className="mt-5 space-y-2.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 text-emerald-600" size={16} />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/register"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Đăng ký gói này <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-3">
            <h2 className="text-2xl font-bold text-slate-900">Dịch vụ bổ sung</h2>
            <div className="mt-5 space-y-3">
              {addOns.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Sparkles className="mt-0.5 text-blue-600" size={16} />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">Cam kết của VinaSale</h2>
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 text-emerald-600" size={16} />
                <p className="text-sm text-slate-700">Minh bạch chi phí trước khi triển khai.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Headset className="mt-0.5 text-blue-600" size={16} />
                <p className="text-sm text-slate-700">Hỗ trợ đồng hành trong suốt quá trình sử dụng.</p>
              </div>
            </div>

            <Link
              href="/support"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-600"
            >
              Nhận tư vấn chi tiết <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Câu hỏi thường gặp</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <article key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900 md:text-base">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
