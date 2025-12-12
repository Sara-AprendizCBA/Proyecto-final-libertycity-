import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  // Por defecto, modo claro (false)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") return true;
    // Si no hay preferencia, forzar modo claro
    return false;
  });

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

    return saved === "dark";
  });


  // Al cargar, si no hay preferencia, asegurarse de que esté en claro
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

    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
>
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-full
        bg-gray-200 dark:bg-slate-700
        text-gray-800 dark:text-yellow-300
        transition-all duration-300
        hover:scale-110
      "

      aria-label="Cambiar modo oscuro/claro"


    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
