from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ShortTermMemory(BaseModel):
    """Memory representing the current lesson context."""
    session_id: str
    topic: str
    target_age: str
    target_level: str
    subject: str
    current_step: str = "init"
    accumulated_context: Dict[str, Any] = Field(default_factory=dict)
    
class LongTermMemory(BaseModel):
    """Memory representing teacher preferences, design system rules, and global settings."""
    teacher_id: str
    teaching_style: str = "Interactive and encouraging"
    preferred_colors: List[str] = Field(default_factory=list)
    typography: Dict[str, str] = Field(default_factory=dict)
    custom_instructions: str = ""

class StudentMemory(BaseModel):
    """Memory representing student progress, weaknesses, and strengths."""
    student_id: str
    known_vocabulary: List[str] = Field(default_factory=list)
    grammar_weaknesses: List[str] = Field(default_factory=list)
    average_score: float = 0.0
    completed_lessons: int = 0

class MemoryManager:
    """Manages retrieving and updating memory states."""
    
    def __init__(self):
        # In a real system, this would connect to pgvector or a database.
        self.short_term: Dict[str, ShortTermMemory] = {}
        self.long_term: Dict[str, LongTermMemory] = {}
        self.student: Dict[str, StudentMemory] = {}
        
    def get_short_term(self, session_id: str) -> Optional[ShortTermMemory]:
        return self.short_term.get(session_id)
        
    def update_short_term(self, memory: ShortTermMemory):
        self.short_term[memory.session_id] = memory
