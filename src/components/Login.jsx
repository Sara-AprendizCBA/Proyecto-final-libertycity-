export default function Login({ onClose, onOpenRegister, onLogin }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    const fakeUser = {
      nombre: "Usuario",
      email: "correo@ejemplo.com"
    };

    onLogin(fakeUser);  // ⬅ ENVÍA LOS DATOS AL APP
    onClose();          // Cierra modal
  };

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

        <h2 className="text-2xl font-bold text-center mb-1">Bienvenido 👋</h2>
        <p className="text-center text-gray-600 mb-5 text-sm">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

          <button 
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">
          ¿No tienes cuenta?
          <button
            onClick={() => { onClose(); onOpenRegister(); }}
            className="text-blue-600 hover:underline ml-1"
          >
            Regístrate
          </button>
        </p>

      </div>
    </div>
  );
}
