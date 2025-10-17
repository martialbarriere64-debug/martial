# 🔌 Guide d'intégration de l'API Gemini

Ce guide explique comment connecter l'API Gemini à ImmoGlam pour activer les véritables transformations d'images par IA.

## 📋 Prérequis

1. Un compte Google Cloud Platform
2. Une clé API Gemini (Google AI)
3. Le package `google-generativeai` installé

## 🚀 Installation

### 1. Installer la bibliothèque Gemini

```bash
cd backend
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
pip install google-generativeai
```

### 2. Configurer la clé API

Créez un fichier `.env` dans le dossier `backend/` :

```bash
GEMINI_API_KEY=votre_cle_api_ici
```

### 3. Mettre à jour requirements.txt

Ajoutez cette ligne au fichier `backend/requirements.txt` :

```
google-generativeai==0.3.2
python-dotenv==1.0.0
```

## 💻 Code d'intégration

### 1. Modifier backend/main.py

Ajoutez ces imports au début du fichier :

```python
import google.generativeai as genai
from dotenv import load_dotenv
import base64

# Charger les variables d'environnement
load_dotenv()
```

### 2. Configurer Gemini au démarrage

Après les imports, ajoutez :

```python
# Configuration de l'API Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    print("✅ API Gemini configurée")
else:
    print("⚠️ Clé API Gemini non trouvée - Mode mock activé")
```

### 3. Remplacer la fonction enhance_image_with_gemini()

```python
def enhance_image_with_gemini(image_path: str, prompt: str) -> str:
    """
    Améliore l'image avec l'API Gemini.
    
    Args:
        image_path: Chemin vers l'image originale
        prompt: Instructions de l'utilisateur pour améliorer l'image
    
    Returns:
        Chemin vers l'image améliorée
    """
    
    # Vérifier si l'API est configurée
    if not GEMINI_API_KEY:
        print("⚠️ API Gemini non configurée, utilisation du mode mock")
        return enhance_image_mock(image_path, prompt)
    
    try:
        # Ouvrir et préparer l'image
        img = Image.open(image_path)
        
        # Convertir l'image en base64 pour l'API
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode()
        
        # Préparer le prompt enrichi pour Gemini
        full_prompt = f"""
        Tu es un expert en amélioration de photos immobilières.
        
        L'utilisateur demande : {prompt}
        
        Génère une image améliorée qui :
        - Répond exactement à la demande de l'utilisateur
        - Maintient le réalisme de la photo
        - Améliore la qualité professionnelle
        - Rend la propriété plus attrayante
        
        Retourne uniquement l'image améliorée, sans texte.
        """
        
        # Appeler l'API Gemini
        model = genai.GenerativeModel('gemini-pro-vision')
        
        response = model.generate_content([
            full_prompt,
            {'mime_type': 'image/jpeg', 'data': img_base64}
        ])
        
        # Traiter la réponse
        # Note : Cette partie dépend de la structure de réponse de Gemini
        # Adaptez selon la documentation officielle
        
        if response.candidates:
            # Extraire l'image générée
            generated_image_data = response.candidates[0].content.parts[0].inline_data.data
            
            # Décoder et sauvegarder
            img_data = base64.b64decode(generated_image_data)
            enhanced_img = Image.open(io.BytesIO(img_data))
            
            # Sauvegarder l'image améliorée
            filename = Path(image_path).name
            enhanced_path = ENHANCED_DIR / f"gemini_{filename}"
            enhanced_img.save(enhanced_path, quality=95)
            
            print(f"✅ Image améliorée avec Gemini : {enhanced_path}")
            return str(enhanced_path)
        else:
            print("⚠️ Aucune réponse de Gemini, utilisation du mode mock")
            return enhance_image_mock(image_path, prompt)
            
    except Exception as e:
        print(f"❌ Erreur avec l'API Gemini : {e}")
        print("Utilisation du mode mock en secours")
        return enhance_image_mock(image_path, prompt)
```

## 🎯 Alternatives et options

### Option 1 : Gemini Vision Pro

Meilleures pour la génération/modification d'images :

```python
model = genai.GenerativeModel('gemini-pro-vision')
```

### Option 2 : Gemini Ultra (si disponible)

Pour des résultats encore meilleurs :

```python
model = genai.GenerativeModel('gemini-ultra-vision')
```

### Option 3 : Imagen (Google Cloud)

Pour un contrôle maximal sur la génération d'images :

```python
from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict

# Configuration Imagen
```

## 🔍 Prompts optimisés

Pour de meilleurs résultats, voici des exemples de prompts structurés :

### Template de base

```python
def create_enhanced_prompt(user_prompt: str) -> str:
    return f"""
    Role: Expert en photographie immobilière et design d'intérieur.
    
    Tâche: Améliorer cette photo immobilière selon les instructions suivantes.
    
    Instructions de l'utilisateur: {user_prompt}
    
    Contraintes:
    - Maintenir le réalisme et la crédibilité
    - Respecter les proportions et la perspective
    - Améliorer la lumière naturelle
    - Conserver l'identité de l'espace
    
    Style: Photographie professionnelle immobilière, haute qualité, lumière naturelle.
    
    Format: Retourner uniquement l'image améliorée.
    """
```

## 🧪 Tests

### Test simple

```python
# Dans un fichier test_gemini.py
from backend.main import enhance_image_with_gemini

result = enhance_image_with_gemini(
    "test_image.jpg",
    "Rends la pièce plus lumineuse et ajoute des plantes"
)

print(f"Image générée : {result}")
```

## 📊 Gestion des erreurs

Implémentez une gestion d'erreurs robuste :

```python
class GeminiError(Exception):
    """Exception personnalisée pour les erreurs Gemini"""
    pass

def safe_enhance_image(image_path: str, prompt: str) -> str:
    try:
        return enhance_image_with_gemini(image_path, prompt)
    except GeminiError as e:
        logger.error(f"Erreur Gemini : {e}")
        return enhance_image_mock(image_path, prompt)
    except Exception as e:
        logger.error(f"Erreur inattendue : {e}")
        raise
```

## 💰 Gestion des coûts

Pour surveiller et limiter les coûts :

1. **Implémenter un cache** pour les requêtes similaires
2. **Limiter le nombre de requêtes** par utilisateur
3. **Optimiser la taille des images** avant envoi
4. **Utiliser des quotas** dans Google Cloud

```python
# Exemple de limitation de taille
MAX_IMAGE_SIZE = (1920, 1080)

def optimize_image_size(img: Image) -> Image:
    if img.size[0] > MAX_IMAGE_SIZE[0] or img.size[1] > MAX_IMAGE_SIZE[1]:
        img.thumbnail(MAX_IMAGE_SIZE, Image.Resampling.LANCZOS)
    return img
```

## 📚 Ressources

- [Documentation Gemini API](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Exemples de code](https://github.com/google/generative-ai-python)

## 🆘 Dépannage

### Erreur : "API key not valid"
- Vérifiez que votre clé API est correcte dans `.env`
- Assurez-vous que l'API Gemini est activée dans Google Cloud

### Erreur : "Rate limit exceeded"
- Attendez quelques secondes entre les requêtes
- Implémentez un système de rate limiting

### Erreur : "Invalid image format"
- Vérifiez que l'image est bien en JPEG ou PNG
- Optimisez la taille de l'image avant l'envoi

## 🎉 C'est prêt !

Une fois l'intégration terminée, testez avec :

```bash
cd backend
python main.py
```

Puis utilisez l'interface web pour tester l'amélioration d'images !
