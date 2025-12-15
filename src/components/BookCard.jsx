import { useState } from 'react'

export default function BookCard({ libro, onVerLibro, usuario }) {
  const [liked, setLiked] = useState(() => {
    const likes = JSON.parse(localStorage.getItem('likes')) || []
    return likes.some((l) => l.id === libro.id)
  })

  const toggleLike = () => {
    const likes = JSON.parse(localStorage.getItem('likes')) || []
    let nuevos = []
    if (liked) {
      nuevos = likes.filter((l) => l.id !== libro.id)
    } else {
      nuevos = [...likes, libro]
    }
    localStorage.setItem('likes', JSON.stringify(nuevos))
    setLiked(!liked)
  }

  const guardarLibro = () => {
    if (!usuario) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Inicia sesión para guardar libros en tu biblioteca.', type: 'error', duration: 3000 } }))
      return
    }
    const guardados = JSON.parse(localStorage.getItem('guardados')) || []
    if (guardados.some((g) => g.id === libro.id)) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `${libro.titulo} ya está en tu biblioteca.`, type: 'info', duration: 2500 } }))
      return
    }
    guardados.push(libro)
    localStorage.setItem('guardados', JSON.stringify(guardados))
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `${libro.titulo} guardado en tu biblioteca.`, type: 'success', duration: 3000 } }))
  }

  return (
    <div className="relative bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-900 mb-4 flex items-center justify-center" style={{ aspectRatio: '3 / 4' }}>
        {(libro.imagenData || libro.imagen) ? (
          <img src={libro.imagenData || libro.imagen} alt={libro.titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="text-slate-400">
            <i className="fas fa-book text-4xl" aria-hidden="true" />
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold truncate dark:text-white">{libro.titulo}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{libro.categoria}</p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onVerLibro && onVerLibro(libro)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-sm md:text-sm"
            aria-label={`Ver ${libro.titulo}`}
          >
            <i className="fas fa-eye text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">Ver</span>
          </button>

          <button
            onClick={guardarLibro}
            disabled={!usuario}
            aria-disabled={!usuario}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm md:text-sm ${usuario ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-300 cursor-not-allowed'}`}
            aria-label={`Guardar ${libro.titulo}`}
          >
            <i className="fas fa-bookmark text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">Guardar</span>
          </button>
        </div>

        <button
          onClick={toggleLike}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors shadow-sm ${liked ? 'bg-pink-50 border border-pink-300 text-pink-600' : 'bg-white/5 border border-transparent text-gray-300 hover:bg-white/10'}`}
          aria-pressed={liked}
          aria-label={liked ? `Quitar favorito ${libro.titulo}` : `Añadir favorito ${libro.titulo}`}
        >
          <i className={`${liked ? 'fas' : 'far'} fa-heart`} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
