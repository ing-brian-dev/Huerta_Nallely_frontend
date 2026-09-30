import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import { z } from "zod";

/* =========================================================
 * Base
 * ========================================================= */

export const ProductSchema = z.object({
    id: z
        .number({
            error: "El ID del producto debe ser un número.",
        })
        .int({
            error: "El ID del producto debe ser un número entero.",
        })
        .positive({
            error: "El ID del producto no es válido.",
        }),

    name: z
        .string({
            error: "El nombre del producto es obligatorio.",
        })
        .trim()
        .min(1, {
            error: "El nombre del producto es obligatorio.",
        })
        .max(100, {
            error: "El nombre del producto no puede superar los 100 caracteres.",
        }),

    description: z
        .string({
            error: "La descripción debe ser texto.",
        })
        .trim()
        .max(250, {
            error: "La descripción no puede superar los 250 caracteres.",
        })
        .nullable(),

    is_active: z.boolean({
        error: "El estado activo debe ser verdadero o falso.",
    }),

    createdAt: z.iso.datetime({
        error: "La fecha de creación no tiene un formato válido.",
    }),

    updatedAt: z.iso.datetime({
        error: "La fecha de actualización no tiene un formato válido.",
    }),
});

/* =========================================================
 * Inputs
 * ========================================================= */

export const CreateProductSchema = ProductSchema.pick({
    name: true,
    description: true,
});

export const UpdateProductSchema = ProductSchema.pick({
    name: true,
    description: true,
    is_active: true,
});

/* =========================================================
 * Responses
 * ========================================================= */

export const CreateProductResponseSchema = ServerResponseSchema.extend({
    data: z.object({}),
});

export const UpdateProductResponseSchema = ServerResponseSchema.extend({
    data: z.object({}),
});

export const GetProductResponseSchema = ServerResponseSchema.extend({
    data: ProductSchema,
});

export const GetProductsResponseSchema = ServerResponseSchema.extend({
    data: z.array(ProductSchema),
});

/* =========================================================
 * Types
 * ========================================================= */

export type Product = z.infer<typeof ProductSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

