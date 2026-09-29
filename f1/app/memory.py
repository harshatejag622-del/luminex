import os
from typing import List, Optional
from dotenv import load_dotenv
from hindsight_client import Hindsight

from app.models import CompetitorEvent

load_dotenv()

BANK_ID = "compass demo"


def get_hindsight_client():
    """Create and return a Hindsight client."""
    api_key = os.getenv("HINDSIGHT_API_KEY")
    if not api_key:
        raise RuntimeError("HINDSIGHT_API_KEY was not found in the .env file.")

    return Hindsight(
        base_url="https://api.hindsight.vectorize.io",
        api_key=api_key,
    )


def remember(content: str, context: Optional[str] = None) -> bool:
    """Store information in COMPASS's long-term memory."""
    client = get_hindsight_client()
    try:
        client.retain(
            bank_id=BANK_ID,
            content=content,
            context=context,
        )
        return True
    finally:
        client.close()


def recall(query: str, max_tokens: int = 4096):
    """Retrieve relevant memories from COMPASS's long-term memory."""
    client = get_hindsight_client()
    try:
        results = client.recall(
            bank_id=BANK_ID,
            query=query,
            max_tokens=max_tokens,
            budget="mid",
        )
        return results.results if hasattr(results, "results") else []
    except Exception as e:
        print(f"Hindsight recall error: {e}")
        return []
    finally:
        client.close()


def remember_event(event: CompetitorEvent) -> bool:
    """Store a structured competitor event in Hindsight."""
    content = (
        f"Competitor: {event.competitor}. "
        f"Event: {event.event_type}. "
        f"Date: {event.date}. "
        f"Details: {event.details}. "
        f"Category: {event.category or 'General'}. "
        f"Source: {event.source or 'Official Intelligence'}."
    )
    context = f"competitive intelligence event involving {event.competitor}"
    return remember(content=content, context=context)


def remember_feedback(feedback: str) -> bool:
    """Store user feedback that should influence future analysis."""
    return remember(
        content=feedback,
        context="user feedback about competitive intelligence analysis",
    )


def ensure_company_memories(competitor: str, query: str = "") -> int:
    """
    Ensure Hindsight memory contains competitive history for the requested company.
    If few or no memories exist, dynamically fetch events and retain them in Hindsight.
    Returns the number of new events added.
    """
    from app.intelligence_fetcher import discover_company_intelligence

    existing_memories = recall(f"{competitor} competitive intelligence events and history")
    existing_texts = [m.text.lower() for m in existing_memories] if existing_memories else []

    # If memory already has at least 3 distinct records for this company and no specific query, we're good
    if len(existing_texts) >= 3 and not query:
        return 0

    # Discover events for this company (from demo dataset or Groq synthesis)
    events = discover_company_intelligence(competitor, query)
    added = 0

    for event in events:
        snippet = event.details.lower()[:40]
        # Avoid duplicate ingestion
        if any(snippet in m for m in existing_texts):
            continue

        try:
            remember_event(event)
            added += 1
            existing_texts.append(event.details.lower())
        except Exception as e:
            print(f"Error retaining event for {competitor}: {e}")

    return added