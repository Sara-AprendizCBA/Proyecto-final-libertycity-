import { useState } from "react";
import logo from "../assets/logo_light.png";
import DarkModeToggle from "./DarkModeToggle";

export default function Header({ usuario, onLogout, onOpenAuth, onOpenProfile }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="mb-6 bg-white dark:bg-slate-900 dark:text-white transition-colors duration-300">
            <div className="flex items-center justify-between">
                
                {/* LOGO */}
                <div className="flex items-center gap-4">
                    <img 
                        src={logo} 
                        alt="libertycity logo" 
                        className="h-12 w-12 object-contain"
                    />
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                            libertycity
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            Una página para entretener
                        </p>
                    </div>
                </div>

                {/* NAV DESKTOP */}
                <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-200">
                    <a className="hover:text-gray-900 dark:hover:text-white" href="#">Inicio</a>
                    <a className="hover:text-gray-900 dark:hover:text-white" href="#">Categorías</a>
                    <a className="hover:text-gray-900 dark:hover:text-white" href="#">Novedades</a>
                    <a className="hover:text-gray-900 dark:hover:text-white" href="#">Autores</a>
                    <a className="hover:text-gray-900 dark:hover:text-white" href="#">Mi Biblioteca</a>
                </nav>

                {/* DERECHA */}
                <div className="hidden md:flex items-center gap-3">

                    {/* MODO OSCURO */}
                    <DarkModeToggle />

                    {/* SUBIR */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 
                        border rounded text-sm 
                        text-gray-700 hover:bg-gray-100 
                        dark:text-gray-200 dark:border-gray-700 dark:hover:bg-slate-800 
                        transition">
                        <i className="fa-solid fa-upload"></i>
                        Subir
                    </button>

                    {/* LOGIN O PERFIL */}
                    {!usuario ? (
                        <button 
                            onClick={onOpenAuth}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded 
                                bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                        >
                            <i className="fa-solid fa-right-to-bracket"></i>
                            Entrar
                        </button>
                    ) : (
                        <button
                            onClick={onOpenProfile}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded 
                                bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                        >
                            <i className="fa-solid fa-user-circle"></i>
                            {usuario.nombre || "Mi Perfil"}
                        </button>
                    )}
                </div>

                {/* MENÚ MÓVIL */}
                <button
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-lg 
                    text-gray-600 hover:bg-gray-100 
                    dark:text-gray-200 dark:hover:bg-slate-700 transition"
                    onClick={() => setOpen((s) => !s)}
                >
                    <i className="fa-solid fa-bars text-xl"></i>
                </button>
            </div>

            {/* MENÚ MÓVIL */}
            {open && (
                <div className="mt-3 md:hidden bg-white dark:bg-slate-800 border dark:border-gray-700 rounded-md p-4 transition">
                    <div className="flex flex-col gap-3 text-gray-700 dark:text-gray-200">
                        <a href="#">Inicio</a>
                        <a href="#">Categorías</a>
                        <a href="#">Novedades</a>
                        <a href="#">Autores</a>
                        <a href="#">Mi Biblioteca</a>

                        <div className="flex gap-2 mt-2">
                            {!usuario ? (
                                <button 
                                    onClick={() => { setOpen(false); onOpenAuth(); }}
                                    className="flex-1 inline-flex items-center justify-center gap-2 
                                    px-3 py-2 rounded text-sm 
                                    bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    <i className="fa-solid fa-user"></i>
                                    Iniciar sesión
                                </button>
                            ) : (
                                <button 
                                    onClick={() => { setOpen(false); onOpenProfile(); }}
                                    className="flex-1 inline-flex items-center justify-center gap-2 
                                    px-3 py-2 rounded text-sm 
                                    bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    <i className="fa-solid fa-user-circle"></i>
                                    Mi Perfil
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
