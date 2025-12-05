export default function Search({ busqueda, setBusqueda }) {
  return (
    <div className="relative mb-6">
      <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
      <input
        type="text"
        placeholder="Buscar libro..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full pl-12 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
