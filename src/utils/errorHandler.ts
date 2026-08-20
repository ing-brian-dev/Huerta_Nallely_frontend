import type { AxiosError } from 'axios';
import { ApiError } from './ApiError';

export const handleApiError = (error: unknown) => {
    if (error instanceof ApiError) {
        return error;
    }

    if (isAxiosError(error) && error.response) {
        const data = error.response.data as { success?: boolean; message?: string; errors?: unknown };
        const message = data?.message || error.message || 'Error en la conexión con el servidor';
        return new ApiError(message, error.response.status, data?.errors ?? null);
    }

    if (error instanceof Error) {
        return new ApiError(error.message, 500, null);
    }

    return new ApiError('Error desconocido', 500, null);
};

const isAxiosError = (error: unknown): error is AxiosError => {
    return Boolean(error && typeof error === 'object' && 'isAxiosError' in error && (error as any).isAxiosError === true);
};
