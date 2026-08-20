import { Link } from "react-router";
import NavItem from "./NavItem";
import type { NavigationItem } from "../types";
import Logo from "@/shared/ui/Logo";

type SidebarContentProps = {
  navigation: NavigationItem[];
  onNavigate?: () => void;
};

export default function SidebarContent({
  navigation,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-green-950 px-4 pb-4 ring-1 ring-white/10">
      <div className="flex h-20 shrink-0 items-center">
        <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-x-3">
          <div className="flex size-18 shrink-0 items-center justify-center text-sm font-bold text-white">
            <Logo />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white">Huerta Nayelly</span>
            <span className="text-xs text-slate-400">Sistema interno</span>
          </div>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} onNavigate={onNavigate} />
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}