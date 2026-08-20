import { useNavigate } from "react-router";
import { ArrowLeft} from 'lucide-react';

export default function NotFoundView() {

    const navigate = useNavigate();
    return (
        <main className="min-h-screen flex items-center justify-center px-6                     
                    bg-cover
                    bg-center
                    bg-no-repeat
                    bg-[url('/background-image.png')]"
        >
            <div className="w-full max-w-2xl">

                <div className="bg-white rounded-3xl border border-black/5 shadow-sm px-8 py-12 sm:px-12 text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-[#008c3a]">
                        Error 404
                    </p>

                    <h1 className="mt-3 text-5xl sm:text-6xl font-bold tracking-tight text-[#071c11]">
                        Página no encontrada
                    </h1>

                    <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-500">
                        La página que buscas no existe, fue movida o ya no
                        está disponible.
                    </p>

                    <div className="mx-auto my-8 h-px w-24 bg-gray-200" />

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-green-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-amber-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2"
                    >
                    <ArrowLeft />
                        Volver
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-white">
                    Huerta Nallely · Sistema interno
                </p>
            </div>
        </main>
    );
}