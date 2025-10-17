# 🏠 ImmoGlam - Améliorateur de photos immobilières par IA

**ImmoGlam** est une application SaaS qui permet de transformer vos photos immobilières en visuels professionnels et modernes grâce à l'intelligence artificielle.

## ✨ Fonctionnalités

- 📸 **Upload de photos** - Importez facilement vos photos immobilières (.jpg, .png)
- 🎨 **Personnalisation par IA** - Décrivez en texte libre les modifications souhaitées
- ⚡ **Traitement rapide** - Obtenez vos résultats en quelques secondes
- 🔄 **Comparaison avant/après** - Visualisez l'amélioration en temps réel
- 💾 **Téléchargement** - Récupérez vos images améliorées en haute qualité

## 🚀 Architecture

Le projet est divisé en deux parties :

- **Frontend** : Application React avec TailwindCSS et Vite
- **Backend** : API REST FastAPI en Python

```
/workspace
├── frontend/           # Application React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   ├── App.jsx      # Composant racine
│   │   └── main.jsx     # Point d'entrée
│   ├── package.json
│   └── vite.config.js
│
└── backend/            # API FastAPI
    ├── main.py         # Serveur et endpoints
    ├── requirements.txt
    └── uploads/        # Dossier des images (créé automatiquement)
```

## 📋 Prérequis

- **Python 3.8+**
- **Node.js 18+** et npm
- **pip** (gestionnaire de paquets Python)

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd workspace
```

### 2. Installation du Backend

```bash
cd backend

# Créer un environnement virtuel (recommandé)
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt
```

### 3. Installation du Frontend

```bash
cd frontend

# Installer les dépendances
npm install
```

## 🎯 Lancement de l'application

### Démarrer le Backend (Terminal 1)

```bash
cd backend
python main.py
```

Le backend sera accessible sur : **http://localhost:8000**

Documentation API : **http://localhost:8000/docs**

### Démarrer le Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Le frontend sera accessible sur : **http://localhost:5173**

## 🎨 Utilisation

1. Ouvrez votre navigateur sur `http://localhost:5173`
2. Cliquez sur **"Commencer"**
3. **Uploadez** votre photo immobilière
4. **Décrivez** les modifications souhaitées, par exemple :
   - "Rends la pièce plus lumineuse"
   - "Change le sol en parquet clair"
   - "Ajoute une table moderne et des plantes"
5. Cliquez sur **"Améliorer ma photo"**
6. Visualisez le **comparatif avant/après**
7. **Téléchargez** votre image améliorée

## 🔌 Intégration de l'API Gemini

Actuellement, l'application utilise une fonction mock qui applique des filtres basiques (luminosité, contraste, netteté).

Pour intégrer l'API Gemini :

1. Ouvrez le fichier `backend/main.py`
2. Localisez la fonction `enhance_image_with_gemini()`
3. Remplacez le code par votre intégration de l'API Gemini :

```python
def enhance_image_with_gemini(image_path: str, prompt: str) -> str:
    """
    Fonction pour améliorer l'image avec l'API Gemini.
    
    # TODO: Connecter ici l'API Gemini
    """
    
    # Exemple d'intégration (à adapter selon la documentation de Gemini)
    import google.generativeai as genai
    
    # Configurer l'API
    genai.configure(api_key='VOTRE_CLE_API')
    
    # Charger l'image
    image = Image.open(image_path)
    
    # Appeler l'API Gemini
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([prompt, image])
    
    # Traiter la réponse et sauvegarder l'image
    # ...
    
    return enhanced_image_path
```

## 🎨 Technologies utilisées

### Frontend
- ⚛️ **React 18** - Framework JavaScript
- 🎨 **TailwindCSS** - Framework CSS utilitaire
- ⚡ **Vite** - Build tool moderne et rapide
- 🛣️ **React Router** - Gestion de la navigation
- 📡 **Axios** - Client HTTP

### Backend
- 🐍 **FastAPI** - Framework web Python moderne
- 🖼️ **Pillow (PIL)** - Traitement d'images
- 🦄 **Uvicorn** - Serveur ASGI
- 🔄 **python-multipart** - Support des uploads multipart

## 📝 API Endpoints

### `GET /`
Retourne les informations de l'API

### `POST /enhance`
Améliore une photo immobilière

**Paramètres:**
- `image` (file) : Photo à améliorer
- `prompt` (string) : Description des modifications

**Réponse:** Image améliorée (blob)

### `GET /health`
Vérifie l'état de santé de l'API

## 🎯 Roadmap

- [ ] Intégration complète de l'API Gemini
- [ ] Système d'authentification utilisateur
- [ ] Historique des transformations
- [ ] Templates de prompts prédéfinis
- [ ] Support de lots d'images
- [ ] API de paiement et plans premium

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Créé avec ❤️ pour simplifier l'amélioration de photos immobilières

---

**Note**: Cette application est actuellement en version de démonstration. L'intégration complète avec l'API Gemini permettra des transformations beaucoup plus avancées et personnalisées !
