import Modal from "@/shared/ui/Modal";
import CreateSupplier from "./CreateSupplier";
import EditSupplier from "./EditSupplier";
import { useSupplierModalStore } from "../store/supplier.store";

export default function SupplierActionModal() {
    const { open, mode, closeModal } = useSupplierModalStore();

    const modalConfig = {
        create: {
            title: "Nuevo Proveedor",
            description: "Alta de Proveedor de agroquímicos, insumos o servicios.",
            content: <CreateSupplier />,
        },
        edit: {
            title: "Editar Proveedor",
            description: "Actualiza la información del proveedor seleccionado.",
            content: <EditSupplier />,
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
