from app.models import CompetitorEvent
from app.memory import remember_event


event = CompetitorEvent(
    competitor="Atlas",
    event_type="Product Launch",
    date="January 2026",
    details="Atlas launched an AI-powered analytics feature for business users.",
    source="Atlas company announcement",
)

print("COMPASS event created:")
print(event)

remember_event(event)

print("\nEvent successfully stored in Hindsight!")