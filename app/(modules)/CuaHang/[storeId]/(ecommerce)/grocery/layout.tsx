import StoreShell from "@/components/store/store-shell";
import GroceryNav from "./_nav";

export default function GroceryLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={GroceryNav} sectorLabel="Tạp hoá & Siêu thị">{children}</StoreShell>;
}
