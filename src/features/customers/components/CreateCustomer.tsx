import { Form } from "@/shared/forms/Form";
import { FormProvider, useForm } from "react-hook-form";
import { CreateCustomerSchema, type CreateCustomerInput } from "../schemas/customerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomerForm from "./CustomerForm";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../api/customerAPI";
import toast from "react-hot-toast";
import { useModalStore } from "@/shared/store/modalStore";

export default function CreateCustomer() {

    const closeModal = useModalStore(state => state.closeModal);

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createCustomer,
        onError: ({ message }) => {
            toast.error(message);
        },
        onSuccess: ({ message }) => {
            toast.success(message);
            methods.reset();
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });

    const methods = useForm({
        resolver: zodResolver(CreateCustomerSchema),
        mode: 'all'
    });

    const onSubmit = async (formData: CreateCustomerInput) => {
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
                <CustomerForm />
                <FormSubmit
                    value={isPending ? 'Guardando...' : 'Crear Cliente'}
                    disabled={isPending}
                    className="md:col-span-2"
                />
            </Form>
        </FormProvider>
    )
}
