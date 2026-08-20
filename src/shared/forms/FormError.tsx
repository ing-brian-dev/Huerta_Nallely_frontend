
export function FormError({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="p-1 font-bold text-red-600 text-sm"
        >
            {children}
        </p>
    )
}
