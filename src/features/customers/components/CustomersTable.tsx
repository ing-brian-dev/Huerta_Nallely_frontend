import { useModalStore } from '@/shared/store/modalStore'
import DropdownMenu from '@/shared/ui/DropdownMenu'
import Table from '@/shared/ui/Table'
import TBody from '@/shared/ui/TBody'
import Td from '@/shared/ui/Td'
import Th from '@/shared/ui/Th'
import THead from '@/shared/ui/THead'
import Tr from '@/shared/ui/Tr'
import { MenuItem } from '@headlessui/react'
import { Pencil } from 'lucide-react'
import type { CustomerWithRelations } from '../schemas/customerSchema'
import EditCustomer from './EditCustomer'

type CustomersTableProps = {
    customers: CustomerWithRelations[]
}

export default function CustomersTable({ customers }: CustomersTableProps) {

    const openModal = useModalStore(state => state.openModal);

    return (
        <Table className="text-slate-700">
            <THead>
                <Tr className="hover:bg-slate-50/80">
                    <Th>Nombre</Th>
                    <Th>Teléfono</Th>
                    <Th>Dirección</Th>
                    <Th>Correo</Th>
                    <Th>País</Th>
                    <Th>Tipo</Th>
                    <Th className="text-center">Acciones</Th>
                </Tr>
            </THead>

            <TBody>
                {customers.map((customer) => (
                    <Tr key={customer.id}>
                        <Td className="font-semibold text-slate-800">
                            {customer.name}
                        </Td>

                        <Td>{customer.phone}</Td>

                        <Td>
                            {customer.address ?? "Sin dirección"}
                        </Td>

                        <Td>
                            {customer.email ?? "Sin correo"}
                        </Td>

                        <Td>{customer.country.name}</Td>

                        <Td>{customer.customer_type.name}</Td>

                        <Td className="text-center">
                            <DropdownMenu>
                                <MenuItem>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openModal({
                                                title: `Editar Cliente: ${customer.name}`,
                                                content: <EditCustomer />
                                            }, customer.id)
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
    )
}
