import { useEffect, useState, useRef } from 'react'

export default function Toast() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState(3500)

  const timerRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      const d = e.detail || {}
      setMessage(d.message || 'Hecho')
      setType(d.type || 'success')
      setTitle(d.title || (d.type === 'success' ? '¡Perfecto!' : 'Aviso'))
      setDuration(d.duration || 3500)
      setVisible(true)

      // restart progress bar animation
      if (progressRef.current) {
        progressRef.current.style.transition = 'none'
        progressRef.current.style.width = '100%'
        // start transition on next frame
        requestAnimationFrame(() => {
          progressRef.current.style.transition = `width ${d.duration || 3500}ms linear`
          progressRef.current.style.width = '0%'
        })
      }

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setVisible(false), d.duration || 3500)
    }

    window.addEventListener('show-toast', handler)
    return () => {
      window.removeEventListener('show-toast', handler)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (!visible) return null

  const bg = type === 'success' ? 'from-emerald-500 to-emerald-600' : type === 'error' ? 'from-red-500 to-red-600' : 'from-slate-600 to-slate-700'

  return (
    <div aria-live="polite" className="fixed inset-0 pointer-events-none z-50 flex items-start md:items-end justify-center md:justify-end p-4">
      <div className="w-full max-w-sm pointer-events-auto">
        <div className={`rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/10 transform transition duration-300 translate-y-0`}>
          <div className={`p-4 bg-gradient-to-r ${bg} text-white flex items-start gap-3`}> 
            <div className="flex-shrink-0 mt-1">
              {type === 'success' ? (
                <i className="fa-solid fa-circle-check text-2xl" aria-hidden="true"></i>
              ) : (
                <i className="fa-solid fa-triangle-exclamation text-2xl" aria-hidden="true"></i>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-sm opacity-90 mt-1 leading-tight">{message}</p>
                </div>
                <button onClick={() => setVisible(false)} className="text-white/90 hover:text-white p-1 rounded-md">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div ref={progressRef} style={{ width: '100%' }} className="h-1 bg-white/80 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
