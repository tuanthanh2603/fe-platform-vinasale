import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  summary: string;
  tags: string[];
};

const jobs: Job[] = [
  {
    id: "fe-001",
    title: "Frontend Engineer (React/Next.js)",
    location: "Hồ Chí Minh",
    type: "Hybrid",
    level: "Middle",
    salary: "30–50M",
    summary: "Phát triển giao diện sản phẩm, tối ưu performance và trải nghiệm người dùng.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "be-001",
    title: "Backend Engineer (Node.js/NestJS)",
    location: "Hà Nội",
    type: "Onsite",
    level: "Senior",
    salary: "45–80M",
    summary: "Thiết kế API và kiến trúc dịch vụ ổn định, mở rộng tốt theo tăng trưởng.",
    tags: ["Node.js", "NestJS", "PostgreSQL"],
  },
  {
    id: "pm-001",
    title: "Product Manager",
    location: "Remote",
    type: "Remote",
    level: "Middle",
    salary: "30–60M",
    summary: "Dẫn dắt roadmap, phối hợp đa phòng ban và tối ưu hiệu quả sản phẩm.",
    tags: ["Roadmap", "Analytics", "Stakeholder"],
  },
  {
    id: "qa-001",
    title: "QA Engineer (Manual/Automation)",
    location: "Hồ Chí Minh",
    type: "Hybrid",
    level: "Junior",
    salary: "15–25M",
    summary: "Đảm bảo chất lượng sản phẩm qua test plan, manual test và automation.",
    tags: ["QA", "Playwright", "API Testing"],
  },
];

const benefits = [
  "Review lương định kỳ và thưởng theo hiệu suất.",
  "Linh hoạt mô hình làm việc Hybrid/Remote theo vị trí.",
  "Thiết bị làm việc đầy đủ, môi trường chủ động và cởi mở.",
  "Ngân sách học tập, workshop nội bộ và mentoring 1-1.",
  "Bảo hiểm, nghỉ phép và hoạt động gắn kết đội ngũ.",
];

const process = [
  {
    step: "01",
    title: "Nộp hồ sơ",
    desc: "Gửi CV/Portfolio qua email hoặc form đăng ký.",
  },
  {
    step: "02",
    title: "Sàng lọc",
    desc: "HR trao đổi nhanh về kỳ vọng và mức độ phù hợp.",
  },
  {
    step: "03",
    title: "Phỏng vấn chuyên môn",
    desc: "Trao đổi theo role, có thể kèm bài tập/case study.",
  },
  {
    step: "04",
    title: "Offer",
    desc: "Thống nhất đề nghị và kế hoạch onboard 30-60-90.",
  },
];

const faqs = [
  {
    q: "Quy trình tuyển dụng mất bao lâu?",
    a: "Thông thường 5–10 ngày làm việc tùy vị trí và lịch phỏng vấn.",
  },
  {
    q: "VinaSale có nhận thực tập/part-time không?",
    a: "Có theo từng thời điểm. Bạn có thể gửi hồ sơ để HR phản hồi khi phù hợp.",
  },
  {
    q: "Có hỗ trợ làm việc remote không?",
    a: "Một số vị trí hỗ trợ remote hoặc hybrid, thông tin sẽ được mô tả trong JD.",
  },
];

export default function RecruitmentPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pt-28 pb-14 md:pt-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
            <Building2 size={14} />
            Tuyển dụng VinaSale
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Cùng xây dựng nền tảng giúp doanh nghiệp vận hành tốt hơn
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Chúng tôi tìm kiếm những thành viên yêu sản phẩm, chủ động và sẵn sàng đồng hành lâu dài trong
            hành trình phát triển của VinaSale.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
            <Briefcase size={15} /> {jobs.length} vị trí đang mở
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
            <Clock3 size={15} /> Phản hồi hồ sơ nhanh
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
            <CalendarDays size={15} /> Onboarding rõ ràng
          </span>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Vị trí đang tuyển</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={15} /> {job.location}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">{job.type}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">{job.level}</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {job.salary}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{job.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/support"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Ứng tuyển vị trí này <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-3">
            <h2 className="text-2xl font-bold text-slate-900">Vì sao chọn VinaSale?</h2>
            <div className="mt-5 space-y-3">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 text-emerald-600" size={17} />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">Quy trình ứng tuyển</h2>
            <div className="mt-5 space-y-4">
              {process.map((item) => (
                <div key={item.step}>
                  <div className="text-xs font-semibold text-blue-600">Bước {item.step}</div>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Gửi hồ sơ ngay <ArrowRight size={16} />
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-600"
            >
              Liên hệ HR
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
