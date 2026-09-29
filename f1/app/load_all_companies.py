"""
Script to pre-seed comprehensive competitive events for all key tech companies
(Atlas, Amazon, Google, Microsoft, OpenAI, Apple) into Hindsight long-term memory.
"""
from app.demo_data import ALL_COMPETITORS_DATA
from app.memory import remember_event, recall


def seed_all_companies():
    print("=" * 60)
    print("COMPASS: Ingesting Multi-Company Telemetry into Hindsight Memory")
    print("=" * 60)

    total_added = 0
    total_skipped = 0

    for company_name, events in ALL_COMPETITORS_DATA.items():
        print(f"\nProcessing competitor: {company_name.upper()} ({len(events)} events)...")

        existing_memories = recall(f"{company_name} competitor events and timeline")
        existing_texts = [
            m.text.lower() for m in (existing_memories or [])
        ]

        comp_added = 0
        comp_skipped = 0

        for event in events:
            # Check snippet for deduplication
            snippet = event.details.lower()[:35]
            if any(snippet in m for m in existing_texts):
                comp_skipped += 1
                continue

            try:
                remember_event(event)
                comp_added += 1
                existing_texts.append(event.details.lower())
                print(f"  [+] ADDED: [{event.date}] {event.event_type} - {event.details[:60]}...")
            except Exception as e:
                print(f"  [-] FAILED: {event.details[:40]}... ({e})")

        print(f"-> {company_name.title()}: {comp_added} added, {comp_skipped} already remembered.")
        total_added += comp_added
        total_skipped += comp_skipped

    print("\n" + "=" * 60)
    print(f"HINDSIGHT SEEDING COMPLETE: {total_added} added, {total_skipped} preserved.")
    print("=" * 60)


if __name__ == "__main__":
    seed_all_companies()
