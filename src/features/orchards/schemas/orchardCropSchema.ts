import z from "zod";
import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import { OrchardSummarySchema, ProductSummarySchema } from "./shared";

/* =========================================================
 * Base
 * ========================================================= */

export const OrchardCropSchema = z.object({
    id: z
        .number({
            error: "El ID del cultivo debe ser un número.",
        })
        .int({
            error: "El ID del cultivo debe ser un número entero.",
        })
        .positive({
            error: "El ID del cultivo no es válido.",
        }),

    hectares: z.number({
        error: "Las hectáreas del cultivo deben ser texto o número.",
    }),

    planting_date: z.string().nullable(),

    is_active: z.boolean({
        error: "El estado del cultivo debe ser verdadero o falso.",
    }),

    note: z.string().nullable(),

    orchard: OrchardSummarySchema,
    product: ProductSummarySchema,
});

/* =========================================================
 * Inputs
 * ========================================================= */

export const CreateOrchardCropSchema = z.object({
    hectares: z.number({
        error: "Las hectáreas del cultivo deben ser un número.",
    }),

    planting_date: z.string({
        error: "La fecha de siembra no tiene un formato válido.",
    })
        .nullable()
        .optional(),

    is_active: z
        .boolean({
            error: "El estado del cultivo debe ser verdadero o falso.",
        })
        .optional()
        .default(true),

    note: z
        .string({
            error: "Las notas deben ser texto.",
        })
        .trim()
        .max(500, {
            error: "Las notas no pueden superar los 500 caracteres.",
        })
        .nullable()
        .optional(),

    orchard_id: z
        .number({
            error: "El ID de la huerta es obligatorio.",
        })
        .int({
            error: "El ID de la huerta debe ser un número entero.",
        })
        .positive({
            error: "El ID de la huerta no es válido.",
        }),

    product_id: z
        .number({
            error: "El ID del producto es obligatorio.",
        })
        .int({
            error: "El ID del producto debe ser un número entero.",
        })
        .positive({
            error: "El ID del producto no es válido.",
        }),
});

export const UpdateOrchardCropSchema = CreateOrchardCropSchema.partial();

/* =========================================================
 * Responses
 * ========================================================= */

export const GetOrchardCropResponseSchema = ServerResponseSchema.extend({
    data: OrchardCropSchema,
});

export const GetOrchardCropsResponseSchema = ServerResponseSchema.extend({
    data: z.array(OrchardCropSchema),
});

export type OrchardCrop = z.infer<typeof OrchardCropSchema>;
export type CreateOrchardCropInput = z.infer<typeof CreateOrchardCropSchema>;
export type UpdateOrchardCropInput = z.infer<typeof UpdateOrchardCropSchema>;
