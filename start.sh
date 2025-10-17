#!/bin/bash

echo "🚀 Démarrage d'ImmoGlam..."
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérifier si Python est installé
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si Node est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "${BLUE}📦 Installation des dépendances...${NC}"
echo ""

# Installation Backend
echo "Backend..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt
cd ..

# Installation Frontend
echo "Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install --silent
fi
cd ..

echo ""
echo "${GREEN}✅ Installation terminée !${NC}"
echo ""
echo "Démarrage des serveurs..."
echo ""

# Démarrer le backend en arrière-plan
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

# Attendre que le backend démarre
sleep 3

# Démarrer le frontend en arrière-plan
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "${GREEN}🎉 ImmoGlam est maintenant en cours d'exécution !${NC}"
echo ""
echo "${BLUE}Frontend :${NC} http://localhost:5173"
echo "${BLUE}Backend API :${NC} http://localhost:8000"
echo "${BLUE}Documentation API :${NC} http://localhost:8000/docs"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs"

# Attendre l'interruption
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
