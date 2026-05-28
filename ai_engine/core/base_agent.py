from typing import Dict, Any
from ai_engine.memory.manager import ShortTermMemory

class BaseAgent:
    """Base class for all pedagogical AI agents in the pipeline."""
    
    def __init__(self, name: str):
        self.name = name
        
    def process(self, context: ShortTermMemory, **kwargs) -> Dict[str, Any]:
        """
        Executes the agent's logic.
        Must be overridden by child classes.
        Returns a dictionary with the structured JSON output for this step.
        """
        raise NotImplementedError("Each agent must implement the process method.")
