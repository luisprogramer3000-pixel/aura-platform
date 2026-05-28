from typing import Dict, Any
from ai_engine.memory.manager import ShortTermMemory, LongTermMemory, StudentMemory
from ai_engine.agents.curriculum_agent import CurriculumAgent
from ai_engine.agents.grammar_agent import GrammarAgent
from ai_engine.agents.vocabulary_agent import VocabularyAgent
from ai_engine.agents.reading_agent import ReadingAgent
from ai_engine.agents.exercise_agent import ExerciseAgent
from ai_engine.agents.audio_agent import AudioAgent
from ai_engine.agents.design_system_agent import DesignSystemAgent
from ai_engine.agents.pedagogy_validator_agent import PedagogyValidatorAgent
from ai_engine.agents.export_agent import ExportAgent

class OrchestratorAgent:
    def __init__(self):
        self.agents = [
            CurriculumAgent(),
            GrammarAgent(),
            VocabularyAgent(),
            ReadingAgent(),
            ExerciseAgent(),
            AudioAgent(),
            DesignSystemAgent(),
            PedagogyValidatorAgent(),
            ExportAgent()
        ]

    def execute_pipeline(self, 
                         short_term: ShortTermMemory, 
                         long_term: LongTermMemory = None, 
                         student: StudentMemory = None) -> Dict[str, Any]:
        """
        Coordinates the execution of all agents in the pipeline sequentially.
        Passes the memory context to each agent.
        """
        for agent in self.agents:
            # Execute each agent and update the accumulated context
            agent.process(short_term, long_term_memory=long_term, student_memory=student)
            
        # The final structured JSON is the accumulated context
        final_output = {
            "session_id": short_term.session_id,
            "topic": short_term.topic,
            "payload": short_term.accumulated_context
        }
        return final_output
