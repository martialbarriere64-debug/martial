# 🚀 Bien Démarrer avec ImmoGlam

Bienvenue dans **ImmoGlam** ! Ce guide vous permettra de lancer votre application en quelques minutes.

## 📱 Aperçu de l'Application

ImmoGlam est une application SaaS qui transforme vos photos immobilières grâce à l'intelligence artificielle.

### 🎯 Fonctionnalités

1. **Page d'accueil** - Présentation avec slogan accrocheur
2. **Upload de photo** - Glissez-déposez vos images
3. **Prompt personnalisé** - Décrivez vos modifications
4. **Traitement IA** - Amélioration automatique
5. **Comparaison** - Visualisez avant/après
6. **Téléchargement** - Récupérez votre image améliorée

## ⚡ Démarrage en 3 étapes

### Étape 1 : Lancer l'application

**Option A - Script automatique (recommandé)** 🌟

```bash
# Sur Unix/Linux/Mac
./start.sh

# Sur Windows
start.bat
```

**Option B - Manuel**

```bash
# Terminal 1 - Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

### Étape 2 : Accéder à l'application

Ouvrez votre navigateur sur : **http://localhost:5173**

Vous verrez :
- ✨ Une belle page d'accueil
- 🎨 Un design moderne et professionnel
- 🚀 Un bouton "Commencer"

### Étape 3 : Tester l'application

1. Cliquez sur **"Commencer"**
2. **Uploadez** une photo de test
3. Entrez un prompt comme :
   ```
   Rends la pièce plus lumineuse, ajoute des plantes 
   et améliore les couleurs
   ```
4. Cliquez sur **"Améliorer ma photo"**
5. Admirez le résultat !

## 🎨 Captures d'écran (à quoi ça ressemble)

### Page d'accueil
- Grand titre : "Transformez vos photos immobilières en visuels irrésistibles"
- 3 cartes de fonctionnalités
- Design moderne avec dégradés bleu-violet

### Page Upload
- Zone de glisser-déposer
- Aperçu de l'image
- Grande zone de texte pour le prompt
- Bouton "Améliorer ma photo" avec animation

### Page Résultat
- Comparaison côte à côte (avant/après)
- Toggle pour voir uniquement le résultat
- Bouton de téléchargement
- Bouton "Améliorer une autre photo"

## 🔍 URLs importantes

| Service | URL | Description |
|---------|-----|-------------|
| 🌐 Frontend | http://localhost:5173 | Interface utilisateur |
| 🔧 Backend | http://localhost:8000 | API REST |
| 📚 API Docs | http://localhost:8000/docs | Documentation Swagger |
| 💚 Health | http://localhost:8000/health | Statut de l'API |

## 🧪 Mode actuel : MOCK

L'application fonctionne actuellement en **mode mock** :

### Ce que ça fait :
- ✅ Améliore la luminosité (+15%)
- ✅ Augmente le contraste (+20%)
- ✅ Améliore la netteté (+30%)
- ✅ Renforce les couleurs (+15%)

### Ce que ça ne fait pas (encore) :
- ❌ Modifications structurelles (mobilier, décoration)
- ❌ Changements de style réels
- ❌ Génération d'éléments

Pour activer les vraies transformations IA, consultez **GEMINI_INTEGRATION.md**

## 🎯 Exemples de prompts

Testez ces prompts pour voir les améliorations :

### Prompts simples
```
Rends la pièce plus lumineuse
```

```
Améliore les couleurs et la netteté
```

### Prompts détaillés
```
Rends la pièce plus lumineuse, améliore les couleurs 
du mobilier et ajoute une atmosphère chaleureuse
```

```
Change le parquet en bois clair, ajoute des plantes vertes 
près des fenêtres et améliore l'éclairage naturel
```

> 💡 Note : En mode mock, le prompt n'affecte pas encore le résultat. 
> Après intégration de Gemini, ces prompts seront réellement appliqués !

## 🛠️ Architecture technique

```
Browser → React (Port 5173) → FastAPI (Port 8000) → Mock/Gemini
```

### Frontend (React)
- **React 18** - Framework UI
- **TailwindCSS** - Styling moderne
- **Vite** - Build tool rapide
- **React Router** - Navigation

### Backend (FastAPI)
- **FastAPI** - Framework web Python
- **Pillow** - Traitement d'images
- **Uvicorn** - Serveur ASGI

## 📚 Documentation disponible

| Fichier | Contenu |
|---------|---------|
| **README.md** | Documentation complète |
| **QUICKSTART.md** | Démarrage en 5 min |
| **GEMINI_INTEGRATION.md** | Intégrer l'API Gemini |
| **ARCHITECTURE.md** | Doc technique détaillée |
| **CONTRIBUTING.md** | Guide de contribution |
| **PROJECT_SUMMARY.md** | Résumé du projet |

## 🔧 Dépannage rapide

### ❌ "Port déjà utilisé"

**Backend (port 8000) :**
```bash
# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Windows  
netstat -ano | findstr :8000
taskkill /PID [PID] /F
```

**Frontend (port 5173) :**
```bash
# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID [PID] /F
```

### ❌ "Module not found"

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend  
cd frontend
rm -rf node_modules
npm install
```

