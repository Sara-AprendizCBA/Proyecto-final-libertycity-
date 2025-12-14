import { useState, useEffect } from 'react'

export default function BookCard({ libro, onVerLibro }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('likes')) || []
    setLiked(likes.some((l) => l.id === libro.id))
  }, [libro.id])

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
    const guardados = JSON.parse(localStorage.getItem('guardados')) || []
    if (!guardados.some((g) => g.id === libro.id)) {
      guardados.push(libro)
      localStorage.setItem('guardados', JSON.stringify(guardados))
      // opcional: notificar al usuario
    }
  }

  return (
    <div className="relative bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-900 mb-4 flex items-center justify-center" style={{ aspectRatio: '3 / 4' }}>
        <div className="text-6xl text-slate-400">📘</div>
      </div>

      <h2 className="text-lg font-semibold truncate dark:text-white">{libro.titulo}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{libro.categoria}</p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button onClick={() => onVerLibro && onVerLibro(libro)} className="px-3 py-1 rounded-md bg-sky-600 text-white hover:bg-sky-700">👁 Ver</button>
          <button onClick={guardarLibro} className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">💾</button>
        </div>

        <button onClick={toggleLike} className={`px-2 py-1 rounded-md border ${liked ? 'bg-pink-50 border-pink-300 text-pink-600' : 'border-gray-300'}`}>
          <i className={`${liked ? 'fas' : 'far'} fa-heart`} />
        </button>
      </div>
    </div>
  )
}
