import { useState } from 'react'

export default function BookDetail({ libro, onClose }) {
    const [downloadProgress, setDownloadProgress] = useState(null)
    if (!libro) return null;

    const viewPdf = (lib) => {
        if (!lib) return
        try {
            if (lib.pdfUrl) {
                window.open(lib.pdfUrl, '_blank', 'noopener,noreferrer')
                return
            }
            if (!lib.pdfData) {
                window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'PDF no disponible', type: 'error', duration: 2500 } }))
                return
            }
            const parts = lib.pdfData.split(',')
            const base64 = parts[1]
            const binary = atob(base64)
            const len = binary.length
            const u8 = new Uint8Array(len)
            for (let i = 0; i < len; i++) u8[i] = binary.charCodeAt(i)
            const blob = new Blob([u8], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            window.open(url, '_blank', 'noopener,noreferrer')
            setTimeout(() => URL.revokeObjectURL(url), 1000)
        } catch (err) {
            console.warn('viewPdf error', err)
        }
    }

    const downloadPdf = async (lib) => {
        if (!lib) return
        const filename = lib.pdfName || `${lib.titulo}.pdf`
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
                setDownloadProgress(null)
            }
        }

        try {
            if (lib.pdfUrl) {
                streamDownload(lib.pdfUrl)
                return
            }
            if (!lib.pdfData) return
            setDownloadProgress(30)
            await new Promise((r) => setTimeout(r, 150))
            const parts = lib.pdfData.split(',')
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
            console.warn('downloadPdf error', err)
            setDownloadProgress(null)
        }
    }
    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">

            {/* CERRAR */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-2xl"
            >
                ✕
            </button>

            <div className="max-w-6xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* PORTADA */}
                <div className="flex justify-center">
                    <img
                        src={libro.portada || "https://via.placeholder.com/300x450"}
                        alt={libro.titulo}
                        className="rounded-xl shadow-xl w-72"
                    />
                </div>

                {/* INFO */}
                <div className="md:col-span-2 space-y-6">

                    <h1 className="text-4xl font-bold">
                        {libro.titulo}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                        <span>👁 Lecturas: {libro.lecturas || "—"}</span>
                        <span>⭐ Votos: {libro.votos || "—"}</span>
                        <span>📖 Partes: {libro.partes || "—"}</span>
                        <span>⏱ {libro.duracion || "—"}</span>
                    </div>

                    {/* BOTONES */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => (libro.pdfUrl || libro.pdfData) && viewPdf(libro)}
                            disabled={!(libro.pdfUrl || libro.pdfData)}
                            className={`px-8 py-3 rounded-full flex items-center gap-2 ${ (libro.pdfUrl || libro.pdfData) ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}
                        >
                            📖 Empezar a leer
                        </button>
                        <button onClick={() => downloadPdf(libro)} disabled={!(libro.pdfUrl || libro.pdfData)} className="w-12 h-12 rounded-full border flex items-center justify-center text-xl">
                            ⤓
                        </button>
                    </div>
                    {downloadProgress !== null && (
                        <div className="mt-3">
                            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                                <div className="h-full bg-emerald-600" style={{ width: `${downloadProgress}%` }} />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">Descargando... {downloadProgress}%</div>
                        </div>
                    )}

                    {/* AUTOR */}
                    <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                            {libro.autor?.charAt(0) || "A"}
                        </div>
                        <span className="font-medium">
                            {libro.autor || "Autor desconocido"}
                        </span>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <p className="text-gray-700 leading-relaxed">
                        {libro.descripcion || "Sin descripción disponible."}
                    </p>

                    {/* TAGS */}
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                            Dominio público
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                            {libro.categoria}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
