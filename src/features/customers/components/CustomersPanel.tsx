import ButtonAction from "@/shared/ui/ButtonAction";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../api/customerAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import { useModalStore } from "@/shared/store/modalStore";
import Modal from "@/shared/ui/Modal";
import EditCustomer from "./EditCustomer";
import CreateCustomer from "./CreateCustomer";
import CustomersTable from "./CustomersTable";

export default function CustomersPanel() {

  const id = useModalStore(state => state.id);
  const open = useModalStore(state => state.open);
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  const isEditing = id !== null;

  const { data, isLoading } = useQuery({
    queryFn: getAllCustomers,
    queryKey: ['customers'],
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <ScreenSpinnerLoader title="Cargando clientes" subTitle="Obteniendo información de los clientes" />
  if (data) return (
    <>
      <div className="flex justify-end mb-2">
        <ButtonAction
          type="button"
          onClick={() => openModal()}
        >
          Nuevo Cliente
        </ButtonAction>
      </div>

      <CustomersTable
        customers={data.data}
      />

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
          <EditCustomer />
        ) : (
          <CreateCustomer />
        )}
      </Modal>
    </>
  )
}
