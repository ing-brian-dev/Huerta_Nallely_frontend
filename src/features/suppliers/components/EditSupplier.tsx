import { Form } from "@/shared/forms/Form";
import { FormProvider, useForm } from "react-hook-form";
import SupplierForm from "./SupplierForm";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateSupplierSchema, type UpdateSupplierInput } from "../schemas/supplierSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getSupplierById, updateSupplier } from "../api/supplierAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import { useModalStore } from "@/shared/store/modalStore";

export default function EditSupplier() {

    const id = useModalStore(state => state.id)!;
    const closeModal = useModalStore(state => state.closeModal);

    const { data, isLoading } = useQuery({
        queryFn: () => getSupplierById(id),
        queryKey: ['supplier', id],
        refetchOnWindowFocus: false,
        retry: false,
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateSupplier,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            methods.reset();
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            queryClient.invalidateQueries({ queryKey: ['supplier', id] });
        }
    });

    const methods = useForm({
        resolver: zodResolver(UpdateSupplierSchema),
        mode: 'all'
    });

    const onSubmit = (formData: UpdateSupplierInput) => {
        mutate({
            id,
            ...formData
        });
    }

    if (isLoading) return <ScreenSpinnerLoader title="Cargando" subTitle="Obteniendo Proveedor" />;

    if (data) return (
        <FormProvider
            {...methods}
        >
            <Form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
                <SupplierForm supplier={data.data} />
                <FormSubmit
                    value={isPending ? 'Guardando...' : 'Editar Proveedor'}
                    disabled={isPending}
                    className="md:col-span-2"
                />
            </Form>
        </FormProvider>
    );
}
