from ai_engine.core.base_agent import BaseAgent
from ai_engine.memory.manager import ShortTermMemory
from typing import Dict, Any

class CurriculumAgent(BaseAgent):
    def __init__(self):
        super().__init__("CurriculumAgent")

    def process(self, context: ShortTermMemory, **kwargs) -> Dict[str, Any]:
        # Builds lesson structure, learning objectives, progression
        structure = {
            "objectives": [f"Understand {context.topic}", "Apply basic vocabulary"],
            "progression": ["Introduction", "Grammar", "Vocabulary", "Practice", "Assessment"],
            "estimated_duration_minutes": 45
        }
        context.accumulated_context["curriculum"] = structure
        return structure
