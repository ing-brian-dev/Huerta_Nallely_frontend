import { useModalStore } from "@/shared/store/modalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { UpdateProductSchema, type UpdateProductInput } from "../schemas/productSchema";
import { Form } from "@/shared/forms/Form";
import ProductForm from "./ProductForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProductById, updateProductById } from "../api/ProductAPI";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import { FormSubmit } from "@/shared/forms/FormSubmit";

export default function EditProduct() {
    const id = useModalStore(state => state.id)!;
    const closeModal = useModalStore(state => state.closeModal);

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryFn: () => getProductById(id),
        queryKey: ["product", id],
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!id
    });

    const { mutate, isPending } = useMutation({
        mutationFn: updateProductById,
        onError: ({ message }) => toast.error(message),
        onSuccess: ({ message }) => {
            toast.success(message);
            methods.reset();
            closeModal();
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
        },
    });
    const methods = useForm<UpdateProductInput>({
        resolver: zodResolver(UpdateProductSchema),
        mode: "all"
    });

    const onSubmit = (formData: UpdateProductInput) => mutate({ id, ...formData });

    if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Producto" />;
    if (data) return (
        <FormProvider
            {...methods}
        >
            <Form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <ProductForm
                    product={data.data}
                />
                <FormSubmit
                    value={isPending ? "Guardando..." : "Guardar Producto"}
                    disabled={isPending}
                    className="md:col-span-2"
                />
            </Form>
        </FormProvider>
    )
}