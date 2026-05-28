from ai_engine.core.base_agent import BaseAgent
from ai_engine.memory.manager import ShortTermMemory
from typing import Dict, Any

class GrammarAgent(BaseAgent):
    def __init__(self):
        super().__init__("GrammarAgent")

    def process(self, context: ShortTermMemory, **kwargs) -> Dict[str, Any]:
        # Generates grammar explanations and simplified rules
        grammar_data = {
            "rules": [f"Basic rule for {context.topic}"],
            "examples": [{"sentence": "Example 1", "translation": "Traducción 1"}],
            "simplification": "This means you just add -s to pluralize."
        }
        context.accumulated_context["grammar"] = grammar_data
        return grammar_data
