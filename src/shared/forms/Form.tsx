import type { FormHTMLAttributes } from "react";
import clsx from "clsx";

type FormProps = FormHTMLAttributes<HTMLFormElement>

export function Form(props: FormProps) {

    const { className, children } = props;

    return (
        <form
            {...props}
            className={clsx('space-y-3', className)}
        >
            {children}
        </form>
    )
}
