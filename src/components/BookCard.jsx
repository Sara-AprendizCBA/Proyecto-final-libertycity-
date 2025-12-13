import { useState, useEffect } from "react";

export default function BookCard({ libro, onVerLibro }) {
  const [liked, setLiked] = useState(false);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likes")) || [];
    setLiked(likes.some((l) => l.id === libro.id));
  }, [libro.id]);

  const toggleLike = () => {
    const likes = JSON.parse(localStorage.getItem("likes")) || [];
    let nuevosLikes;

    if (liked) {
      nuevosLikes = likes.filter((l) => l.id !== libro.id);
    } else {
      nuevosLikes = [...likes, libro];
    }

    localStorage.setItem("likes", JSON.stringify(nuevosLikes));
    setLiked(!liked);
  };

  const guardarLibro = () => {
    const guardados = JSON.parse(localStorage.getItem("guardados")) || [];

    if (!guardados.some((l) => l.id === libro.id)) {
      guardados.push(libro);
      localStorage.setItem("guardados", JSON.stringify(guardados));
      alert("Libro guardado 📚");
    }
  };

  return (
<<<<<<< HEAD
    <div className="relative bg-white p-4 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <div
        className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 mb-4 flex items-center justify-center"
        style={{ aspectRatio: "3 / 4" }}
      >
=======
    <div className="relative bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-900 mb-4 flex items-center justify-center" style={{aspectRatio: '3 / 4'}}>
        {/* placeholder cover */}
>>>>>>> d56c3d68b116ea0b9e9f86793a937b24b3266d7e
        <div className="text-6xl text-slate-400">
          <i className="fas fa-book" />
        </div>
      </div>

      <h2 className="text-lg font-semibold truncate dark:text-white">{libro.titulo}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{libro.categoria}</p>

<<<<<<< HEAD
      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          onClick={toggleLike}
          className={`px-2 py-1 rounded-md border ${
            liked
              ? "bg-pink-50 border-pink-300 text-pink-600"
              : "border-gray-300"
          }`}
        >
          <i className={`${liked ? "fas" : "far"} fa-heart`} />
        </button>
=======
      <div className="mt-3 flex items-center justify-between text-sm gap-2">
        <span className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <i className="fas fa-heart text-pink-500" aria-hidden="true"></i>
          {String(count).toLocaleString()}
        </span>
>>>>>>> d56c3d68b116ea0b9e9f86793a937b24b3266d7e

        <div className="flex gap-2">
          <button
<<<<<<< HEAD
            onClick={() => onVerLibro(libro)}
            className="px-3 py-1 rounded-md bg-sky-600 text-white hover:bg-sky-700"
=======
            onClick={() =>
              setLiked((prev) => {
                const next = !prev
                setCount((c) => (next ? c + 1 : Math.max(0, c - 1)))
                return next
              })
            }
            className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm border ${liked ? 'bg-pink-50 dark:bg-pink-900 border-pink-200 dark:border-pink-700 text-pink-600 dark:text-pink-300' : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200'}`}
>>>>>>> d56c3d68b116ea0b9e9f86793a937b24b3266d7e
          >
            👁 Ver
          </button>
<<<<<<< HEAD

          <button
            onClick={guardarLibro}
            className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            💾
=======
          <button className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-sky-600 dark:bg-sky-700 text-white hover:bg-sky-700 dark:hover:bg-sky-800">
            <i className="fas fa-eye" aria-hidden="true"></i>
            <span className="hidden sm:inline">Ver</span>
>>>>>>> d56c3d68b116ea0b9e9f86793a937b24b3266d7e
          </button>
        </div>
      </div>
    </div>
  );
}
