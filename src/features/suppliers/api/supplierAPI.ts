import z from "zod";
import api from "@/lib/axios";
import { handleApiError } from "@/utils/errorHandler";
import { SupplierResponseSchema, SuppliersResponseSchema, type SupplierInput, type UpdateSupplier } from "../schemas/supplierSchema";
import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";

export async function createSupplier(formData: SupplierInput) {
    try {
        const { data } = await api.post("/suppliers", formData);

        const response = ServerResponseSchema.extend({
            data: z.object({})
        }).parse(data);

        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getSupplier(id: number) {
    try {
        const { data } = await api.get(`/suppliers/${id}`);
        const response = SupplierResponseSchema.parse(data);
        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function updateSupplier(formData: UpdateSupplier & { id: number }) {
    try {
        const { id, ...rest } = formData;
        const { data } = await api.put(`/suppliers/${id}/edit`, rest);
        return data;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getAllSuppliers() {
    try {
        const { data } = await api.get("/suppliers");
        const response = SuppliersResponseSchema.parse(data);

        if (response.success) {
            return response;
        }
        throw new Error('Hubo un error');
    } catch (error) {
        throw handleApiError(error);
    }
}