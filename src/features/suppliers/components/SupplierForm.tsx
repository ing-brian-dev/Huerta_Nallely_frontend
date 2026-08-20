import { FormError } from "@/shared/forms/FormError";
import { FormInput } from "@/shared/forms/FormInput";
import { FormLabel } from "@/shared/forms/FormLabel";
import { useFormContext } from "react-hook-form";
import { type SupplierInput, type SupplierSchema } from "../schemas/supplierSchema";

type SupplierFormProps = {
    supplier?: SupplierSchema;
}

export default function SupplierForm({ supplier }: SupplierFormProps) {

    const { register, formState: { errors } } = useFormContext<SupplierInput>();

    const inputClass = (hasError: boolean) => `
        w-full rounded-full outline-none shadow-md transition-colors duration-300 ease-in-out placeholder:text-slate-400
        ${hasError
            ? `border-red-500 focus:border-amber-300 focus:border-2 border`
            : `focus:border-green-700 focus:border-2`
        }
    `;

    return (
        <>
            <div className="flex flex-col">
                <FormLabel htmlFor="name">
                    Nombre
                </FormLabel>
                <FormInput
                    id="name"
                    type="text"
                    placeholder="Ingresa el nombre del proveedor"
                    className={inputClass(!!errors.name)}
                    defaultValue={supplier ? supplier.name : ''}
                    {...register('name')}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </div>

            <div className="flex flex-col">
                <FormLabel htmlFor="contact_name">
                    Nombre de contacto
                </FormLabel>
                <FormInput
                    id="contact_name"
                    type="text"
                    placeholder="Ingresa el nombre del proveedor"
                    className={inputClass(!!errors.contact_name)}
                    defaultValue={supplier ? supplier.contact_name : ''}
                    {...register('contact_name')}
                />
                {errors.contact_name && <FormError>{errors.contact_name.message}</FormError>}
            </div>

            <div className="flex flex-col">
                <FormLabel htmlFor="phone">
                    Telefono
                </FormLabel>
                <FormInput
                    id="phone"
                    type="tel"
                    placeholder="Ingresa el numero del contacto"
                    className={inputClass(!!errors.phone)}
                    defaultValue={supplier ? supplier.phone : ''}
                    {...register('phone')}
                />
                {errors.phone && <FormError>{errors.phone.message}</FormError>}
            </div>

            <div className="flex flex-col">
                <FormLabel htmlFor="address">
                    Dirección
                </FormLabel>
                <FormInput
                    id="address"
                    type="text"
                    placeholder="Ingresa la direccion del contacto"
                    className={inputClass(!!errors.address)}
                    defaultValue={supplier ? supplier.address : ''}
                    {...register('address')}
                />
                {errors.address && <FormError>{errors.address.message}</FormError>}
            </div>

            <div className="flex flex-col ">
                <FormLabel htmlFor="email">
                    Correo electronico
                </FormLabel>
                <FormInput
                    id="email"
                    type="email"
                    placeholder="Ingresa la direccion de email"
                    className={inputClass(!!errors.email)}
                    defaultValue={supplier ? supplier.email : ''}
                    {...register('email')}
                />
                {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>
        </>
    )
}