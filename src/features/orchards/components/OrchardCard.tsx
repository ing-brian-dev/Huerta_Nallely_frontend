import { MapPin, Pencil, Sprout } from "lucide-react";
import { formDate } from "@/utils/formatter";
import type { Orchard } from "../schemas/orchardSchema";
import DropdownMenu from "@/shared/ui/DropdownMenu";
import { MenuItem } from "@headlessui/react";
import { useModalStore } from "@/shared/store/modalStore";
import EditOrchard from "./EditOrchard";

type OrchardCardProps = {
    orchard: Orchard;
};

export default function OrchardCard({ orchard }: OrchardCardProps) {
    const openModal = useModalStore(state => state.openModal);

    return (
        <article>
            <div className="flex items-center justify-between gap-3">
                <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${orchard.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                        }`}
                >
                    {orchard.is_active ? "Activa" : "Inactiva"}
                </span>
                <DropdownMenu >
                    <MenuItem>
                        <button
                            type="button"
                            onClick={() => openModal({
                                title: `Editar Huerta : ${orchard.name}`,
                                content: <EditOrchard />,
                                description: `Esta acción editara tu hierta : ${orchard.name}`,
                                size: 'md'
                            }, orchard.id)}
                            className="
                                    flex w-full items-center gap-2.5 rounded-lg px-3 py-2
                                    text-sm font-medium text-stone-700 transition-colors
                                    cursor-pointer hover:bg-emerald-50 hover:text-emerald-800
                                    data-focus:bg-emerald-50 data-focus:text-emerald-800
                                "
                        >
                            <Pencil size={15} strokeWidth={2} />
                            Editar
                        </button>
                    </MenuItem>
                </DropdownMenu>
            </div>

            <div className="mt-5 flex min-w-0 items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-800 text-white shadow-md">
                    <Sprout className="size-6" />
                </div>

                <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-slate-800">
                        {orchard.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="size-4 shrink-0" />

                        <span className="truncate">
                            {orchard.municipality}, {orchard.state}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                        Hectáreas
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-800">
                        {orchard.hectares} he
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                        Registro
                    </p>

                    <p className="mt-1 truncate text-base font-bold text-slate-800">
                        {formDate(orchard.registration_date)}
                    </p>
                </div>
            </div>

            {orchard.orchard_note && (
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Nota
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-700">
                        {orchard.orchard_note}
                    </p>
                </div>
            )}
        </article>
    );
}