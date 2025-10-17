# ⚡ Démarrage Rapide - ImmoGlam

Guide ultra-rapide pour lancer ImmoGlam en 5 minutes !

## 🎯 Méthode 1 : Script automatique (Recommandé)

### Linux / macOS

```bash
./start.sh
```

### Windows

```bash
start.bat
```

Ces scripts installent automatiquement toutes les dépendances et lancent les serveurs.

## 🎯 Méthode 2 : Installation manuelle

### Étape 1 : Backend

```bash
# Terminal 1
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

✅ Backend lancé sur **http://localhost:8000**

### Étape 2 : Frontend

```bash
# Terminal 2 (nouveau terminal)
cd frontend
npm install
npm run dev
```

✅ Frontend lancé sur **http://localhost:5173**

## 🎯 Méthode 3 : Avec npm (si concurrently est installé)

```bash
# À la racine du projet
npm install
npm run dev
```

Cela lance automatiquement backend + frontend en parallèle !

## 🎨 Utilisation

1. Ouvrez **http://localhost:5173** dans votre navigateur
2. Cliquez sur **"Commencer"**
3. **Uploadez** une photo immobilière
4. **Décrivez** les modifications souhaitées :
   ```
   Exemple : "Rends la pièce plus lumineuse, ajoute des plantes 
   vertes près de la fenêtre et change le sol en parquet clair"
   ```
5. Cliquez sur **"Améliorer ma photo"**
6. Admirez le résultat et **téléchargez** votre image !

## 🔧 Dépannage rapide

### ❌ "Port 8000 already in use"

```bash
# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### ❌ "Port 5173 already in use"

Modifiez le port dans `frontend/vite.config.js` :

```js
server: {
  port: 3000  // Changez le port ici
}
```

### ❌ "Module not found"

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### ❌ "Python not found"

Installez Python 3.8+ depuis [python.org](https://python.org)

### ❌ "npm not found"

Installez Node.js 18+ depuis [nodejs.org](https://nodejs.org)

## 📱 Tester l'API directement

Documentation interactive : **http://localhost:8000/docs**

Test rapide :

```bash
curl http://localhost:8000/health
```

Réponse attendue :
```json
{"status": "healthy"}
```

## 🚀 Prochaines étapes

1. ✅ L'application fonctionne en mode **mock** (améliorations basiques)
2. 🔌 Pour activer les vraies transformations IA, consultez [GEMINI_INTEGRATION.md](./GEMINI_INTEGRATION.md)
3. 🎨 Personnalisez le design dans `frontend/src/`
4. 🔧 Modifiez le backend dans `backend/main.py`

## 💡 Conseils

- Utilisez des **images de bonne qualité** (pas trop floues)
- Soyez **précis** dans vos descriptions
- Testez différents **styles de prompts**
- Consultez le [README.md](./README.md) pour plus de détails

## 🎉 Félicitations !

Vous avez maintenant une application SaaS fonctionnelle pour améliorer des photos immobilières !

Besoin d'aide ? Consultez :
- [README.md](./README.md) - Documentation complète
- [GEMINI_INTEGRATION.md](./GEMINI_INTEGRATION.md) - Intégration de l'IA
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guide de contribution

---

**ImmoGlam** - Transformez vos photos immobilières en visuels irrésistibles 🏠✨
