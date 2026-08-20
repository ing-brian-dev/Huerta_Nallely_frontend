import Heading from '@/shared/typography/Heading'
import Logo from '@/shared/ui/Logo'
import { Leaf } from 'lucide-react'
import { Link } from 'react-router'

export default function LoginLogo() {
    return (
        <>
            <Link
                to={'/'}
                className="block w-48 mx-auto "
            >
                <Logo />
            </Link>
            <Heading
                className="text-white"
                level={1}
            >
                <div className="flex items-center justify-center gap-2">
                    Bienvenido de vuelta <Leaf />
                </div>
            </Heading>
            <p
                className="text-center text-white"
            >
                Inicia sesion para continuar
            </p>
        </>
    )
}
