import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import { z } from "zod";
import { OrchardCropSummarySchema } from "./shared";

/* =========================================================
 * Base
 * ========================================================= */

export const OrchardSchema = z.object({
    id: z
        .number({
            error: "El ID de la huerta debe ser un número.",
        })
        .int({
            error: "El ID de la huerta debe ser un número entero.",
        })
        .positive({
            error: "El ID de la huerta no es válido.",
        }),

    name: z
        .string({
            error: "El nombre de la huerta es obligatorio.",
        })
        .trim()
        .min(1, {
            error: "El nombre de la huerta es obligatorio.",
        })
        .max(100, {
            error: "El nombre de la huerta no puede superar los 100 caracteres.",
        }),

    municipality: z
        .string({
            error: "El municipio es obligatorio.",
        })
        .trim()
        .min(1, {
            error: "El municipio es obligatorio.",
        })
        .max(250, {
            error: "El municipio no puede superar los 250 caracteres.",
        }),

    state: z
        .string({
            error: "El estado es obligatorio.",
        })
        .trim()
        .min(1, {
            error: "El estado es obligatorio.",
        })
        .max(100, {
            error: "El estado no puede superar los 100 caracteres.",
        }),

    hectares: z
        .number({
            error: "La cantidad de hectáreas es obligatoria.",
        })
        .min(0.01, {
            error: "Las hectáreas deben ser un número mayor a 0.",
        }),

    registration_date: z
        .iso.date({
            error: "La fecha de registro no tiene un formato válido.",
        })
        .nullable(),

    is_active: z
        .boolean({
            error: "El estado activo debe ser verdadero o falso.",
        }),

    orchard_note: z
        .string({
            error: "La nota de la huerta debe ser texto.",
        })
        .trim()
        .max(250, {
            error: "La nota de la huerta no puede superar los 250 caracteres.",
        })
        .nullable(),

    orchardCrops: z.array(OrchardCropSummarySchema).default([]),

    createdAt: z.iso.datetime({
        error: "La fecha de creación no tiene un formato válido.",
    }),

    updatedAt: z.iso.datetime({
        error: "La fecha de actualización no tiene un formato válido.",
    }),
});

export const CreateOrchardSchema = OrchardSchema.pick({
    name: true,
    municipality: true,
    state: true,
    hectares: true,
    registration_date: true,
    orchard_note: true,
});

export const UpdateOrchardSchema = OrchardSchema.pick({
    name: true,
    municipality: true,
    state: true,
    hectares: true,
    registration_date: true,
    orchard_note: true,
    is_active: true,
});

/* =========================================================
 * Responses
 * ========================================================= */

export const CreateOrchardCropResponseSchema = ServerResponseSchema.extend({
    data: z.object({}),
});

export const UpdateOrchardCropResponseSchema = ServerResponseSchema.extend({
    data: z.object({}),
});



export const CreateOrchardResponseSchema = ServerResponseSchema.extend({
    data: z.object({}),
});

export const UpdateOrchardResponseSchema = ServerResponseSchema.extend({
    data: z.object({}),
});

export const GetOrchardResponseSchema = ServerResponseSchema.extend({
    data: OrchardSchema,
});

export const GetOrchardsResponseSchema = ServerResponseSchema.extend({
    data: z.array(OrchardSchema),
});

/* =========================================================
 * Types
 * ========================================================= */

export type Orchard = z.infer<typeof OrchardSchema>;

export type CreateOrchardInput = z.infer<typeof CreateOrchardSchema>;

export type UpdateOrchardInput = z.infer<typeof UpdateOrchardSchema>;