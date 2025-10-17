# 🏗️ Architecture ImmoGlam

Documentation technique de l'architecture de l'application.

## 📊 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    UTILISATEUR                               │
│                  (Navigateur Web)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  FRONTEND                                    │
│              (React + Vite + TailwindCSS)                    │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │HomePage  │  │UploadPage│  │ResultPage│                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
│  ┌──────────────────────────────────────┐                   │
│  │        React Router                   │                   │
│  └──────────────────────────────────────┘                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ REST API (Axios)
                     │ POST /enhance
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  BACKEND                                     │
│                 (FastAPI + Python)                           │
│                                                              │
│  ┌──────────────────────────────────────┐                   │
│  │  Endpoint: POST /enhance             │                   │
│  │  - Reçoit image + prompt             │                   │
│  │  - Valide les données                │                   │
│  │  - Appelle enhance_image_with_gemini│                   │
│  │  - Retourne image améliorée          │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  ┌──────────────────────────────────────┐                   │
│  │  enhance_image_with_gemini()         │                   │
│  │  ┌────────────────────────────────┐  │                   │
│  │  │ Mode MOCK (actuel)             │  │                   │
│  │  │ - Luminosité, contraste        │  │                   │
│  │  │ - Netteté, saturation          │  │                   │
│  │  └────────────────────────────────┘  │                   │
│  │  ┌────────────────────────────────┐  │                   │
│  │  │ Mode GEMINI (futur)            │  │                   │
│  │  │ - Envoi à l'API Gemini         │  │                   │
│  │  │ - Traitement IA avancé         │  │                   │
│  │  └────────────────────────────────┘  │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  ┌──────────────────────────────────────┐                   │
│  │  Stockage Local                      │                   │
│  │  - uploads/    (images originales)   │                   │
│  │  - enhanced/   (images améliorées)   │                   │
│  └──────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flux de données

### 1. Upload d'image

```
User → UploadPage → FormData(image, prompt) → POST /enhance → Backend
```

### 2. Traitement

```
Backend → Validation → Sauvegarde uploads/ → enhance_image_with_gemini()
→ Traitement (Mock ou Gemini) → Sauvegarde enhanced/ → Response(blob)
```

### 3. Affichage résultat

```
Backend → Image blob → Frontend → ResultPage → Affichage comparatif
→ Option téléchargement
```

## 📁 Structure des fichiers

```
workspace/
│
├── frontend/                    # Application React
│   ├── src/
│   │   ├── components/         # Composants réutilisables
│   │   │   └── Navbar.jsx      # Barre de navigation
│   │   │
│   │   ├── pages/              # Pages de l'application
│   │   │   ├── HomePage.jsx    # Page d'accueil
│   │   │   ├── UploadPage.jsx  # Page d'upload
│   │   │   └── ResultPage.jsx  # Page de résultats
│   │   │
│   │   ├── App.jsx             # Composant racine + routing
│   │   ├── main.jsx            # Point d'entrée React
│   │   └── index.css           # Styles globaux + Tailwind
│   │
│   ├── index.html              # Template HTML
│   ├── package.json            # Dépendances npm
│   ├── vite.config.js          # Configuration Vite
│   ├── tailwind.config.js      # Configuration Tailwind
│   └── postcss.config.js       # Configuration PostCSS
│
├── backend/                    # API FastAPI
│   ├── main.py                 # Serveur + endpoints + logique
│   ├── requirements.txt        # Dépendances Python
│   ├── .env.example            # Template variables d'env
│   ├── uploads/                # Images uploadées (auto-créé)
│   └── enhanced/               # Images améliorées (auto-créé)
│
├── README.md                   # Documentation principale
├── QUICKSTART.md               # Guide de démarrage rapide
├── GEMINI_INTEGRATION.md       # Guide intégration Gemini
├── ARCHITECTURE.md             # Ce fichier
├── CONTRIBUTING.md             # Guide de contribution
├── LICENSE                     # Licence MIT
├── .gitignore                  # Fichiers à ignorer
├── package.json                # Scripts npm racine
├── start.sh                    # Script de démarrage Unix
└── start.bat                   # Script de démarrage Windows
```

## 🛠️ Technologies

### Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 18.2.0 | Framework UI |
| React Router | 6.21.1 | Navigation |
| TailwindCSS | 3.4.1 | Styling |
| Vite | 5.0.11 | Build tool |
| Axios | 1.6.5 | HTTP client |

### Backend

| Technologie | Version | Usage |
|-------------|---------|-------|
| FastAPI | 0.109.0 | Framework web |
| Uvicorn | 0.27.0 | Serveur ASGI |
| Pillow | 10.2.0 | Traitement images |
| python-multipart | 0.0.6 | Upload fichiers |

## 🔐 Sécurité

### Frontend
- Validation des types de fichiers
- Limitation de taille (10MB)
- Sanitization des inputs

### Backend
- CORS configuré
- Validation des types MIME
- Gestion des erreurs
- Isolation des fichiers uploadés

## 📡 API Endpoints

### `GET /`
**Description:** Point d'entrée de l'API

**Response:**
```json
{
  "message": "Bienvenue sur l'API ImmoGlam !",
  "version": "1.0.0",
  "status": "online"
}
```

### `POST /enhance`
**Description:** Améliore une photo immobilière

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `image`: File (image/jpeg, image/png)
  - `prompt`: String (description des modifications)

**Response:**
- Content-Type: `image/jpeg` ou `image/png`
- Body: Image améliorée (blob)

**Erreurs:**
- 400: Fichier invalide
- 500: Erreur de traitement

### `GET /health`
**Description:** Vérification de santé de l'API

**Response:**
```json
{
  "status": "healthy"
}
```

## 🔄 États de l'application

### Frontend States

#### UploadPage
```javascript
{
  selectedFile: File | null,
  previewUrl: string | null,
  prompt: string,
  loading: boolean,
  error: string
}
```

#### ResultPage
```javascript
{
  originalImage: string,
  enhancedImage: string,
  prompt: string,
  filename: string,
  showComparison: boolean
}
```

## 🎨 Système de design

### Palette de couleurs

```css
Primary (Blue): 
  - 50:  #f0f9ff
  - 500: #0ea5e9 (principal)
  - 700: #0369a1 (hover)

Gray:
  - 50:  #f9fafb (background)
  - 600: #4b5563 (text secondary)
  - 900: #111827 (text primary)

Success: #10b981
Error:   #ef4444
Warning: #f59e0b
```

### Composants

- **Cards:** `bg-white rounded-xl shadow-lg p-8`
- **Buttons:** `rounded-xl px-8 py-4 font-semibold transition`
- **Inputs:** `rounded-xl px-4 py-3 border focus:ring-2`

## 🚀 Performance

### Frontend
- Code splitting avec React.lazy (à implémenter)
- Optimisation des images
- Lazy loading des composants

### Backend
- Async/await pour I/O
- Compression des réponses
- Cache des images (à implémenter)

## 📈 Évolutions futures

### Phase 1 (Actuelle)
- ✅ Interface utilisateur complète
- ✅ Upload et preview d'images
- ✅ Amélioration mock
- ✅ Comparaison avant/après
- ✅ Téléchargement

### Phase 2 (Prochaine)
- 🔲 Intégration API Gemini
- 🔲 Authentification utilisateur
- 🔲 Base de données
- 🔲 Historique des transformations

### Phase 3 (Future)
- 🔲 Plans premium
- 🔲 Traitement par lots
- 🔲 Templates de prompts
- 🔲 API publique
- 🔲 Mobile app

## 🧪 Tests

### À implémenter

```bash
# Frontend
npm run test

# Backend
pytest

# E2E
playwright test
```

## 📝 Conventions de code

### Python (Backend)
- PEP 8
- Type hints
- Docstrings Google style
- Async/await

### JavaScript (Frontend)
- ESLint + Prettier
- Composants fonctionnels
- Hooks custom pour logique réutilisable
- PropTypes ou TypeScript

## 🔍 Monitoring (à implémenter)

- Logs structurés
- Métriques d'utilisation
- Temps de réponse API
- Taux d'erreur

## 📞 Support

Pour toute question sur l'architecture :
1. Consultez cette documentation
2. Lisez le code source (bien commenté)
3. Ouvrez une issue GitHub

---

**ImmoGlam** - Architecture claire, code propre, évolutivité maximale 🏗️✨
