import { useState } from "react";
import type { NavigationItem } from "../types";
import { usePageTitle } from "../hooks/usePageTitle";
import { Outlet } from "react-router";
import { navigation as defaultNavigation } from '../data/navigationData'
import MobileSidebar from "../components/MobileSidebar";
import DesktopSidebar from "../components/DesktopSidebar";
import Topbar from "../components/Topbar";
import GlobalModal from "@/shared/ui/GlobalModal";

type DashboardLayoutProps = {
  navigation?: NavigationItem[];
};

export default function DashboardLayout({ navigation = defaultNavigation }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  usePageTitle();

  return (
    <div className="min-h-screen">
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={navigation}
      />

      <DesktopSidebar navigation={navigation} />

      <div className="lg:pl-64">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="min-h-screen py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
            <GlobalModal />
          </div>
        </main>
      </div>
    </div>
  );
}
