export interface BackendErrorResponse {
    success: boolean;
    message: string;
    data?: unknown;
    errors?: unknown;
}

export class ApiError extends Error {
    statusCode: number;
    errors: unknown | null;

    constructor(message: string, statusCode = 500, errors: unknown | null = null) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export const isApiError = (error: unknown): error is ApiError => {
    return error instanceof ApiError;
};
