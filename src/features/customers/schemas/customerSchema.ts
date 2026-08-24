import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import { z } from "zod";
import { CountrySchema } from "./countrySchema";
import { CustomerTypeSchema } from "./customerTypeSchema";


/* =========================================================
 * Base
 * ========================================================= */

export const CustomerSchema = z.object({
    id: z
        .number({
            error: "El ID del cliente debe ser un número.",
        })
        .int({
            error: "El ID del cliente debe ser un número entero.",
        })
        .positive({
            error: "El ID del cliente no es válido.",
        }),

    name: z
        .string({
            error: "El nombre del cliente es obligatorio.",
        })
        .trim()
        .min(1, {
            error: "El nombre del cliente es obligatorio.",
        })
        .max(100, {
            error: "El nombre del cliente no puede superar los 100 caracteres.",
        }),

    phone: z
        .string({
            error: "El teléfono es obligatorio.",
        })
        .trim()
        .regex(/^\d{10}$/, {
            error: "El celular debe tener exactamente 10 dígitos numéricos.",
        }),

    address: z
        .string({
            error: "La dirección debe ser texto.",
        })
        .trim()
        .max(200, {
            error: "La dirección no puede superar los 200 caracteres.",
        })
        .nullable()
        .optional(),

    email: z.preprocess(
        (value) => (value === "" ? undefined : value),
        z
            .email({
                error: "El correo electrónico no es válido.",
            })
            .trim()
            .max(100, {
                error: "El correo electrónico no puede superar los 100 caracteres.",
            })
            .nullable()
            .optional()
    ),

    country_id: z
        .number({
            error: "Debes seleccionar un país.",
        })
        .int({
            error: "El país seleccionado no es válido.",
        })
        .positive({
            error: "Debes seleccionar un país.",
        }),

    customer_type_id: z
        .number({
            error: "Debes seleccionar un tipo de cliente.",
        })
        .int({
            error: "El tipo de cliente seleccionado no es válido.",
        })
        .positive({
            error: "Debes seleccionar un tipo de cliente.",
        }),

    isActive: z.boolean({
        error: "El estado del cliente debe ser verdadero o falso.",
    }),

    createdAt: z.iso.datetime({
        error: "La fecha de creación no tiene un formato válido.",
    }),

    updatedAt: z.iso.datetime({
        error: "La fecha de actualización no tiene un formato válido.",
    }),
});

/* =========================================================
 * Relations
 * ========================================================= */

export const CustomerWithRelationsSchema = CustomerSchema.extend({
    country: CountrySchema.pick({
        name: true,
        isoCode: true,
    }),

    customer_type: CustomerTypeSchema.pick({
        name: true,
        description: true,
    }),
});

/* =========================================================
 * Inputs
 * ========================================================= */

export const CreateCustomerSchema = CustomerSchema.pick({
    name: true,
    phone: true,
    address: true,
    email: true,
    country_id: true,
    customer_type_id: true,
});

export const UpdateCustomerSchema = CustomerSchema.pick({
    name: true,
    phone: true,
    address: true,
    email: true,
    country_id: true,
    customer_type_id: true,
    isActive: true,
});

/* =========================================================
 * Responses
 * ========================================================= */

/**
 * POST /customers
 */
export const CreateCustomerResponseSchema =
    ServerResponseSchema.extend({
        data: z.object({}),
    });

/**
 * PUT /customers/:id
 */
export const UpdateCustomerResponseSchema =
    ServerResponseSchema.extend({
        data: z.object({}),
    });

/**
 * GET /customers/:id
 */
export const GetCustomerResponseSchema =
    ServerResponseSchema.extend({
        data: CustomerSchema,
    });

/**
 * GET /customers
 */
export const GetCustomersResponseSchema =
    ServerResponseSchema.extend({
        data: z.array(CustomerWithRelationsSchema),
    });

/* =========================================================
 * Types
 * ========================================================= */

export type Customer = z.infer<typeof CustomerSchema>;

export type CustomerWithRelations = z.infer<
    typeof CustomerWithRelationsSchema
>;

export type CreateCustomerInput = z.infer<
    typeof CreateCustomerSchema
>;

export type UpdateCustomerInput = z.infer<
    typeof UpdateCustomerSchema
>;