import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import z from "zod";

export const CustomerTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
});

export const CustomerTypesSchema = z.array(
    CustomerTypeSchema
);

export const CustomerTypeResponseSchema = ServerResponseSchema.extend({
    data: CustomerTypesSchema,
});

export type CustomerType = z.infer<typeof CustomerTypeSchema>;
export type CustomerTypeResponse = z.infer<typeof CustomerTypeResponseSchema>;