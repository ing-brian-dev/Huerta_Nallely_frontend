import { ApiError } from "@/utils/ApiError";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, //cookies acces_token
});

//Protect the view
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

// Get errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const data = error.response.data as {
                success?: boolean;
                message?: string;
                errors?: unknown;
            };

            const message =
                data?.message ||
                error.message ||
                "Error en el servidor";

            return Promise.reject(
                new ApiError(
                    message,
                    error.response.status,
                    data?.errors ?? null
                )
            );
        }

        return Promise.reject(error);
    }
);

export default api;