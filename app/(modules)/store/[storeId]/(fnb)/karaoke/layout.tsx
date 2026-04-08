import StoreShell from "@/components/store/store-shell";
import KaraokeNav from "./_nav";

export default function KaraokeLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={KaraokeNav} sectorLabel="Karaoke">{children}</StoreShell>;
}
