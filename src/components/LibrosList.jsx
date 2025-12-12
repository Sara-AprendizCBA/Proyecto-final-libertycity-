import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import BookCard from "./BookCard"

const LibrosList = () => {
    const [libros, setLibros] = useState([])
    const [loading, setLoading] = useState(true)
    const [descargando, setDescargando] = useState({})

    // Función para obtener libros con URLs de imágenes
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
            const librosConImagenes = data.map(libro => {

                const { data: imagenData } = supabase
                    .storage
                    .from('caratulas') // Tu bucket de carátulas
                    .getPublicUrl(libro.caratula_path || `caratula_${libro.id}`) // Ajusta según tu naming

                return {
                    ...libro,
                    imagenUrl: imagenData.publicUrl
                }
            })

            setLibros(librosConImagenes)
        } catch (error) {
            console.error('Error fetching libros:', error)
        } finally {
            setLoading(false)
        }
    }

    // Función para descargar libro
    const descargarLibro = async (libro) => {
        try {
            setDescargando(prev => ({ ...prev, [libro.id]: true }))

            // Obtener URL firmada para el archivo
            const { data, error } = await supabase
                .storage
                .from('libros') // Tu bucket de archivos de libros
                .createSignedUrl(libro.archivo_path || `libro_${libro.id}`, 60) // 60 segundos de validez

            if (error) throw error

            // Crear enlace de descarga
            const link = document.createElement('a')
            link.href = data.signedUrl
            link.download = `${libro.titulo}.${obtenerExtension(libro.archivo_path)}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.error('Error descargando libro:', error)
            alert('Error al descargar el libro')
        } finally {
            setDescargando(prev => ({ ...prev, [libro.id]: false }))
        }
    }

    // Función para obtener extensión del archivo
    const obtenerExtension = (path) => {
        if (!path) return 'pdf'
        return path.split('.').pop() || 'pdf'
    }

    // Función alternativa: descarga directa con URL pública
    const descargarLibroDirecto = async (libro) => {
        try {
            setDescargando(prev => ({ ...prev, [libro.id]: true }))

            // Obtener URL pública
            const { data } = supabase
                .storage
                .from('libros')
                .getPublicUrl(libro.archivo_path || `libro_${libro.id}`)

            // Descargar usando fetch
            const response = await fetch(data.publicUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = `${libro.titulo}.${obtenerExtension(libro.archivo_path)}`
            document.body.appendChild(link)
            link.click()

            // Limpiar
            window.URL.revokeObjectURL(url)
            document.body.removeChild(link)

        } catch (error) {
            console.error('Error descargando libro:', error)
            alert('Error al descargar el libro')
        } finally {
            setDescargando(prev => ({ ...prev, [libro.id]: false }))
        }
    }

    useEffect(() => {
        fetchLibros()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Cargando libros...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Biblioteca de Libros</h1>

            {libros.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No hay libros disponibles</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {libros.map((libro) => (
                        <BookCard key={libro.id} libro={libro} />
                    ))}
                </div>
            )}
        </div>
    )
}
{/* Botón de descarga */ }
<button
    onClick={() => descargarLibroDirecto(libro)}
    disabled={descargando[libro.id]}
    className={`w-full py-2 px-4 rounded-md font-medium ${descargando[libro.id]
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
>
    {descargando[libro.id] ? (
        <span className="flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Descargando...
        </span>
    ) : (
        <span className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Descargar Libro
        </span>
    )}
</button>

export default LibrosList