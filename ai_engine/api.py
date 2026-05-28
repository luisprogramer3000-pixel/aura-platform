from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import sys
import os

# Add parent directory to path so relative imports work if run directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ai_engine.memory.manager import ShortTermMemory, MemoryManager
from ai_engine.agents.orchestrator_agent import OrchestratorAgent

app = FastAPI(title="Aura AI Educational Engine", version="1.0.0")

# CORS Configuration for Production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize managers
memory_manager = MemoryManager()
orchestrator = OrchestratorAgent()

class GenerateRequest(BaseModel):
    topic: str
    age: str
    level: str
    subject: str
    slide_count: int = 10
    image_type: str = "2D Illustrations"

@app.post("/api/v1/generate")
async def generate_lesson(req: GenerateRequest):
    """
    Endpoint to trigger the full multi-agent generation pipeline.
    """
    session_id = str(uuid.uuid4())
    
    # Initialize Short Term Memory
    context = ShortTermMemory(
        session_id=session_id,
        topic=req.topic,
        target_age=req.age,
        target_level=req.level,
        subject=req.subject
    )
    
    # Store in memory manager
    memory_manager.update_short_term(context)
    
    # Run the pipeline (this is synchronous for MVP, but should be async/background in production)
    final_output = orchestrator.execute_pipeline(short_term=context)
    
    return {
        "status": "success",
        "message": "Lesson generated successfully via multi-agent pipeline.",
        "data": final_output
    }

class ExerciseRequest(BaseModel):
    topic: str
    subject: str
    cefr_level: str

@app.post("/api/v1/generate_exercises")
async def generate_exercises(req: ExerciseRequest):
    """
    Mock endpoint: Generates interactive exercises for the duplicate slide feature.
    """
    return {
        "status": "success",
        "exercises": [
            {
                "question": f"¿Cuál de estos conceptos pertenece al tema: {req.topic}?",
                "options": ["Concepto A", "Concepto B (Correcto)", "Concepto C"],
                "correct_answer": "Concepto B (Correcto)"
            },
            {
                "question": f"En el contexto de {req.subject}, completa la frase...",
                "options": ["Opción 1", "Opción 2", "Opción Correcta"],
                "correct_answer": "Opción Correcta"
            }
        ]
    }

class MediaRequest(BaseModel):
    topic: str
    prompt: str = ""

@app.post("/api/v1/generate_image")
async def generate_image(req: MediaRequest):
    """ Mock endpoint for AI Image Generation """
    return {"url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"}

@app.post("/api/v1/search_video")
async def search_video(req: MediaRequest):
    """ Mock endpoint for Video Search """
    return {"url": "https://www.youtube.com/embed/dQw4w9WgXcQ"}

@app.post("/api/v1/generate_audio")
async def generate_audio(req: MediaRequest):
    """ Mock endpoint for Audio Generation """
    return {"url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ai_engine.api:app", host="0.0.0.0", port=8000, reload=True)
