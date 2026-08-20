import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import { z } from "zod";

export const CountrySchema = z.object({
    id: z.number(),
    name: z.string(),
    isoCode: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const CountryResponseSchema = ServerResponseSchema.extend({
    data: z.array(CountrySchema.omit({
        createdAt: true,
        updatedAt: true,
    }))
});

export type Country = z.infer<typeof CountrySchema>;