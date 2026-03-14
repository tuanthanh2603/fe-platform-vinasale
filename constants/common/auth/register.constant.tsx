import {
  Store,
  Shirt,
  Smartphone,
  Sparkles,
  Hammer,
  Pill,
  UtensilsCrossed,
  Soup,
  Coffee,
  Mic,
  Wine,
  Flower,
  Scissors,
  Hotel,
  Building2,
} from "lucide-react";

export const REGISTER_BUSINESS_SECTOR_OPTIONS = [
  {
    label: "Bán buôn & Bán lẻ",
    options: [
      { value: "fashion", label: <span className="flex items-center gap-2"><Shirt size={18} /> Thời trang</span> },
      { value: "grocery", label: <span className="flex items-center gap-2"><Store size={18} /> Tạp hoá & Siêu thị</span> },
      { value: "phone", label: <span className="flex items-center gap-2"><Smartphone size={18} /> Điện thoại & máy tính</span> },
      { value: "cosmetic", label: <span className="flex items-center gap-2"><Sparkles size={18} /> Mỹ phẩm</span> },
      { value: "materials", label: <span className="flex items-center gap-2"><Hammer size={18} /> Vật liệu xây dựng</span> },
      { value: "medicine", label: <span className="flex items-center gap-2"><Pill size={18} /> Nhà thuốc</span> },
    ],
  },
  {
    label: "Ăn uống & Giải trí",
    options: [
      { value: "restaurant", label: <span className="flex items-center gap-2"><UtensilsCrossed size={18} /> Nhà hàng</span> },
      { value: "diner", label: <span className="flex items-center gap-2"><Soup size={18} /> Quán ăn</span> },
      { value: "CAFE_AND_TEA", label: <span className="flex items-center gap-2"><Coffee size={18} /> Cafe, Trà sữa</span> },
      { value: "karaoke", label: <span className="flex items-center gap-2"><Mic size={18} /> Karaoke, Bida</span> },
      { value: "bar", label: <span className="flex items-center gap-2"><Wine size={18} /> Bar, Pub & Club</span> },
    ],
  },
  {
    label: "Dịch vụ & Lưu trú",
    options: [
      { value: "spa", label: <span className="flex items-center gap-2"><Flower size={18} /> Beauty Spa & Massage</span> },
      { value: "salon", label: <span className="flex items-center gap-2"><Scissors size={18} /> Hair Salon & Nails</span> },
      { value: "hotel", label: <span className="flex items-center gap-2"><Hotel size={18} /> Khách sạn & Nhà nghỉ</span> },
      { value: "resort", label: <span className="flex items-center gap-2"><Building2 size={18} /> Homestay & Villa, Resort</span> },
    ],
  },
];
