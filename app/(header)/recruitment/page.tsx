"use client";

import React, { JSX, useMemo, useState } from "react";
import type { FormInstance } from "antd/es/form";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space,
  Steps,
  Tag,
  Typography,
  message,
} from "antd";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Clock3,
  Layers,
  Send,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;

/** ============ Types ============ */
type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  workType: string;
  level: string;
  salary: string;
  tags: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

type ApplyForm = {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolio?: string;
  message?: string;
  consent: boolean;
};

/** ============ Data ============ */
const JOBS: Job[] = [
  {
    id: "fe-001",
    title: "Frontend Engineer (React/Next.js)",
    team: "Engineering",
    location: "Hồ Chí Minh",
    workType: "Hybrid",
    level: "Middle",
    salary: "30–50M",
    tags: ["React", "Next.js", "TypeScript"],
    summary: "Xây dựng giao diện sản phẩm, tối ưu hiệu năng và trải nghiệm người dùng.",
    responsibilities: [
      "Phát triển UI/UX theo design system, đảm bảo responsive & accessibility.",
      "Tối ưu performance (Core Web Vitals), SSR/ISR, bundle size.",
      "Phối hợp với BE/PM/Design để ship tính năng đúng tiến độ.",
      "Viết unit test/component test khi cần (Jest/RTL).",
    ],
    requirements: [
      "2+ năm kinh nghiệm React; có kinh nghiệm Next.js là lợi thế lớn.",
      "Nắm vững HTML/CSS, responsive, layout (flex/grid), Tailwind là lợi thế.",
      "Hiểu về state management và data fetching.",
      "Tư duy sản phẩm, giao tiếp tốt.",
    ],
    niceToHave: ["TypeScript, Storybook, Playwright/Cypress.", "Hiểu CI/CD, monitoring, analytics."],
  },
  {
    id: "be-001",
    title: "Backend Engineer (Node.js/NestJS)",
    team: "Engineering",
    location: "Hà Nội",
    workType: "Onsite",
    level: "Senior",
    salary: "45–80M",
    tags: ["Node.js", "NestJS", "PostgreSQL"],
    summary: "Thiết kế API, kiến trúc hệ thống, tối ưu hiệu năng và độ ổn định.",
    responsibilities: [
      "Thiết kế & phát triển REST/GraphQL API, đảm bảo bảo mật và hiệu năng.",
      "Thiết kế database schema, tối ưu query và caching.",
      "Xây dựng kiến trúc services, logging/monitoring.",
      "Review code, mentoring team.",
    ],
    requirements: [
      "4+ năm kinh nghiệm backend, vững Node.js/NestJS hoặc tương đương.",
      "Hiểu sâu database (PostgreSQL/MySQL), indexing, transactions.",
      "Có kinh nghiệm thiết kế hệ thống, scaling, caching (Redis).",
      "Có tư duy ownership, chịu trách nhiệm đến cùng.",
    ],
    niceToHave: ["Kinh nghiệm cloud (AWS/GCP), Docker/K8s.", "Event-driven (Kafka/RabbitMQ)."],
  },
  {
    id: "pm-001",
    title: "Product Manager",
    team: "Product",
    location: "Remote",
    workType: "Remote",
    level: "Middle",
    salary: "30–60M",
    tags: ["Product", "Roadmap", "Analytics"],
    summary: "Dẫn dắt roadmap, phối hợp đa phòng ban để tăng trưởng sản phẩm.",
    responsibilities: [
      "Xây dựng roadmap theo OKRs, phân tích nhu cầu khách hàng.",
      "Viết PRD, user stories, phối hợp team để ship nhanh và đúng.",
      "Theo dõi metrics, làm A/B test, cải tiến liên tục.",
    ],
    requirements: [
      "2+ năm làm PM/PO; hiểu agile/scrum.",
      "Tư duy dữ liệu, dùng analytics để ra quyết định.",
      "Giao tiếp tốt, quản lý stakeholder.",
    ],
    niceToHave: ["Kinh nghiệm SaaS/B2B.", "Biết SQL cơ bản."],
  },
  {
    id: "qa-001",
    title: "QA Engineer (Manual/Automation)",
    team: "Engineering",
    location: "Hồ Chí Minh",
    workType: "Hybrid",
    level: "Junior",
    salary: "15–25M",
    tags: ["QA", "Automation", "Playwright"],
    summary: "Đảm bảo chất lượng sản phẩm qua test plan, test case và automation.",
    responsibilities: [
      "Viết test plan/test case, thực hiện manual test.",
      "Tạo/duy trì automation test cho các luồng quan trọng.",
      "Phối hợp dev để reproduce, verify bugfix.",
    ],
    requirements: [
      "0.5–2 năm kinh nghiệm QA; cẩn thận, tỉ mỉ.",
      "Hiểu SDLC, biết viết testcase tốt.",
      "Có thể học automation nhanh.",
    ],
    niceToHave: ["Playwright/Cypress", "API testing (Postman)", "CI (GitHub Actions)"],
  },
];

