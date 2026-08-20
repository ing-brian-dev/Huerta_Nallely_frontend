import { ServerResponseSchema } from '@/shared/dashboard/schemas/globalSchema';
import { z } from 'zod';


export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, { error: 'El nombre es requerido.' }),
    email: z.email({ error: 'El email no es válido.' }).min(1, { error: 'El email es requerido.' }),
    password: z.string().trim().min(8, { error: 'El password debe ser mínimo 8 caracteres.' }),
    passwordConfirmation: z.string().trim().min(1, { error: 'El password de confirmación no puede ir vacio.' }),
    newPassword: z.string().trim().min(8, { error: 'El password debe ser mínimo 8 caracteres.' }),
    currentPassword: z.string().trim().min(1, { error: 'El password es requerido.' }),
});

export const SingInSchema = BaseAuthSchema.pick({
    email: true
}).extend({
    password: z.string().trim().min(1, { error: 'El password es requerido.' }),
});

export const UserSchema = ServerResponseSchema.extend({
    data: z.object({
        name: z.string(),
        email: z.string(),
        id: z.number(),
    })
});

export const IsJWTSchema = ServerResponseSchema.extend({
    data: z.object({
        token: z.string(),
    })
});

export type SingInInput = z.infer<typeof SingInSchema>;
export type User = z.infer<typeof UserSchema>;
export type IsJWT = z.infer<typeof IsJWTSchema>;