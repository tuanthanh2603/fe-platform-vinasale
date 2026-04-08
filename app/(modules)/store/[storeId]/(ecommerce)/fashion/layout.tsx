import StoreShell from "@/components/store/store-shell";
import FashionNav from "./_nav";

export default function FashionLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={FashionNav} sectorLabel="Thời trang">{children}</StoreShell>;
}
