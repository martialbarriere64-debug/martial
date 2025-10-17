import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showComparison, setShowComparison] = useState(true)

  const { originalImage, enhancedImage, prompt, filename } = location.state || {}

  useEffect(() => {
    // Rediriger si pas de données
    if (!originalImage || !enhancedImage) {
      navigate('/upload')
    }
  }, [originalImage, enhancedImage, navigate])

  const handleDownload = () => {
    // Créer un lien de téléchargement
    const link = document.createElement('a')
    link.href = enhancedImage
    link.download = `immoglam_enhanced_${filename || 'image.jpg'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!originalImage || !enhancedImage) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ✨ Votre photo a été améliorée !
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Voici le résultat de l'amélioration basée sur votre demande : "{prompt}"
          </p>
        </div>

        {/* Toggle entre comparaison et image seule */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-md p-1 inline-flex">
            <button
              onClick={() => setShowComparison(true)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                showComparison
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Comparaison
            </button>
            <button
              onClick={() => setShowComparison(false)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                !showComparison
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Résultat uniquement
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {showComparison ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image originale */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Avant
                </h3>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={originalImage}
                    alt="Photo originale"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Image améliorée */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Après
                </h3>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={enhancedImage}
                    alt="Photo améliorée"
                    className="w-full h-auto"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✨ Amélioré
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Résultat final
              </h3>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={enhancedImage}
                  alt="Photo améliorée"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition transform hover:scale-105 shadow-lg flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Télécharger l'image améliorée
          </button>

          <Link
            to="/upload"
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-xl transition border-2 border-gray-300 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Améliorer une autre photo
          </Link>
        </div>

        {/* Info supplémentaire */}
        <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🚀 Version actuelle
          </h3>
          <p className="text-gray-700 text-sm">
            Vous utilisez actuellement la version de démonstration d'ImmoGlam avec des 
            améliorations basiques. L'intégration complète avec l'API Gemini permettra des 
            transformations beaucoup plus avancées et personnalisées !
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
