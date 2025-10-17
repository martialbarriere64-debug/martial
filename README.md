# ImmoGlam

Transformez vos photos immobilières en visuels irrésistibles grâce à l’IA.

## Structure du projet

```
/backend           # FastAPI (Python)
  ├─ main.py       # Endpoint POST /enhance + mocks Gemini
  └─ requirements.txt
/frontend          # React + Tailwind (Vite)
  ├─ index.html
  ├─ vite.config.js
  ├─ tailwind.config.js
  ├─ postcss.config.js
  └─ src/
     ├─ main.jsx
     ├─ index.css
     └─ pages/
        ├─ UploadPage.jsx
        └─ ResultPage.jsx
```

## Lancer le backend

Prérequis: Python 3.10+

```bash
cd backend
pip install -r requirements.txt
python main.py
```

- Le serveur écoute par défaut sur `http://localhost:8000`.
- Endpoint santé: `GET /health`
- Endpoint traitement: `POST /enhance` (multipart/form-data)
  - `image`: fichier .jpg/.png
  - `prompt`: texte libre

### Préparation API Gemini

Le backend détecte la variable d’environnement `GEMINI_API_KEY`.
Pour l’instant, l’appel reste mock via `enhance_image_with_gemini` et renvoie l’image d’origine.

```bash
# Exemple
export GEMINI_API_KEY="votre_cle"
python main.py
```

Dans `backend/main.py`, implémentez la fonction suivante quand vous brancherez l’API:

```python
# TODO: Connecter ici l'API Gemini.
def enhance_image_with_gemini(image_bytes: bytes, prompt: str) -> bytes:
    return image_bytes
```

## Lancer le frontend

Prérequis: Node.js 18+

```bash
cd frontend
npm install
npm run dev
```

- Le frontend tourne sur `http://localhost:5173`.
- Configurez l’URL du backend si besoin via la variable `VITE_API_URL`:

```bash
# Exemple
export VITE_API_URL="http://localhost:8000"
npm run dev
```

## Flux utilisateur

1. Page d’accueil: slogan + bouton « Commencer »
2. Page d’upload: téléverser `.jpg/.png`, saisir un prompt, cliquer « Améliorer ma photo »
3. Chargement pendant le traitement
4. Page de résultat: comparatif avant/après côte à côte, bouton « Télécharger l’image améliorée »

## Design

- Navbar « ImmoGlam »
- Fond gris très clair, cartes blanches, ombres douces, boutons arrondis
- Style premium "proptech"

## Déploiement sur Replit

- Lancez le backend (commande: `python main.py`)
- Lancez le frontend (commande: `npm run dev` dans `frontend/`)

## Licence

MIT