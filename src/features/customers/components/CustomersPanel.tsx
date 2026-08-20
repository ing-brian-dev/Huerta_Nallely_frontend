import ButtonAction from "@/shared/ui/ButtonAction";
import { useCustomerModalStore } from "../store/customer.store";
import CustomerActionModal from "./CustomerActionModal";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../api/customerAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import Table from "@/shared/ui/Table";
import THead from "@/shared/ui/THead";
import Tr from "@/shared/ui/Tr";
import Th from "@/shared/ui/Th";
import TBody from "@/shared/ui/TBody";
import Td from "@/shared/ui/Td";
import DropdownMenu from "@/shared/ui/DropdownMenu";
import { MenuItem } from "@headlessui/react";
import { Pencil } from "lucide-react";

export default function CustomersPanel() {
  const openModal = useCustomerModalStore(state => state.openModal);

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
          onClick={() => openModal({ mode: 'create' })}
        >
          Nuevo Cliente
        </ButtonAction>
      </div>
      <Table className="text-stone-700">
        <THead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Telefono</Th>
            <Th>Direccion</Th>
            <Th>Correo</Th>
            <Th>Pais</Th>
            <Th>Typo</Th>
            <Th>Acciones</Th>
          </Tr>
        </THead>
        <TBody>
          {data.data.map(customer => (
            <Tr
              key={customer.id}
            >
              <Td>{customer.name}</Td>
              <Td>{customer.phone}</Td>
              <Td>{customer.address}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.country.name}</Td>
              <Td>{customer.customer_type.name}</Td>
              <Td>
                <DropdownMenu>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={() =>
                        openModal({
                          mode: "edit",
                          customerId: customer.id,
                        })
                      }
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
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
      <CustomerActionModal />
    </>
  )
}
