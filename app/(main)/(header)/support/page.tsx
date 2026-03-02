import {
    ArrowRight,
    BookOpen,
    CircleHelp,
    Clock3,
    Mail,
    MessageCircle,
    Phone,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const channels = [
    {
        title: "Hotline hỗ trợ",
        value: "0877 71 75 75",
        desc: "Ưu tiên xử lý sự cố vận hành khẩn cấp.",
        icon: <Phone size={18} />,
        href: "tel:0877717575",
        cta: "Gọi ngay",
    },
    {
        title: "Email hỗ trợ",
        value: "vinasale.platform@gmail.com",
        desc: "Phù hợp yêu cầu chi tiết cần đính kèm thông tin.",
        icon: <Mail size={18} />,
        href: "mailto:vinasale.platform@gmail.com",
        cta: "Gửi email",
    },
    {
        title: "Tư vấn sản phẩm",
        value: "Liên hệ đội ngũ CS",
        desc: "Tư vấn gói giải pháp theo quy mô doanh nghiệp.",
        icon: <MessageCircle size={18} />,
        href: "/register",
        cta: "Nhận tư vấn",
    },
];

const process = [
    {
        step: "01",
        title: "Tiếp nhận yêu cầu",
        desc: "Ghi nhận thông tin sự cố và mức độ ảnh hưởng tới vận hành.",
    },
    {
        step: "02",
        title: "Phân loại & xử lý",
        desc: "Đội ngũ kỹ thuật phân tích nguyên nhân và đưa phương án.",
    },
    {
        step: "03",
        title: "Cập nhật tiến độ",
        desc: "Thông báo tình trạng xử lý theo từng giai đoạn rõ ràng.",
    },
    {
        step: "04",
        title: "Xác nhận hoàn tất",
        desc: "Đối chiếu kết quả và theo dõi ổn định sau xử lý.",
    },
];

const faqs = [
    {
        q: "Thời gian hỗ trợ của VinaSale là khi nào?",
        a: "Đội ngũ hỗ trợ làm việc từ 8:00 đến 22:00 mỗi ngày và có kênh ưu tiên cho sự cố khẩn cấp.",
    },
    {
        q: "Tôi cần chuẩn bị gì khi gửi yêu cầu hỗ trợ?",
        a: "Bạn nên cung cấp mã chi nhánh/tài khoản, mô tả lỗi, thời điểm phát sinh và ảnh chụp màn hình nếu có.",
    },
    {
        q: "Bao lâu thì nhận được phản hồi đầu tiên?",
        a: "Thông thường trong vòng 15 phút đối với hotline và dưới 2 giờ làm việc đối với email.",
    },
    {
        q: "VinaSale có tài liệu hướng dẫn sử dụng không?",
        a: "Có. Chúng tôi cung cấp tài liệu thao tác cơ bản, video hướng dẫn và hỗ trợ đào tạo onboarding.",
    },
];

const commitments = [
    "Phản hồi nhanh và đúng trọng tâm vấn đề.",
    "Theo dõi đến khi hệ thống vận hành ổn định.",
    "Bảo mật thông tin doanh nghiệp và dữ liệu người dùng.",
];

export default function SupportPage() {
    return (
        <div className="bg-white">
            <section className="mx-auto max-w-7xl px-4 pt-28 pb-14 md:pt-32">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
                        <CircleHelp size={14} />
                        Trung tâm hỗ trợ
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Hỗ trợ nhanh, đồng hành xuyên suốt quá trình vận hành
                    </h1>
                    <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                        Đội ngũ VinaSale luôn sẵn sàng tiếp nhận và xử lý yêu cầu để doanh nghiệp vận hành ổn định, liên tục
                        và hiệu quả.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {channels.map((channel) => (
                        <article key={channel.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                                {channel.icon}
                            </div>
                            <h2 className="mt-4 text-lg font-semibold text-slate-900">{channel.title}</h2>
                            <p className="mt-1 text-sm font-medium text-blue-600">{channel.value}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{channel.desc}</p>
                            <a
                                href={channel.href}
                                target={channel.href === "/register" ? "_blank" : undefined}
                                rel={channel.href === "/register" ? "noopener noreferrer" : undefined}
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                {channel.cta} <ArrowRight size={15} />
                            </a>
                        </article>
                    ))}
                </div>
            </section>

            <section className="border-y border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-14">
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Quy trình xử lý yêu cầu</h2>
                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {process.map((item) => (
                            <div key={item.step} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="text-sm font-semibold text-blue-600">Bước {item.step}</div>
                                <h3 className="mt-1 text-base font-semibold text-slate-900">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-6 lg:grid-cols-5">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-3">
                        <h2 className="text-2xl font-bold text-slate-900">Câu hỏi thường gặp</h2>
                        <div className="mt-6 space-y-4">
                            {faqs.map((faq) => (
                                <article key={faq.q} className="rounded-xl border border-slate-200 p-4">
                                    <h3 className="text-sm font-semibold text-slate-900 md:text-base">{faq.q}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
                        <h2 className="text-xl font-bold text-slate-900">Cam kết hỗ trợ</h2>
                        <div className="mt-5 space-y-3">
                            {commitments.map((item) => (
                                <div key={item} className="flex items-start gap-2.5">
                                    <ShieldCheck className="mt-0.5 text-emerald-600" size={17} />
                                    <p className="text-sm text-slate-700">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4">
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                                <Clock3 size={16} />
                                Khung giờ hỗ trợ: 8:00 - 22:00
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                                <BookOpen size={16} />
                                Có tài liệu onboarding cho doanh nghiệp mới
                            </div>
                        </div>

                        <Link
                            href="/register"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                        >
                            Bắt đầu với VinaSale <ArrowRight size={16} />
                        </Link>
                    </aside>
                </div>
            </section>
        </div>
    );
}