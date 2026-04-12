import StoreShell from "@/components/store/store-shell";
import CosmeticNav from "./_nav";

export default function CosmeticLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={CosmeticNav} sectorLabel="Mỹ phẩm">{children}</StoreShell>;
}
