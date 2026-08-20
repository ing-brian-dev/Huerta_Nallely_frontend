import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import clsx from "clsx";

export type ListBoxOption = {
    id: number;
    name: string;
};

type FormListBoxProps = {
    options: ListBoxOption[];
    value?: number;
    onChange: (value: number) => void;
    placeholder?: string;
    className?: string;
};

export function FormListBox(props: FormListBoxProps) {
    const {
        options,
        placeholder = 'Selecciona una opción',
        className,
        value,
        ...rest
    } = props;

    return (
        <Listbox {...rest} value={value} as="div" className="relative">
            <ListboxButton
                className={clsx(
                    'relative block w-full rounded-2xl px-4 py-3 text-left shadow-md outline-none transition-colors duration-300 ease-in-out',
                    !value && 'text-slate-400',
                    className
                )}
            >
                {options.find(option => option.id === value)?.name ?? placeholder}

                <ChevronDownIcon
                    className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                />
            </ListboxButton>

            <ListboxOptions
                anchor="bottom"
                transition
                className="w-(--button-width) rounded-2xl border border-slate-200 bg-white p-1 shadow-lg z-50 [--anchor-gap:--spacing(1)] focus:outline-none transition duration-100 ease-in data-leave:data-closed:opacity-0"
            >
                {options.map((option) => (
                    <ListboxOption
                        key={option.id}
                        value={option.id}
                        className="group flex items-center gap-2 rounded-xl px-3 py-2 select-none data-focus:bg-emerald-100 cursor-pointer"
                    >
                        <CheckIcon className="invisible size-4 text-green-900 group-data-selected:visible" />

                        <span className="text-sm">
                            {option.name}
                        </span>
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    );
}