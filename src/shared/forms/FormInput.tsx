import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>


export function FormInput(props: FormInputProps) {

    const { className } = props;

    return (
        <input
            {...props}
            className={clsx('rounded-2xl w-full px-4 py-3', className)}
        />
    )
}
