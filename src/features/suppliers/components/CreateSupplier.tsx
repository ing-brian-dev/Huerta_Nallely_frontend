import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/shared/forms/Form";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { SupplierInputSchema, type SupplierInput } from "../schemas/supplierSchema";
import { useSupplierModalStore } from "../store/supplier.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplier } from "../api/supplierAPI";
import SupplierForm from "./SupplierForm";
import toast from "react-hot-toast";

export default function CreateSupplier() {
    const closeModal = useSupplierModalStore(state => state.closeModal);

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
        resolver: zodResolver(SupplierInputSchema),
        mode: 'all'
    });

    const onSubmit = (formData: SupplierInput) => {
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