import StoreShell from "@/components/store/store-shell";
import SalonNav from "./_nav";

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={SalonNav} sectorLabel="Hair Salon & Nails">{children}</StoreShell>;
}
