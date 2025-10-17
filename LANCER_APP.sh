#!/bin/bash

echo "🚀 Lancement d'ImmoGlam..."
echo ""

# Aller dans le backend
cd /workspace/backend

# Installer les dépendances backend
echo "📦 Installation backend..."
pip install -q -r requirements.txt

# Lancer le backend en arrière-plan
echo "🔧 Démarrage backend..."
python main.py &
BACKEND_PID=$!

# Attendre que le backend démarre
sleep 5

# Aller dans le frontend
cd /workspace/frontend

# Installer les dépendances frontend
echo "📦 Installation frontend..."
npm install --silent

# Lancer le frontend
echo "🎨 Démarrage frontend..."
echo ""
echo "════════════════════════════════════════════════════"
echo "✅ ImmoGlam est prêt !"
echo ""
echo "👉 Ouvrez ce lien dans votre navigateur :"
echo "   http://localhost:5173"
echo ""
echo "════════════════════════════════════════════════════"
echo ""

npm run dev
