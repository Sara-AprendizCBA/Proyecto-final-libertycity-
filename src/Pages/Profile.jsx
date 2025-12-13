import { useEffect, useState } from "react";

export default function Profile({
  usuario,
  onClose,
  onLogout,
  onUpdateUser,
  onVerLibro,
}) {
  const [tab, setTab] = useState("likes");
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState(usuario.nombre);
  const [descripcion, setDescripcion] = useState(usuario.descripcion || "");
  const [avatar, setAvatar] = useState(usuario.avatar);
  const [banner, setBanner] = useState(usuario.banner || "#eef2ff");

  const [likes, setLikes] = useState([]);
  const [guardados, setGuardados] = useState([]);

  /* 🔹 CARGAR STORAGE */
  useEffect(() => {
    setLikes(JSON.parse(localStorage.getItem("likes")) || []);
    setGuardados(JSON.parse(localStorage.getItem("guardados")) || []);
  }, []);

  /* 🔹 ELIMINAR */
  const eliminarLike = (id) => {
    const nuevos = likes.filter((l) => l.id !== id);
    setLikes(nuevos);
    localStorage.setItem("likes", JSON.stringify(nuevos));
  };

  const eliminarGuardado = (id) => {
    const nuevos = guardados.filter((g) => g.id !== id);
    setGuardados(nuevos);
    localStorage.setItem("guardados", JSON.stringify(nuevos));
  };

  /* 🔹 TARJETA PROFESIONAL */
  const BookProfileCard = ({ libro, onDelete }) => (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border">

      {/* PORTADA */}
      <div className="aspect-[3/4] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-6xl text-white">
        {libro.icono || "📘"}
      </div>

      {/* INFO */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold truncate">{libro.titulo}</h3>
        <p className="text-sm text-gray-500">{libro.categoria}</p>

        <div className="flex items-center justify-between pt-3">
          <button
            onClick={() => onVerLibro(libro)}
            className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            👁 Ver
          </button>

          <button
            onClick={onDelete}
            className="text-sm px-2 py-1.5 rounded-lg border text-red-600 hover:bg-red-50 transition"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">

      {loading && (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur flex items-center justify-center">
          <p className="text-white">Procesando…</p>
        </div>
      )}

      {/* BANNER */}
      <div
        className="h-64 relative"
        style={{
          background: banner.startsWith("data")
            ? `url(${banner}) center/cover`
            : banner,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

        <div className="absolute -bottom-16 left-10">
          <div className="bg-white p-1 rounded-full ring-4 ring-white shadow">
            <img
              src={avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-10 mt-20">

        <h1 className="text-3xl font-bold">{nombre}</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">{descripcion}</p>

        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 border rounded-lg">
            Editar perfil
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 border rounded-lg text-red-600"
          >
            Cerrar sesión
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-10 mt-14 border-b">
          {["likes", "guardados", "leyendo", "subidos"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 capitalize transition ${
                tab === t
                  ? "border-b-2 border-indigo-600 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {tab === "likes" &&
            (likes.length ? (
              likes.map((l) => (
                <BookProfileCard
                  key={l.id}
                  libro={l}
                  onDelete={() => eliminarLike(l.id)}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full">
                No tienes likes aún
              </p>
            ))}

          {tab === "guardados" &&
            (guardados.length ? (
              guardados.map((g) => (
                <BookProfileCard
                  key={g.id}
                  libro={g}
                  onDelete={() => eliminarGuardado(g.id)}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full">
                No tienes libros guardados
              </p>
            ))}

          {tab === "leyendo" && (
            <p className="text-gray-400 col-span-full">
              Próximamente…
            </p>
          )}

          {tab === "subidos" && (
            <p className="text-gray-400 col-span-full">
              Próximamente…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
