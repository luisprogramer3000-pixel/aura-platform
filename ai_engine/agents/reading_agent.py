from ai_engine.core.base_agent import BaseAgent
from ai_engine.memory.manager import ShortTermMemory
from typing import Dict, Any

class ReadingAgent(BaseAgent):
    def __init__(self):
        super().__init__("ReadingAgent")

    def process(self, context: ShortTermMemory, **kwargs) -> Dict[str, Any]:
        # Generates stories and comprehension questions
        reading_data = {
            "story": f"A short story about {context.topic}",
            "comprehension_questions": [
                {"question": "What is the main idea?", "answer": "The main idea"}
            ]
        }
        context.accumulated_context["reading"] = reading_data
        return reading_data
