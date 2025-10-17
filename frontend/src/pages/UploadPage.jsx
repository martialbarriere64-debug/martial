import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UploadPage() {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Vérifier que c'est bien une image
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide (.jpg, .png)')
        return
      }

      // Vérifier la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('L\'image est trop grande (max 10MB)')
        return
      }

      setSelectedFile(file)
      setError('')

      // Créer l'aperçu
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      setError('Veuillez sélectionner une image')
      return
    }

    if (!prompt.trim()) {
      setError('Veuillez décrire les modifications souhaitées')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Préparer les données du formulaire
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('prompt', prompt)

      // Envoyer la requête au backend
      const response = await axios.post('http://localhost:8000/enhance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important pour recevoir l'image
      })

      // Créer une URL pour l'image améliorée
      const enhancedImageUrl = URL.createObjectURL(response.data)

      // Naviguer vers la page de résultat avec les données
      navigate('/result', {
        state: {
          originalImage: previewUrl,
          enhancedImage: enhancedImageUrl,
          prompt: prompt,
          filename: selectedFile.name
        }
      })
    } catch (err) {
      console.error('Erreur lors de l\'amélioration:', err)
      setError('Une erreur est survenue lors du traitement. Assurez-vous que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Améliorez votre photo
          </h1>
          <p className="text-gray-600">
            Uploadez votre photo immobilière et décrivez les modifications souhaitées
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Zone d'upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo immobilière
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="mb-4">
                      <img
                        src={previewUrl}
                        alt="Aperçu"
                        className="mx-auto h-64 w-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null)
                          setPreviewUrl(null)
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Changer l'image
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Téléversez un fichier</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={handleFileSelect}
                          />
                        </label>
                        <p className="pl-1">ou glissez-déposez</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Zone de texte pour le prompt */}
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Décrivez les modifications souhaitées
              </label>
              <textarea
                id="prompt"
                name="prompt"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Exemple : Rends la pièce plus lumineuse, change le sol en parquet clair et ajoute une table moderne."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-500">
                Soyez aussi précis que possible pour obtenir le meilleur résultat
              </p>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading || !selectedFile || !prompt.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition transform hover:scale-[1.02] shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Amélioration en cours...
                </span>
              ) : (
                'Améliorer ma photo'
              )}
            </button>
          </form>
        </div>

        {/* Section d'information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Conseils</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Utilisez des photos de bonne qualité pour de meilleurs résultats</li>
            <li>• Soyez précis dans vos descriptions (couleurs, matériaux, style...)</li>
            <li>• Vous pouvez demander des modifications d'éclairage, de mobilier ou de décoration</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
