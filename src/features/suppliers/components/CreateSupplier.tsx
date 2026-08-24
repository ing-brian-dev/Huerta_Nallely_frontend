import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/shared/forms/Form";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { CreateSupplierSchema, type CreateSupplierInput } from "../schemas/supplierSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplier } from "../api/supplierAPI";
import SupplierForm from "./SupplierForm";
import toast from "react-hot-toast";
import { useModalStore } from "@/shared/store/modalStore";

export default function CreateSupplier() {

    const closeModal = useModalStore(state => state.closeModal);

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createSupplier,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            methods.reset();
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['suppliers'] })
        }
    });

    const methods = useForm({
        resolver: zodResolver(CreateSupplierSchema),
        mode: 'all'
    });

    const onSubmit = (formData: CreateSupplierInput) => {
        mutate(formData);
    }

    return (
        <FormProvider
            {...methods}
        >
            <Form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
                <SupplierForm />
                <FormSubmit
                    value={isPending ? 'Guardando...' : 'Guardar Proveedor'}
                    disabled={isPending}
                    className="md:col-span-2"
                />
            </Form>
        </FormProvider>
    )
}