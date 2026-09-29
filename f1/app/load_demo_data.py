from app.demo_data import ATLAS_EVENTS
from app.memory import remember_event, recall


print("Checking existing COMPASS demo memories...")

existing_memories = recall("Atlas competitor timeline")

existing_text = [
    memory.text.lower()
    for memory in existing_memories
]

added = 0
skipped = 0

print(f"Found {len(existing_memories)} related memories.")


for event in ATLAS_EVENTS:

    event_text = event.details.lower()

    if any(event_text in memory for memory in existing_text):
        print(
            f"SKIP: {event.date} | "
            f"{event.event_type} already exists"
        )
        skipped += 1
        continue

    print(
        f"ADD: {event.date} | "
        f"{event.competitor} | "
        f"{event.event_type}"
    )

    remember_event(event)
    added += 1


print("\n--------------------------------")
print("COMPASS demo dataset update done!")
print(f"Added: {added}")
print(f"Skipped: {skipped}")
print("--------------------------------")