import StoreShell from "@/components/store/store-shell";
import MaterialsNav from "./_nav";

export default function MaterialsLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={MaterialsNav} sectorLabel="Vật liệu xây dựng">{children}</StoreShell>;
}
