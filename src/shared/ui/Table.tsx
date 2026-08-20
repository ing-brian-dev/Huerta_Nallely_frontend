import clsx from "clsx";
import type { TableHTMLAttributes } from "react";

type TableProps = TableHTMLAttributes<HTMLTableElement>;

export default function Table(props: TableProps) {
    const { className, children } = props;

    return (
        <div className="overflow-x-auto rounded-2xl">
            <table
                {...props}
                className={clsx(
                    "w-full border-collapse text-left text-sm border border-stone-200 bg-white shadow-sm",
                    className
                )}
            >
                {children}
            </table>
        </div>
    );
}