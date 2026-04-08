import {
  Shirt,
  Smartphone,
  Hammer,
  Pill,
  Baby,
  BookOpen,
  Factory,
  Store,
  Sparkles,
  Leaf,
  Car,
  Home,
  Gift,
  UtensilsCrossed,
  Soup,
  Coffee,
  Mic,
  Circle,
  Wine,
  ShoppingBag,
  Flower,
  Scissors,
  Hotel,
  Building2,
  Dumbbell,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

// Khớp với enum BusinessSector bên BE
export const BusinessSector = {
  // Bán buôn & Bán lẻ
  COM1:  "COM1",  // Thời trang
  COM2:  "COM2",  // Điện thoại & Điện máy
  COM3:  "COM3",  // Vật liệu xây dựng
  COM4:  "COM4",  // Nhà thuốc
  COM5:  "COM5",  // Mẹ & Bé
  COM6:  "COM6",  // Sách & Văn phòng phẩm
  COM7:  "COM7",  // Sản xuất
  COM8:  "COM8",  // Tạp hóa & Siêu thị
  COM9:  "COM9",  // Mỹ phẩm
  COM10: "COM10", // Nông sản & Thực phẩm
  COM11: "COM11", // Xe & Máy móc
  COM12: "COM12", // Nội thất & Gia dụng
  COM13: "COM13", // Hoa & Quà tặng
  // Ăn uống & Giải trí
  FNB1: "FNB1",  // Nhà hàng
  FNB2: "FNB2",  // Quán ăn
  FNB3: "FNB3",  // Cafe, Trà sữa
  FNB4: "FNB4",  // Karaoke
  FNB5: "FNB5",  // Bida
  FNB6: "FNB6",  // Bar, Pub & Club
  FNB7: "FNB7",  // Căn tin, trạm dừng nghỉ
  // Dịch vụ & Lưu trú
  SEV1: "SEV1",  // Beauty Spa & Massage
  SEV2: "SEV2",  // Hair Salon & Nails
  SEV3: "SEV3",  // Khách sạn & Nhà nghỉ
  SEV4: "SEV4",  // Homestay, Villa & Resort
  SEV5: "SEV5",  // Fitness & Yoga
  SEV6: "SEV6",  // Phòng khám
} as const;

export type BusinessSector = (typeof BusinessSector)[keyof typeof BusinessSector];

export type SectorGroup = "commerce" | "fnb" | "service";

export interface SectorConfig {
  label: string;
  group: SectorGroup;
  /** Tên folder trong Next.js app router */
  route: string;
  Icon: LucideIcon;
  /** Tailwind classes cho icon card */
  color: string;
}

export const SECTOR_CONFIG: Record<BusinessSector, SectorConfig> = {
  // --- Bán buôn & Bán lẻ ---
  COM1:  { label: "Thời trang",              group: "commerce", route: "com1",       Icon: Shirt,           color: "bg-pink-50 text-pink-600" },
  COM2:  { label: "Điện thoại & Điện máy",   group: "commerce", route: "com2",         Icon: Smartphone,      color: "bg-blue-50 text-blue-600" },
  COM3:  { label: "Vật liệu xây dựng",       group: "commerce", route: "com3",     Icon: Hammer,          color: "bg-amber-50 text-amber-600" },
  COM4:  { label: "Nhà thuốc",               group: "commerce", route: "com4",      Icon: Pill,            color: "bg-red-50 text-red-600" },
  COM5:  { label: "Mẹ & Bé",                group: "commerce", route: "com5",      Icon: Baby,            color: "bg-pink-50 text-pink-500" },
  COM6:  { label: "Sách & Văn phòng phẩm",  group: "commerce", route: "com6",    Icon: BookOpen,        color: "bg-indigo-50 text-indigo-600" },
  COM7:  { label: "Sản xuất",               group: "commerce", route: "com7", Icon: Factory,         color: "bg-slate-50 text-slate-600" },
  COM8:  { label: "Tạp hóa & Siêu thị",     group: "commerce", route: "com8",       Icon: Store,           color: "bg-emerald-50 text-emerald-600" },
  COM9:  { label: "Mỹ phẩm",               group: "commerce", route: "com9",      Icon: Sparkles,        color: "bg-purple-50 text-purple-600" },
  COM10: { label: "Nông sản & Thực phẩm",   group: "commerce", route: "com10",    Icon: Leaf,            color: "bg-green-50 text-green-600" },
  COM11: { label: "Xe & Máy móc",           group: "commerce", route: "com11",       Icon: Car,             color: "bg-gray-50 text-gray-600" },
  COM12: { label: "Nội thất & Gia dụng",    group: "commerce", route: "com12",     Icon: Home,            color: "bg-orange-50 text-orange-600" },
  COM13: { label: "Hoa & Quà tặng",         group: "commerce", route: "com13",       Icon: Gift,            color: "bg-rose-50 text-rose-500" },

  // --- Ăn uống & Giải trí ---
  FNB1: { label: "Nhà hàng",               group: "fnb", route: "fnb1",   Icon: UtensilsCrossed, color: "bg-orange-50 text-orange-600" },
  FNB2: { label: "Quán ăn",                group: "fnb", route: "fnb2",        Icon: Soup,            color: "bg-yellow-50 text-yellow-600" },
  FNB3: { label: "Cafe, Trà sữa",          group: "fnb", route: "fnb3", Icon: Coffee,          color: "bg-amber-50 text-amber-700" },
  FNB4: { label: "Karaoke",                group: "fnb", route: "fnb4",      Icon: Mic,             color: "bg-violet-50 text-violet-600" },
  FNB5: { label: "Bida",                   group: "fnb", route: "fnb5",       Icon: Circle,          color: "bg-cyan-50 text-cyan-600" },
  FNB6: { label: "Bar, Pub & Club",        group: "fnb", route: "fnb6",       Icon: Wine,            color: "bg-rose-50 text-rose-600" },
  FNB7: { label: "Căn tin, Trạm dừng",    group: "fnb", route: "fnb7",       Icon: ShoppingBag,     color: "bg-teal-50 text-teal-600" },

  // --- Dịch vụ & Lưu trú ---
  SEV1: { label: "Beauty Spa & Massage",    group: "service", route: "sev1",     Icon: Flower,      color: "bg-teal-50 text-teal-600" },
  SEV2: { label: "Hair Salon & Nails",      group: "service", route: "sev2",   Icon: Scissors,    color: "bg-fuchsia-50 text-fuchsia-600" },
  SEV3: { label: "Khách sạn & Nhà nghỉ",   group: "service", route: "sev3",   Icon: Hotel,       color: "bg-sky-50 text-sky-600" },
  SEV4: { label: "Homestay, Villa & Resort",group: "service", route: "sev4",  Icon: Building2,   color: "bg-indigo-50 text-indigo-600" },
  SEV5: { label: "Fitness & Yoga",          group: "service", route: "sev5", Icon: Dumbbell,    color: "bg-lime-50 text-lime-600" },
  SEV6: { label: "Phòng khám",             group: "service", route: "sev6",  Icon: Stethoscope, color: "bg-blue-50 text-blue-600" },
};

/** Lấy config theo sector code, fallback an toàn nếu không tìm thấy */
export function getSectorConfig(code?: string): SectorConfig {
  if (!code) {
    return {
      label: "Unknown",
      group: "commerce",
      route: "unknown",
      Icon: Store,
      color: "bg-gray-50 text-gray-600",
    };
  }

  return (
    SECTOR_CONFIG[code as BusinessSector] ?? {
      label: code,
      group: "commerce",
      route: code.toLowerCase(),
      Icon: Store,
      color: "bg-gray-50 text-gray-600",
    }
  );
}

/** Lấy route folder từ sector code (COM1 → "fashion") */
export function getSectorRoute(code: string): string {
  return getSectorConfig(code).route;
}

// ---------------------------------------------------------------------------
// Options dùng cho select / dropdown (vd: form đăng ký)
// ---------------------------------------------------------------------------

export interface SectorOption {
  value: BusinessSector;
  label: string;
  Icon: LucideIcon;
}

export interface SectorGroup_ {
  group: string;
  options: SectorOption[];
}

export const SECTOR_OPTIONS_BY_GROUP: SectorGroup_[] = [
  {
    group: "Bán buôn & Bán lẻ",
    options: (
      ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", "COM10", "COM11", "COM12", "COM13"] as BusinessSector[]
    ).map((code) => ({ value: code, label: SECTOR_CONFIG[code].label, Icon: SECTOR_CONFIG[code].Icon })),
  },
  {
    group: "Ăn uống & Giải trí",
    options: (
      ["FNB1", "FNB2", "FNB3", "FNB4", "FNB5", "FNB6", "FNB7"] as BusinessSector[]
    ).map((code) => ({ value: code, label: SECTOR_CONFIG[code].label, Icon: SECTOR_CONFIG[code].Icon })),
  },
  {
    group: "Dịch vụ & Lưu trú",
    options: (
      ["SEV1", "SEV2", "SEV3", "SEV4", "SEV5", "SEV6"] as BusinessSector[]
    ).map((code) => ({ value: code, label: SECTOR_CONFIG[code].label, Icon: SECTOR_CONFIG[code].Icon })),
  },
];
