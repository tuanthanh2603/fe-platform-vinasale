import StoreShell from "@/components/store/store-shell";
import HotelNav from "./_nav";

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={HotelNav} sectorLabel="Khách sạn & Nhà nghỉ">{children}</StoreShell>;
}
