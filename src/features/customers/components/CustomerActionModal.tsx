import Modal from "@/shared/ui/Modal";
import { useCustomerModalStore } from "../store/customer.store";
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";


export default function CustomerActionModal() {
    const { open, mode, closeModal } = useCustomerModalStore();

    const modalConfig = {
        create: {
            title: "Nuevo Cliente",
            description: "Alta de Cliente Para venta de productos de la huerta.",
            content: <CreateCustomer />,
        },
        edit: {
            title: "Editar Cliente",
            description: "Actualiza la información del cliente seleccionado.",
            content: <EditCustomer />,
        }
    } as const;

    const activeModal = mode ? modalConfig[mode] : modalConfig.create;

    return (
        <Modal
            open={open}
            onClose={closeModal}
            title={activeModal.title}
            description={activeModal.description}
            size="lg"
        >
            {activeModal.content}
        </Modal>
    );
}
