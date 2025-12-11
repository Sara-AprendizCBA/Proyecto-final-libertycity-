import { useState } from "react";

export default function Profile({ usuario, onClose, onLogout }) {
    const [editMode, setEditMode] = useState(false);
    const [tab, setTab] = useState("likes");

    const [nombre, setNombre] = useState(usuario.nombre);
    const [descripcion, setDescripcion] = useState(usuario.descripcion || "");
    const [avatar, setAvatar] = useState(
        usuario.avatar || "https://i.imgur.com/6VBx3io.png"
    );

    const [bannerColor, setBannerColor] = useState(
        usuario.bannerColor || "#4f46e5"
    );

    const [loading, setLoading] = useState(false);

    const guardarCambios = () => {
        setLoading(true);

        const datosActualizados = {
            ...usuario,
            nombre,
            descripcion,
            avatar,
            bannerColor,
        };

        setTimeout(() => {
            localStorage.setItem("usuario", JSON.stringify(datosActualizados));
            setEditMode(false);
            setLoading(false);
            window.location.reload();
        }, 1200);
    };

    const handleFoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setAvatar(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="fixed inset-0 bg-gray-100 dark:bg-slate-900 overflow-y-auto z-50 text-gray-900 dark:text-white">

            {/* LOADER */}
            {loading && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
                    <div className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex justify-between items-center px-5 py-3 bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl shadow-sm border-b border-gray-300/30">
                <button onClick={onClose} className="text-2xl hover:opacity-70">←</button>

                <h2 className="text-lg font-semibold tracking-wide">Mi Perfil</h2>

                {!editMode ? (
                    <button 
                        onClick={() => setEditMode(true)} 
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                    >
                        Editar
                    </button>
                ) : (
                    <button 
                        onClick={guardarCambios} 
                        className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
                    >
                        Guardar
                    </button>
                )}
            </div>

            {/* BANNER PROFESIONAL */}
            <div
                className="w-full h-44 relative shadow-md transition-all duration-500"
                style={{ backgroundColor: bannerColor }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

                {editMode && (
                    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-xl shadow-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Color:</span>
                            <input
                                type="color"
                                value={bannerColor}
                                onChange={(e) => setBannerColor(e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer border shadow"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* FOTO PROFESIONAL CUADRADA */}
            <div className="flex justify-center -mt-16">
                <div className="relative">
                    <img
                        src={avatar}
                        className="w-40 h-40 object-cover rounded-2xl border-4 border-white shadow-xl"
                    />

                    {editMode && (
                        <label className="absolute bottom-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md cursor-pointer shadow">
                            Cambiar
                            <input type="file" accept="image/*" onChange={handleFoto} className="hidden" />
                        </label>
                    )}
                </div>
            </div>

            {/* TARJETA DE INFORMACIÓN PROFESIONAL */}
            <div className="mt-8 px-4 flex flex-col items-center gap-3">

                {!editMode ? (
                    <h1 className="text-3xl font-bold tracking-tight">{usuario.nombre}</h1>
                ) : (
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="text-center text-2xl font-medium bg-white/70 dark:bg-slate-700 p-2 rounded-lg w-72 shadow"
                    />
                )}

                {!editMode ? (
                    <p className="text-gray-600 dark:text-gray-300 text-center max-w-md leading-relaxed text-sm">
                        {usuario.descripcion || "Sin descripción"}
                    </p>
                ) : (
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="bg-white/70 dark:bg-slate-700 mt-2 p-3 rounded-lg w-80 h-24 text-center resize-none shadow"
                    />
                )}
            </div>

            {/* TABS PROFESIONALES */}
            <div className="mt-8 flex w-full justify-around border-b border-gray-300/40 dark:border-gray-700">
                {["likes", "guardados", "leyendo", "subidos"].map((item) => (
                    <button
                        key={item}
                        onClick={() => setTab(item)}
                        className={`py-3 w-full text-sm capitalize transition-all tracking-wide
                            ${tab === item 
                                ? "text-blue-600 font-semibold border-b-2 border-blue-600" 
                                : "text-gray-400"}
                        `}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* CONTENIDO */}
            <div className="p-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center text-gray-600 dark:text-gray-300">
                    {tab === "likes" && <p>No tienes likes aún.</p>}
                    {tab === "guardados" && <p>No has guardado nada.</p>}
                    {tab === "leyendo" && <p>No tienes lecturas activas.</p>}
                    {tab === "subidos" && <p>No has subido libros.</p>}
                </div>
            </div>

            {/* LOGOUT */}
            <div className="flex justify-center pb-12">
                <button
                    onClick={onLogout}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
