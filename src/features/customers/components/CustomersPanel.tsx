import ButtonAction from "@/shared/ui/ButtonAction";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../api/customerAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import { useModalStore } from "@/shared/store/modalStore";
import CreateCustomer from "./CreateCustomer";
import CustomersTable from "./CustomersTable";

export default function CustomersPanel() {

  const openModal = useModalStore(state => state.openModal);

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
          onClick={() => openModal({
            title: 'Creat Nuevo Cliente',
            content: <CreateCustomer />
          })}
        >
          Nuevo Cliente
        </ButtonAction>
      </div>

      <CustomersTable
        customers={data.data}
      />
    </>
  )
}
