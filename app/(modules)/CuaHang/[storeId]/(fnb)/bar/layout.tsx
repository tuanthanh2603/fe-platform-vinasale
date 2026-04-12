import StoreShell from "@/components/store/store-shell";
import BarNav from "./_nav";

export default function BarLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={BarNav} sectorLabel="Bar, Pub & Club">{children}</StoreShell>;
}
