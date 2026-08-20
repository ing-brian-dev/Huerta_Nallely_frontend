import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center 
                    bg-cover
                    bg-center
                    bg-no-repeat
                    bg-[url('/background-image.png')]
                "
            >
                <main className="max-w-2xl mx-auto py-16 px-5 bg-green-950 rounded-2xl">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
