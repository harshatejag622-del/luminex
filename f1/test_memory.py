from app.memory import remember, recall


print("Testing COMPASS memory...")

remember(
    content="Competitor Nova launched an AI-powered pricing feature.",
    context="competitor product update",
)

print("Memory stored successfully!")

print("\nSearching COMPASS memory...")

memories = recall("What did Competitor Nova launch?")

print("\nRelevant memories:")

for memory in memories:
    print("-", memory.text)

print("\nCOMPASS memory test completed!")