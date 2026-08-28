import { handleApiError } from "@/utils/errorHandler";
import api from "@/lib/axios";
import { CreateProductResponseSchema, GetProductResponseSchema, GetProductsResponseSchema, UpdateProductResponseSchema, type CreateProductInput, type UpdateProductInput } from "../schemas/productSchema";

export async function createProduct(formData: CreateProductInput) {
    try {
        const { data } = await api.post("/products", formData);
        return CreateProductResponseSchema.parse(data);
    }
    catch (error) {
        throw handleApiError(error);
    }
}

export async function updateProductById(formData: UpdateProductInput & { id: number }) {
    try {
        const { id, ...rest } = formData;
        const { data } = await api.put(`/products/${id}`, rest);
        return UpdateProductResponseSchema.parse(data);
    }
    catch (error) {
        throw handleApiError(error);
    }
}

export async function getAllProducts() {
    try {
        const { data } = await api.get("/products");
        return GetProductsResponseSchema.parse(data);
    }
    catch (error) {
        throw handleApiError(error);
    }
}

export async function getProductById(id: number) {
    try {
        const { data } = await api.get(`/products/${id}`);
        return GetProductResponseSchema.parse(data);
    }
    catch (error) {
        throw handleApiError(error);
    }
}