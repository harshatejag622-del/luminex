import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

api_key = os.getenv("HINDSIGHT_API_KEY")

if not api_key:
    raise RuntimeError("HINDSIGHT_API_KEY was not found in .env")

client = Hindsight(
    base_url="https://api.hindsight.vectorize.io",
    api_key=api_key,
)

print("Hindsight connection successful!")

# Store a memory
client.retain(
    bank_id="compass",
    content="Competitor Atlas launched an AI-powered analytics feature in January 2026."
)

print("Memory retained successfully!")

# Retrieve the memory
results = client.recall(
    bank_id="compass",
    query="What did Competitor Atlas launch?"
)

print("\nMemories recalled:")

for memory in results.results:
    print("-", memory.text)

client.close()