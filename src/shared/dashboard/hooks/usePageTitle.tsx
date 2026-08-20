import { useEffect } from "react";
import { useLocation } from "react-router";
import { ROUTE_TITLES } from "../data/navigationData";

export function usePageTitle(suffix = "Huerta Nallely") {
  const location = useLocation();

  useEffect(() => {
    const segment = location.pathname.split("/").filter(Boolean).pop() ?? "";
    const title = ROUTE_TITLES[segment] ?? "Panel";
    document.title = `${suffix} | ${title}`;
  }, [location.pathname, suffix]);
}