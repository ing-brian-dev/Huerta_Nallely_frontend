import { useMemo } from "react";
import type { Orchard } from "../schemas/orchardSchema";
import CropDistributionMenu from "./CropDistributionMenu";
import ButtonAction from "@/shared/ui/ButtonAction";
import CreateOrchardCrop from "./CreateOrchardCrop";
import { useModalStore } from "@/shared/store/modalStore";

export interface CropDistributionProps {
    orchard: Orchard;
    onlyActive?: boolean;
    embedded?: boolean;
}

interface CropRow {
    id: number;
    name: string;
    hectares: number;
    percentage: number;
    color: string;
}

const PALETTE = [
    "#2F6B3A",
    "#7CB342",
    "#C9A227",
    "#B85C38",
    "#4A7C7C",
    "#8D6E63",
];

export default function CropDistribution({ orchard }: CropDistributionProps) {
    const openModal = useModalStore((state) => state.openModal);

    const {
        rows,
        usedHectares,
        remainingHectares,
        usedPercentage,
        remainingPercentage,
    } = useMemo(() => {
        const total = Number(orchard.hectares);

        const crops = orchard.orchardCrops.filter((crop) => crop.is_active);

        const used = crops.reduce((acc, crop) => acc + Number(crop.hectares), 0);

        const remaining = Math.max(total - used, 0);

        const usedPercent = total > 0 ? Math.min((used / total) * 100, 100) : 0;

        const remainingPercent = total > 0 ? Math.max(100 - usedPercent, 0) : 0;

        const cropRows: CropRow[] = crops
            .map((crop, index) => {
                const hectares = Number(crop.hectares);

                const percentage = total > 0 ? (hectares / total) * 100 : 0;

                return {
                    id: crop.id,
                    name: crop.product.name,
                    hectares,
                    percentage,
                    color: PALETTE[index % PALETTE.length],
                };
            })
            .sort((a, b) => b.hectares - a.hectares);

        return {
            rows: cropRows,
            usedHectares: used,
            remainingHectares: remaining,
            usedPercentage: usedPercent,
            remainingPercentage: remainingPercent,
        };
    }, [orchard]);

    const canAddCrop = remainingHectares > 0;

    return (
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Distribución
                    </p>

                    <h4 className="text-sm font-semibold text-slate-800">Cultivos</h4>
                </div>

                {/* Button */}
                {canAddCrop && (
                    <ButtonAction
                        type="button"
                        onClick={() =>
                            openModal({
                                title: "Crear cultivo",
                                description:
                                    "Ingresa la información del nuevo cultivo",
                                size: "md",
                                content: (
                                    <CreateOrchardCrop />
                                ),
                            }, orchard.id)
                        }
                    >
                        Agregar cultivo
                    </ButtonAction>
                )}
            </div>

            {/* Summary */}
            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-500">Superficie utilizada</p>

                        <p className="text-sm font-semibold text-slate-800">
                            {usedHectares.toLocaleString("es-MX", {
                                maximumFractionDigits: 2,
                            })}{" "}
                            ha de{" "}
                            {Number(orchard.hectares).toLocaleString("es-MX", {
                                maximumFractionDigits: 2,
                            })}{" "}
                            ha
                        </p>
                    </div>

                    <span className="text-sm font-semibold text-slate-700">
                        {usedPercentage.toFixed(0)}%
                    </span>
                </div>

                {/* Overall progress */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-[#2F6B3A] transition-all duration-500 ease-out"
                        style={{
                            width: `${usedPercentage}%`,
                        }}
                    />
                </div>

                {/* Remaining */}
                {remainingHectares > 0 ? (
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>Disponible</span>

                        <span>
                            {remainingHectares.toLocaleString("es-MX", {
                                maximumFractionDigits: 2,
                            })}{" "}
                            ha ({remainingPercentage.toFixed(0)}%)
                        </span>
                    </div>
                ) : (
                    <p className="mt-2 text-xs font-medium text-[#2F6B3A]">
                        La huerta está completamente distribuida.
                    </p>
                )}
            </div>

            {/* Crops */}
            {rows.length > 0 ? (
                <div className="flex w-full flex-col gap-3">
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            className="flex min-w-0 flex-1 flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                        >
                            <div className="flex min-w-0 items-center justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2">
                                    <span
                                        className="h-2.5 w-2.5 flex-none rounded-full"
                                        style={{
                                            backgroundColor: row.color,
                                        }}
                                    />

                                    <span className="min-w-0 truncate text-sm font-medium text-slate-800">
                                        {row.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="shrink-0 text-sm font-semibold text-slate-700">
                                        {row.percentage.toFixed(0)}%
                                    </span>

                                    <CropDistributionMenu
                                        id={row.id}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 text-xs text-slate-600">
                                <span>
                                    {row.hectares.toLocaleString("es-MX", {
                                        maximumFractionDigits: 2,
                                    })}{" "}
                                    ha
                                </span>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                <div
                                    className="h-full rounded-full transition-all duration-500 ease-out"
                                    style={{
                                        width: `${Math.min(row.percentage, 100)}%`,
                                        backgroundColor: row.color,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center py-6">
                    <p className="text-sm text-slate-500">No se han agregado cultivos</p>
                </div>
            )}
        </div>
    );
}
