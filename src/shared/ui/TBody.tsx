import clsx from "clsx";
import type { HTMLAttributes } from "react";

type TBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export default function TBody(props: TBodyProps) {
    const { className, children, ...rest } = props;

    return (
        <tbody
            {...rest}
            className={clsx(
                `
                divide-y divide-slate-100
                [&>tr:nth-child(odd)]:bg-white
                [&>tr:nth-child(even)]:bg-slate-100
                `,
                className
            )}
        >
            {children}
        </tbody>
    );
}