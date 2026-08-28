import { Package, Pencil } from "lucide-react";
import { MenuItem } from "@headlessui/react";
import { useModalStore } from "@/shared/store/modalStore";
import type { Product } from "../schemas/productSchema";
import DropdownMenu from "@/shared/ui/DropdownMenu";

type ProductCardProps = { product: Product };

export default function ProductCard({ product }: ProductCardProps) {
    const openModal = useModalStore(state => state.openModal);
    return (
        <article
            className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div
                className="p-5"
            >
                <div
                    className="flex items-center justify-between gap-3"
                >
                    <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm 
                            ${product.is_active ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"}`}
                    >
                        {product.is_active
                            ? "Activo"
                            : "Inactivo"
                        }
                    </span>
                    <DropdownMenu>
                        <MenuItem>
                            <button
                                type="button"
                                onClick={() => openModal(product.id)}
                                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 data-focus:bg-emerald-50 data-focus:text-emerald-800"
                            >
                                <Pencil size={15} strokeWidth={2} />
                                Editar
                            </button>
                        </MenuItem>
                    </DropdownMenu>
                </div>
                <div
                    className="mt-5 flex min-w-0 items-center gap-3"
                >
                    <div
                        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-800 text-white shadow-md"
                    >
                        <Package className="size-6" />
                    </div>
                    <h3
                        className="truncate text-lg font-bold text-slate-800"
                    >
                        {product.name}
                    </h3>
                </div>
                {product.description &&
                    <p
                        className="mt-5 line-clamp-3 text-sm text-slate-600"
                    >
                        {product.description}
                    </p>
                }
            </div>
        </article>
    )
}