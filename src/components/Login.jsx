import { useEffect, useState } from "react";

export default function Login({ onClose, onOpenRegister, onLogin }) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => setMounted(true), 20);
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const correo = e.target.correo.value.trim();
    const password = e.target.password.value.trim();

    if (!correo || !password) {
      setError("Completa todos los campos");
      return;
    }
    if (!validateEmail(correo)) {
      setError("Ingresa un correo válido");
      return;
    }
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    const nombreBase = correo.split("@")[0];
    const fakeUser = {
      nombre: nombreBase || "Usuario",
      email: correo,
      descripcion: "",
      avatar: "",
    };

    onLogin(fakeUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/70 flex items-center justify-center z-50 transition-colors">
      <div
        className={
          "bg-white text-black dark:bg-gray-900 dark:text-white w-80 p-6 rounded-xl shadow-lg relative transition-all duration-300 transform " +
          (mounted ? "opacity-100 scale-100" : "opacity-0 scale-95")
        }
      >
        {/* Botón de cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-1">Bienvenido 👋</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-5 text-sm">
          Inicia sesión para continuar
        </p>

        {error && (
          <div className="text-red-600 text-sm text-center mb-2">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Correo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Correo</label>
            <input
              name="correo"
              type="email"
              className="
                bg-white text-black
                dark:bg-gray-800 dark:text-white
                border border-gray-300 dark:border-gray-600
                rounded-lg px-3 py-2 text-sm
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                outline-none transition-colors
              "
              placeholder="tucorreo@gmail.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Contraseña</label>
            <input
              name="password"
              type="password"
              className="
                bg-white text-black
                dark:bg-gray-800 dark:text-white
                border border-gray-300 dark:border-gray-600
                rounded-lg px-3 py-2 text-sm
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                outline-none transition-colors
              "
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="
              mt-2 bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-500 dark:hover:bg-blue-600
              text-white py-2 rounded-lg text-sm font-medium
              transition-all
            "
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-4">
          ¿No tienes cuenta?
          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            type="button"
            className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
