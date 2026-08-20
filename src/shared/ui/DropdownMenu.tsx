import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { MoreVertical } from "lucide-react";

type DropdownMenuProps = {
    children: React.ReactNode
}

export default function DropdownMenu({ children }: DropdownMenuProps) {

    return (
        <Menu as="div" className="relative inline-block">
            <MenuButton
                className="
                    flex h-8 w-8 items-center justify-center rounded-full
                    text-stone-400 transition-colors duration-200
                    hover:bg-stone-100 hover:text-stone-600
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/30
                    cursor-pointer
                "
            >
                <MoreVertical size={18} strokeWidth={2} />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="
                    z-10 mt-2 w-44 origin-top-right rounded-xl border border-stone-200
                    bg-white p-1.5 shadow-lg shadow-stone-200/50 outline-none
                    transition data-closed:scale-95 data-closed:opacity-0
                    data-enter:duration-150 data-enter:ease-out
                    data-leave:duration-100 data-leave:ease-in
                "
            >
                {children}
            </MenuItems>
        </Menu>
    )
}