const BENEFITS = [
  { title: "Lương thưởng cạnh tranh", desc: "Review 2 lần/năm, thưởng hiệu suất theo OKRs." },
  { title: "Linh hoạt làm việc", desc: "Hybrid/Remote tùy vị trí, giờ giấc linh hoạt." },
  { title: "Thiết bị làm việc", desc: "MacBook/PC cấu hình tốt, hỗ trợ phụ kiện." },
  { title: "Học tập & phát triển", desc: "Ngân sách học tập, workshop nội bộ, mentoring." },
  { title: "Chăm sóc sức khỏe", desc: "Bảo hiểm, khám sức khỏe định kỳ, nghỉ phép." },
  { title: "Văn hóa cởi mở", desc: "Tôn trọng, phản hồi thẳng thắn, ít họp, ship nhanh." },
] as const;

const PROCESS = [
  { title: "Nộp hồ sơ", desc: "CV/Portfolio → hệ thống ghi nhận và phản hồi." },
  { title: "Sàng lọc", desc: "HR trao đổi nhanh về kỳ vọng & phù hợp." },
  { title: "Phỏng vấn chuyên môn", desc: "Trao đổi kỹ thuật / case study theo vị trí." },
  { title: "Phỏng vấn văn hóa", desc: "Alignment về cách làm việc, giá trị, ownership." },
  { title: "Offer", desc: "Thỏa thuận lương, ngày onboard, kế hoạch 30-60-90." },
] as const;

const FAQS = [
  { q: "Quy trình tuyển dụng mất bao lâu?", a: "Thông thường 5–10 ngày làm việc tùy vị trí và lịch phỏng vấn." },
  { q: "Có nhận thực tập/part-time không?", a: "Có, tùy thời điểm. Bạn cứ nộp hồ sơ, HR sẽ phản hồi nếu phù hợp." },
  { q: "Remote hoàn toàn được không?", a: "Một số vị trí hỗ trợ Remote. Bạn xem rõ trong tin tuyển dụng." },
  { q: "Có yêu cầu tiếng Anh không?", a: "Không bắt buộc cho mọi vị trí, nhưng là lợi thế cho team/role cần đọc tài liệu." },
] as const;

