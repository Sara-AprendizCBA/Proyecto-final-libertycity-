
// components/BookGrid.jsx
export default function BookGrid({ libros, onDescargar }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Libros Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {libros.map((libro) => (
          <div
            key={libro.id}
            className="bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            {/* Imagen del libro */}
            <div className="h-48 overflow-hidden bg-gray-300 dark:bg-gray-600">
              {libro.imagenUrl ? (
                <img
                  src={libro.imagenUrl}
                  alt={libro.titulo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Información del libro */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 truncate">{libro.titulo}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {libro.categoria}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {libro.descripcion || 'Sin descripción'}
              </p>

              {/* Botón de descarga */}
              <button
                onClick={() => onDescargar(libro)}
                disabled={!libro.archivoUrl}
                className={`w-full py-2 px-3 rounded-md text-sm font-medium ${libro.archivoUrl
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-400 cursor-not-allowed text-gray-700'
                  }`}
              >
                {libro.archivoUrl ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Descargar
                  </span>
                ) : (
                  'No disponible'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}