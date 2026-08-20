import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";
import { CustomersResponseSchema, type CustomerInput, type CustomerUpdateInput, CustomerResponseSchema } from "../schemas/customerSchema";
import { handleApiError } from "@/utils/errorHandler";
import { CustomerTypeResponseSchema } from "../schemas/customerTypeSchema";
import { CountryResponseSchema } from "../schemas/countrySchema";
import api from "@/lib/axios";
import z from "zod";

export async function createCustomer(formData: CustomerInput) {
    try {
        const { data } = await api.post("/customers", formData);

        const response = ServerResponseSchema.extend({
            data: z.object({})
        }).parse(data);

        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function updateCustomerById(formData: CustomerUpdateInput & { id: number }) {
    try {
        const { id, ...rest } = formData;
        const { data } = await api.put(`/customers/${id}`, rest);

        const response = ServerResponseSchema.extend({
            data: z.object({})
        }).parse(data);

        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getCustomerById(id: number) {
    try {
        const { data } = await api.get(`/customers/${id}`);

        const response = CustomerResponseSchema.parse(data);

        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getAllCustomers() {
    try {
        const { data } = await api.get("/customers");

        const response = CustomersResponseSchema.parse(data);

        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

// Customer Types
export async function getAllCustomerTypes() {
    try {
        const { data } = await api.get("/customer-types");

        const response = CustomerTypeResponseSchema.parse(data);

        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}

// Countries
export async function getAllCountries() {
    try {
        const { data } = await api.get("/countries");

        const response = CountryResponseSchema.parse(data);

        return response;
    } catch (error) {
        throw handleApiError(error);
    }
}