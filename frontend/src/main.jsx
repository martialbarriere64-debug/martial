import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import UploadPage from './pages/UploadPage.jsx'
import ResultPage from './pages/ResultPage.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-semibold text-brand">ImmoGlam</div>
          <div className="text-sm text-gray-500">Transformez vos photos immobilières</div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
    </div>
  )
}

function HomePage() {
  return (
    <Layout>
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Transformez vos photos immobilières en visuels irrésistibles grâce à l’IA.
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Importez une image, décrivez ce que vous souhaitez, et obtenez une version modernisée.
        </p>
        <a href="/upload" className="btn-primary inline-block">Commencer</a>
      </div>
    </Layout>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/upload', element: <Layout><UploadPage /></Layout> },
  { path: '/result', element: <Layout><ResultPage /></Layout> },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
