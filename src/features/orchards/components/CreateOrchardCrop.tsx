import { Form } from "@/shared/forms/Form";
import { FormProvider, useForm } from "react-hook-form";
import OrchardCropForm from "./OrchardCropForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrchardCrop } from "../api/OrchardCropAPI";
import toast from "react-hot-toast";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOrchardCropSchema, type CreateOrchardCropInput } from "../schemas/orchardCropSchema";
import { useModalStore } from "@/shared/store/modalStore";

export default function CreateOrchardCrop() {

    const closeModal = useModalStore(state => state.closeModal);
    const id = useModalStore(state => state.id)!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createOrchardCrop,

        onError: ({ message }) => {
            toast.error(message);
        },

        onSuccess: ({ message }) => {
            toast.success(message);
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['orchards'] });
        }
    });

    const methods = useForm({
        resolver: zodResolver(CreateOrchardCropSchema),
        mode: "onSubmit",
        defaultValues: {
            orchard_id: id
        }
    });

    const onSubmit = (formData: CreateOrchardCropInput) => {
        mutate(formData);
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <OrchardCropForm />
                <FormSubmit
                    value="Agregar Cultivo"
                />
            </Form>
        </FormProvider>
    );
}