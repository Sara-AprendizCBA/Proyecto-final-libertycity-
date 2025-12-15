import { useState } from 'react'
import { createBook } from '../Service/bookService'
import { uploadToCloudinaryWithProgress } from '../Service/uploadService'

export default function UploadBook({ onClose, onCreate, usuario }) {
  const [form, setForm] = useState({
    titulo: '',
    categoria: '',
    autor: '',
    anio: '',
    paginas: '',
    descripcion: '',
    imagen: ''
  })
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfData, setPdfData] = useState(null) // base64 dataURL
  const [imageFile, setImageFile] = useState(null)
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  if (!usuario) return null

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleFile = (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Solo se permiten archivos PDF.')
      return
    }
    setError(null)
    setPdfFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPdfData(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleSelectFile = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) handleFile(f)
  }

  const handleImageFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen para la portada.')
      return
    }
    setError(null)
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImageData(reader.result)
    reader.readAsDataURL(file)
  }

  const handleImageDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    if (f) handleImageFile(f)
  }

  const handleSelectImage = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) handleImageFile(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setProgress(0)
    try {
      // Primero subimos archivos grandes a Cloudinary (si están presentes)
      let imagenUrl = null
      let pdfUrl = null

      let simulateLocal = false
      try {
        if (imageFile) {
          // subimos y usamos la URL resultante. Progreso mapeado 0-60
          imagenUrl = await uploadToCloudinaryWithProgress(imageFile, (p) => setProgress(Math.round(p * 0.6)), 'libros')
        }

        if (pdfFile) {
          // progreso mapeado 60-90
          pdfUrl = await uploadToCloudinaryWithProgress(pdfFile, (p) => setProgress(60 + Math.round(p * 0.3)), 'libros')
        }
      } catch (uploadErr) {
        // si Cloudinary no está configurado o falla, caemos a modo simulación local
        console.warn('upload to cloud failed, falling back to local simulation', uploadErr)
        simulateLocal = true
      }

      setProgress(95)

      const payload = {
        ...form,
        anio: Number(form.anio) || 0,
        paginas: Number(form.paginas) || 0,
        autor: form.autor || usuario.nombre,
        imagen: imagenUrl || form.imagen || undefined,
        pdfUrl: pdfUrl || undefined,
        imagenName: imageFile ? imageFile.name : undefined,
        pdfName: pdfFile ? pdfFile.name : undefined,
      }

      let created
      if (simulateLocal) {
        // crear localmente sin enviar a MockAPI; adjuntamos data URLs para mostrar
        created = {
          id: `local_${Date.now()}`,
          titulo: payload.titulo,
          categoria: payload.categoria,
          autor: payload.autor,
          anio: payload.anio,
          paginas: payload.paginas,
          descripcion: payload.descripcion,
          imagen: imageData || payload.imagen,
          imagenName: payload.imagenName,
          pdfData: pdfData || undefined,
          pdfName: payload.pdfName,
        }
        // notify user
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Subida simulada: el libro se creó localmente.', type: 'info', duration: 3000 } }))
      } else {
        created = await createBook(payload)
      }
      onCreate && onCreate(created)
      onClose && onClose()
    } catch (err) {
      console.error('UploadBook submit error', err)
      setError(err && err.message ? String(err.message) : 'No se pudo subir el libro. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Subir libro</h3>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300">Cerrar</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" className="input" required />
            <input name="autor" value={form.autor} onChange={handleChange} placeholder="Autor" className="input" />
            <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" className="input" />
            <input name="anio" value={form.anio} onChange={handleChange} placeholder="Año" type="number" className="input" />
            <input name="paginas" value={form.paginas} onChange={handleChange} placeholder="Páginas" type="number" className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Portada (imagen) opcional</label>
            <div onDrop={handleImageDrop} onDragOver={(e)=>e.preventDefault()} className="border-dashed border-2 border-gray-300 dark:border-gray-600 p-4 rounded cursor-pointer text-sm text-gray-600 dark:text-gray-300">
              <p className="mb-2">Arrastra y suelta una imagen aquí o haz clic para seleccionar.</p>
              <input type="file" accept="image/*" onChange={handleSelectImage} className="w-full" />
              {imageData && (
                <div className="mt-2 flex items-center justify-between">
                  <img src={imageData} alt="preview" className="w-20 h-28 object-cover rounded" />
                  <div className="flex flex-col items-end">
                    <span className="text-sm">{imageFile?.name}</span>
                    <button type="button" onClick={() => { setImageFile(null); setImageData(null) }} className="text-sm text-red-600 mt-2">Eliminar</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Archivo PDF (opcional)</label>
            <div onDrop={handleDrop} onDragOver={(e)=>e.preventDefault()} className="border-dashed border-2 border-gray-300 dark:border-gray-600 p-4 rounded cursor-pointer text-sm text-gray-600 dark:text-gray-300">
              <p className="mb-2">Arrastra y suelta un PDF aquí o haz clic para seleccionar.</p>
              <input type="file" accept="application/pdf" onChange={handleSelectFile} className="w-full" />
              {pdfFile && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm">{pdfFile.name}</span>
                  <button type="button" onClick={() => { setPdfFile(null); setPdfData(null) }} className="text-sm text-red-600">Eliminar</button>
                </div>
              )}
            </div>
          </div>

          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full input h-28" />

          {error && <p className="text-red-600">{error}</p>}

          {loading && (
            <div className="w-full">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mb-2">
                <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-sm text-gray-600">Subiendo... {progress}%</p>
            </div>
          )}

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white py-2 rounded">{loading ? 'Subiendo...' : 'Subir'}</button>
            <button type="button" onClick={onClose} disabled={loading} className="flex-1 border rounded py-2">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
