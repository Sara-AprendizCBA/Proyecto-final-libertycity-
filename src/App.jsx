import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import Search from './components/Search'
import CategoryList from './components/CategoryList'
import BookGrid from './components/BookGrid'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Toast from './components/Toast'
import UploadBook from './components/UploadBook'

const categorias = [
  'Todos',
  'Mangas',
  'Comics',
  'Romance',
  'Terror',
  'Ciencia Ficción',
  'Datos Científicos'
]
const librosEjemplo = [
  {
    id: 1,
    titulo: "Naruto Vol. 1",
    categoria: "Mangas",
    autor: "Masashi Kishimoto",
    anio: 1999,
    paginas: 192,
    descripcion:
      "Naruto Uzumaki sueña con convertirse en Hokage y demostrar su valor.",
    icono: "🍥",
    imagen: '/src/assets/imgs/Naruto_Vol-1.png',
    pdfUrl: 'src/public/pdfs/Naruto.pdf',
  },
  {
    id: 2,
    titulo: "Dragon Ball Z",
    categoria: "Mangas",
    autor: "Akira Toriyama",
    anio: 1989,
    paginas: 250,
    descripcion:
      "Goku protege la Tierra enfrentándose a poderosos enemigos.",
    icono: "🐉",
    imagen: '/src/assets/imgs/Dragon_Ball_Z.png',
    pdfUrl: 'src/public/pdfs/DBS.pdf',
  },
  {
    id: 3,
    titulo: "Spiderman #12",
    categoria: "Comics",
    autor: "Stan Lee",
    anio: 1964,
    paginas: 48,
    descripcion:
      "Peter Parker enfrenta nuevos retos como héroe y como estudiante.",
    icono: "🕷️",
    imagen: '/src/assets/imgs/Spider-man.png',
  },
  {
    id: 4,
    titulo: "Hollow Knight RPG",
    categoria: "RPG",
    autor: "Team Cherry",
    anio: 2017,
    paginas: 200,
    descripcion:
      "Una aventura metroidvania RPG inspirada en Hollow Knight, con exploración profunda y combate desafiante.",
    icono: "🕷️",
    imagen: '/src/assets/imgs/HK.png',
    pdfUrl: 'src/public/pdfs/HK.pdf',
  },
  {
    id: 5,
    titulo: "Bajo la misma estrella",
    categoria: "Romance",
    autor: "John Green",
    anio: 2012,
    paginas: 304,
    descripcion:
      "Una historia de amor y esperanza entre dos jóvenes con cáncer.",
    icono: "💙",
    imagen: '/src/assets/imgs/Bajo_Estrella.png',
    pdfUrl: 'src/public/pdfs/Bajo.pdf',
  },
  {
    id: 6,
    titulo: "It",
    categoria: "Terror",
    autor: "Stephen King",
    anio: 1986,
    paginas: 1138,
    descripcion:
      "Un ente maligno aterroriza a un grupo de niños en Derry.",
    icono: "🎈",
    imagen: '/src/assets/imgs/It.png',
    pdfUrl: 'src/public/pdfs/It.pdf',
  },
  {
    id: 7,
    titulo: "Dune",
    categoria: "Ciencia Ficción",
    autor: "Frank Herbert",
    anio: 1965,
    paginas: 412,
    descripcion:
      "Una épica historia política y espiritual en el planeta Arrakis.",
    icono: "🏜️",
    imagen: '/src/assets/imgs/Dune.png',
    pdfUrl: 'src/public/pdfs/Dune.pdf',
  },
  {
    id: 8,
    titulo: "Breves respuestas a grandes preguntas",
    categoria: "Datos Científicos",
    autor: "Stephen Hawking",
    anio: 2018,
    paginas: 256,
    descripcion:
      "Reflexiones científicas sobre el universo y la humanidad.",
    icono: "🧠",
    imagen: '/src/assets/imgs/Breves.png',
    pdfUrl: 'src/public/pdfs/Breves.pdf',
  }
]

