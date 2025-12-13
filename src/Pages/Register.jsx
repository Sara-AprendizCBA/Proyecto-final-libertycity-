import { useEffect, useState } from "react";

export default function Register({ onClose, onOpenLogin, onRegister }) {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setTimeout(() => setMounted(true), 20)
  }, [])

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    const nombre = e.target.nombre.value.trim()
    const correo = e.target.correo.value.trim()
    const pass = e.target.password.value.trim()

    if (!nombre || !correo || !pass) {
      setError("Completa todos los campos")
      return
    }
    if (!validateEmail(correo)) {
      setError("Ingresa un correo válido")
      return
    }
    if (pass.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres")
      return
    }

    const newUser = {
      nombre,
      email: correo,
      descripcion: "",
      avatar: ""
    }

    onRegister(newUser)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={
          "bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl w-80 p-7 rounded-2xl shadow-xl relative border border-white/20 transform transition-all duration-300 " +
          (mounted ? "opacity-100 scale-100" : "opacity-0 scale-95")
        }
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-2">Crear cuenta ✨</h2>
        <p className="text-center text-gray-600 mb-4 text-sm">Regístrate para comenzar</p>

        {error && <div className="text-red-600 text-sm text-center mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Nombre</label>
            <input
              name="nombre"
              type="text"
              required
              className="w-full border border-gray-300 bg-white/90 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Correo</label>
            <input
              name="correo"
              type="email"
              required
              className="w-full border border-gray-300 bg-white/90 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="tucorreo@gmail.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 bg-white/90 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">
          ¿Ya tienes cuenta?
          <button
            onClick={() => { onClose(); onOpenLogin(); }}
            className="text-blue-600 hover:underline ml-1"
            type="button"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  )
}
