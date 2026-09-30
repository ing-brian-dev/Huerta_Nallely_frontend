import { handleApiError } from "@/utils/errorHandler";
import api from "@/lib/axios";
import {
    CreateOrchardResponseSchema,
    GetOrchardResponseSchema,
    GetOrchardsResponseSchema,
    UpdateOrchardResponseSchema, type CreateOrchardInput,
    type UpdateOrchardInput
} from "../schemas/orchardSchema";

export async function createOrchard(formData: CreateOrchardInput) {
    try {
        const { data } = await api.post("/orchards", formData);
        return CreateOrchardResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function updateOrchardById(formData: UpdateOrchardInput & { id: number }) {
    try {
        const { id, ...rest } = formData;
        const { data } = await api.put(`/orchards/${id}`, rest);
        return UpdateOrchardResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getAllOrchards() {
    try {
        const { data } = await api.get("/orchards");
        return GetOrchardsResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getOrchardById(id: number) {
    try {
        const { data } = await api.get(`/orchards/${id}`);
        return GetOrchardResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}