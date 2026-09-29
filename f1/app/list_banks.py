import os
import asyncio
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()


async def main():
    client = Hindsight(
        base_url="https://api.hindsight.vectorize.io",
        api_key=os.getenv("HINDSIGHT_API_KEY"),
    )

    try:
        banks = await client.banks.list_banks()

        print("AVAILABLE BANKS:")
        print(banks)

    finally:
        await client.aclose()


asyncio.run(main())