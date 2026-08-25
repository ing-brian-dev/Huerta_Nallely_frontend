import api from "@/lib/axios";
import { getUser } from "@/features/auth/api/loginAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useAuth = () => {

    const queryClient = useQueryClient();
    const navigation = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const logout = async () => {

        try {
            await api.post("/auth/logout");
        } finally {
            queryClient.clear();

            navigation("/", {
                replace: true
            });
        }
    };

    return {
        data,
        isError,
        isLoading,
        logout
    };
};