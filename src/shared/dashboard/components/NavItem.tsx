import { Link, useLocation } from "react-router";
import clsx from "clsx";
import type { NavigationItem } from "../types";

type NavItemProps = {
  item: NavigationItem;
  onNavigate?: () => void;
};

export default function NavItem({ item, onNavigate }: NavItemProps) {
  const location = useLocation();
  const isActive =
    location.pathname === item.href ||
    (item.href !== "/dashboard" && location.pathname.startsWith(item.href));

  const Icon = item.icon;

  return (
    <li>
      <Link
        to={item.href}
        onClick={onNavigate}
        className={clsx(
          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
          isActive
            ? "bg-green-900/40 text-white border border-amber-300"
            : "text-gray-400 hover:bg-green-900/40 hover:text-white"
        )}
      >
        <Icon
          className={clsx(
            "size-6 shrink-0",
            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
          )}
          aria-hidden="true"
        />
        {item.name}
      </Link>
    </li>
  );
}
