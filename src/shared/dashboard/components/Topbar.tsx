import { Menu } from "lucide-react";
import { useLocation } from "react-router";
import Heading from "@/shared/typography/Heading";
import UserDropdownMenu from "./UserDropdownMenu";
import { ROUTE_DESCRIPTIONS, ROUTE_TITLES } from "../data/navigationData";

type TopbarProps = {
  onOpenSidebar: () => void;
};

export default function Topbar({ onOpenSidebar }: TopbarProps) {
  const location = useLocation();
  const segment = location.pathname.split("/").filter(Boolean).pop() ?? "";
  const title = ROUTE_TITLES[segment] ?? "Panel";
  const description = ROUTE_DESCRIPTIONS[segment] ?? "";

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 bg-white ">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="-m-2.5 p-2.5 text-white lg:hidden bg-green-900 rounded-lg"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>

        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col">
            <Heading className="text-sm">{title}</Heading>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
            <UserDropdownMenu />       
        </div>
      </div>
    </>
  );
}