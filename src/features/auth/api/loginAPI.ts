import api from "@/lib/axios";
import { UserSchema, type SingInInput } from "../schemas/authSchema";
import { handleApiError } from "@/utils/errorHandler";
import { ServerResponseSchema } from "@/shared/dashboard/schemas/globalSchema";

export async function login(
    formData: SingInInput
) {
    try {
        const { data } = await api.post("/auth/login",formData);

        return ServerResponseSchema.parse(data);

    } catch (error) {
        throw handleApiError(error);
    }
}

export async function getUser() {
    try {
        const { data } = await api.get("/auth/user");
        const response = UserSchema.parse(data);
        if (response.success) {
            return response.data;
        }
        throw new Error('Hubo un error');
    } catch (error) {
        throw handleApiError(error);
    }
}
