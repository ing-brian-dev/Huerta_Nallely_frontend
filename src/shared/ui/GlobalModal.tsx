import Modal from "./Modal";
import { useModalStore } from "../store/modalStore";

export default function GlobalModal() {
    const open = useModalStore((state) => state.open);
    const modal = useModalStore((state) => state.modal);
    const closeModal = useModalStore((state) => state.closeModal);

    if (!modal) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={closeModal}
            title={modal.title}
            description={modal.description}
            size={modal.size}
        >
            {modal.content}
        </Modal>
    );
}