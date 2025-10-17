from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
import uvicorn
import os
from io import BytesIO
from typing import Optional, Tuple

try:
    from PIL import Image, ImageEnhance
except Exception:  # pragma: no cover - Pillow may not be installed yet at import time
    Image = None  # type: ignore
    ImageEnhance = None  # type: ignore

app = FastAPI(
    title="ImmoGlam Backend",
    version="0.1.0",
    description=(
        "Service d'amélioration de photos immobilières (mock). "
        "Préparé pour connexion à l'API Gemini."
    ),
)

# CORS large pour simplifier le dev local (Vite tourne généralement sur 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict:
    """Vérifie que l'API répond."""
    return {"status": "ok"}


def _simple_enhance_with_pillow(image_bytes: bytes, prompt: str) -> Tuple[bytes, str]:
    """
    Fallback local enhancement using Pillow to create a visible change.
    Produces PNG bytes as output.
    """
    if Image is None or ImageEnhance is None:
        # Pillow indisponible: renvoyer l'image telle quelle
        return image_bytes, "image/jpeg"

    img = Image.open(BytesIO(image_bytes))
    # Heuristiques simples depuis le prompt
    lower_prompt = (prompt or "").lower()

    # Toujours: légère amélioration globale
    brightness_factor = 1.10
    contrast_factor = 1.08
    sharpness_factor = 1.05

    if any(k in lower_prompt for k in ["lumineux", "lumineuse", "bright", "brighter", "plus lumineux"]):
        brightness_factor = 1.20
    if any(k in lower_prompt for k in ["contrast", "contraste", "pop"]):
        contrast_factor = 1.15
    if any(k in lower_prompt for k in ["sharp", "net", "netteté", "sharper"]):
        sharpness_factor = 1.10

    img = ImageEnhance.Brightness(img).enhance(brightness_factor)
    img = ImageEnhance.Contrast(img).enhance(contrast_factor)
    img = ImageEnhance.Sharpness(img).enhance(sharpness_factor)

    out = BytesIO()
    img.save(out, format="PNG", optimize=True)
    return out.getvalue(), "image/png"


def enhance_image_with_gemini(image_bytes: bytes, prompt: str) -> Tuple[bytes, Optional[str]]:
    """
    Intégration Gemini (analyse) + fallback visuel local (Pillow).

    - `image_bytes`: contenu binaire de l'image originale
    - `prompt`: instruction utilisateur pour la retouche

    Implémentation actuelle:
    - Tente d'appeler Gemini 1.5 en analyse (multimodal) pour valider la connexion.
    - Produit l'image de sortie via un filtre local (Pillow) afin de livrer un rendu visuel immédiat.
    - Vous pouvez remplacer cette logique par l'API d'édition d'images Google (Images API)
      dès que disponible dans votre environnement.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        # Pas de clé: fallback local
        enhanced_bytes, media_type = _simple_enhance_with_pillow(image_bytes, prompt)
        return enhanced_bytes, media_type

    # Connexion Gemini (analyse multimodale)
    try:  # pragma: no cover - dépendance externe
        import google.generativeai as genai  # type: ignore

        genai.configure(api_key=api_key)
        try:
            # Utilise un modèle multimodal pour "lire" l'image et la consigne.
            # Cette étape valide la connexion API sans exposer la clé côté client.
            model = genai.GenerativeModel("gemini-1.5-flash")

            # Essayez de fournir l'image sous forme de bytes à la requête multimodale.
            # La plupart des versions acceptent une image PIL directement ou un dict inline_data.
            parts = []
            if Image is not None:
                try:
                    pil_img = Image.open(BytesIO(image_bytes))
                    parts.append(pil_img)
                except Exception:
                    # Si ouverture PIL échoue, passe en inline_data
                    parts.append({
                        "mime_type": "image/jpeg",
                        "data": image_bytes,
                    })
            else:
                parts.append({
                    "mime_type": "image/jpeg",
                    "data": image_bytes,
                })

            parts.insert(0, prompt)
            _ = model.generate_content(parts)
        except Exception:
            # Si l'appel échoue (version lib, quota, etc.), on continue en fallback local
            pass
    except Exception:
        # Lib non installée / import KO
        pass

    # Produit un rendu local visible
    enhanced_bytes, media_type = _simple_enhance_with_pillow(image_bytes, prompt)
    return enhanced_bytes, media_type


def enhance_image(image_bytes: bytes, prompt: str) -> Tuple[bytes, Optional[str]]:
    """
    Fonction mock qui simule l'amélioration de l'image.
    Applique une légère amélioration locale pour un résultat visible.
    """
    enhanced_bytes, media_type = _simple_enhance_with_pillow(image_bytes, prompt)
    return enhanced_bytes, media_type


@app.post("/enhance")
async def enhance(image: UploadFile = File(...), prompt: str = Form(...)):
    """
    Reçoit une image et une instruction textuelle, renvoie l'image "améliorée" (mock).

    Corps attendu (multipart/form-data):
    - image: fichier .jpg/.png
    - prompt: texte libre

    Réponse: octets de l'image améliorée, avec le même Content-Type que l'entrée.
    Si la variable d'environnement `GEMINI_API_KEY` est définie, utilise
    `enhance_image_with_gemini` (toujours mock pour l'instant).
    """
    try:
        original_bytes = await image.read()
        use_gemini = bool(os.environ.get("GEMINI_API_KEY"))
        if use_gemini:
            enhanced_bytes, inferred_media_type = enhance_image_with_gemini(original_bytes, prompt)
        else:
            enhanced_bytes, inferred_media_type = enhance_image(original_bytes, prompt)

        media_type = inferred_media_type or image.content_type or "image/png"
        return Response(content=enhanced_bytes, media_type=media_type)
    except Exception as exc:  # pragma: no cover
        return JSONResponse(status_code=500, content={"detail": f"Processing failed: {exc}"})


if __name__ == "__main__":
    # Lancement local: python main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
