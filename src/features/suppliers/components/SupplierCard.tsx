import { Phone, Mail, MapPin, Package, DollarSign, Truck, Pencil } from "lucide-react";
import type { Supplier } from "../schemas/supplierSchema";
import DropdownMenu from "@/shared/ui/DropdownMenu";
import { MenuItem } from "@headlessui/react";
import { useModalStore } from "@/shared/store/modalStore";

interface SupplierCardProps {
    data: Supplier;
    purchases?: number;
    amount?: string;
    lastPurchaseDate?: string;
}

export default function SupplierCard({ data, purchases, amount, lastPurchaseDate }: SupplierCardProps) {

    const openModal = useModalStore(state => state.openModal);

    const initial = data.name?.trim().slice(0, 2).toUpperCase() || "?";

    return (
        <article
            className="
                w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-5
                shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex shrink-0 items-center gap-1.5">
                    {data.isActive !== undefined && (
                        <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${data.isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-500"
                                }`}
                        >
                            {data.isActive ? "Activo" : "Inactivo"}
                        </span>
                    )}
                </div>
                <DropdownMenu >
                    <MenuItem>
                        <button
                            type="button"
                            onClick={() => openModal(data.id)}
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
            <div className="mt-4 space-y-2.5">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                        {initial}
                    </div>
                    <div className="flex min-w-0 items-center gap-3">

                        <div className="min-w-0">
                            <h3 className="truncate text-[15px] font-semibold leading-tight text-stone-900">
                                {data.name}
                            </h3>
                            <p className=" text-sm leading-tight text-stone-400">
                                {data.contact_name}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-stone-600">
                    <Phone className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={1.75} />
                    <a href={`tel:${data.phone}`} className="truncate">{data.phone}</a>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-stone-600">
                    <Mail className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={1.75} />
                    <a href={`mailto:${data.email}`} className="truncate">{data.email}</a>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-stone-600">
                    <MapPin className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={1.75} />
                    <span className="truncate">{data.address}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="mt-4 border-t border-stone-100" />

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
                        Compras
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                        <Package className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
                        <span className="truncate text-sm font-semibold text-stone-900">
                            {purchases ?? "-"}
                        </span>
                    </div>
                </div>

                <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
                        Monto
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
                        <span className="truncate text-sm font-semibold text-stone-900">
                            {amount ?? "-"}
                        </span>
                    </div>
                </div>

                <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
                        Última
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                        <Truck className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
                        <span className="truncate text-sm font-semibold text-stone-900">
                            {lastPurchaseDate ?? "-"}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}