import { ServerResponseSchema } from '@/shared/dashboard/schemas/globalSchema';
import { z } from "zod";

export const SupplierSchema = z.object({
    id: z.number()
        .int({ error: "El ID del proveedor debe ser un número entero.", })
        .positive({ error: "El ID del proveedor no es válido." }),
    name: z.string()
        .trim().min(1, { error: "El nombre del proveedor es requerido.", })
        .max(100, { error: "El nombre del proveedor no puede superar los 100 caracteres.", }),
    contact_name: z.string()
        .trim().min(1, { error: "El nombre del contacto es requerido.", })
        .max(100, { error: "El nombre del contacto no puede superar los 100 caracteres.", }),
    phone: z.string()
        .trim().regex(/^\d{10}$/, { error: "El celular debe tener exactamente 10 dígitos." }),
    address: z.string()
        .trim().min(1, { error: "La dirección es requerida." })
        .max(255, { error: "La dirección no puede superar los 255 caracteres.", }),
    email: z.email()
        .transform((email) => email.trim().toLowerCase()),
    isActive: z.boolean({ error: "El estado del proveedor debe ser verdadero o falso." }),
    createdAt: z.iso.datetime({ error: "La fecha de creación no tiene un formato válido." }),
    updatedAt: z.iso.datetime({ error: "La fecha de actualización no tiene un formato válido." }),
});

export const CreateSupplierSchema = SupplierSchema.pick({
    name: true,
    contact_name: true,
    phone: true,
    address: true,
    email: true,
});

export const UpdateSupplierSchema = SupplierSchema.pick({
    name: true,
    contact_name: true,
    phone: true,
    address: true,
    email: true,
    isActive: true
});

export const CreateSupplierResponseSchema = ServerResponseSchema.extend({
    data: z.object({})
});

export const UpdateSupplierResponseSchema = ServerResponseSchema.extend({
    data: z.object({})
});

export const GetSupplierResponseSchema = ServerResponseSchema.extend({
    data: SupplierSchema
});

export const GetSuppliersResponseSchema = ServerResponseSchema.extend({
    data: z.array(SupplierSchema)
});


export type Supplier = z.infer<typeof SupplierSchema>;
export type CreateSupplierInput = z.infer<typeof CreateSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof UpdateSupplierSchema>;