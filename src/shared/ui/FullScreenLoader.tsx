import { Sprout } from "lucide-react";

export default function FullScreenLoader() {
    return (
        <main
            className="min-h-screen flex items-center justify-center px-6 
                bg-cover
                bg-center
                bg-no-repeat
                bg-[url('/background-image.png')]
        ">
            <div className="w-full max-w-sm">

                <div className="bg-white rounded-3xl border border-black/5 shadow-sm px-8 py-10 text-center">

                    {/* Icono */}
                    <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                        {/* Spinner */}
                        <div
                            className="
                                absolute inset-0
                                rounded-full
                                border-4
                                border-[#e6f2ea]
                                border-t-green-900
                                animate-spin
                            "
                        />

                        {/* Logo */}
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e6f2ea]">
                            <Sprout
                                size={24}
                                strokeWidth={2}
                                className="text-green-900"
                            />
                        </div>
                    </div>

                    {/* Texto */}
                    <h2 className="text-lg font-bold tracking-tight text-[#071c11]">
                        Cargando
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Preparando la información...
                    </p>

                    {/* Indicador inferior */}
                    <div className="mx-auto mt-6 flex justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-900 animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-green-900 animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-green-900 animate-bounce" />
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    Huerta Nallely · Sistema interno
                </p>
            </div>
        </main>
    );
}