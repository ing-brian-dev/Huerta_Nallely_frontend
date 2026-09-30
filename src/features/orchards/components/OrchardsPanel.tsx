import ButtonAction from "@/shared/ui/ButtonAction";
import CreateOrchard from "./CreateOrchard";
import { useModalStore } from "@/shared/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import { getAllOrchards } from "../api/OrchardAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import OrchardCard from "./OrchardCard";
import CropDistribution from "./CropDistribution";


export default function OrchardsPanel() {

  const openModal = useModalStore((state) => state.openModal);

  const { data, isLoading } = useQuery({
    queryFn: getAllOrchards,
    queryKey: ['orchards'],
    refetchOnWindowFocus: false,
    retry: false
  });

  if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Huertas" />;

  return (
    <>
      <div className="flex justify-end mb-2">
        <ButtonAction
          type="button"
          onClick={() =>
            openModal({
              title: "Crear cultivo",
              description:
                "Ingresa la información del nuevo cultivo",
              size: "md",
              content: (
                <CreateOrchard />
              ),
            })
          }
        >
          Agregar Huerta
        </ButtonAction>
      </div>
      {data && (
        <div className="space-y-4">
          {data.data.map((orchard) => (
            <div
              key={orchard.id}
              className="grid lg:grid-cols-2 items-center w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl gap-4 p-4"
            >
              <OrchardCard orchard={orchard} />
              <CropDistribution orchard={orchard} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}