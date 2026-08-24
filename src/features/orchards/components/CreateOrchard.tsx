import { Form } from "@/shared/forms/Form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrchard } from "../api/OrchardAPI";
import OrchardForm from "./OrchardForm";
import { CreateOrchardSchema, type CreateOrchardInput } from "../schemas/orchardSchema";
import { useModalStore } from "@/shared/store/modalStore";

export default function CreateCustomer() {

    const closeModal = useModalStore(state => state.closeModal);

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createOrchard,
        onError: ({ message }) => {
            toast.error(message);
        },
        onSuccess: ({ message }) => {
            toast.success(message);
            methods.reset();
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['orchards'] });
        }
    });

    const methods = useForm({
        resolver: zodResolver(CreateOrchardSchema),
        mode: 'all'
    });

    const onSubmit = async (formData: CreateOrchardInput) => {
        mutate(formData);
    }

    return (
        <FormProvider
            {...methods}
        >
            <Form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <OrchardForm />
                <FormSubmit
                    value={isPending ? 'Guardando...' : 'Crear Huerta'}
                    disabled={isPending}
                    className="md:col-span-2"
                />
            </Form>
        </FormProvider>
    )
}
