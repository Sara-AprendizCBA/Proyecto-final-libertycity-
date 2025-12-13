import { useState } from "react";

export default function Profile({ usuario, onClose, onLogout, onUpdateUser }) {
    const [editMode, setEditMode] = useState(false);
    const [tab, setTab] = useState("likes");
    const [loading, setLoading] = useState(false);
    const [bannerMenu, setBannerMenu] = useState(false);

    const [nombre, setNombre] = useState(usuario.nombre);
    const [descripcion, setDescripcion] = useState(usuario.descripcion || "");
    const [avatar, setAvatar] = useState(usuario.avatar);
    const [banner, setBanner] = useState(usuario.banner || "#eef2ff");

    const handleImageUpload = (e, setter) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setter(reader.result);
        reader.readAsDataURL(file);
    };

    const guardarCambios = async () => {
        setLoading(true);
        const start = Date.now();

        try {
            await onUpdateUser({
                ...usuario,
                nombre,
                descripcion,
                avatar,
                banner,
            });
        } catch (error) {
            console.error("Error al guardar cambios:", error);
        } finally {
            const elapsed = Date.now() - start;
            const minTime = 700;

            setTimeout(() => {
                setLoading(false);
                setEditMode(false);
            }, Math.max(0, minTime - elapsed));
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">

            {/* LOADER */}
            {loading && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center
                    bg-gradient-to-b from-pink-100/20 to-blue-100/20 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative flex flex-col items-center animate-float">
                            <div className="absolute -bottom-4 w-20 h-4 bg-black/20 rounded-full blur-md" />
                            <div className="relative w-28 h-28 rounded-full
                                bg-gradient-to-br from-blue-300 to-blue-500
                                shadow-[0_20px_40px_rgba(59,130,246,0.45)]
                                flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full
                                    bg-gradient-to-br from-indigo-900 to-indigo-700
                                    flex flex-col items-center justify-center gap-2">
                                    <div className="flex gap-4">
                                        <span className="w-3 h-3 bg-cyan-300 rounded-full animate-blink" />
                                        <span className="w-3 h-3 bg-cyan-300 rounded-full animate-blink" />
                                    </div>
                                    <div className="w-6 h-1 bg-cyan-200 rounded-full" />
                                </div>
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                    <div className="w-1 h-4 bg-cyan-300 rounded-full" />
                                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse mt-1" />
                                </div>
                            </div>
                        </div>
                        <p className="text-indigo-900 text-sm font-medium">
                            Procesando cambios…
                        </p>
                    </div>
                </div>
            )}

            {/* BANNER */}
            <div
                className="h-64 w-full relative"
                style={{
                    background: banner.startsWith("data")
                        ? `url(${banner}) center/cover`
                        : banner,
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-xl"
                >
                    ✕
                </button>

                {/* BOTÓN + BANNER */}
                {editMode && (
                    <div className="absolute bottom-4 right-4">
                        <button
                            onClick={() => setBannerMenu(!bannerMenu)}
                            className="w-10 h-10 rounded-full
                                bg-black/40 backdrop-blur
                                text-white text-xl
                                flex items-center justify-center
                                hover:bg-black/60 transition"
                        >
                            +
                        </button>

                        {bannerMenu && (
                            <div className="absolute right-0 mt-2 w-40
                                bg-white rounded-xl shadow-xl p-3 space-y-2 z-50">
                                <label className="block text-sm cursor-pointer hover:text-indigo-600">
                                    Imagen
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            handleImageUpload(e, setBanner);
                                            setBannerMenu(false);
                                        }}
                                    />
                                </label>

                                <label className="block text-sm cursor-pointer hover:text-indigo-600">
                                    Color
                                    <input
                                        type="color"
                                        className="hidden"
                                        onChange={(e) => {
                                            setBanner(e.target.value);
                                            setBannerMenu(false);
                                        }}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                )}

                {/* AVATAR */}
                <div className="absolute -bottom-16 left-10">
                    <div className="relative rounded-full p-1 ring-2 ring-indigo-200 bg-white">
                        <img
                            src={avatar}
                            alt="avatar"
                            className="w-32 h-32 rounded-full object-cover"
                        />

                        {editMode && (
                            <>
                                <label
                                    htmlFor="avatarInput"
                                    className="absolute bottom-1 right-1
                                        w-8 h-8 rounded-full
                                        bg-indigo-600 text-white
                                        flex items-center justify-center
                                        cursor-pointer shadow-lg
                                        hover:bg-indigo-700 transition"
                                >
                                    +
                                </label>

                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleImageUpload(e, setAvatar)
                                    }
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="mt-20 px-10 max-w-6xl mx-auto">
                {editMode ? (
                    <div className="space-y-5">
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="text-3xl font-bold w-full border-b outline-none"
                        />

                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Cuéntanos algo sobre ti"
                            className="w-full border rounded-lg p-3"
                        />

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={guardarCambios}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
                            >
                                Guardar cambios
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="border px-6 py-2 rounded-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold">{nombre}</h1>
                        <p className="text-gray-600 mt-2">{descripcion}</p>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => setEditMode(true)}
                                className="border px-4 py-2 rounded-lg"
                            >
                                Editar perfil
                            </button>
                            <button
                                onClick={onLogout}
                                className="border px-4 py-2 rounded-lg text-red-600"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </>
                )}

                {/* TABS */}
                <div className="flex gap-8 mt-12 border-b">
                    {["likes", "guardados", "leyendo", "subidos"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`pb-2 capitalize ${
                                tab === t
                                    ? "border-b-2 border-indigo-500 font-semibold"
                                    : "text-gray-500"
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="py-10 text-gray-500">
                    Contenido de {tab} próximamente…
                </div>
            </div>
        </div>
    );
}
