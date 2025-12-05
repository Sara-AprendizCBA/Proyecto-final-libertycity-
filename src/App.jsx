// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { useState } from 'react'
import Header from './components/Header'
import Search from './components/Search'
import CategoryList from './components/CategoryList'
import BookGrid from './components/BookGrid'
import Hero from './components/Hero'
import Footer from './components/Footer'

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

  const librosFiltrados = librosEjemplo.filter((libro) => {
    const coincideCategoria =
      categoriaActiva === 'Todos' || libro.categoria === categoriaActiva
    const coincideBusqueda = libro.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      {/* Full-width header */}
      <div className="w-full px-4">
        <Header />
      </div>

      {/* Centered content */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <main className="bg-white rounded-xl shadow p-6">
          <Hero />
          <Search busqueda={busqueda} setBusqueda={setBusqueda} />
          <CategoryList
            categorias={categorias}
            categoriaActiva={categoriaActiva}
            setCategoriaActiva={setCategoriaActiva}
          />

          <BookGrid libros={librosFiltrados} />

          {librosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No se encontraron libros.</p>
          )}
        </main>
      </div>

      {/* Full-width footer */}
      <div className="w-full mt-8 px-4">
        <Footer />
      </div>
    </div>
  )
}

