import { FormInput } from "@/shared/forms/FormInput";
import { FormLabel } from "@/shared/forms/FormLabel";
import { FormError } from "@/shared/forms/FormError";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { SingInInput } from "../schemas/authSchema";
import { useState } from "react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, formState: { errors } } = useFormContext<SingInInput>();

    return (
        <>
            <FormLabel
                htmlFor="email"
                className="text-white"
            >
                E-mail
            </FormLabel>
            <div className="relative">
                <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                    size={18}
                />
                <FormInput
                    id="email"
                    type="email"
                    placeholder="Ingresa tu E-mail"
                    className={`bg-green-900 border focus:ring-0 text-white outline-none pl-10
                        ${errors.email
                            ? 'border-red-500'
                            : 'focus:border-amber-300'}`
                    }
                    {...register('email')}
                />
            </div>
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormLabel
                htmlFor="password"
                className="text-white"
            >
                Contraseña
            </FormLabel>
            <div className="relative">
                <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                    size={18}
                />
                <FormInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu Contraseña"
                    className={`bg-green-900 border focus:ring-0 text-white outline-none pl-10 pr-10
                        ${errors.password
                            ? 'border-red-500'
                            : 'focus:border-amber-300'}`
                    }
                    {...register('password')}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {errors.password && <FormError>{errors.password.message}</FormError>}
        </>
    );
}