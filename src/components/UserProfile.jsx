export default function UserProfile({ usuario, onLogout }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
      {/* Header */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
        <img 
          src={usuario.avatar} 
          alt={usuario.nombre} 
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{usuario.nombre}</h1>
          <p className="text-gray-600">{usuario.email}</p>
          <div className="flex gap-2 mt-3">
            {usuario.genero && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                <i className="fas fa-venus-mars"></i>
                {usuario.genero.charAt(0).toUpperCase() + usuario.genero.slice(1)}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
              <i className="fas fa-check-circle"></i>
              Verificado
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 py-6 border-b border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-600">Libros Leídos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">156</p>
          <p className="text-sm text-gray-600">Likes Recibidos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">8</p>
          <p className="text-sm text-gray-600">Reseñas</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <i className="fas fa-edit"></i>
          Editar Perfil
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
          <i className="fas fa-cog"></i>
          Configuración
        </button>
        <button 
          onClick={onLogout}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
        >
          <i className="fas fa-sign-out-alt"></i>
          Salir
        </button>
      </div>
    </div>
  )
}
