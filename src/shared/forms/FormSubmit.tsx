import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type FormSubmitProps = InputHTMLAttributes<HTMLInputElement>;

export function FormSubmit(props: FormSubmitProps) {
    const { className } = props;

    return (
        <input
            {...props}
            type="submit"
            className={clsx(
                `
                    bg-green-900 
                    hover:bg-amber-400
                    disabled:bg-green-900
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    w-full 
                    p-2 
                    mt-5 
                    uppercase 
                    font-black 
                    rounded-2xl 
                    text-white 
                    cursor-pointer
                    transition-colors
                    duration-300
                    ease-in-out
                `,
                className
            )}
        />
    );
}