export default function Hero() {
  return (
    <section className="mb-6 rounded-lg overflow-hidden">
      <div className="relative bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-slate-800 dark:to-slate-900 text-white p-6 sm:p-8 rounded-lg">
        <div className="max-w-4xl">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold drop-shadow">Encuentra tu próxima lectura favorita</h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-sky-100/90 dark:text-slate-300">Explora categorías, descubre novedades y guarda tus favoritos. ¡Diversión garantizada!</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center justify-center gap-2 bg-white/90 text-sky-700 dark:bg-slate-700 dark:text-sky-200 px-4 py-2 rounded-md font-medium hover:scale-105 transition w-full sm:w-auto">
              <i className="fas fa-book" aria-hidden="true"></i>
              Explorar ahora
            </button>
            <button className="inline-flex items-center justify-center gap-2 border border-white/30 dark:border-slate-600 text-white px-4 py-2 rounded-md hover:bg-white/10 dark:hover:bg-slate-800 transition w-full sm:w-auto">
              <i className="fas fa-star" aria-hidden="true"></i>
              Ver destacados
            </button>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-6 hidden md:block">
          <div className="w-40 h-56 bg-white/20 dark:bg-slate-700/40 rounded-xl shadow-2xl transform rotate-6 flex items-center justify-center text-white text-5xl">
            <i className="fas fa-book-open" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </section>
  )
}
