import StoreShell from "@/components/store/store-shell";
import BidaNav from "./_nav";

export default function BidaLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={BidaNav} sectorLabel="Bida">{children}</StoreShell>;
}
