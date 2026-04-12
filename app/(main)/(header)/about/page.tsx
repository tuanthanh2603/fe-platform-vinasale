import {
    ArrowRight,
    Building2,
    CircleCheck,
    Compass,
    Lightbulb,
    ShieldCheck,
    Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Khách hàng đang đồng hành", value: "120+" },
    { label: "Ngành hàng đang phục vụ", value: "8+" },
    { label: "Tỷ lệ hài lòng hỗ trợ", value: "96%" },
    { label: "Thời gian phản hồi", value: "< 15 phút" },
];

const values = [
    {
        title: "Lấy khách hàng làm trung tâm",
        desc: "Mọi tính năng đều bắt đầu từ bài toán thực tế của doanh nghiệp.",
        icon: <Users size={18} />,
    },
    {
        title: "Đơn giản để vận hành",
        desc: "Thiết kế dễ dùng để đội ngũ triển khai nhanh và giảm sai sót.",
        icon: <Compass size={18} />,
    },
    {
        title: "Tin cậy & minh bạch",
        desc: "Bảo mật dữ liệu, phân quyền rõ ràng và theo dõi lịch sử thao tác đầy đủ.",
        icon: <ShieldCheck size={18} />,
    },
    {
        title: "Liên tục cải tiến",
        desc: "Tối ưu sản phẩm định kỳ theo phản hồi người dùng và số liệu vận hành.",
        icon: <Lightbulb size={18} />,
    },
];

const milestones = [
    {
        year: "2025",
        title: "Khởi tạo nền tảng",
        desc: "VinaSale bắt đầu hoạt động với định hướng xây dựng nền tảng quản lý cho doanh nghiệp vừa và nhỏ.",
    },
    {
        year: "2025",
        title: "Ra mắt phiên bản đầu tiên",
        desc: "Phát hành phiên bản sản phẩm đầu tiên, tập trung giải quyết các nhu cầu vận hành cốt lõi.",
    },
    {
        year: "2026",
        title: "Mở rộng nhóm khách hàng sớm",
        desc: "Đồng hành cùng các khách hàng đầu tiên và liên tục cải tiến sản phẩm theo phản hồi thực tế.",
    },
    {
        year: "2026",
        title: "Tăng tốc giai đoạn startup",
        desc: "Tiếp tục hoàn thiện sản phẩm, mở rộng năng lực đội ngũ và chuẩn bị cho giai đoạn tăng trưởng kế tiếp.",
    },
];

const commitments = [
    "Tư vấn triển khai phù hợp quy mô kinh doanh.",
    "Onboarding rõ ràng, tài liệu dễ tiếp cận.",
    "Đồng hành vận hành và tối ưu liên tục.",
    "Hỗ trợ nhanh qua nhiều kênh.",
];

export default function AboutPage() {
    return (
        <div className="bg-white">
            <section className="mx-auto max-w-7xl px-4 pt-28 pb-14 md:pt-32">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
                        <Building2 size={14} />
                        Về VinaSale
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Startup công nghệ đồng hành cùng doanh nghiệp trong vận hành và tăng trưởng.
                    </h1>
                    <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                        VinaSale chính thức hoạt động từ năm 2025 và hiện đang trong giai đoạn startup. Chúng tôi
                        xây dựng giải pháp quản lý bán hàng đa kênh giúp doanh nghiệp chuẩn hoá vận hành, kiểm soát
                        dữ liệu tập trung và ra quyết định nhanh hơn bằng báo cáo realtime.
                    </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="text-2xl font-extrabold text-slate-900">{item.value}</div>
                            <div className="mt-1 text-sm text-slate-600">{item.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-14">
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Giá trị cốt lõi</h2>
                    <p className="mt-2 max-w-3xl text-slate-600">
                        Những nguyên tắc định hướng cách đội ngũ xây dựng sản phẩm và hỗ trợ khách hàng mỗi ngày.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {values.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14">
                <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Hành trình phát triển</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {milestones.map((item) => (
                        <div key={item.year} className="rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="text-sm font-semibold text-blue-600">{item.year}</div>
                            <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-14">
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Cam kết của chúng tôi</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {commitments.map((item) => (
                            <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-4">
                                <CircleCheck className="mt-0.5 text-emerald-600" size={18} />
                                <span className="text-sm text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/register"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                        >
                            Bắt đầu với VinaSale <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/support"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-600"
                        >
                            Liên hệ hỗ trợ
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}