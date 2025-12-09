import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className="
        inline-flex items-center justify-center 
        p-2 rounded-lg 
        text-gray-700 hover:bg-gray-200 
        dark:text-gray-200 dark:hover:bg-slate-700 
        transition-all duration-300
      "
    >
      {dark ? (
        <i className="fa-solid fa-sun text-xl"></i>
      ) : (
        <i className="fa-solid fa-moon text-xl"></i>
      )}
    </button>
  );
}
