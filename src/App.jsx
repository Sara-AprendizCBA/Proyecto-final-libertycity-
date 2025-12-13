import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import CategoryList from "./components/CategoryList";
import BookGrid from "./components/BookGrid";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";

const categorias = [
  "Todos",
  "Mangas",
  "Comics",
  "Romance",
  "Terror",
  "Ciencia Ficción",
  "Datos Científicos",
];

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
  },
  {
    id: 4,
    titulo: "Batman Año Uno",
    categoria: "Comics",
    autor: "Frank Miller",
    anio: 1987,
    paginas: 144,
    descripcion:
      "El inicio del Caballero Oscuro y su lucha contra el crimen.",
    icono: "🦇",
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
  },
];


export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [libroActivo, setLibroActivo] = useState(null);
  const [soloVista, setSoloVista] = useState(false);

  useEffect(() => {
    if (usuarioLogueado) {
      localStorage.setItem("usuario", JSON.stringify(usuarioLogueado));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuarioLogueado]);

  const librosFiltrados = useMemo(() => {
    return librosEjemplo.filter((libro) => {
      const coincideCategoria =
        categoriaActiva === "Todos" || libro.categoria === categoriaActiva;
      const coincideBusqueda = libro.titulo
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [categoriaActiva, busqueda]);

  const handleLikeLibro = (libro) => {
    const likes = JSON.parse(localStorage.getItem("likes")) || [];
    if (likes.some((l) => l.id === libro.id)) return;
    localStorage.setItem("likes", JSON.stringify([...likes, libro]));
  };

  const handleGuardarLibro = (libro) => {
    const guardados = JSON.parse(localStorage.getItem("guardados")) || [];
    if (guardados.some((g) => g.id === libro.id)) return;
    localStorage.setItem("guardados", JSON.stringify([...guardados, libro]));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Header
        usuario={usuarioLogueado}
        onLogout={() => setUsuarioLogueado(null)}
        onOpenAuth={() => setShowLogin(true)}
        onOpenProfile={() => setShowProfile(true)}
      />

      <div className="max-w-6xl mx-auto px-4">
        <Hero />
        <Search busqueda={busqueda} setBusqueda={setBusqueda} />
        <CategoryList
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          setCategoriaActiva={setCategoriaActiva}
        />

        <BookGrid
          libros={librosFiltrados}
          onVerLibro={(libro) => {
            setLibroActivo(libro);
            setSoloVista(false);
          }}
        />
      </div>

      <Footer />

        {showProfile && usuarioLogueado && (
          <Profile
            usuario={usuarioLogueado}
            onClose={() => setShowProfile(false)}
            onLogout={() => setUsuarioLogueado(null)}
            onUpdateUser={setUsuarioLogueado}
            onVerLibro={(libro) => {
              setLibroActivo(libro);
              setSoloVista(true); // 🔹 oculta ❤️ 💾
            }}
          />
        )}


      {/* 📘 VISTA LIBRO */}
        {libroActivo && (
  <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-y-auto">

    {/* HEADER */}
    <div className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold truncate">
          {libroActivo.titulo}
        </h2>

        <button
          onClick={() => setLibroActivo(null)}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-lg transition"
        >
          ✕
        </button>
      </div>
    </div>

    {/* CONTENIDO */}
    <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-16">

      {/* PORTADA */}
      <div className="flex justify-center">
        <div className="relative w-72 h-[440px] rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center">

          <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full bg-black/40 backdrop-blur">
            Disponible
          </span>

          <div className="text-7xl mb-4">
            {libroActivo.icono || "📘"}
          </div>

          <p className="text-sm opacity-80 px-4">
            {libroActivo.autor}
          </p>
        </div>
      </div>

      {/* INFO */}
      <div className="flex flex-col justify-center">

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-300">
            {libroActivo.categoria}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-white/10">
            {libroActivo.anio}
          </span>
        </div>

        {/* TITULO */}
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          {libroActivo.titulo}
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          {libroActivo.descripcion}
        </p>

        {/* METADATOS */}
        <ul className="text-gray-400 text-sm space-y-2 mb-8">
          <li>✍ Autor: {libroActivo.autor}</li>
          <li>📄 Páginas: {libroActivo.paginas}</li>
          <li>📅 Año: {libroActivo.anio}</li>
        </ul>

        {/* ACCIONES */}
        <div className="flex gap-4">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold transition">
            📖 Leer
          </button>
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-semibold transition">
            ⬇ Descargar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
