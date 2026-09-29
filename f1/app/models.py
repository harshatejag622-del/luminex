from dataclasses import dataclass
from typing import Optional, List, Dict, Any


@dataclass
class CompetitorEvent:
    competitor: str
    event_type: str
    date: str
    details: str
    source: Optional[str] = None
    category: Optional[str] = None  # Pricing, Product/Feature, Messaging, Hiring, Partnership


@dataclass
class AnalysisResult:
    competitor: str
    question: Optional[str]
    memory_mode: str  # "on", "off", "compare"
    brief_memory_on: str
    brief_memory_off: Optional[str] = None
    historical_count: int = 0