import clsx from "clsx";
import type { HTMLAttributes } from "react";

type THeadProps = HTMLAttributes<HTMLTableSectionElement>;

export default function THead(props: THeadProps) {
    const { className, children } = props;

    return (
        <thead
            {...props}
            className={clsx(
                "bg-emerald-50",
                className)}
        >
            {children}
        </thead>
    );
}