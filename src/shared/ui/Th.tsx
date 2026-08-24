import clsx from "clsx";
import type { ThHTMLAttributes } from "react";

type ThProps = ThHTMLAttributes<HTMLTableCellElement>;

export default function Th(props: ThProps) {
    const { className, children, ...rest } = props;

    return (
        <th
            {...rest}
            className={clsx(
                `
                    whitespace-nowrap
                    border-b border-slate-200
                    px-5 py-4
                    text-left
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    bg-green-700
                `,
                className
            )}
        >
            {children}
        </th>
    );
}