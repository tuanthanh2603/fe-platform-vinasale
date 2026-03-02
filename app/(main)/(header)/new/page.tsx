import { ArrowRight, CalendarDays, Clock3, Newspaper, Tag } from "lucide-react";
import Link from "next/link";

const featured = {
    title: "VinaSale ra mắt bộ chỉ số vận hành realtime cho doanh nghiệp đa chi nhánh",
    excerpt:
        "Bản cập nhật mới giúp theo dõi doanh thu, tồn kho, hiệu suất bán hàng và cảnh báo bất thường theo thời gian thực trên một dashboard tập trung.",
    date: "01/03/2026",
    readTime: "5 phút đọc",
    category: "Sản phẩm",
};

const articles = [
    {
        title: "5 bước chuẩn hoá quy trình bán hàng cho cửa hàng mới mở",
        excerpt: "Hướng dẫn xây quy trình từ nhập hàng, định giá đến kiểm soát tồn kho và doanh thu mỗi ca.",
        date: "26/02/2026",
        readTime: "4 phút đọc",
        category: "Kinh nghiệm",
    },
    {
        title: "Tối ưu tồn kho theo mùa: giảm hàng chậm luân chuyển",
        excerpt: "Cách phân nhóm sản phẩm, đặt ngưỡng tồn tối ưu và dự báo nhập hàng theo dữ liệu lịch sử.",
        date: "20/02/2026",
        readTime: "6 phút đọc",
        category: "Vận hành",
    },
    {
        title: "Checklist triển khai phần mềm quản lý cho chuỗi 3-10 chi nhánh",
        excerpt: "Danh sách công việc quan trọng để đảm bảo triển khai nhanh, đúng quy trình và ít gián đoạn.",
        date: "15/02/2026",
        readTime: "7 phút đọc",
        category: "Hướng dẫn",
    },
    {
        title: "3 chỉ số quản trị cần theo dõi mỗi ngày với nhà quản lý",
        excerpt: "Tập trung vào doanh thu thuần, biên lợi nhuận và tốc độ quay vòng hàng để ra quyết định kịp thời.",
        date: "08/02/2026",
        readTime: "3 phút đọc",
        category: "Phân tích",
    },
    {
        title: "Tự động hoá báo cáo cuối ngày: giảm 80% thao tác thủ công",
        excerpt: "Thiết lập mẫu báo cáo chuẩn để chủ doanh nghiệp nắm tình hình từ xa theo thời gian thực.",
        date: "02/02/2026",
        readTime: "5 phút đọc",
        category: "Sản phẩm",
    },
    {
        title: "Xu hướng quản lý bán hàng 2026 cho SME Việt Nam",
        excerpt: "Các xu hướng chính: dữ liệu realtime, omnichannel, AI hỗ trợ quyết định và tự động hoá quy trình.",
        date: "28/01/2026",
        readTime: "6 phút đọc",
        category: "Xu hướng",
    },
];

export default function NewPage() {
    return (
        <div className="bg-white">
            <section className="mx-auto max-w-7xl px-4 pt-28 pb-14 md:pt-32">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
                        <Newspaper size={14} />
                        Tin tức & cập nhật
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Cập nhật mới nhất từ VinaSale
                    </h1>
                    <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                        Tổng hợp thông tin sản phẩm, kinh nghiệm vận hành và xu hướng quản lý bán hàng để doanh nghiệp
                        tăng tốc phát triển.
                    </p>
                </div>

                <article className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 md:p-8">
                    <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                        Bài viết nổi bật
                    </div>
                    <h2 className="mt-4 text-2xl font-bold leading-snug text-slate-900 md:text-3xl">{featured.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 md:text-base">{featured.excerpt}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={16} />
                            {featured.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={16} />
                            {featured.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Tag size={16} />
                            {featured.category}
                        </span>
                    </div>

                    <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                        Đọc chi tiết <ArrowRight size={16} />
                    </button>
                </article>
            </section>

            <section className="border-t border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-14">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Bài viết gần đây</h2>
                        <span className="text-sm text-slate-500">{articles.length} bài viết</span>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {articles.map((article) => (
                            <article key={article.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                    {article.category}
                                </div>
                                <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900">{article.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>

                                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarDays size={14} />
                                        {article.date}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Clock3 size={14} />
                                        {article.readTime}
                                    </span>
                                </div>

                                <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                                    Xem bài viết <ArrowRight size={15} />
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Muốn nhận cập nhật mới từ VinaSale?</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                        Theo dõi các bài viết về vận hành, tối ưu doanh thu và các tính năng mới giúp doanh nghiệp quản lý
                        hiệu quả hơn mỗi ngày.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            href="/register"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                        >
                            Dùng thử miễn phí <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/support"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-600"
                        >
                            Liên hệ tư vấn
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}