import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transformez vos photos immobilières en{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              visuels irrésistibles
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Grâce à l'intelligence artificielle, donnez vie à vos biens immobiliers 
            avec des photos professionnelles et modernes en quelques clics.
          </p>
          <Link
            to="/upload"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition transform hover:scale-105 shadow-lg"
          >
            Commencer
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Rapide et Simple</h3>
            <p className="text-gray-600">
              Uploadez votre photo et obtenez un résultat professionnel en quelques secondes
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Personnalisable</h3>
            <p className="text-gray-600">
              Décrivez exactement ce que vous voulez : luminosité, mobilier, décoration...
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
            <p className="text-gray-600">
              Des résultats professionnels propulsés par l'intelligence artificielle
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
