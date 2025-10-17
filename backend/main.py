from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os
from pathlib import Path
import shutil
from PIL import Image, ImageEnhance, ImageFilter
import io

app = FastAPI(title="ImmoGlam API")

# Configuration CORS pour permettre les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Créer les dossiers nécessaires
UPLOAD_DIR = Path("uploads")
ENHANCED_DIR = Path("enhanced")
UPLOAD_DIR.mkdir(exist_ok=True)
ENHANCED_DIR.mkdir(exist_ok=True)


def enhance_image_with_gemini(image_path: str, prompt: str) -> str:
    """
    Fonction pour améliorer l'image avec l'API Gemini.
    
    Args:
        image_path: Chemin vers l'image originale
        prompt: Instructions de l'utilisateur pour améliorer l'image
    
    Returns:
        Chemin vers l'image améliorée
    
    # TODO: Connecter ici l'API Gemini
    # Cette fonction devra :
    # 1. Charger l'image
    # 2. Envoyer l'image + prompt à l'API Gemini
    # 3. Récupérer l'image générée
    # 4. Sauvegarder l'image améliorée
    # 5. Retourner le chemin de l'image améliorée
    """
    
    # Pour l'instant, on simule l'amélioration avec un traitement basique
    return enhance_image_mock(image_path, prompt)


def enhance_image_mock(image_path: str, prompt: str) -> str:
    """
    Fonction mock qui simule l'amélioration de l'image.
    Applique quelques filtres basiques pour créer un "avant/après" visible.
    
    Args:
        image_path: Chemin vers l'image originale
        prompt: Instructions de l'utilisateur (non utilisé pour le moment)
    
    Returns:
        Chemin vers l'image "améliorée"
    """
    try:
        # Ouvrir l'image originale
        img = Image.open(image_path)
        
        # Appliquer des améliorations visuelles basiques
        # 1. Améliorer la luminosité
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(1.15)
        
        # 2. Améliorer le contraste
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.2)
        
        # 3. Améliorer la netteté
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(1.3)
        
        # 4. Améliorer la saturation des couleurs
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(1.15)
        
        # Sauvegarder l'image améliorée
        filename = Path(image_path).name
        enhanced_path = ENHANCED_DIR / f"enhanced_{filename}"
        img.save(enhanced_path, quality=95)
        
        return str(enhanced_path)
    
    except Exception as e:
        print(f"Erreur lors de l'amélioration de l'image : {e}")
        # En cas d'erreur, retourner l'image originale
        return image_path


@app.get("/")
async def root():
    """Endpoint racine pour vérifier que l'API fonctionne."""
    return {
        "message": "Bienvenue sur l'API ImmoGlam !",
        "version": "1.0.0",
        "status": "online"
    }


@app.post("/enhance")
async def enhance_photo(
    image: UploadFile = File(..., description="Photo immobilière à améliorer"),
    prompt: str = Form(..., description="Instructions pour l'amélioration de l'image")
):
    """
    Endpoint principal pour améliorer une photo immobilière.
    
    Args:
        image: Fichier image uploadé par l'utilisateur
        prompt: Texte décrivant les modifications souhaitées
    
    Returns:
        Fichier image amélioré
    """
    try:
        # Vérifier le type de fichier
        if not image.content_type.startswith('image/'):
            return {"error": "Le fichier doit être une image"}
        
        # Sauvegarder l'image originale
        original_filename = image.filename
        original_path = UPLOAD_DIR / original_filename
        
        with original_path.open("wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        print(f"Image reçue : {original_filename}")
        print(f"Prompt de l'utilisateur : {prompt}")
        
        # Améliorer l'image avec Gemini (pour l'instant, fonction mock)
        enhanced_path = enhance_image_with_gemini(str(original_path), prompt)
        
        print(f"Image améliorée : {enhanced_path}")
        
        # Retourner l'image améliorée
        return FileResponse(
            enhanced_path,
            media_type=image.content_type,
            filename=f"enhanced_{original_filename}"
        )
    
    except Exception as e:
        print(f"Erreur lors du traitement : {e}")
        return {"error": str(e)}


@app.get("/health")
async def health_check():
    """Endpoint de santé pour vérifier que l'API est opérationnelle."""
    return {"status": "healthy"}


if __name__ == "__main__":
    print("🚀 Démarrage de l'API ImmoGlam...")
    print("📍 URL : http://localhost:8000")
    print("📚 Documentation : http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
