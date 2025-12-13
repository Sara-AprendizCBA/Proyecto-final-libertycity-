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
    <div className="relative bg-white p-4 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <div
        className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 mb-4 flex items-center justify-center"
        style={{ aspectRatio: "3 / 4" }}
      >
        <div className="text-6xl text-slate-400">
          <i className="fas fa-book" />
        </div>
      </div>

      <h2 className="text-lg font-semibold truncate">{libro.titulo}</h2>
      <p className="text-sm text-gray-500">{libro.categoria}</p>

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

        <div className="flex gap-2">
          <button
            onClick={() => onVerLibro(libro)}
            className="px-3 py-1 rounded-md bg-sky-600 text-white hover:bg-sky-700"
          >
            👁 Ver
          </button>

          <button
            onClick={guardarLibro}
            className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            💾
          </button>
        </div>
      </div>
    </div>
  );
}
