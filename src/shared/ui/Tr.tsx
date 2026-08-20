import clsx from "clsx";
import type { HTMLAttributes } from "react";

type TrProps = HTMLAttributes<HTMLTableRowElement>;

export default function Tr(props: TrProps) {
    const { className, children } = props;

    return (
        <tr
            {...props}
            className={clsx(
                "border-b border-stone-200 bg-stone-50/60",
                className
            )}
        >
            {children}
        </tr>
    );
}