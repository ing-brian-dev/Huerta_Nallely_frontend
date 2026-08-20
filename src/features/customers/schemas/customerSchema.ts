import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import { z } from "zod";
import { CountrySchema } from "./countrySchema";
import { CustomerTypeSchema } from "./customerTypeSchema";

export const CustomerSchema = z.object({
    id: z.number()
        .int({ error: "El ID del cliente debe ser un número entero.", })
        .positive({ error: "El ID del cliente no es válido.", }),
    name: z.string()
        .trim()
        .min(1, { error: "El nombre del cliente es requerido.", })
        .max(100, { error: "El nombre del cliente no puede superar los 100 caracteres.", }),
    phone: z.string()
        .trim()
        .regex(/^\d{10}$/, { error: "El celular debe tener 10 dígitos y ser numerico" }),
    address: z.string()
        .trim()
        .max(200, { error: "La dirección no puede superar los 200 caracteres.", })
        .nullable()
        .optional(),
    email: z.preprocess(
        (value) => value === "" ? undefined : value,
        z.email({ error: "El correo electrónico no es válido." })
            .trim()
            .max(100, { error: "El correo electrónico no puede superar los 100 caracteres.", })
            .optional()
            .nullable()
    ),
    country_id: z.number()
        .min(1, { error: "Debes seleccionar al menos un pais.", }),
    customer_type_id: z.number()
        .min(1, { error: "Debes seleccionar al menos un tipo de cliente.", }),
    isActive: z.boolean({ error: "El estado del cliente debe ser verdadero o falso.", }),
    createdAt: z.iso.datetime({ error: "La fecha de creación no tiene un formato válido.", }),
    updatedAt: z.iso.datetime({ error: "La fecha de actualización no tiene un formato válido.", }),
});

export const CustomerInputSchema = CustomerSchema.omit({
    id: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
});

export const CustomerUpdateSchema = CustomerSchema.pick({
    name: true,
    phone: true,
    address: true,
    email: true,
    country_id: true,
    customer_type_id: true,
    isActive: true
})

export const CustomerResponseSchema = ServerResponseSchema.extend({
    data: CustomerSchema.pick({
        name: true,
        phone: true,
        address: true,
        email: true,
        country_id: true,
        customer_type_id: true,
        isActive: true
    })
})

export const CustomersResponseSchema = ServerResponseSchema.extend({
    data: z.array(CustomerSchema.extend({
        country: CountrySchema.pick({
            name: true,
            isoCode: true
        }),
        customer_type: CustomerTypeSchema.pick({
            name: true,
            description: true
        })
    }))
});



export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerInput = z.infer<typeof CustomerInputSchema>;
export type CustomerUpdateInput = z.infer<typeof CustomerUpdateSchema>


