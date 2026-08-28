import { Form } from "@/shared/forms/Form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createProduct } from "../api/ProductAPI";
import ProductForm from "./ProductForm";
import { CreateProductSchema, type CreateProductInput } from "../schemas/productSchema";
import { useModalStore } from "@/shared/store/modalStore";

export default function CreateProduct() {

    const closeModal = useModalStore(state => state.closeModal);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createProduct,
        onError: ({ message }) => toast.error(message),
        onSuccess: ({ message }) => {
            toast.success(message);
            methods.reset();
            closeModal();
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
    const methods = useForm<CreateProductInput>({
        resolver: zodResolver(CreateProductSchema),
        mode: "all"
    });
    const onSubmit = (formData: CreateProductInput) => mutate(formData);

    return (
        <FormProvider
            {...methods}
        >
            <Form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <ProductForm />
                <FormSubmit
                    value={isPending ? "Guardando..." : "Crear Producto"}
                    disabled={isPending}
                    className="md:col-span-2"
                />
            </Form>
        </FormProvider>
    )
}