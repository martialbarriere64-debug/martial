import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const originalUrl = location.state?.originalUrl
  const resultUrl = location.state?.resultUrl

  const onDownload = () => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = 'immoglam-enhanced.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  if (!originalUrl || !resultUrl) {
    return (
      <div className="container-card p-8 text-center space-y-4">
        <h2 className="text-xl font-semibold">Aucune image à afficher</h2>
        <p className="text-gray-600">Retournez à l'upload pour sélectionner une image.</p>
        <button className="btn-primary" onClick={() => navigate('/upload')}>Retour à l'upload</button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Comparatif Avant / Après</h2>
        <div className="flex items-center gap-3">
          <button className="btn-secondary" onClick={() => navigate('/upload')}>Recommencer</button>
          <button className="btn-primary" onClick={onDownload}>Télécharger l'image améliorée</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="container-card p-4">
          <div className="text-sm text-gray-500 mb-2">Avant</div>
          <img src={originalUrl} alt="Avant" className="w-full h-auto rounded-xl" />
        </div>
        <div className="container-card p-4">
          <div className="text-sm text-gray-500 mb-2">Après (mock)</div>
          <img src={resultUrl} alt="Après" className="w-full h-auto rounded-xl" />
        </div>
      </div>
    </div>
  )
}
