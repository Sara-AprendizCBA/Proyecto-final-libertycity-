import { useState } from 'react'
import logo from '../assets/logo_light.png'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="libertycity logo" className="h-12 w-12 object-contain" />
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">libertycity</h1>
                        <p className="text-xs sm:text-sm text-gray-600">Una página para entretener</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                    <a className="hover:text-gray-900" href="#">Inicio</a>
                    <a className="hover:text-gray-900" href="#">Categorías</a>
                    <a className="hover:text-gray-900" href="#">Novedades</a>
                    <a className="hover:text-gray-900" href="#">Autores</a>
                    <a className="hover:text-gray-900" href="#">Mi Biblioteca</a>
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <DarkModeToggle />
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 border rounded text-sm text-gray-700 hover:bg-gray-100">
                        <i className="fas fa-upload" aria-hidden="true"></i>
                        Subir
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
                        <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                        Entrar
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    onClick={() => setOpen((s) => !s)}
                    aria-label="Abrir menú"
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                    </svg>
                </button>
            </div>

            {/* Mobile menu panel */}
            {open && (
                <div className="mt-3 md:hidden bg-white border rounded-md p-4">
                    <div className="flex flex-col gap-3">
                        <a className="text-gray-700" href="#">Inicio</a>
                        <a className="text-gray-700" href="#">Categorías</a>
                        <a className="text-gray-700" href="#">Novedades</a>
                        <a className="text-gray-700" href="#">Autores</a>
                        <a className="text-gray-700" href="#">Mi Biblioteca</a>
                        <div className="flex gap-2 mt-2">
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100">
                                <i className="fas fa-plus" aria-hidden="true"></i>
                                Publicar
                            </button>
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700">
                                <i className="fas fa-user" aria-hidden="true"></i>
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
