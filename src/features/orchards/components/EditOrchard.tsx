import { useModalStore } from "@/shared/store/modalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { UpdateOrchardSchema, type UpdateOrchardInput } from "../schemas/orchardSchema";
import { Form } from "@/shared/forms/Form";
import OrchardForm from "./OrchardForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getOrchardById, updateOrchardById } from "../api/OrchardAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import { FormSubmit } from "@/shared/forms/FormSubmit";

export default function EditOrchard() {

    const id = useModalStore(state => state.id)!;
    const closeModal = useModalStore(state => state.closeModal);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryFn: () => getOrchardById(id),
        queryKey: ['orchard', id],
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!id
    });

    const { mutate, isPending } = useMutation({
        mutationFn: updateOrchardById,
        onError: ({ message }) => {
            toast.error(message);
        },
        onSuccess: ({ message }) => {
            toast.success(message);
            methods.reset();
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['orchards'] });
            queryClient.invalidateQueries({ queryKey: ['orchard', id] });
        }
    });

    const methods = useForm({
        resolver: zodResolver(UpdateOrchardSchema),
        mode: 'all'
    });

    const onSubmit = async (formData: UpdateOrchardInput) => {
        mutate({
            id,
            ...formData
        });
    }

    if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Huerta" />
        
    if (data) return (
        <FormProvider
            {...methods}
        >
            <Form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <OrchardForm orchard={data.data} />
                <FormSubmit
                    value={isPending ? 'Guardando...' : 'Guardar Huerta'}
                    disabled={isPending}
                    className="md:col-span-2"
                />
            </Form>
        </FormProvider>
    )
}
