import type { NavigationItem } from "../types";
import SidebarContent from "./SidebarContent";

type DesktopSidebarProps = {
  navigation: NavigationItem[];
};

export default function DesktopSidebar({ navigation }: DesktopSidebarProps) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <SidebarContent navigation={navigation} />
    </div>
  );
}