### ❌ "Python not found"

Installez Python 3.8+ : https://python.org

### ❌ "npm not found"

Installez Node.js 18+ : https://nodejs.org

## 🚀 Prochaines étapes

### 1. Tester l'application ✅
- Lancez l'app
- Uploadez quelques images
- Testez différents prompts

### 2. Comprendre le code 📖
- Lisez le README.md
- Explorez frontend/src/pages/
- Regardez backend/main.py

### 3. Intégrer Gemini 🔌
- Obtenez une clé API Gemini
- Suivez GEMINI_INTEGRATION.md
- Testez avec de vrais prompts !

### 4. Personnaliser 🎨
- Modifiez les couleurs dans tailwind.config.js
- Ajoutez votre logo
- Adaptez les textes

### 5. Déployer 🌍
- Frontend : Vercel, Netlify
- Backend : Railway, Render, Fly.io

## 💡 Conseils d'utilisation

### Pour de meilleurs résultats :
- ✅ Utilisez des images de bonne qualité
- ✅ Photos bien éclairées
- ✅ Résolution raisonnable (pas trop petite)

### Types d'images supportés :
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ❌ GIF (non supporté)
- ❌ WebP (non supporté pour l'instant)

### Limites :
- 📏 Taille max : 10 MB par image
- 🎯 Mode mock : améliorations basiques uniquement
- 🔌 Gemini : améliorations avancées (à configurer)

## 🎉 Félicitations !

Vous avez maintenant une application SaaS complète et fonctionnelle !

### Ce que vous avez :
- ✅ Interface utilisateur professionnelle
- ✅ Backend robuste et sécurisé
- ✅ Mode mock fonctionnel
- ✅ Code prêt pour Gemini
- ✅ Documentation complète

### Ce que vous pouvez faire :
- 🎨 Personnaliser le design
- 🔌 Intégrer Gemini
- 💰 Ajouter des plans premium
- 👥 Ajouter l'authentification
- 🌍 Déployer en production

## 🆘 Besoin d'aide ?

1. **Problème de démarrage ?** → QUICKSTART.md
2. **Intégrer Gemini ?** → GEMINI_INTEGRATION.md
3. **Comprendre l'archi ?** → ARCHITECTURE.md
4. **Contribuer ?** → CONTRIBUTING.md

## 📞 Support

Pour toute question :
- 📖 Consultez la documentation
- 🔍 Cherchez dans les fichiers .md
- 💬 Ouvrez une issue GitHub

---

**ImmoGlam** - Transformez vos photos immobilières en visuels irrésistibles ! 🏠✨

*Prêt ? Lancez `./start.sh` et commencez à transformer vos photos !*
