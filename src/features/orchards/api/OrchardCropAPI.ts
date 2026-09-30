import api from "@/lib/axios";
import { handleApiError } from "@/utils/errorHandler";
import { CreateOrchardCropResponseSchema, UpdateOrchardCropResponseSchema } from "../schemas/orchardSchema";
import { GetOrchardCropResponseSchema, type CreateOrchardCropInput } from "../schemas/orchardCropSchema";


export async function createOrchardCrop(formData: CreateOrchardCropInput) {
    try {
        const { data } = await api.post('/orchard-crops', formData);
        return CreateOrchardCropResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function GetOrchardCropById(id: number) {
    try {
        const { data } = await api.get(`/orchard-crops/${id}`);
        const response = GetOrchardCropResponseSchema.parse(data);
        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function UpdateOrchardCrop(formData: CreateOrchardCropInput & { id: number }) {
    try {
        const { data } = await api.put(`/orchard-crops/${formData.id}`, formData);
        const response = UpdateOrchardCropResponseSchema.parse(data);
        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function deleteOrchardCropById(id: number) {
    try {
        const { data } = await api.delete(`/orchard-crops/${id}`);
        return data;
    } catch (error) {
        throw handleApiError(error);
    }
}