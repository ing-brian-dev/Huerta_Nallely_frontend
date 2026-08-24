import clsx from "clsx";
import type { TableHTMLAttributes } from "react";

type TableProps = TableHTMLAttributes<HTMLTableElement>;

export default function Table(props: TableProps) {
    const { className, children, ...rest } = props;

    return (
        <div
            className="
                w-full overflow-x-auto rounded-[28px]
                border border-slate-200/80
                bg-white
                shadow-md shadow-slate-300/30
            "
        >
            <table
                {...rest}
                className={clsx(
                    "w-full min-w-max border-separate border-spacing-0 text-left",
                    className
                )}
            >
                {children}
            </table>
        </div>
    );
}