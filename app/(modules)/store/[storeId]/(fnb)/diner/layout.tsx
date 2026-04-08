import StoreShell from "@/components/store/store-shell";
import DinerNav from "./_nav";

export default function DinerLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={DinerNav} sectorLabel="Quán ăn">{children}</StoreShell>;
}
