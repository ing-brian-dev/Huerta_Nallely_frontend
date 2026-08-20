import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SupplierModalMode = 'create' | 'edit';

interface OpenSupplierModalParams {
    mode: SupplierModalMode;
    supplierId?: number;
}

interface ISupplierModalStore {
    open: boolean;
    mode: SupplierModalMode | null;
    supplierId: number;
    openModal: (params: OpenSupplierModalParams) => void;
    closeModal: () => void;
    toggleModal: () => void;
}

export const useSupplierModalStore = create<ISupplierModalStore>()(
    devtools((set) => ({
        open: false,
        mode: null,
        supplierId: 0,

        openModal: (params) => {
            set({
                open: true,
                mode: params.mode,
                supplierId: params.mode === 'edit'
                    ? params.supplierId
                    : 0,
            });
        },

        closeModal: () => {
            set({
                open: false,
                mode: null,
                supplierId: 0,
            });
        },

        toggleModal: () => {
            set((state) => ({
                open: !state.open,
                mode: state.open
                    ? null
                    : state.mode ?? 'create',
            }));
        },
    }))
);