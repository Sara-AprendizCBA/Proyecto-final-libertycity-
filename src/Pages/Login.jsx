import { useEffect, useState } from "react";

export default function Login({ onClose, onOpenRegister, onLogin }) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(timer);
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
      avatar: ""
    };

    onLogin(fakeUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/70 flex items-center justify-center z-50">
      <div
        className={`
          bg-white dark:bg-gray-900 text-black dark:text-white
          w-80 p-6 rounded-xl shadow-lg relative
          transform transition-all duration-300
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-1">Bienvenido 👋</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Inicia sesión para continuar
        </p>

        {error && (
          <div className="text-red-500 text-sm text-center mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Correo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Correo</label>
            <input
              name="correo"
              type="email"
              placeholder="tucorreo@gmail.com"
              required
              className="
                bg-white dark:bg-gray-800 text-black dark:text-white
                border border-gray-300 dark:border-gray-600
                rounded-lg px-3 py-2 text-sm
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                outline-none transition-colors
              "
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="
                bg-white dark:bg-gray-800 text-black dark:text-white
                border border-gray-300 dark:border-gray-600
                rounded-lg px-3 py-2 text-sm
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                outline-none transition-colors
              "
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
            type="button"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