export default function App() {
  const [libros, setLibros] = useState(librosEjemplo)
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [route, setRoute] = useState('Inicio')
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => JSON.parse(localStorage.getItem('usuario')) || null)

  const [showUpload, setShowUpload] = useState(false)

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const [libroActivo, setLibroActivo] = useState(null)
  const [downloadProgress, setDownloadProgress] = useState(null)


  // Guardados en memoria para 'Mi Biblioteca'
  const [guardadosState, setGuardadosState] = useState(() => JSON.parse(localStorage.getItem('guardados')) || [])

  useEffect(() => {
    const handler = () => setGuardadosState(JSON.parse(localStorage.getItem('guardados')) || [])
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const handleNavigate = (item) => {
    setRoute(item)
    // reset some filters when navigating
    setSelectedAuthor(null)
    setCategoriaActiva('Todos')
    setBusqueda('')
  }

  

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

  // Nota: las acciones de likes/guardados se manejan en los componentes individuales

  const authors = Array.from(new Set(libros.map((l) => l.autor)))

  // libros filtrados base (por categoría + búsqueda) usado en varias vistas
  const librosFiltradosBase = useMemo(() => {
    return libros.filter((libro) => {
      const coincideCategoria = categoriaActiva === 'Todos' || libro.categoria === categoriaActiva
      const coincideBusqueda = libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
      return coincideCategoria && coincideBusqueda
    })
  }, [libros, categoriaActiva, busqueda])

  // decide la vista según la ruta
  const renderMain = () => {
    switch (route) {
      case 'Inicio':
        return (
          <>
            <Hero />
            <Search busqueda={busqueda} setBusqueda={setBusqueda} />
            <CategoryList
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              setCategoriaActiva={setCategoriaActiva}
            />

            <BookGrid libros={librosFiltradosBase} onVerLibro={(l) => setLibroActivo(l)} usuario={usuarioLogueado} />
          </>
        )

      case 'Categorías':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Categorías</h2>
            <CategoryList
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              setCategoriaActiva={setCategoriaActiva}
            />
            <BookGrid libros={librosFiltradosBase} onVerLibro={(l) => setLibroActivo(l)} usuario={usuarioLogueado} />
          </>
        )

      case 'Novedades':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Novedades</h2>
            <BookGrid libros={[...libros].sort((a,b)=>b.anio-a.anio)} onVerLibro={(l) => setLibroActivo(l)} usuario={usuarioLogueado} />
          </>
        )

      case 'Autores':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Autores</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {authors.map((a) => (
                <button key={a} onClick={() => setSelectedAuthor(a)} className={`px-3 py-1 rounded-full ${selectedAuthor===a ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'}`}>
                  {a}
                </button>
              ))}

            </div>
            {selectedAuthor ? (
              <BookGrid libros={libros.filter(l=>l.autor===selectedAuthor)} onVerLibro={(l) => setLibroActivo(l)} usuario={usuarioLogueado} />
            ) : (
              <p className="text-gray-500">Selecciona un autor para ver sus libros.</p>
            )}
          </>
        )

      case 'Mi Biblioteca':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Mi Biblioteca</h2>
            {guardadosState.length ? (
              <BookGrid libros={guardadosState} onVerLibro={(l) => setLibroActivo(l)} usuario={usuarioLogueado} />
            ) : (
              <p className="text-gray-500">Tu biblioteca está vacía. Guarda libros para verlos aquí.</p>
            )}
          </>
        )

      default:
        return null
    }
  }

  const handleDownloadPdf = async (libro) => {
    if (!libro) return
    try {
      const filename = libro.pdfName || `${libro.titulo}.pdf`

      const streamDownload = async (url) => {
        try {
          setDownloadProgress(0)
          const res = await fetch(url)
          if (!res.ok) throw new Error('Network response was not ok')
          const contentLength = res.headers.get('content-length')
          if (!res.body) {
            const blob = await res.blob()
            const obj = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = obj
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(obj)
            setDownloadProgress(null)
            return
          }

          const total = contentLength ? parseInt(contentLength, 10) : null
          const reader = res.body.getReader()
          const chunks = []
          let received = 0
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            chunks.push(value)
            received += value.length
            if (total) setDownloadProgress(Math.round((received / total) * 100))
          }
          const blob = new Blob(chunks, { type: 'application/pdf' })
          const urlObj = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = urlObj
          a.download = filename
          document.body.appendChild(a)
          a.click()
          a.remove()
          URL.revokeObjectURL(urlObj)
          setDownloadProgress(100)
          setTimeout(() => setDownloadProgress(null), 800)
        } catch (err) {
          console.warn('streamDownload error', err)
          // fallback: try letting the browser handle the URL (may open or trigger download)
          try {
            window.open(url, '_blank')
          } catch (e) {
            console.warn('streamDownload fallback failed', e)
          }
          setDownloadProgress(null)
        }
      }

      if (libro.pdfUrl) {
        await streamDownload(libro.pdfUrl)
        return
      }

      if (!libro.pdfData) return

      // si no hay PDF, mostrar notificación
      if (!libro.pdfData) {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'PDF no disponible', type: 'error', duration: 2500 } }))
        return
      }

      // For base64 data, create blob locally and simulate small progress
      setDownloadProgress(30)
      await new Promise((r) => setTimeout(r, 200))
      const parts = libro.pdfData.split(',')
      const base64 = parts[1]
      const binary = atob(base64)
      const len = binary.length
      const u8 = new Uint8Array(len)
      for (let i = 0; i < len; i++) u8[i] = binary.charCodeAt(i)
      setDownloadProgress(80)
      const blob = new Blob([u8], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      setDownloadProgress(100)
      setTimeout(() => setDownloadProgress(null), 600)
    } catch (err) {
      console.warn('download error', err)
      setDownloadProgress(null)
    }
  }

  const handleViewPdf = (libro) => {
    if (!libro) return
    try {
      if (libro.pdfUrl) {
        window.open(libro.pdfUrl, '_blank', 'noopener,noreferrer')
        return
      }

      if (!libro.pdfData) return

      // open base64/pdfData in new tab
      const parts = libro.pdfData.split(',')
      const base64 = parts[1]
      const binary = atob(base64)
      const len = binary.length
      const u8 = new Uint8Array(len)
      for (let i = 0; i < len; i++) u8[i] = binary.charCodeAt(i)
      const blob = new Blob([u8], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank', 'noopener,noreferrer')
      // revoke after a short delay to allow the browser to load it
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (err) {
      console.warn('view pdf error', err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-white py-8 transition-colors duration-300">
      <div className="w-full px-4">
        <Header
          usuario={usuarioLogueado}
          onLogout={handleLogout}
          onOpenAuth={() => setShowLogin(true)}
          onOpenProfile={() => setShowProfile(true)}
          onOpenUpload={() => setShowUpload(true)}
          onNavigate={handleNavigate}
          activeRoute={route}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-4">
        <main className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 transition-colors duration-300">
          {renderMain()}
        </main>
      </div>

      <div className="w-full mt-8 px-4">
        <Footer />
      </div>

      <Toast />

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
          onUpdateUser={(u) => {
            setUsuarioLogueado(u)
            localStorage.setItem('usuario', JSON.stringify(u))
          }}
          onVerLibro={(libro) => setLibroActivo(libro)}
        />
      )}

      {showUpload && usuarioLogueado && (
        <UploadBook
          usuario={usuarioLogueado}
          onClose={() => setShowUpload(false)}
          onCreate={(created) => setLibros((s) => [created, ...s])}
        />
      )}

      {libroActivo && (
        <div className="fixed inset-0 z-50 bg-white/95 text-gray-900 dark:bg-slate-900/95 dark:text-white overflow-y-auto">
          <div className="sticky top-0 z-40 backdrop-blur bg-white/95 dark:bg-slate-900/95 border-b border-gray-200/20 dark:border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold truncate">{libroActivo.titulo}</h2>
              <button onClick={() => setLibroActivo(null)} className="bg-white/10 dark:bg-white/5 hover:bg-white/20 px-4 py-2 rounded-full text-lg transition" aria-label="Cerrar">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex justify-center">
              <div className="relative w-80 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-700 dark:to-purple-700 shadow-lg p-6 flex flex-col items-center text-center">
                <span className="absolute -top-3 left-6 inline-flex items-center px-3 py-1 rounded-full bg-white text-xs text-indigo-700 shadow">Disponible</span>
                <div className="w-56 h-72 bg-white rounded-xl overflow-hidden flex items-center justify-center p-4 shadow-inner">
                  {libroActivo.imagen ? (
                    <img src={libroActivo.imagen} alt={libroActivo.titulo} className="w-full h-full object-contain" />
                  ) : (
                    <i className="fas fa-book text-6xl text-indigo-200" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">{libroActivo.autor}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">{libroActivo.categoria}</span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300">{libroActivo.anio}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">{libroActivo.titulo}</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{libroActivo.descripcion}</p>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-3 mb-8">
                <li className="flex items-center gap-3"><i className="fa-solid fa-user text-sm w-5 text-indigo-600" /> <span>Autor: {libroActivo.autor}</span></li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-file-lines text-sm w-5 text-indigo-600" /> <span>Páginas: {libroActivo.paginas}</span></li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-calendar text-sm w-5 text-indigo-600" /> <span>Año: {libroActivo.anio}</span></li>
              </ul>
              <div className="flex gap-4">
                <button
                  onClick={() => (libroActivo.pdfUrl || libroActivo.pdfData) && handleViewPdf(libroActivo)}
                  disabled={!(libroActivo.pdfUrl || libroActivo.pdfData)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-3 ${ (libroActivo.pdfUrl || libroActivo.pdfData) ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed' }`}
                >
                  <i className="fa-solid fa-book-open" aria-hidden="true" />
                  <span>Leer</span>
                </button>
                <button onClick={() => handleDownloadPdf(libroActivo)} disabled={!(libroActivo.pdfUrl || libroActivo.pdfData)} className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-3 ${(libroActivo.pdfUrl || libroActivo.pdfData) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'}`}>
                  <i className="fa-solid fa-download" aria-hidden="true" />
                  <span>{(libroActivo.pdfUrl || libroActivo.pdfData) ? 'Descargar' : 'No disponible'}</span>
                </button>
              </div>
              {downloadProgress !== null && (
                <div className="mt-4">
                  <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-emerald-600 transition-all" style={{ width: `${downloadProgress}%` }} />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Descargando... {downloadProgress}%</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
