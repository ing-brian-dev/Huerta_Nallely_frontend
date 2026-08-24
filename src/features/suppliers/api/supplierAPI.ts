import api from "@/lib/axios";
import { handleApiError } from "@/utils/errorHandler";
import {
    CreateSupplierResponseSchema,
    GetSupplierResponseSchema,
    GetSuppliersResponseSchema,
    UpdateSupplierResponseSchema,
    type CreateSupplierInput,
    type UpdateSupplierInput,
} from "../schemas/supplierSchema";

export async function createSupplier(formData: CreateSupplierInput) {
    try {
        const { data } = await api.post("/suppliers", formData);

        return CreateSupplierResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getSupplierById(id: number) {
    try {
        const { data } = await api.get(`/suppliers/${id}`);
        return GetSupplierResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function updateSupplier(formData: UpdateSupplierInput & { id: number }) {
    try {
        const { id, ...rest } = formData;
        const { data } = await api.put(`/suppliers/${id}`, rest);
        return UpdateSupplierResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getAllSuppliers() {
    try {
        const { data } = await api.get("/suppliers");
        return GetSuppliersResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}