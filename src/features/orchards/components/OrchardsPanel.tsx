import ButtonAction from "@/shared/ui/ButtonAction";
import CreateOrchard from "./CreateOrchard";
import EditOrchard from "./EditOrchard";
import Modal from "@/shared/ui/Modal";
import { useModalStore } from "@/shared/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import { getAllOrchards } from "../api/OrchardAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import OrchardCard from "./OrchardCard";


export default function OrchardsPanel() {

  const open = useModalStore((state) => state.open);
  const id = useModalStore((state) => state.id);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { data, isLoading } = useQuery({
    queryFn: getAllOrchards,
    queryKey: ['orchards'],
    refetchOnWindowFocus: false,
    retry: false
  });

  const isEditing = id !== null;
  if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Huertas" />;

  return (
    <>
      <div className="flex justify-end mb-2">
        <ButtonAction
          type="button"
          onClick={() => openModal()}
        >
          Nueva Huerta
        </ButtonAction>
      </div>
      {data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.data.map(orchard => (
            <OrchardCard
              key={orchard.id}
              orchard={orchard}
            />
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={closeModal}
        title={isEditing ? "Editar Huerta" : "Crear Huerta"}
        description={
          isEditing
            ? "Actualiza la información del Huerta"
            : "Ingresa la información del nuevo Huerta"
        }
      >
        {isEditing ? (
          <EditOrchard />
        ) : (
          <CreateOrchard />
        )}
      </Modal>
    </>
  );
}