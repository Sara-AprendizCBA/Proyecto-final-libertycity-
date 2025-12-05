import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return false
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    try {
      if (dark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    } catch (e) {}
  }, [dark])

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-700"
    >
      {dark ? (
        <i className="fas fa-sun" aria-hidden="true"></i>
      ) : (
        <i className="fas fa-moon" aria-hidden="true"></i>
      )}
    </button>
  )
}
