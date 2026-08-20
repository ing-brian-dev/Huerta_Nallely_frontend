import { type ReactNode } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { CircleX } from "lucide-react";
import clsx from "clsx";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
    sm: "max-w-[36rem]",
    md: "max-w-[42rem]",
    lg: "max-w-[48rem]",
    xl: "max-w-[56rem]",
};

export default function Modal({
    open,
    onClose,
    title,
    description,
    children,
    size = "md",
    className,
}: ModalProps) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm transition duration-300 ease-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <DialogPanel
                        transition
                        className={clsx(
                            "w-full overflow-hidden rounded-[28px] border border-slate-200/10 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl text-left",
                            "transition duration-300 ease-out data-closed:translate-y-4 data-closed:scale-95 data-closed:opacity-0",
                            sizeClasses[size],
                            className
                        )}
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-6 py-5">
                            <div>
                                {title ? (
                                    <DialogTitle as="h2" className="text-lg font-semibold text-slate-900">
                                        {title}
                                    </DialogTitle>
                                ) : null}
                                {description ? (
                                    <Description className="mt-2 text-sm leading-6 text-slate-600">
                                        {description}
                                    </Description>
                                ) : null}
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer transition-colors hover:bg-red-500 hover:text-white rounded-full focus:outline-none focus:text-white focus:bg-red-500"
                            >
                                <CircleX  className="size-10" />
                            </button>
                        </div>

                        <div className="px-6 py-6">
                            {children}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}