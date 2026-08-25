import { FormError } from "@/shared/forms/FormError";
import { FormInput } from "@/shared/forms/FormInput";
import { FormLabel } from "@/shared/forms/FormLabel";
import { Controller, useFormContext } from "react-hook-form";
import { FormTextArea } from "@/shared/forms/FormTextArea";
import type { UpdateOrchardInput } from "../schemas/orchardSchema";
import { FormSwitch } from "@/shared/forms/FormSwitch";

type OrchardFormProps = {
    orchard?: UpdateOrchardInput;
};

export default function OrchardForm({ orchard }: OrchardFormProps) {

    const { register, formState: { errors }, control } = useFormContext<UpdateOrchardInput>();

    return (
        <>
            <div className="md:col-span-2">
                <FormLabel htmlFor="name">
                    Nombre de la huerta
                </FormLabel>

                <FormInput
                    id="name"
                    type="text"
                    placeholder="Ingresa el nombre de la huerta"
                    hasError={!!errors.name}
                    defaultValue={orchard ? orchard.name : ""}
                    {...register("name")}
                />

                {errors.name && <FormError>{errors.name.message}</FormError>}
            </div>

            <div className="md:col-span-2">
                <FormLabel htmlFor="municipality">
                    Municipio
                </FormLabel>

                <FormInput
                    id="municipality"
                    type="text"
                    placeholder="Ingresa el municipio"
                    hasError={!!errors.municipality}
                    defaultValue={orchard ? orchard.municipality : ""}
                    {...register("municipality")}
                />

                {errors.municipality && <FormError>{errors.municipality.message}</FormError>}
            </div>

            <div className="md:col-span-2">
                <FormLabel htmlFor="state">
                    Estado
                </FormLabel>

                <FormInput
                    id="state"
                    type="text"
                    placeholder="Ingresa el estado"
                    hasError={!!errors.state}
                    defaultValue={orchard ? orchard.state : ""}
                    {...register("state")}
                />

                {errors.state && <FormError>{errors.state.message}</FormError>}
            </div>

            <div className="flex flex-col">
                <FormLabel htmlFor="hectares">
                    Hectáreas
                </FormLabel>

                <FormInput
                    id="hectares"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Ingresa la cantidad de hectáreas"
                    hasError={!!errors.hectares}
                    defaultValue={orchard ? orchard.hectares : ""}
                    {...register("hectares", { valueAsNumber: true })}
                />

                {errors.hectares && <FormError>{errors.hectares.message}</FormError>}
            </div>

            <div className="flex flex-col">
                <FormLabel htmlFor="registration_date">
                    Fecha de registro
                </FormLabel>

                <FormInput
                    id="registration_date"
                    type="date"
                    hasError={!!errors.registration_date}
                    defaultValue={orchard?.registration_date ?? ""}
                    {...register("registration_date")}
                />

                {errors.registration_date && <FormError>{errors.registration_date.message}</FormError>}
            </div>

            {orchard && (
                <div className="flex flex-col">
                    <FormLabel htmlFor="isActive">
                        Esta activo
                    </FormLabel>
                    <Controller
                        name="is_active"
                        control={control}
                        defaultValue={orchard ? orchard.is_active! : false}
                        render={({ field: { value, onChange } }) => (
                            <FormSwitch
                                id="is_active"
                                checked={!!value}
                                onChange={onChange}
                                className={errors.is_active ? 'ring-2 ring-red-500' : ''}
                            />
                        )}
                    />
                    {errors.is_active && <FormError>{errors.is_active.message}</FormError>}

                </div>
            )}

            <div className="md:col-span-2">
                <FormLabel htmlFor="orchard_note">
                    Nota
                </FormLabel>

                <FormTextArea
                    id="orchard_note"
                    placeholder="Ingresa una nota sobre la huerta"
                    hasError={!!errors.orchard_note}
                    defaultValue={orchard?.orchard_note ?? ""}
                    {...register("orchard_note")}
                />

                {errors.orchard_note && <FormError>{errors.orchard_note.message}</FormError>}
            </div>
        </>
    );
}