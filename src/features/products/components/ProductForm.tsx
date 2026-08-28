import { FormError } from "@/shared/forms/FormError";
import { FormInput } from "@/shared/forms/FormInput";
import { FormLabel } from "@/shared/forms/FormLabel";
import { FormTextArea } from "@/shared/forms/FormTextArea";
import { FormSwitch } from "@/shared/forms/FormSwitch";
import { Controller, useFormContext } from "react-hook-form";
import type { UpdateProductInput } from "../schemas/productSchema";

type ProductFormProps = { product?: UpdateProductInput };

export default function ProductForm({ product }: ProductFormProps) {
    const { register, formState: { errors }, control } = useFormContext<UpdateProductInput>();

    return (
        <>
            <div className="md:col-span-2">
                <FormLabel
                    htmlFor="name"
                >
                    Nombre del producto
                </FormLabel>
                <FormInput
                    id="name"
                    type="text"
                    placeholder="Ingresa el nombre del producto"
                    hasError={!!errors.name} defaultValue={product?.name ?? ""}
                    {...register("name")}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </div>

            {product && (
                <div className="flex flex-col">
                    <FormLabel
                        htmlFor="is_active"
                    >
                        Está activo
                    </FormLabel>
                    <Controller
                        name="is_active"
                        control={control}
                        defaultValue={product.is_active}
                        render={({ field: { value, onChange } }) => (
                            <FormSwitch
                                id="is_active"
                                checked={!!value}
                                onChange={onChange}
                                className={errors.is_active ? "ring-2 ring-red-500" : ""}
                            />
                        )}
                    />
                    {errors.is_active && <FormError>{errors.is_active.message}</FormError>}
                </div>
            )}

            <div className="md:col-span-2">
                <FormLabel
                    htmlFor="description"
                >
                    Descripción
                </FormLabel>
                <FormTextArea
                    id="description"
                    placeholder="Ingresa una descripción del producto"
                    hasError={!!errors.description} defaultValue={product?.description ?? ""}
                    {...register("description")}
                />
                {errors.description && <FormError>{errors.description.message}</FormError>}
            </div>
        </>
    );
}
