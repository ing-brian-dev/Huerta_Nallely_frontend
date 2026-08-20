import clsx from "clsx";
import type { TdHTMLAttributes } from "react";

type TdProps = TdHTMLAttributes<HTMLTableCellElement>;

export default function Td(props: TdProps) {
    const { className, children } = props;

    return (
        <td
            {...props}
            className={clsx(
                "px-4 py-10 text-center text-sm",
                className
            )}
        >
            {children}
        </td>
    );
}