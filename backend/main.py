from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
import uvicorn
import os

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


def enhance_image_with_gemini(image_bytes: bytes, prompt: str) -> bytes:
    """
    TODO: Connecter ici l'API Gemini.

    - `image_bytes`: contenu binaire de l'image originale
    - `prompt`: instruction utilisateur pour la retouche

    Pour l'instant, renvoie simplement l'image originale en guise de mock.
    """
    # TODO: Connecter ici l'API Gemini.
    return image_bytes


def enhance_image(image_bytes: bytes, prompt: str) -> bytes:
    """
    Fonction mock qui simule l'amélioration de l'image.
    Actuellement, renvoie l'image d'entrée telle quelle.
    """
    return image_bytes


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
            enhanced_bytes = enhance_image_with_gemini(original_bytes, prompt)
        else:
            enhanced_bytes = enhance_image(original_bytes, prompt)
        media_type = image.content_type or "image/jpeg"
        return Response(content=enhanced_bytes, media_type=media_type)
    except Exception as exc:  # pragma: no cover
        return JSONResponse(status_code=500, content={"detail": f"Processing failed: {exc}"})


if __name__ == "__main__":
    # Lancement local: python main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
