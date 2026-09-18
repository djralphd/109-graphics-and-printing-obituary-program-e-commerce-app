import { useCallback, useRef, useState } from 'react'
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react'

const ACCEPTED = ['application/pdf', 'image/tiff', 'image/png', 'image/jpeg']
const ACCEPTED_EXT = '.pdf,.tif,.tiff,.png,.jpg,.jpeg'
const MAX_SIZE = 100 * 1024 * 1024 // 100 MB

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

export default function UploadZone({ file, onFileChange }) {
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const simulateUpload = useCallback(
    (selected) => {
      setError('')
      setProgress(0)
      let p = 0
      const interval = setInterval(() => {
        p += Math.random() * 22 + 8
        if (p >= 100) {
          p = 100
          clearInterval(interval)
          onFileChange(selected)
        }
        setProgress(Math.min(p, 100))
      }, 120)
    },
    [onFileChange]
  )

  const validateAndSet = useCallback(
    (selected) => {
      if (!selected) return
      const validType =
        ACCEPTED.includes(selected.type) ||
        /\.(pdf|tif|tiff|png|jpe?g)$/i.test(selected.name)
      if (!validType) {
        setError('Unsupported file type. Please upload a PDF, TIFF, PNG, orJPG file.')
        return
      }
      if (selected.size > MAX_SIZE) {
        setError('File exceeds the 100 MB limit. Please compress or split your file.')
        return
      }
      simulateUpload(selected)
    },
    [simulateUpload]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      const dropped = e.dataTransfer.files?.[0]
      validateAndSet(dropped)
    },
    [validateAndSet]
  )

  const handleRemove = useCallback(() => {
    onFileChange(null)
    setProgress(0)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }, [onFileChange])

  const uploading = progress > 0 && progress < 100 && !file

  return (
    <div>
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
          }}
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
            dragging
              ? 'border-gold-400 bg-gold-50'
              : 'border-cream-400 bg-cream-50 hover:border-gold-300 hover:bg-cream-100'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXT}
            className="hidden"
            onChange={(e) => validateAndSet(e.target.files?.[0])}
          />
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
              dragging ? 'bg-gold-500 text-white' : 'bg-white text-gold-600 shadow-soft group-hover:scale-105'
            }`}
          >
            <UploadCloud className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <p className="mt-5 text-base font-semibold text-navy-900">
            {dragging ? 'Drop your file here' : 'Drag & drop your artwork'}
          </p>
          <p className="mt-1.5 text-sm text-navy-500">
            or <span className="font-semibold text-gold-600 underline underline-offset-2">browse your files</span>
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-navy-400">
            PDF · TIFF · PNG · JPG — up to 100 MB
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-white p-5 shadow-soft">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
              <FileText className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-navy-900">{file.name}</p>
                  <p className="mt-0.5 text-xs text-navy-400">{formatBytes(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-navy-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">Upload complete</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {uploading && (
        <div className="mt-4 rounded-2xl border border-cream-300 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-navy-700">Uploading artwork…</span>
            <span className="font-semibold text-gold-600">{Math.round(progress)}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
