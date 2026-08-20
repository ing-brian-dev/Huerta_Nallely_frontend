import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, LogOut, User, UserPen } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

export default function UserDropdownMenu() {
  const { data, logout } = useAuth();

  return (
    <Menu as="section" className="relative">
      <MenuButton
        className="
          group flex items-center gap-2 rounded-full p-1 transition-all duration-200
          hover:bg-stone-100
          focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/30
          cursor-pointer
        "
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
          <User size={18} strokeWidth={1.8} className="shrink-0" />
        </div>
        <ChevronDown
          size={16}
          className="mr-1 text-stone-400 transition-transform duration-200 group-data-open:rotate-180"
        />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="
          z-50 mt-2 w-64 origin-top-right rounded-2xl border border-stone-200
          bg-white p-2 text-sm shadow-lg shadow-stone-200/50 outline-none
          transition duration-150 ease-out [--anchor-gap:8px]
          data-closed:scale-95 data-closed:opacity-0
        "
      >
        <div className="px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <User size={19} />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-stone-900">Mi cuenta</p>
              <p className="truncate text-xs text-stone-400">{data?.name}</p>
            </div>
          </div>
        </div>
        <div className="mx-2 my-1 h-px bg-stone-100" />
        <MenuItem>
          <Link
            to="/dashboard/profile"
            className="
              flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left
              transition-colors cursor-pointer
              bg-slate-100
              hover:bg-emerald-50 hover:text-emerald-800
              data-focus:bg-emerald-50 data-focus:text-emerald-800
            "
          >
            <UserPen size={18} strokeWidth={1.8} className="shrink-0" />
            <div>
              <p className="font-medium">Mi perfil</p>
              <p className="text-xs text-stone-400">Ver información de cuenta</p>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            onClick={logout}
            className="
              mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left
              bg-red-50 text-red-600 transition-colors cursor-pointer
              hover:bg-red-100
              data-focus:bg-red-100
            "
          >
            <LogOut size={18} strokeWidth={1.8} className="shrink-0" />
            <div>
              <p className="font-medium">Cerrar sesión</p>
              <p className="text-xs text-stone-400">Salir de tu cuenta</p>
            </div>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}