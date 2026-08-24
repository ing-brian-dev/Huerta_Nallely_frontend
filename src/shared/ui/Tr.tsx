import clsx from "clsx";
import type { HTMLAttributes } from "react";

type TrProps = HTMLAttributes<HTMLTableRowElement>;

export default function Tr(props: TrProps) {
    const { className, children, ...rest } = props;

    return (
        <tr
            {...rest}
            className={clsx(
                `
                    bg-white
                    transition-colors
                    duration-200
                    hover:bg-emerald-50/40
                `,
                className
            )}
        >
            {children}
        </tr>
    );
}