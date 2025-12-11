import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
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

  return (
    <button
      onClick={() => setDark(!dark)}
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
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
