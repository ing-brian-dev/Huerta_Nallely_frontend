import FormSearchAutocomplete from "@/shared/forms/FormSearchAutocomplete";
import { FormInput } from "@/shared/forms/FormInput";
import { FormLabel } from "@/shared/forms/FormLabel";
import { FormError } from "@/shared/forms/FormError";
import { FormTextArea } from "@/shared/forms/FormTextArea";
import { useFormContext, useFormState } from "react-hook-form";
import { searchProductsByText } from "@/features/products/api/ProductAPI";
import type { CreateOrchardCropInput, OrchardCrop } from "../schemas/orchardCropSchema";
import { useModalStore } from "@/shared/store/modalStore";
import { useEffect } from "react";

type OrchardCropFormProps = {
    orchardCrop?: OrchardCrop;
};

export default function OrchardCropForm({ orchardCrop }: OrchardCropFormProps) {
    const id = useModalStore(state => state.id)!;
    const { register, control, setValue } = useFormContext<CreateOrchardCropInput>();
    const { errors } = useFormState({ control });

    useEffect(() => {
        setValue("orchard_id", orchardCrop?.orchard.id ?? id);
    }, [id, orchardCrop, setValue]);

    return (
        <>
            <div className="md:col-span-2">
                <FormLabel htmlFor="hectares">
                    Hectáreas
                </FormLabel>

                <FormInput
                    id="hectares"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Ingresa las hectáreas"
                    defaultValue={orchardCrop ? orchardCrop.hectares : ""}
                    hasError={!!errors.hectares}
                    {...register("hectares", {
                        valueAsNumber: true,
                    })}
                />

                {errors.hectares && (<FormError>{errors.hectares.message}</FormError>)}
            </div>

            <div className="md:col-span-2">
                <FormLabel htmlFor="product_id">
                    Producto
                </FormLabel>

                <FormSearchAutocomplete<CreateOrchardCropInput, number>
                    id="product_id"
                    name="product_id"
                    queryKey="products-search"
                    fetchOptions={searchProductsByText}
                    placeholder="Busca un producto..."
                    initialOption={
                        orchardCrop
                            ? { value: orchardCrop.product.id, label: orchardCrop.product.name }
                            : null
                    }
                />

                {errors.product_id && (<FormError>{errors.product_id.message}</FormError>)}
            </div>

            <div className="md:col-span-2">
                <FormLabel htmlFor="note">
                    Nota
                </FormLabel>

                <FormTextArea
                    id="note"
                    placeholder="Ingresa una nota sobre la huerta"
                    hasError={!!errors.note}
                    defaultValue={orchardCrop?.note ?? ""}
                    {...register("note")}
                />

                {errors.note && <FormError>{errors.note.message}</FormError>}
            </div>

            <FormInput
                className="hidden"
                value={orchardCrop?.orchard.id ?? id}
                {...register('orchard_id')}
            />
        </>
    );
}
