import { Controller, useFormContext } from "react-hook-form";
import type { CustomerUpdateInput } from "../schemas/customerSchema";
import { FormLabel } from "@/shared/forms/FormLabel";
import { FormInput } from "@/shared/forms/FormInput";
import { FormError } from "@/shared/forms/FormError";
import { FormListBox } from "@/shared/forms/FormListBox";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries, getAllCustomerTypes } from "../api/customerAPI";
import Spinner from "@/shared/ui/Spinner";
import { FormSwitch } from "@/shared/forms/FormSwitch";

type CustomerFormProps = {
  customer?: CustomerUpdateInput;
}

export default function CustomerForm({ customer }: CustomerFormProps) {

  const { data: customerTypes, isLoading: isLoadingCustomerTypes } = useQuery({
    queryFn: getAllCustomerTypes,
    queryKey: ['customerTypes'],
    refetchOnWindowFocus: false,
  });

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryFn: getAllCountries,
    queryKey: ['countries'],
    refetchOnWindowFocus: false
  });

  const { register, formState: { errors }, control } = useFormContext<CustomerUpdateInput>();

  const inputClass = (hasError: boolean) => `
        w-full rounded-full outline-none shadow-md transition-colors duration-300 ease-in-out placeholder:text-slate-400
        ${hasError
      ? `border-red-500 focus:border-amber-300 focus:border-2 border`
      : `focus:border-green-700 focus:border-2`
    }
    `;

  return (
    <>
      <div className="md:col-span-2">
        <FormLabel htmlFor="name">
          Nombre
        </FormLabel>
        <FormInput
          id="name"
          type="text"
          placeholder="Ingresa el nombre del proveedor"
          className={inputClass(!!errors.name)}
          defaultValue={customer ? customer.name : ''}
          {...register('name')}
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}
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
          defaultValue={customer ? customer.phone : ''}
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
          defaultValue={customer ? customer.address! : ''}
          {...register('address')}
        />
        {errors.address && <FormError>{errors.address.message}</FormError>}
      </div>
      <div className="flex flex-col ">
        <FormLabel htmlFor="isActive">
          Esta activo
        </FormLabel>
        <Controller
          name="isActive"
          control={control}
          defaultValue={customer ? customer.isActive! : false}
          render={({ field: { value, onChange } }) => (
            <FormSwitch
              id="isActive"
              checked={!!value}
              onChange={onChange}
              className={errors.isActive ? 'ring-2 ring-red-500' : ''}
            />
          )}
        />
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
          defaultValue={customer ? customer.email! : ''}
          {...register('email')}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </div>
      <div className="flex flex-col ">
        {isLoadingCustomerTypes && (
          <Spinner />
        )}
        {customerTypes && <>
          <FormLabel htmlFor="customer_type_id">
            Typo de cliente
          </FormLabel>
          <Controller
            name="customer_type_id"
            control={control}
            defaultValue={customer ? customer.customer_type_id! : 0}
            render={({ field }) => (
              <FormListBox
                options={customerTypes.data}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecciona un tipo de cliente"
              />
            )}
          />
          {errors.customer_type_id && <FormError>{errors.customer_type_id.message}</FormError>}
        </>}
      </div>

      <div className="flex flex-col ">
        {isLoadingCountries && (
          <Spinner />
        )}
        {countries && <>
          <FormLabel htmlFor="country_id">
            Pais de procedencia
          </FormLabel>
          <Controller
            name="country_id"
            control={control}
            defaultValue={customer ? customer.country_id! : 0}
            render={({ field }) => (
              <FormListBox
                options={countries.data}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecciona un tipo de cliente"
              />
            )}
          />
          {errors.country_id && <FormError>{errors.country_id.message}</FormError>}
        </>}
      </div>

    </>
  )
}
