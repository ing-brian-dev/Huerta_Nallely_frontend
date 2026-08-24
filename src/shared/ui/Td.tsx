import clsx from "clsx";
import type { TdHTMLAttributes } from "react";

type TdProps = TdHTMLAttributes<HTMLTableCellElement>;

export default function Td(props: TdProps) {
    const { className, children, ...rest } = props;

    return (
        <td
            {...rest}
            className={clsx(
                `
                    whitespace-nowrap
                    px-5 py-4
                    text-sm
                    font-medium
                    text-slate-600
                `,
                className
            )}
        >
            {children}
        </td>
    );
}