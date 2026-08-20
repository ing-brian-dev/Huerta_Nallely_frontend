import clsx from "clsx";
import type { ThHTMLAttributes } from "react";

type ThProps = ThHTMLAttributes<HTMLTableCellElement>;

export default function Th(props: ThProps) {
    const { className, children } = props;

    return (
        <th
            {...props}
            className={clsx(
                "whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide ",
                className
            )}
        >
            {children}
        </th>
    );
}