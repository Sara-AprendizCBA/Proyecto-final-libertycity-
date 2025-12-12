import { useState, useEffect } from 'react'
import Header from './components/Header'
import Search from './components/Search'
import CategoryList from './components/CategoryList'
import BookGrid from './components/BookGrid'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import supabase from './services/supabaseClient';

// Elimina esta línea si la tienes:
// import { supabase } from './services/supabaseClient'; // ← ESTO CAUSA EL ERROR

const categorias = [
  'Mangas',
  'Comics',
  'Romance',
  'Terror',
  'Ciencia Ficción',
  'Datos Científicos'
]

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(true)

  const [usuarioLogueado, setUsuarioLogueado] = useState(
    JSON.parse(localStorage.getItem('usuario')) || null
  )

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  // Función para obtener libros desde Supabase
  const fetchLibros = async () => {
    try {
      setLoading(true)

      // Obtener datos de la tabla
      const { data, error } = await supabase
        .from('bag_libros')
        .select('*')
        .order('titulo', { ascending: true })

      if (error) throw error

      // Agregar URLs de imágenes
      const librosConImagenes = await Promise.all(
        data.map(async (libro) => {
          // Obtener URL de la carátula
          let imagenUrl = null
          if (libro.caratula_url) {
            const { data: imagenData } = supabase
              .storage
              .from('Caratulas')
              .getPublicUrl(libro.caratula_url)
            imagenUrl = imagenData.publicUrl
          }

          // Obtener URL del archivo para descarga
          let archivoUrl = null
          if (libro.archivo_path) {
            const { data: archivoData } = supabase
              .storage
              .from('libros')
              .getPublicUrl(libro.archivo_path)
            archivoUrl = archivoData.publicUrl
          }

          const librosConImagenes = {
            ...libro,
            caratula_url: imagenUrl,
            archivoUrl,
            categoria: libro.categoria || 'Sin categoría' // Asegurar que tenga categoría
          }
          return librosConImagenes
        })
      )

      setLibros(librosConImagenes)
    } catch (error) {
      console.error('Error fetching libros:', error)
    } finally {
      setLoading(false)
    }
  }

  // Función para descargar libro
  const handleDescargarLibro = async (libro) => {
    try {
      if (!libro.archivoUrl) {
        alert('No se puede descargar este libro')
        return
      }

      // Obtener extensión del archivo
      const extension = libro.archivo_path?.split('.').pop() || 'pdf'

      // Descargar usando fetch
      const response = await fetch(libro.archivoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${libro.titulo}.${extension}`
      document.body.appendChild(link)
      link.click()

      // Limpiar
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)

    } catch (error) {
      console.error('Error descargando libro:', error)
      alert('Error al descargar el libro')
    }
  }

  useEffect(() => {
    fetchLibros()
  }, [])

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('usuario'))
    if (u) setUsuarioLogueado(u)
  }, [])

  // Filtrar libros
  const librosFiltrados = libros.filter((libro) => {
    const coincideCategoria = categoriaActiva === 'Todos' || libro.categoria === categoriaActiva
    const coincideBusqueda = libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  const handleLogin = (userData) => {
    const user = {
      nombre: userData.nombre || 'Usuario',
      email: userData.email || '',
      descripcion: userData.descripcion || '',
      avatar: userData.avatar || ''
    }
    setUsuarioLogueado(user)
    localStorage.setItem('usuario', JSON.stringify(user))
    setShowLogin(false)
    setShowRegister(false)
  }

  const handleRegister = (userData) => {
    handleLogin(userData)
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

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <main className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 transition-colors duration-300">

          <Hero />
          <Search busqueda={busqueda} setBusqueda={setBusqueda} />
          <CategoryList
            categorias={categorias}
            categoriaActiva={categoriaActiva}
            setCategoriaActiva={setCategoriaActiva}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando libros...</p>
              </div>
            </div>
          ) : (
            <BookGrid
              libros={librosFiltrados}
              onDescargar={handleDescargarLibro} // Pasar función de descarga
            />
          )}

          {!loading && librosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No se encontraron libros.
            </p>
          )}

        </main>
      </div>

      {/* Footer */}
      <div className="w-full mt-8 px-4">
        <Footer />
      </div>

      {/* Ventanas modales */}
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

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onRegister={handleRegister}
          onOpenLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}

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