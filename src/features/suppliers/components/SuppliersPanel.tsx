import { useSupplierModalStore } from "../store/supplier.store";
import ButtonAction from "@/shared/ui/ButtonAction";
import SupplierCard from "./SupplierCard";
import { useQuery } from "@tanstack/react-query";
import { getAllSuppliers } from "../api/supplierAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import SupplierActionModal from "./SupplierActionModal";

export default function SuppliersPanel() {

  const { data, isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getAllSuppliers,
    refetchOnWindowFocus: false,
  });

  const openModal = useSupplierModalStore(state => state.openModal);

  if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Proveedores" />;

  return (
    <>
      <div className="flex justify-end mb-2">
        <ButtonAction
          type="button"
          onClick={() => openModal({ mode: 'create' })}
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
      <SupplierActionModal />
    </>
  );
}