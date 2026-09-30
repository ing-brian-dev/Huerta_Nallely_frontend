import { useState } from "react";
import Select from "react-select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
    Controller,
    useFormContext,
    type FieldValues,
    type Path,
    type PathValue,
} from "react-hook-form";
import { useDebounce } from "@/shared/hooks/useDebounce";

export type SelectOption<V extends string | number = number> = {
    value: V;
    label: string;
};

type FormSearchAutocompleteProps<TForm extends FieldValues, V extends string | number> = {
    id: string;
    name: Path<TForm>;
    queryKey: string;
    fetchOptions: (
        search: string,
        signal?: AbortSignal
    ) => Promise<SelectOption<V>[]>;
    initialOption?: SelectOption<V> | null;
    placeholder?: string;
    minChars?: number;
    isDisabled?: boolean;
};

export default function FormSearchAutocomplete<TForm extends FieldValues, V extends string | number = number>({
    id,
    name,
    queryKey,
    fetchOptions,
    initialOption = null,
    placeholder = "Escribe para buscar...",
    minChars = 2,
    isDisabled = false,
}: FormSearchAutocompleteProps<TForm, V>) {
    const { control } = useFormContext<TForm>();

    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState<SelectOption<V> | null>(initialOption);

    const search = inputValue.trim();
    const debouncedSearch = useDebounce(search, 400);
    const canSearch = debouncedSearch.length >= minChars;

    const { data = [], isFetching } = useQuery({
        queryKey: [queryKey, debouncedSearch],
        queryFn: ({ signal }) => fetchOptions(debouncedSearch, signal),
        enabled: canSearch,
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60,
        retry: false,
    });

    const options = canSearch ? data : [];

    const isLoading =
        search.length >= minChars &&
        (isFetching || search !== debouncedSearch);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={
                initialOption?.value as PathValue<TForm, Path<TForm>>
            }
            render={({ field, fieldState }) => {
                const currentValue =
                    selected && selected.value === field.value
                        ? selected
                        : null;

                return (
                    <Select<SelectOption<V>, false>
                        inputId={id}
                        ref={field.ref}
                        name={field.name}
                        placeholder={placeholder}
                        isClearable
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        options={options}
                        value={currentValue}
                        inputValue={inputValue}
                        onInputChange={setInputValue}
                        onBlur={field.onBlur}
                        onChange={(option) => {
                            setSelected(option);
                            field.onChange(option?.value ?? undefined);
                        }}
                        noOptionsMessage={() =>
                            search.length < minChars
                                ? `Escribe al menos ${minChars} caracteres`
                                : "Sin resultados"
                        }
                        loadingMessage={() => "Buscando..."}
                        classNamePrefix="form-search"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                width: "100%",
                                minHeight: "48px",
                                borderRadius: "9999px",
                                padding: "4px 8px",
                                outline: "none",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                transition:
                                    "border-color 300ms ease-in-out",
                                cursor: isDisabled
                                    ? "not-allowed"
                                    : "pointer",
                                opacity: isDisabled ? 0.5 : 1,

                                border: state.isFocused
                                    ? fieldState.error
                                        ? "2px solid #fcd34d"
                                        : "2px solid #15803d"
                                    : fieldState.error
                                        ? "1px solid #ef4444"
                                        : "1px solid transparent",

                                backgroundColor: isDisabled
                                    ? "#f1f5f9"
                                    : "#ffffff",

                                "&:hover": {
                                    borderColor: state.isFocused
                                        ? fieldState.error
                                            ? "#fcd34d"
                                            : "#15803d"
                                        : fieldState.error
                                            ? "#ef4444"
                                            : "#d1d5db",
                                },
                            }),

                            valueContainer: (base) => ({
                                ...base,
                                padding: "4px 8px",
                            }),

                            input: (base) => ({
                                ...base,
                                margin: 0,
                                padding: 0,
                                color: "#334155",
                            }),

                            placeholder: (base) => ({
                                ...base,
                                color: "#94a3b8",
                            }),

                            singleValue: (base) => ({
                                ...base,
                                color: "#334155",
                            }),

                            indicatorsContainer: (base) => ({
                                ...base,
                                paddingRight: "4px",
                            }),

                            dropdownIndicator: (base) => ({
                                ...base,
                                color: "#94a3b8",
                                transition: "color 300ms ease-in-out",
                            }),

                            clearIndicator: (base) => ({
                                ...base,
                                color: "#94a3b8",
                                cursor: "pointer",
                                transition: "all 200ms ease-in-out",

                                "&:hover": {
                                    color: "#ef4444",
                                    transform: "scale(1.1)",
                                },
                            }),

                            menu: (base) => ({
                                ...base,
                                marginTop: "8px",
                                borderRadius: "16px",
                                overflow: "hidden",
                                border: "1px solid #e2e8f0",
                                boxShadow:
                                    "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }),

                            menuList: (base) => ({
                                ...base,
                                padding: "4px",
                            }),

                            option: (base, state) => ({
                                ...base,
                                borderRadius: "10px",
                                padding: "10px 16px",
                                cursor: "pointer",
                                backgroundColor: state.isSelected
                                    ? "#15803d"
                                    : state.isFocused
                                        ? "#fef3c7"
                                        : "#ffffff",
                                color: state.isSelected
                                    ? "#ffffff"
                                    : "#334155",
                                transition:
                                    "background-color 200ms ease-in-out",

                                "&:active": {
                                    backgroundColor: "#15803d",
                                    color: "#ffffff",
                                },
                            }),
                        }}
                    />
                );
            }}
        />
    );
}