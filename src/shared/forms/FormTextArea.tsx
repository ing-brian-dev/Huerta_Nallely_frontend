import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean;
};

export function FormTextArea({
    className,
    hasError = false,
    ...props
}: FormTextAreaProps) {
    return (
        <textarea
            {...props}
            className={clsx(
                "w-full rounded-full px-4 py-3 outline-none shadow-md transition-colors duration-300 ease-in-out placeholder:text-slate-400 resize-none",
                hasError
                    ? "border border-red-500 focus:border-2 focus:border-amber-300"
                    : "focus:border-2 focus:border-green-700",
                className
            )}
        />
    );
}