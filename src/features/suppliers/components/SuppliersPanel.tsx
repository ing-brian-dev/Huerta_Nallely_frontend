import ButtonAction from "@/shared/ui/ButtonAction";
import SupplierCard from "./SupplierCard";
import { useQuery } from "@tanstack/react-query";
import { getAllSuppliers } from "../api/supplierAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import Modal from "@/shared/ui/Modal";
import { useModalStore } from "@/shared/store/modalStore";
import EditSupplier from "./EditSupplier";
import CreateSupplier from "./CreateSupplier";

export default function SuppliersPanel() {

  const id = useModalStore(state => state.id);
  const open = useModalStore(state => state.open);
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  const isEditing = id !== null;

  const { data, isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getAllSuppliers,
    refetchOnWindowFocus: false,
    retry: false
  });

  if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Proveedores" />;

  return (
    <>
      <div className="flex justify-end mb-2">
        <ButtonAction
          type="button"
          onClick={() => openModal()}
        >
          Nuevo Proveedor
        </ButtonAction>
      </div>
      {data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.data.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              data={supplier}
            />
          ))}
        </div>
      )}
      <Modal
        open={open}
        onClose={closeModal}
        title={isEditing ? "Editar Proveedor" : "Crear Proveedor"}
        description={
          isEditing
            ? "Actualiza la información del Proveedor"
            : "Ingresa la información del nuevo Proveedor"
        }
      >
        {isEditing ? (
          <EditSupplier />
        ) : (
          <CreateSupplier />
        )}
      </Modal>
    </>
  );
}