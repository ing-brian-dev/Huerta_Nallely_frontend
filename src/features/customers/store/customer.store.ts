import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CustomerModalMode = 'create' | 'edit';

interface OpenCustomerModalParams {
    mode: CustomerModalMode;
    customerId?: number;
}

interface ICustomerModalStore {
    open: boolean;
    mode: CustomerModalMode | null;
    customerId: number;
    openModal: (params: OpenCustomerModalParams) => void;
    closeModal: () => void;
}

export const useCustomerModalStore = create<ICustomerModalStore>()(devtools((set, get) => ({
    open: false,
    mode: null,
    customerId: 0,
    openModal: (params) => {
        set({
            open: true,
            mode: params.mode,
            customerId: params.mode === 'edit'
                ? params.customerId
                : 0,
        });
    },
    closeModal: () => {
        set({
            open: false,
            mode: null,
            customerId: 0,
        });
    },
})));