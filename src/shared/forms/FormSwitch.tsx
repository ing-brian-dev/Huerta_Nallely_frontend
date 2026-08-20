import { Switch, type SwitchProps } from "@headlessui/react";
import clsx from "clsx";

type FormSwitchProps = SwitchProps<'button'>;

export function FormSwitch(props: FormSwitchProps) {

    const { className } = props;

    return (
        <Switch
            {...props}
            className={clsx(
                'group inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-gray-300 transition-colors duration-300 ease-in-out data-checked:bg-green-700',
                className
            )}
        >
            <span
                aria-hidden="true"
                className="inline-block size-4 translate-x-1 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out group-data-checked:translate-x-6"
            />
        </Switch>
    )
}