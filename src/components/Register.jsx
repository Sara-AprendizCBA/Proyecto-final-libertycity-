export default function Register({ onClose, onOpenLogin }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg relative">

        {/* X Cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-1">Crear cuenta ✨</h2>
        <p className="text-center text-gray-600 mb-5 text-sm">
          Regístrate para comenzar
        </p>

        <form className="flex flex-col gap-3">

          <div className="flex flex-col">
            <label className="text-sm font-medium">Nombre</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Correo</label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="tucorreo@gmail.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Contraseña</label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">
            Registrarme
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">
          ¿Ya tienes cuenta?
          <button
            onClick={() => { onClose(); onOpenLogin(); }}
            className="text-blue-600 hover:underline ml-1"
          >
            Iniciar sesión
          </button>
        </p>

      </div>
    </div>
  );
}
