import clsx from "clsx";
import { Plus } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type ButtonActionProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonAction({ ...props }: ButtonActionProps) {
    const { className, children } = props;
    return (
        <button
            {...props}
            className={clsx(
                `
                    inline-flex
                    items-center
                    gap-2
                    bg-green-700
                    hover:bg-green-800
                    disabled:bg-green-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    px-5
                    py-2.5
                    font-semibold
                    rounded-full
                    text-white
                    cursor-pointer
                    transition-colors
                    duration-300
                    ease-in-out
                `,
                className
            )}
        >
            <Plus className="h-5 w-5 shrink-0" strokeWidth={3} />
            <span>{children}</span>
        </button>
    );
}