import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStore {
    open: boolean;
    id: number | null;
    openModal: (id?: number) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>()(
    devtools(
        (set) => ({
            open: false,
            id: null,

            openModal: (id) => {
                set({
                    open: true,
                    id: id ?? null,
                });
            },

            closeModal: () => {
                set({
                    open: false,
                    id: null,
                });
            },
        })
    )
);