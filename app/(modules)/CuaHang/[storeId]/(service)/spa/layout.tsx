import StoreShell from "@/components/store/store-shell";
import SpaNav from "./_nav";

export default function SpaLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={SpaNav} sectorLabel="Beauty Spa & Massage">{children}</StoreShell>;
}
