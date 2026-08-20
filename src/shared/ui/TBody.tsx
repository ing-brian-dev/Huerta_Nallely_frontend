import type { HTMLAttributes } from "react";
import clsx from "clsx";

type TBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export default function TBody(props: TBodyProps) {
    const { className, children } = props;

    return (
        <tbody
            {...props}
            className={clsx(
                "divide-y divide-stone-100",
                className
            )}
        >
            {children}
        </tbody>
    );
}