import { useState } from "react";
import noPerfil from "../assets/no_perfil.png";

export default function Profile({
  usuario,
  onClose,
  onLogout,
  onUpdateUser,
  onVerLibro,
}) {
  const [tab, setTab] = useState("likes");

  const [nombre, setNombre] = useState(usuario.nombre || 'Usuario');
  const descripcion = usuario.descripcion || "";
  const avatar = usuario.avatar || noPerfil;
  const banner = usuario.banner || "#eef2ff";
  const [editMode, setEditMode] = useState(false);

  const [likes, setLikes] = useState(() => JSON.parse(localStorage.getItem("likes")) || []);
  const [guardados, setGuardados] = useState(() => JSON.parse(localStorage.getItem("guardados")) || []);

  /* 🔹 ELIMINAR */
  const eliminarLike = (id) => {
    const nuevos = likes.filter((l) => l.id !== id);
    setLikes(nuevos);
    localStorage.setItem("likes", JSON.stringify(nuevos));
    const libro = likes.find(l => l.id === id)
    if (libro) window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `${libro.titulo} eliminado de tus likes.`, type: 'success' } }))
  };

  const eliminarGuardado = (id) => {
    const nuevos = guardados.filter((g) => g.id !== id);
    setGuardados(nuevos);
    localStorage.setItem("guardados", JSON.stringify(nuevos));
    const libro = guardados.find(g => g.id === id)
    if (libro) window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `${libro.titulo} eliminado de tus guardados.`, type: 'success' } }))
  };

  /* 🔹 TARJETA PROFESIONAL */
  const BookProfileCard = ({ libro, onDelete }) => (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border border-gray-100 dark:border-slate-700">

      {/* PORTADA */}
      {(libro.imagenData || libro.imagen) ? (
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
          <img src={libro.imagenData || libro.imagen} alt={libro.titulo} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-[3/4] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl text-white">
          <i className="fas fa-book" aria-hidden="true" />
        </div>
      )}

      {/* INFO */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold truncate text-gray-900 dark:text-white">{libro.titulo}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">{libro.categoria}</p>

        <div className="flex items-center justify-between pt-3">
          <button
            onClick={() => onVerLibro(libro)}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            aria-label={`Ver ${libro.titulo}`}
          >
            <i className="fas fa-eye text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">Ver</span>
          </button>

          <button
            onClick={onDelete}
            className="flex items-center justify-center text-sm px-2 py-1.5 rounded-lg border text-red-600 hover:bg-red-50 transition"
            aria-label={`Eliminar ${libro.titulo}`}
          >
            <i className="fas fa-trash" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-white/95 dark:bg-slate-900/95 overflow-y-auto">

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-col sm:flex-row sm:items-center w-full justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:shadow-md transition"
              >
                <i className="fas fa-arrow-left text-base" aria-hidden="true" />
                <span className="hidden sm:inline">Volver</span>
              </button>

              {!editMode ? (
                <h1 className="text-2xl md:text-3xl font-bold">{nombre}</h1>
              ) : (
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="px-3 py-2 rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-lg md:text-xl"
                  aria-label="Editar nombre"
                />
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {!editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition min-w-[120px] justify-center"
                    aria-label="Editar perfil"
                  >
                    <i className="fas fa-user-edit text-sm" aria-hidden="true" />
                    <span className="text-sm">Editar perfil</span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition min-w-[120px] justify-center"
                    aria-label="Cerrar sesión"
                  >
                    <i className="fas fa-sign-out-alt text-sm" aria-hidden="true" />
                    <span className="text-sm">Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      const updated = { ...usuario, nombre }
                      if (onUpdateUser) onUpdateUser(updated)
                      localStorage.setItem('usuario', JSON.stringify(updated))
                      setEditMode(false)
                      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Nombre actualizado correctamente.', type: 'success', duration: 2200 } }))
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition min-w-[120px] justify-center"
                  >
                    <i className="fas fa-check" />
                    <span className="text-sm">Guardar</span>
                  </button>
                  <button
                    onClick={() => { setNombre(usuario.nombre || 'Usuario'); setEditMode(false) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition min-w-[120px] justify-center"
                  >
                    <i className="fas fa-xmark" />
                    <span className="text-sm">Cancelar</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SIDEBAR */}
          <aside className="col-span-1">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-700 dark:to-purple-700 p-6">
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-md mb-4">
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-200">{descripcion}</p>
                <div className="mt-6 w-full grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-semibold">{likes.length}</div>
                    <div className="text-xs text-gray-500">Likes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{guardados.length}</div>
                    <div className="text-xs text-gray-500">Guardados</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">0</div>
                    <div className="text-xs text-gray-500">Leyendo</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <section className="col-span-2">
            <div className="border-b pb-4 mb-6">
              <nav className="flex gap-6">
                {["likes", "guardados", "leyendo", "subidos"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`pb-2 capitalize transition ${
                      tab === t
                        ? "border-b-2 border-indigo-600 font-semibold text-indigo-600"
                        : "text-gray-400 dark:text-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </nav>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tab === "likes" && (likes.length ? likes.map((l) => (
                <BookProfileCard key={l.id} libro={l} onDelete={() => eliminarLike(l.id)} />
              )) : (
                <div className="col-span-full text-gray-500">Aún no tienes likes — explora y añade tus favoritos</div>
              ))}

              {tab === "guardados" && (guardados.length ? guardados.map((g) => (
                <BookProfileCard key={g.id} libro={g} onDelete={() => eliminarGuardado(g.id)} />
              )) : (
                <div className="col-span-full text-gray-500">No tienes libros guardados</div>
              ))}

              {tab === "leyendo" && (
                <div className="col-span-full text-gray-500">Próximamente…</div>
              )}

              {tab === "subidos" && (
                <div className="col-span-full text-gray-500">Próximamente…</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
