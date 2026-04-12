import StoreShell from "@/components/store/store-shell";
import PhoneNav from "./_nav";

export default function PhoneLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={PhoneNav} sectorLabel="Điện thoại & Điện máy">{children}</StoreShell>;
}
