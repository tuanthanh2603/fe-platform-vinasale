import StoreShell from "@/components/store/store-shell";
import RestaurantNav from "./_nav";

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell Nav={RestaurantNav} sectorLabel="Nhà hàng">{children}</StoreShell>;
}
