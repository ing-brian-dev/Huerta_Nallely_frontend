import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ReactNode } from "react";

interface ModalOptions {
    title?: string;
    description?: string;
    content: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

interface ModalStore {
    open: boolean;
    modal: ModalOptions | null;
    id: number | null;
    openModal: (options: ModalOptions, id?: number | null) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>()(
    devtools((set) => ({
        open: false,
        modal: null,
        id: null,
        openModal: (options, id) => {
            set({
                open: true,
                modal: options,
                id: id ?? null,
            });
        },
        closeModal: () => {
            set({
                open: false,
                modal: null,
                id: null,
            });
        },
    }))
);