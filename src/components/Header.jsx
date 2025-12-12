import { useState } from "react";
<
import logoLight from "../assets/logo_light.png";
import logoDark from "../assets/logo_dark.png";

import logo from "../assets/logo_light.png";

import DarkModeToggle from "./DarkModeToggle";

export default function Header({ usuario, onLogout, onOpenAuth, onOpenProfile }) {
    const [open, setOpen] = useState(false);

    const avatarDefault =
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

    return (
        <header className="mb-6 bg-white dark:bg-slate-900 dark:text-white 
                          transition-colors duration-300 shadow-sm border-b border-gray-200 dark:border-slate-800">

            <div className="flex items-center justify-between px-4 py-3">

                {/* LOGO + NOMBRE */}
                <div className="flex items-center gap-3">
                    <img 

                        src={logoLight} 
                        alt="libertycity logo" 
                        className="h-12 w-12 object-contain opacity-95 rounded-full block dark:hidden"
                    />
                    <img 
                        src={logoDark} 
                        alt="libertycity logo dark" 
                        className="h-12 w-12 object-contain opacity-95 rounded-full hidden dark:block"

                        src={logo} 
                        alt="libertycity logo" 
                        className="h-12 w-12 object-contain opacity-95"

                    />

                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            libertycity
                        </h1>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            Una página para entretener
                        </p>
                    </div>
                </div>

                {/* NAVEGACIÓN DESKTOP */}
                <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                    {["Inicio", "Categorías", "Novedades", "Autores", "Mi Biblioteca"].map((item) => (
                        <a key={item} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            {item}
                        </a>
                    ))}
                </nav>

                {/* LADO DERECHO */}
                <div className="hidden md:flex items-center gap-4">

                    {/* DARK MODE */}
                    <DarkModeToggle />

                    {/* SUBIR */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 
                        border rounded-lg text-sm 
                        text-gray-700 hover:bg-gray-100 
                        dark:text-gray-200 dark:border-gray-700 dark:hover:bg-slate-800 
                        transition">
                        <i className="fa-solid fa-upload"></i> Subir
                    </button>

                    {/* LOGIN / PERFIL */}
                    {!usuario ? (
                        <button 
                            onClick={onOpenAuth}
                            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg 
                                       hover:bg-blue-700 transition text-sm font-medium"
                        >
                            Entrar
                        </button>
                    ) : (
                        <button
                            onClick={onOpenProfile}
                            className="p-1.5 rounded-full 
                                       bg-slate-100 dark:bg-slate-800 
                                       hover:bg-slate-200 dark:hover:bg-slate-700 
                                       transition border border-gray-300 dark:border-gray-700"
                        >
                            {/* AVATAR SOLO Y CIRCULAR */}
                            <img
                                src={usuario.avatar || avatarDefault}
                                className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                                alt="avatar"
                            />
                        </button>
                    )}
                </div>

                {/* NAV MÓVIL – HAMBURGER */}
                <button
                    className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 
                               hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                    onClick={() => setOpen((s) => !s)}
                >
                    <i className="fa-solid fa-bars text-xl"></i>
                </button>
            </div>

            {/* MENÚ MÓVIL */}
            {open && (
                <div className="md:hidden px-4 pb-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800 animate-fadeIn">

                    <div className="flex flex-col gap-4 mt-4 text-gray-700 dark:text-gray-200">

                        {["Inicio", "Categorías", "Novedades", "Autores", "Mi Biblioteca"].map((item) => (
                            <a key={item} className="text-sm">{item}</a>
                        ))}

                        {/* BOTONES */}
                        <div className="flex gap-2 mt-2">
                            {!usuario ? (
                                <button 
                                    onClick={() => { setOpen(false); onOpenAuth(); }}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                                >
                                    Iniciar sesión
                                </button>
                            ) : (
                                <button 
                                    onClick={() => { setOpen(false); onOpenProfile(); }}
                                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                                >
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
