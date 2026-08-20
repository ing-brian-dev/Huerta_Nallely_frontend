import type { LabelHTMLAttributes } from "react";
import clsx from "clsx";

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function FormLabel(props: FormLabelProps) {

    const { children, className } = props;

    return (
        <label
            {...props}
            className={clsx('block', className)}
        >
            {children}
        </label>
    )
}
