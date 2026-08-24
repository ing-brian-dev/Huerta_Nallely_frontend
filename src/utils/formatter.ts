export const formDate = (date?: Date | string | null) => {
    if(!date) return "Sin fecha"
    return new Intl.DateTimeFormat("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};