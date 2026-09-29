from app.models import CompetitorEvent
from typing import List, Dict

# ==============================================================================
# 1. ATLAS (Original baseline dataset)
# ==============================================================================
ATLAS_EVENTS = [
    CompetitorEvent(
        competitor="Atlas",
        event_type="Product Launch",
        date="January 2026",
        details="Atlas launched an AI-powered analytics feature for business users.",
        source="Atlas company announcement",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Atlas",
        event_type="Pricing Change",
        date="March 2026",
        details="Atlas introduced a lower-cost enterprise pricing plan for growing businesses.",
        source="Atlas pricing announcement",
        category="Pricing Change"
    ),
    CompetitorEvent(
        competitor="Atlas",
        event_type="Partnership",
        date="May 2026",
        details="Atlas announced a strategic technology partnership to expand its analytics capabilities.",
        source="Atlas partnership announcement",
        category="Partnership"
    ),
    CompetitorEvent(
        competitor="Atlas",
        event_type="Product Update",
        date="July 2026",
        details="Atlas released major improvements to its analytics dashboard and reporting capabilities.",
        source="Atlas product update",
        category="Product Update"
    ),
    CompetitorEvent(
        competitor="Atlas",
        event_type="Market Expansion",
        date="September 2026",
        details="Atlas announced expansion of its enterprise analytics offering into a new business segment.",
        source="Atlas market announcement",
        category="Market Expansion"
    ),
]

# ==============================================================================
# 2. AMAZON (E-commerce, Cloud & Devices)
# ==============================================================================
AMAZON_EVENTS = [
    CompetitorEvent(
        competitor="Amazon",
        event_type="Trending Product Launch",
        date="January 2026",
        details=(
            "Amazon rolled out Rufus, a generative AI shopping assistant inside the Amazon Mobile App, "
            "helping customers discover trending products, compare features, and get personalized recommendations."
        ),
        source="Amazon Press Release",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Amazon",
        event_type="Pricing Change",
        date="February 2026",
        details=(
            "Amazon introduced a $2.99 per month ad-free surcharge for Prime Video subscribers, "
            "while keeping standard Prime annual membership at $139/year with limited commercial ads."
        ),
        source="Amazon Customer Communication",
        category="Pricing Change"
    ),
    CompetitorEvent(
        competitor="Amazon",
        event_type="Hardware & Trending Product",
        date="March 2026",
        details=(
            "Amazon launched the Echo Hub smart home control panel priced at $179.99, "
            "which quickly became a top-selling trending smart device for Matter and Zigbee home automation."
        ),
        source="Amazon Hardware Showcase",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Amazon",
        event_type="Pricing Change",
        date="April 2026",
        details=(
            "Amazon increased Ring Protect Basic subscription pricing from $3.99/month ($39.99/year) to "
            "$4.99/month ($49.99/year), a 25% price hike for video doorbell event recording."
        ),
        source="Ring Support Billing Updates",
        category="Pricing Change"
    ),
    CompetitorEvent(
        competitor="Amazon",
        event_type="Trending Product Launch",
        date="June 2026",
        details=(
            "AWS Bedrock launched Autonomous AI Agents and custom model distillation, "
            "enabling enterprise clients to run multi-step workflows with Claude 3.5, Llama 3, and Amazon Titan models."
        ),
        source="AWS Summit Keynote",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Amazon",
        event_type="Pricing & Cloud Infrastructure",
        date="August 2026",
        details=(
            "AWS announced Graviton4 compute instances offering up to 30% better price-performance "
            "compared to x86 instances, starting at $0.0384 per vCPU hour on EC2."
        ),
        source="AWS Cloud Architecture Blog",
        category="Pricing Change"
    ),
    CompetitorEvent(
        competitor="Amazon",
        event_type="Trending Product & Hardware",
        date="September 2026",
        details=(
            "Amazon unveiled the new Kindle Scribe with generative AI summary tools and Active Canvas notebook features, "
            "priced at $399.99 with Premium Pen included."
        ),
        source="Amazon Devices Launch Event",
        category="Product Launch"
    ),
]

