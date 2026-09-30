import clsx from "clsx"
import type { ButtonHTMLAttributes } from "react"

type FormCancelButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormCancelButton({ className, ...props }: FormCancelButtonProps) {

    return (
        <button
            type="button"
            {...props}
            className={clsx(
                `
                    bg-gray-600
                    hover:bg-gray-500
                    disabled:bg-gray-600
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
    )
}
