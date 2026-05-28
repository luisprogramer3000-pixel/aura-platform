from ai_engine.core.base_agent import BaseAgent
from ai_engine.memory.manager import ShortTermMemory
from typing import Dict, Any

class VocabularyAgent(BaseAgent):
    def __init__(self):
        super().__init__("VocabularyAgent")

    def process(self, context: ShortTermMemory, **kwargs) -> Dict[str, Any]:
        # Generates flashcards and word sets
        vocab_data = {
            "word_sets": [
                {"word": "Palabra", "translation": "Word", "pronunciation": "/pəˈlɑbrə/"}
            ]
        }
        context.accumulated_context["vocabulary"] = vocab_data
        return vocab_data
