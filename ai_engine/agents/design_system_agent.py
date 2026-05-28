from ai_engine.core.base_agent import BaseAgent
from ai_engine.memory.manager import ShortTermMemory, LongTermMemory
from typing import Dict, Any

class DesignSystemAgent(BaseAgent):
    def __init__(self):
        super().__init__("DesignSystemAgent")

    def process(self, context: ShortTermMemory, **kwargs) -> Dict[str, Any]:
        # Ensures visual consistency, typography, color system
        long_term: LongTermMemory = kwargs.get("long_term_memory")
        
        design_data = {
            "colors": long_term.preferred_colors if long_term and long_term.preferred_colors else ["#4f46e5", "#ffffff"],
            "typography": long_term.typography if long_term and long_term.typography else {"heading": "Inter", "body": "Roboto"}
        }
        context.accumulated_context["design_system"] = design_data
        return design_data
