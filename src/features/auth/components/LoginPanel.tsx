import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { SingInSchema, type SingInInput } from "../schemas/authSchema";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/loginAPI";
import toast from "react-hot-toast";
import LoginForm from "./LoginForm";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { Form } from "@/shared/forms/Form";
import LoginLogo from "./LoginLogo";

export default function LoginPanel() {

    const navigate = useNavigate();

    const methods = useForm({
        resolver: zodResolver(SingInSchema),
        mode: 'all'
    })

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data.message);
            methods.reset();
            navigate('/dashboard');
        }
    });

    const onSubmit = async (formData: SingInInput) => {
        mutate(formData);
    }

    return (
        <>
            <LoginLogo />
            <FormProvider
                {...methods}
            >
                <Form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="mt-10"
                >
                    <LoginForm />
                    <FormSubmit
                        value={methods.formState.isSubmitting || isPending ? 'Ingresando...' : 'Iniciar Sesión'}
                        disabled={methods.formState.isSubmitting || isPending}
                    />
                </Form>
            </FormProvider >
        </>
    )
}
