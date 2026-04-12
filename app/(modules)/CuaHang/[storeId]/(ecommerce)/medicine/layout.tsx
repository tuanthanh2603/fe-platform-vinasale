import StoreShell from "@/components/store/store-shell";
import MedicineNav from "./_nav";

export default function MedicineLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={MedicineNav} sectorLabel="Nhà thuốc">{children}</StoreShell>;
}
