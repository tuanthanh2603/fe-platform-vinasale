import StoreShell from "@/components/store/store-shell";
import CafeAndTeaNav from "./_nav";

export default function CafeAndTeaLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={CafeAndTeaNav} sectorLabel="Cafe, Trà sữa">{children}</StoreShell>;
}
