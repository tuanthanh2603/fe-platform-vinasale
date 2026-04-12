import StoreShell from "@/components/store/store-shell";
import ResortNav from "./_nav";

export default function ResortLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={ResortNav} sectorLabel="Homestay & Villa, Resort">{children}</StoreShell>;
}
