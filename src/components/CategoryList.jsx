export default function CategoryList({ categorias, categoriaActiva, setCategoriaActiva }) {
  return (
    <div className="mb-6">
      <div className="-mx-4 px-4 overflow-x-auto">
        <div className="flex gap-3 border-b border-gray-200 dark:border-slate-700 pb-3 whitespace-nowrap">
          <button
            className={`pb-2 text-sm ${categoriaActiva === 'Todos' ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setCategoriaActiva('Todos')}
          >
            Todos
          </button>

          {categorias.map((cat) => (
            <button
              key={cat}
              className={`pb-2 text-sm ${categoriaActiva === cat ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
