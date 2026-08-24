import {
    CreateCustomerResponseSchema,
    GetCustomerResponseSchema,
    GetCustomersResponseSchema,
    UpdateCustomerResponseSchema,
    type CreateCustomerInput,
    type UpdateCustomerInput,
} from "../schemas/customerSchema";
import { handleApiError } from "@/utils/errorHandler";

import api from "@/lib/axios";
import { GetCustomerTypesResponseSchema } from "../schemas/customerTypeSchema";
import { GetCountriesResponseSchema } from "../schemas/countrySchema";

export async function createCustomer(formData: CreateCustomerInput) {
    try {
        const { data } = await api.post("/customers", formData);

        return CreateCustomerResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function updateCustomerById(formData: UpdateCustomerInput & { id: number }) {
    try {
        const { id, ...rest } = formData;
        const { data } = await api.put(`/customers/${id}`, rest);
        return UpdateCustomerResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getCustomerById(id: number) {
    try {
        const { data } = await api.get(`/customers/${id}`);

        return GetCustomerResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getAllCustomers() {
    try {
        const { data } = await api.get("/customers");

        return GetCustomersResponseSchema.parse(data);
    } catch (error) {
        throw handleApiError(error);
    }
}

// Customer Types
export async function getAllCustomerTypes() {
    try {
        const { data } = await api.get("/customer-types");
        return GetCustomerTypesResponseSchema.parse(data);;
    } catch (error) {
        throw handleApiError(error);
    }
}

// Countries
export async function getAllCountries() {
    try {
        const { data } = await api.get("/countries");
        return GetCountriesResponseSchema.parse(data);;
    } catch (error) {
        throw handleApiError(error);
    }
}