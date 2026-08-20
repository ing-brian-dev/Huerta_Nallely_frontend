import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { X } from "lucide-react";
import SidebarContent from "./SidebarContent";
import type { NavigationItem } from "../types";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
};

export default function MobileSidebar({ open, onClose, navigation }: MobileSidebarProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden" transition>
      {/* Fondo oscuro que se desvanece */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex w-88">
        {/* Panel que se desliza desde la izquierda */}
        <DialogPanel
          transition
          className="relative mr-16 flex flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
        >
          {/* Botón de cerrar, aparece un poco después que el panel */}
          <TransitionChild>
            <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
              <button
                type="button"
                onClick={onClose}
                className="-m-2.5 p-2.5 cursor-pointer"
              >
                <X className="size-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>
          <SidebarContent navigation={navigation} onNavigate={onClose} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
