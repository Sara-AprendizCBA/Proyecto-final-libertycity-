import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  // Estado inicial basado en localStorage
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark"; // true = oscuro, false = claro
  });

  // Aplicar cambio de tema al HTML y guardar en localStorage
  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Si nunca se ha guardado un tema, forzar claro por defecto
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (!saved) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      aria-label="Cambiar modo oscuro/claro"
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-full
        bg-gray-200 dark:bg-slate-700
        text-gray-800 dark:text-yellow-300
        transition-all duration-300
        hover:scale-110
      "
    >
      <i className={`fas ${dark ? 'fa-sun' : 'fa-moon'} text-lg`} aria-hidden="true" />
    </button>
  );
}
