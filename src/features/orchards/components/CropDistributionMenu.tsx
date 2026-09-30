import { MenuItem } from "@headlessui/react";
import DropdownMenu from "@/shared/ui/DropdownMenu";
import { useModalStore } from "@/shared/store/modalStore";
import EditOrchardCrop from "./EditOrchardCrop";
import DeleteOrchardCrop from "./DeleteOrchardCrop";

export default function CropDistributionMenu({ id }: { id: number }) {

    const openModal = useModalStore(state => state.openModal);

    return (
        <DropdownMenu>
            <MenuItem>
                <button
                    type="button"
                    onClick={() => openModal({
                        title: "Editar Cultivo",
                        description: "Esta accion editara el cultivo",
                        size: "sm",
                        content: (
                            <EditOrchardCrop />
                        )
                    }, id)}
                    className="
                        flex w-full items-center gap-2 rounded-lg px-3 py-2
                        text-left text-sm font-medium text-stone-700 transition-colors
                        hover:bg-emerald-50 hover:text-emerald-800
                        data-focus:bg-emerald-50 data-focus:text-emerald-800 cursor-pointer
                    "
                >
                    Editar cultivo
                </button>
            </MenuItem>
            <MenuItem>
                <button
                    type="button"
                    onClick={() => openModal({
                        title: "Eliminar Cultivo",
                        description: "Esta accion eliminara este cultivo",
                        size: "sm",
                        content: (
                            <DeleteOrchardCrop />
                        )
                    }, id)}
                    className="
                        flex w-full items-center gap-2 rounded-lg px-3 py-2
                        text-left text-sm font-medium text-stone-700 transition-colors
                        hover:bg-red-50 hover:text-red-800
                        data-focus:bg-red-50 data-focus:text-red-800 cursor-pointer
                    "
                >
                    Eliminar Cultivo
                </button>
            </MenuItem>
        </DropdownMenu>
    );
}