# ==============================================================================
# 3. GOOGLE (Alphabet: Cloud, Search & AI)
# ==============================================================================
GOOGLE_EVENTS = [
    CompetitorEvent(
        competitor="Google",
        event_type="Product Launch",
        date="February 2026",
        details="Google unveiled Gemini 1.5 Pro and Flash with a 2-million-token context window for enterprise developers.",
        source="Google DeepMind Announcement",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Google",
        event_type="Pricing Change",
        date="April 2026",
        details="Google introduced Gemini Business add-on at $20/seat/month and Gemini Enterprise at $30/seat/month for Google Workspace.",
        source="Google Workspace Pricing Page",
        category="Pricing Change"
    ),
    CompetitorEvent(
        competitor="Google",
        event_type="Trending Product",
        date="June 2026",
        details="Google launched Pixel 9 Pro featuring multimodal on-device Gemini Nano and AI Call Assist, starting at $999.",
        source="Made by Google Launch",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Google",
        event_type="Pricing Change",
        date="August 2026",
        details="Google Cloud cut Gemini 1.5 Flash input token pricing by 78% to $0.075 per 1M tokens to capture high-throughput agent traffic.",
        source="Google Cloud Vertex AI Pricing Update",
        category="Pricing Change"
    ),
]

# ==============================================================================
# 4. MICROSOFT (Enterprise Cloud & AI)
# ==============================================================================
MICROSOFT_EVENTS = [
    CompetitorEvent(
        competitor="Microsoft",
        event_type="Product Launch",
        date="January 2026",
        details="Microsoft released Copilot Studio autonomous agents capable of performing multi-system ERP and CRM tasks.",
        source="Microsoft Build Keynote",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Microsoft",
        event_type="Pricing Change",
        date="March 2026",
        details="Microsoft unified Copilot for Microsoft 365 licensing at $30/user/month with no minimum seat requirement.",
        source="Microsoft Commercial Licensing Notice",
        category="Pricing Change"
    ),
    CompetitorEvent(
        competitor="Microsoft",
        event_type="Trending Product",
        date="May 2026",
        details="Microsoft launched Copilot+ PC Surface Pro and Surface Laptop powered by Qualcomm Snapdragon X Elite with 45+ TOPS NPU, starting at $999.",
        source="Microsoft Surface Event",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Microsoft",
        event_type="Cloud Pricing",
        date="July 2026",
        details="Azure OpenAI introduced Provisioned Throughput Units (PTU) hourly burst reservations for enterprise SLA guarantees.",
        source="Azure Pricing Documentation",
        category="Pricing Change"
    ),
]

# ==============================================================================
# 5. OPENAI (Frontier Foundation Models)
# ==============================================================================
OPENAI_EVENTS = [
    CompetitorEvent(
        competitor="OpenAI",
        event_type="Pricing Change",
        date="February 2026",
        details="OpenAI slashed Batch API pricing by 50% for all asynchronous offline inference workloads across GPT-4o.",
        source="OpenAI Developer Platform Notice",
        category="Pricing Change"
    ),
    CompetitorEvent(
        competitor="OpenAI",
        event_type="Trending Product",
        date="May 2026",
        details="OpenAI released Deep Research autonomous agent capable of browsing hundreds of online sources and compiling executive briefs.",
        source="OpenAI Research Blog",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="OpenAI",
        event_type="Pricing Change",
        date="July 2026",
        details="OpenAI introduced ChatGPT Pro tier priced at $200/month providing uncapped compute allocation and priority reasoning model access.",
        source="ChatGPT Subscription Tier Update",
        category="Pricing Change"
    ),
]

# ==============================================================================
# 6. APPLE (Consumer Hardware & Services)
# ==============================================================================
APPLE_EVENTS = [
    CompetitorEvent(
        competitor="Apple",
        event_type="Product Launch",
        date="February 2026",
        details="Apple launched Apple Vision Pro spatial computer in international markets (UK, Japan, Germany, Singapore) priced from $3,499.",
        source="Apple Newsroom",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Apple",
        event_type="Trending Product",
        date="June 2026",
        details="Apple introduced Apple Intelligence integrated into iOS 18, iPadOS 18, and macOS Sequoia with Private Cloud Compute.",
        source="WWDC Keynote",
        category="Product Launch"
    ),
    CompetitorEvent(
        competitor="Apple",
        event_type="Pricing Change",
        date="August 2026",
        details="Apple updated international App Store pricing matrices and iCloud+ 2TB tier pricing in select currency regions.",
        source="Apple Developer Announcement",
        category="Pricing Change"
    ),
]

# Master Registry
ALL_COMPETITORS_DATA: Dict[str, List[CompetitorEvent]] = {
    "atlas": ATLAS_EVENTS,
    "amazon": AMAZON_EVENTS,
    "google": GOOGLE_EVENTS,
    "microsoft": MICROSOFT_EVENTS,
    "openai": OPENAI_EVENTS,
    "apple": APPLE_EVENTS,
}

def get_competitor_events(competitor_name: str) -> List[CompetitorEvent]:
    """Retrieve preloaded events for a competitor by name, case-insensitively."""
    key = competitor_name.strip().lower()
    return ALL_COMPETITORS_DATA.get(key, [])