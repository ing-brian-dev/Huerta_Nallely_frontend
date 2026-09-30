import { z } from "zod";

export const ProductSummarySchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
});

export const OrchardSummarySchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
});

export const OrchardCropSummarySchema = z.object({
    id: z.number().int().positive(),
    hectares: z.number(),
    planting_date: z.string().nullable(),
    is_active: z.boolean(),
    note: z.string().nullable(),
    product: ProductSummarySchema,
});