/** ============ Validators ============ */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** ============ Page ============ */
export default function Recruitment(): JSX.Element {
  // filters
  const [query, setQuery] = useState<string>("");
  const [team, setTeam] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");
  const [workType, setWorkType] = useState<string>("All");
  const [level, setLevel] = useState<string>("All");

  // job detail
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);

  // apply
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [applyOpen, setApplyOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm<ApplyForm>();

  const teams = useMemo(() => ["All", ...Array.from(new Set(JOBS.map((j) => j.team)))], []);
  const locations = useMemo(() => ["All", ...Array.from(new Set(JOBS.map((j) => j.location)))], []);
  const workTypes = useMemo(() => ["All", ...Array.from(new Set(JOBS.map((j) => j.workType)))], []);
  const levels = useMemo(() => ["All", ...Array.from(new Set(JOBS.map((j) => j.level)))], []);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((j) => {
      const matchQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.summary.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q));

      const matchTeam = team === "All" || j.team === team;
      const matchLoc = location === "All" || j.location === location;
      const matchWork = workType === "All" || j.workType === workType;
      const matchLevel = level === "All" || j.level === level;

      return matchQ && matchTeam && matchLoc && matchWork && matchLevel;
    });
  }, [query, team, location, workType, level]);

  const openJobDetail = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  const openApply = (job: Job) => {
    setApplyJob(job);
    setApplyOpen(true);
    form.resetFields();
    form.setFieldsValue({ consent: true });
  };

  const closeApply = () => {
    setApplyOpen(false);
    setSubmitting(false);
  };

  const resetFilters = () => {
    setQuery("");
    setTeam("All");
    setLocation("All");
    setWorkType("All");
    setLevel("All");
  };

  const submitApplication = async (f: FormInstance<ApplyForm>) => {
    try {
      const values = await f.validateFields();
      setSubmitting(true);

      // TODO: call API
      await new Promise((r) => setTimeout(r, 700));

      message.success("Gửi ứng tuyển thành công! HR sẽ liên hệ bạn sớm.");
      setSubmitting(false);
      setApplyOpen(false);

      // optional: close job modal if opened
      setJobModalOpen(false);
    } catch {
      // AntD will show field errors
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 16px 24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={14}>
            <Card bordered style={{ borderRadius: 16 }}>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Tag color="geekblue" style={{ borderRadius: 999, padding: "2px 10px" }}>
                  Đang tuyển nhiều vị trí
                </Tag>

                <Title level={2} style={{ margin: 0 }}>
                  Xây sản phẩm tốt hơn, <span style={{ color: "#64748B" }}>cùng đội ngũ giỏi.</span>
                </Title>

                <Paragraph style={{ margin: 0, color: "#475569" }}>
                  Chúng tôi xây dựng sản phẩm công nghệ giúp doanh nghiệp tăng trưởng. Môi trường cởi mở,
                  ownership cao, làm nhanh và học nhiều.
                </Paragraph>

                <Space wrap>
                  <Button type="primary" href="#jobs" icon={<Briefcase size={16} />}>
                    Xem vị trí đang tuyển
                  </Button>
                  <Button href="#culture" icon={<Layers size={16} />}>
                    Tìm hiểu văn hóa
                  </Button>
                </Space>

                <Space wrap>
                  <Tag>Hybrid/Remote</Tag>
                  <Tag>Review 2 lần/năm</Tag>
                  <Tag>Budget học tập</Tag>
                  <Tag>Thiết bị xịn</Tag>
                </Space>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={10}>
            <Card bordered style={{ borderRadius: 16 }}>
              <Space direction="vertical" style={{ width: "100%" }} size={12}>
                <Title level={5} style={{ margin: 0 }}>
                  Tóm tắt nhanh
                </Title>

                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Card size="small" bordered>
                      <Text type="secondary">Vị trí đang mở</Text>
                      <div style={{ fontSize: 24, fontWeight: 700 }}>{JOBS.length}</div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small" bordered>
                      <Text type="secondary">Quy trình</Text>
                      <div style={{ fontSize: 24, fontWeight: 700 }}>5 bước</div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small" bordered>
                      <Text type="secondary">Môi trường</Text>
                      <div style={{ fontWeight: 700 }}>Ownership cao</div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small" bordered>
                      <Text type="secondary">Đội ngũ</Text>
                      <div style={{ fontWeight: 700 }}>Tech-driven</div>
                    </Card>
                  </Col>
                </Row>

                <Divider style={{ margin: "8px 0" }} />

                <Text strong>Ứng tuyển nhanh</Text>
                <Text type="secondary">Chọn 1 vị trí bên dưới để mở form ứng tuyển.</Text>

                <Space wrap>
                  {JOBS.slice(0, 3).map((j) => (
                    <Button key={j.id} onClick={() => openApply(j)} icon={<Send size={16} />}>
                      {j.title}
                    </Button>
                  ))}
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Culture */}
      <div id="culture" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 24px" }}>
        <Card bordered style={{ borderRadius: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Title level={4} style={{ marginTop: 0 }}>
                Văn hóa làm việc
              </Title>
              <Text type="secondary">Tập trung hiệu quả, minh bạch và cải tiến liên tục.</Text>
            </Col>
            <Col xs={24} md={16}>
              <Row gutter={[12, 12]}>
                {[
                  { t: "Ownership", d: "Bạn làm chủ công việc, quyết định dựa trên dữ liệu." },
                  { t: "Ship nhanh", d: "Ưu tiên ra sản phẩm sớm, đo lường và cải tiến." },
                  { t: "Feedback thẳng", d: "Phản hồi rõ ràng, tôn trọng và cùng tiến bộ." },
                  { t: "Học liên tục", d: "Chia sẻ nội bộ, ngân sách học tập, mentoring." },
                ].map((x) => (
                  <Col xs={24} md={12} key={x.t}>
                    <Card size="small" bordered style={{ borderRadius: 12 }}>
                      <Text strong>{x.t}</Text>
                      <div style={{ marginTop: 6 }}>
                        <Text type="secondary">{x.d}</Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Benefits */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 24px" }}>
        <Title level={4} style={{ marginBottom: 6 }}>
          Phúc lợi
        </Title>
        <Text type="secondary">Những thứ bạn sẽ nhận được khi gia nhập.</Text>

        <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
          {BENEFITS.map((b) => (
            <Col xs={24} md={8} key={b.title}>
              <Card bordered style={{ borderRadius: 16 }}>
                <Text strong>{b.title}</Text>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">{b.desc}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Jobs */}
      <div id="jobs" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 24px" }}>
        <Row align="bottom" justify="space-between" gutter={[16, 16]}>
          <Col>
            <Title level={4} style={{ marginBottom: 6 }}>
              Vị trí đang tuyển
            </Title>
            <Text type="secondary">
              Tìm vị trí phù hợp. Bạn có thể lọc theo team, địa điểm, hình thức làm việc.
            </Text>
          </Col>
          <Col>
            <Text type="secondary">
              Kết quả: <Text strong>{filteredJobs.length}</Text> vị trí
            </Text>
          </Col>
        </Row>

        <Card bordered style={{ borderRadius: 16, marginTop: 12 }}>
          <Row gutter={[12, 12]}>
            <Col xs={24} md={10}>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="VD: React, Backend, PM..."
                prefix={<Search size={16} />}
                allowClear
              />
            </Col>

            <Col xs={12} md={4}>
              <Select value={team} onChange={setTeam} options={teams.map((x) => ({ value: x, label: x }))} style={{ width: "100%" }} />
            </Col>

            <Col xs={12} md={4}>
              <Select value={location} onChange={setLocation} options={locations.map((x) => ({ value: x, label: x }))} style={{ width: "100%" }} />
            </Col>

            <Col xs={12} md={3}>
              <Select value={workType} onChange={setWorkType} options={workTypes.map((x) => ({ value: x, label: x }))} style={{ width: "100%" }} />
            </Col>

            <Col xs={12} md={3}>
              <Select value={level} onChange={setLevel} options={levels.map((x) => ({ value: x, label: x }))} style={{ width: "100%" }} />
            </Col>

            <Col xs={24}>
              <Button onClick={resetFilters} icon={<Layers size={16} />}>
                Đặt lại bộ lọc
              </Button>
            </Col>
          </Row>

          <Divider />

          <List
            dataSource={filteredJobs}
            locale={{ emptyText: "Không tìm thấy vị trí phù hợp." }}
            renderItem={(job) => (
              <List.Item
                style={{ padding: 16 }}
                actions={[
                  <Button key="detail" onClick={() => openJobDetail(job)}>
                    Xem chi tiết
                  </Button>,
                  <Button key="apply" type="primary" onClick={() => openApply(job)} icon={<Send size={16} />}>
                    Ứng tuyển
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={<Text strong style={{ fontSize: 16 }}>{job.title}</Text>}
                  description={
                    <Space direction="vertical" size={8} style={{ width: "100%" }}>
                      <Space wrap>
                        <Tag icon={<Building2 size={14} />} color="blue">{job.team}</Tag>
                        <Tag icon={<MapPin size={14} />} color="geekblue">{job.location}</Tag>
                        <Tag icon={<Clock3 size={14} />} color="purple">{job.workType}</Tag>
                        <Tag color="gold">{job.level}</Tag>
                        <Tag color="green">Lương: {job.salary}</Tag>
                      </Space>
                      <Text type="secondary">{job.summary}</Text>
                      <Space wrap size={6}>
                        {job.tags.map((t) => (
                          <Tag key={t} style={{ marginInlineEnd: 0 }}>#{t}</Tag>
                        ))}
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* Process */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 24px" }}>
        <Title level={4} style={{ marginBottom: 6 }}>
          Quy trình tuyển dụng
        </Title>
        <Text type="secondary">Minh bạch, nhanh gọn, tôn trọng thời gian của bạn.</Text>

        <Card bordered style={{ borderRadius: 16, marginTop: 12 }}>
          <Steps
            items={PROCESS.map((p) => ({
              title: p.title,
              description: p.desc,
            }))}
          />
        </Card>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 40px" }}>
        <Title level={4}>Câu hỏi thường gặp</Title>

        <Card bordered style={{ borderRadius: 16 }}>
          <Collapse
            items={FAQS.map((f) => ({
              key: f.q,
              label: f.q,
              children: <Text type="secondary">{f.a}</Text>,
            }))}
          />
        </Card>
      </div>

      {/* Job detail Modal */}
      <Modal
        title={selectedJob?.title ?? "Chi tiết vị trí"}
        open={jobModalOpen}
        onCancel={() => setJobModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setJobModalOpen(false)}>
            Đóng
          </Button>,
          selectedJob ? (
            <Button
              key="apply"
              type="primary"
              icon={<Send size={16} />}
              onClick={() => {
                setJobModalOpen(false);
                openApply(selectedJob);
              }}
            >
              Ứng tuyển vị trí này
            </Button>
          ) : null,
        ]}
      >
        {selectedJob ? (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Space wrap>
              <Tag color="blue">{selectedJob.team}</Tag>
              <Tag color="geekblue">{selectedJob.location}</Tag>
              <Tag color="purple">{selectedJob.workType}</Tag>
              <Tag color="gold">{selectedJob.level}</Tag>
              <Tag color="green">Lương: {selectedJob.salary}</Tag>
            </Space>

            <div>
              <Text strong>Mô tả</Text>
              <Paragraph style={{ marginTop: 8 }}>{selectedJob.summary}</Paragraph>
            </div>

            <div>
              <Text strong>Trách nhiệm</Text>
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {selectedJob.responsibilities.map((x, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <Text>{x}</Text>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Text strong>Yêu cầu</Text>
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {selectedJob.requirements.map((x, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <Text>{x}</Text>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Text strong>Điểm cộng</Text>
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {selectedJob.niceToHave.map((x, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <Text>{x}</Text>
                  </li>
                ))}
              </ul>
            </div>
          </Space>
        ) : null}
      </Modal>

      {/* Apply Modal (AntD Form) */}
      <Modal
        title={`Ứng tuyển: ${applyJob?.title ?? ""}`}
        open={applyOpen}
        onCancel={closeApply}
        okText="Gửi ứng tuyển"
        cancelText="Hủy"
        confirmLoading={submitting}
        onOk={() => submitApplication(form)}
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Card size="small">
            <Text>
              Hãy điền thông tin chính xác để HR liên hệ nhanh. Portfolio/LinkedIn (nếu có) giúp tăng tỉ lệ được gọi phỏng vấn.
            </Text>
          </Card>

          <Form<ApplyForm>
            form={form}
            layout="vertical"
            initialValues={{ consent: true }}
            requiredMark="optional"
          >
            <Row gutter={12}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ và tên." }]}
                >
                  <Input placeholder="Nguyễn Văn A" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email." },
                    {
                      validator: (_, v) =>
                        !v || emailRegex.test(String(v).trim())
                          ? Promise.resolve()
                          : Promise.reject(new Error("Email không hợp lệ.")),
                    },
                  ]}
                >
                  <Input placeholder="you@email.com" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại." },
                    {
                      validator: (_, v) => {
                        const ok = String(v ?? "").trim().length >= 8;
                        return ok ? Promise.resolve() : Promise.reject(new Error("SĐT chưa hợp lệ."));
                      },
                    },
                  ]}
                >
                  <Input placeholder="09xx xxx xxx" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="LinkedIn" name="linkedin">
                  <Input placeholder="https://linkedin.com/in/..." />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Portfolio/GitHub" name="portfolio">
                  <Input placeholder="https://github.com/..." />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Tin nhắn" name="message">
                  <Input.TextArea rows={4} placeholder="Giới thiệu ngắn về bản thân hoặc link CV..." />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name="consent"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, v) =>
                        v ? Promise.resolve() : Promise.reject(new Error("Vui lòng đồng ý xử lý dữ liệu.")),
                    },
                  ]}
                >
                  <Checkbox>
                    Tôi đồng ý cho phép công ty xử lý dữ liệu ứng tuyển để phục vụ tuyển dụng.
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Space>
      </Modal>
    </div>
  );
}