import z from "zod";

export const ServerResponseSchema = z.object({
    success: z.boolean(),
    message: z.string()
})