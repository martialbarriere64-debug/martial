import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [prompt, setPrompt] = useState('Rends la pièce plus lumineuse, change le sol en parquet clair et ajoute une table moderne.')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    setIsLoading(true)
    try {
      const form = new FormData()
      form.append('image', file)
      form.append('prompt', prompt)
      const res = await fetch(`${BACKEND_URL}/enhance`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('Erreur API')
      const blob = await res.blob()
      const resultUrl = URL.createObjectURL(blob)
      const originalUrl = URL.createObjectURL(file)
      navigate('/result', { state: { originalUrl, resultUrl } })
    } catch (err) {
      alert('Une erreur est survenue lors du traitement.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="container-card p-6">
        <h2 className="text-xl font-semibold mb-4">Téléversez votre photo</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Que doit faire l'IA ?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Décrivez la retouche souhaitée..."
          />

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Amélioration en cours…' : 'Améliorer ma photo'}
          </button>
        </form>
      </div>

      <div className="container-card p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="mb-2">Formats acceptés: .jpg, .png</p>
          <p>Taille conseillée: ≤ 10 Mo</p>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="h-10 w-10 rounded-full border-4 border-brand/30 border-t-brand animate-spin" />
          <p className="sr-only">Traitement en cours…</p>
        </div>
      )}
    </div>
  )
}
