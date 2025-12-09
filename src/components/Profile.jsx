export default function Profile({ usuario, onClose, onLogout }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Mi Perfil
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Bienvenido, <span className="font-semibold">{usuario.nombre}</span>
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Cerrar sesión
          </button>

          <button 
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
