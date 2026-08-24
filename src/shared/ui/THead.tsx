import clsx from "clsx";
import type { HTMLAttributes } from "react";

type THeadProps = HTMLAttributes<HTMLTableSectionElement>;

export default function THead(props: THeadProps) {
    const { className, children, ...rest } = props;

    return (
        <thead
            {...rest}
            className={clsx(
                "bg-slate-50/80",
                className
            )}
        >
            {children}
        </thead>
    );
}