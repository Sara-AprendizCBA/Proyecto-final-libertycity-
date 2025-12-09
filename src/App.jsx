import { useState } from 'react'
import Header from './components/Header'
import Search from './components/Search'
import CategoryList from './components/CategoryList'
import BookGrid from './components/BookGrid'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import DarkModeToggle from './components/DarkModeToggle'

const categorias = [
  'Mangas',
  'Comics',
  'Romance',
  'Terror',
  'Ciencia Ficción',
  'Datos Científicos',
]

const librosEjemplo = [
  { id: 1, titulo: 'Naruto Vol.1', categoria: 'Mangas' },
  { id: 2, titulo: 'Dragon Ball Z', categoria: 'Mangas' },
  { id: 3, titulo: 'Spiderman #12', categoria: 'Comics' },
  { id: 4, titulo: 'Batman Año Uno', categoria: 'Comics' },
  { id: 5, titulo: 'Bajo la misma estrella', categoria: 'Romance' },
  { id: 6, titulo: 'It - Stephen King', categoria: 'Terror' },
  { id: 7, titulo: 'Dune', categoria: 'Ciencia Ficción' },
  { id: 8, titulo: 'Breves respuestas a grandes preguntas', categoria: 'Datos Científicos' },
]

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const [usuarioLogueado, setUsuarioLogueado] = useState(
    JSON.parse(localStorage.getItem('usuario')) || null
  )

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const librosFiltrados = librosEjemplo.filter((libro) => {
    const coincideCategoria =
      categoriaActiva === 'Todos' || libro.categoria === categoriaActiva

    const coincideBusqueda = libro.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    return coincideCategoria && coincideBusqueda
  })

  const handleLogin = (userData) => {
    setUsuarioLogueado(userData)
    localStorage.setItem('usuario', JSON.stringify(userData))
    setShowLogin(false)
  }

  const handleLogout = () => {
    setUsuarioLogueado(null)
    localStorage.removeItem('usuario')
    setShowProfile(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white py-8 transition-colors duration-300">

      {/* Header */}
      <div className="w-full px-4">
        <Header 
          usuario={usuarioLogueado} 
          onLogout={handleLogout}
          onOpenAuth={() => setShowLogin(true)}
          onOpenProfile={() => setShowProfile(true)}
        />
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <main className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 transition-colors duration-300">
          <Hero />
          <Search busqueda={busqueda} setBusqueda={setBusqueda} />

          <CategoryList
            categorias={categorias}
            categoriaActiva={categoriaActiva}
            setCategoriaActiva={setCategoriaActiva}
          />

          <BookGrid libros={librosFiltrados} />

          {librosFiltrados.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No se encontraron libros.
            </p>
          )}
        </main>
      </div>

      {/* Footer */}
      <div className="w-full mt-8 px-4">
        <Footer />
      </div>

      {/* LOGIN */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLogin}
          onOpenRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}

      {/* REGISTER */}
      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)}
          onOpenLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}

      {/* PROFILE */}
      {showProfile && usuarioLogueado && (
        <Profile 
          usuario={usuarioLogueado}
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}
