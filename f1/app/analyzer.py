import os
import re
import concurrent.futures
from typing import Optional
from dotenv import load_dotenv
from groq import Groq

from app.memory import recall, ensure_company_memories
from app.intelligence_fetcher import get_live_web_context

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None
GROQ_MODEL = "openai/gpt-oss-120b"


def _clean_formatting(text: str) -> str:
    """Ensure clean spacing around words, dates, prices, and symbols."""
    # Fix squashed dates like "Aug222026" -> "Aug 22, 2026"
    text = re.sub(r'([a-zA-Z]{3,9})(\d{1,2})(\d{4})', r'\1 \2, \3', text)
    text = re.sub(r'([a-zA-Z]{3,9})(\d{4})', r'\1 \2', text)
    
    # Fix squashed prices like "at$149.99" -> "at $149.99"
    text = re.sub(r'([a-zA-Z])(\$\d)', r'\1 \2', text)
    text = re.sub(r'(\$\d+[\.\d]*)([a-zA-Z])', r'\1 \2', text)

    # Fix squashed parentheticals like "device(launched" -> "device (launched"
    text = re.sub(r'([a-zA-Z0-9])\(', r'\1 (', text)
    text = re.sub(r'\)([a-zA-Z0-9])', r') \1', text)

    # Ensure clean header spacing
    text = re.sub(r'\n(#{1,4})([^\s#])', r'\n\1 \2', text)

    return text.strip()


def _query_llm(system_prompt: str, user_prompt: str) -> str:
    """
    Fast, high-performance generation using Groq LPU with automatic Gemini support.
    """
    if groq_client:
        try:
            response = groq_client.chat.completions.create(
                model=GROQ_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0.12,
                max_tokens=1800,
            )
            raw = response.choices[0].message.content or ""
            return _clean_formatting(raw)
        except Exception as e:
            print(f"Groq generation error: {e}")

    # Fallback to Gemini if Groq is unavailable
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        try:
            from google import genai
            client = genai.Client(api_key=gemini_key)
            full_prompt = f"{system_prompt}\n\n{user_prompt}"
            response = client.models.generate_content(
                model="gemini-3.1-flash-lite",
                contents=full_prompt,
            )
            if response and response.text:
                return _clean_formatting(response.text)
        except Exception as e:
            print(f"Gemini fallback notice: {e}")

    return "Error: No AI generation service available."


def generate_memory_off_response(competitor: str, question: Optional[str] = None) -> str:
    """
    Generate an isolated, single-snapshot analysis WITHOUT using long-term memory.
    Fast parallel execution of live news.
    """
    live_web = get_live_web_context(competitor, question or "")
    q_text = question if question else f"What is {competitor}'s current market standing, trending products, and pricing?"

    system_prompt = (
        "You are an intelligence analyst conducting an ISOLATED POINT-IN-TIME SNAPSHOT check. "
        "You have access to current real-time breaking news and web telemetry, but ZERO access to long-term memory. "
        "CRITICAL INSTRUCTIONS: "
        "1. Always use clean spacing between all words, numbers, and dates. "
        "2. Provide authentic product names, actual verified prices, and real publication dates from the news context. "
        "3. Include a clean Markdown table with exact product names and verified prices."
    )

    user_prompt = f"""
Target Competitor: {competitor}
User Question: {q_text}

Real-Time Breaking News & Live Web Context:
{live_web}

Format using these exact sections:

### ISOLATED POINT-IN-TIME SNAPSHOT
Provide a direct, concise executive answer to the user's question with current real-time verified facts. State authentic product names and real live prices.

### CURRENT VERIFIED PRODUCTS & PRICING MATRIX
| Product / Offering | Category | Current Price (USD) | Live Status / Observation |
|---|---|---|---|
(List 3-4 verified current products with exact real prices found in the live news)

### POINT-IN-TIME OBSERVATION
Explain what a single weekly search observes today in isolation without historical context (e.g. routine announcements or price tweaks).

### THE CUMULATIVE BLINDSPOT (WHAT IS MISSED)
Explicitly warn what this isolated check MISSES by having NO long-term memory:
- Fails to detect multi-month stealth price increases.
- Misses preceding engineering build-ups or executive turnover.
- Misinterprets calculated strategic pivots as routine one-off updates.
"""
    return _query_llm(system_prompt, user_prompt)


def generate_memory_on_response(competitor: str, question: Optional[str] = None) -> str:
    """
    Generate a full cumulative intelligence brief using Hindsight long-term memory
    combined with real-time verified breaking news in fast parallel execution.
    """
    # Parallel retrieval: fetch live web context AND Hindsight recall simultaneously
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        f_web = executor.submit(get_live_web_context, competitor, question or "")
        f_mem = executor.submit(
            recall,
            f"Competitor: {competitor}. History, trending products, pricing changes, strategic moves for: {question or 'general'}"
        )
        live_web = f_web.result()
        memories = f_mem.result()

    # If few memories, ensure company memories in background
    if not memories or len(memories) < 2:
        ensure_company_memories(competitor, question or "")
        memories = recall(f"{competitor} competitive events")

    # Limit to top 6 most relevant memories for maximum speed & focus
    top_memories = memories[:6] if memories else []
    memory_text = "\n".join(f"• {m.text}" for m in top_memories) if top_memories else "Historical telemetry active."

    system_prompt = (
        "You are COMPASS, an elite autonomous competitive intelligence agent. "
        "Synthesize multi-month historical signals from long-term memory with current real-time breaking news. "
        "CRITICAL INSTRUCTIONS: "
        "1. Produce a comprehensive, deeply detailed executive intelligence brief (never short or superficial). "
        "2. Maintain absolute factual accuracy. Use authentic product names, real verified pricing, and exact dates. "
        "3. Ensure clean formatting with well-structured Markdown tables and clear bullet points. "
        "4. Unmask the cumulative strategic patterns across pricing, product features, partnerships, and market moves."
    )

    user_prompt = f"""
Target Competitor: {competitor}
User Question: {question if question else "Analyze strategic moves, trending products, pricing changes, and cumulative patterns."}

1. Current Breaking News & Live Web Stream:
{live_web}

2. Retrieved Long-Term Strategic Memory:
{memory_text}

Format using these exact rich sections:

### DIRECT STRATEGIC ANSWER
Provide a thorough, high-impact executive answer directly addressing the user's specific inquiry. Include specific product models, exact verified dollar prices, tier structures, and current market traction.

### VERIFIED PRODUCT & PRICING MATRIX
| Product / Service | Category | Current Price (USD) | Strategic Trajectory & Trend |
|---|---|---|---|
(Include 4 to 6 real verified products with accurate current prices, categories, and trends)

### TRENDING PRODUCTS & PRICING TELEMETRY
| Product / Initiative | Current Highlight | Driving Shift (last 12mo) |
|---|---|---|
(Include 4 key strategic initiatives, pricing adjustments, or feature launches)

### CHRONOLOGICAL EVIDENCE TRAIL
List the retrieved events chronologically across recent months:
- **[Month Year]** - *Event Type*: Verified details, strategic milestone, and market impact.
- **[Month Year]** - *Event Type*: Verified details, strategic milestone, and market impact.
- **[Month Year]** - *Event Type*: Verified details, strategic milestone, and market impact.
- **[Month Year]** - *Event Type*: Verified details, strategic milestone, and market impact.

### CUMULATIVE PATTERN & STRATEGIC INTENT
Detail the multi-month pattern unmasked by continuous memory that a simple one-time search would miss:
1. **Enterprise-Centric Price Engineering**: How tiers or licensing were quietly adjusted.
2. **Platform & Distribution Leverage**: Strategic ecosystem partnerships or channel lock-in.
3. **Cross-Product Integration**: Bundling or feature gating across product lines.
4. **Strategic Margin Discipline**: How changes protect recurring revenue and lifetime value.

### RECOMMENDED COUNTER-STRATEGY
1. **Positioning Counter-Move**: How to exploit competitor pricing voids or customer friction.
2. **Product & Packaging Tactic**: Feature unbundling or freemium ladder to capture market share.
3. **Commercial Defense**: Specific contractual or pricing structures to protect enterprise accounts.
"""
    return _query_llm(system_prompt, user_prompt)


def generate_memory_aware_brief(
    competitor: str,
    question: Optional[str] = None,
    memory_mode: str = "on"
) -> str:
    """
    Unified entrypoint supporting Memory ON, Memory OFF, and What-If Compare.
    Always concludes with the AI verification disclaimer.
    """
    disclaimer = "\n\n---\n*AI-generated intelligence can make mistakes. Verify critical business decisions.*"
    mode = memory_mode.lower().strip()

    if mode == "off":
        raw = generate_memory_off_response(competitor, question)
        return raw + disclaimer

    elif mode == "compare":
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
            f_off = executor.submit(generate_memory_off_response, competitor, question)
            f_on = executor.submit(generate_memory_on_response, competitor, question)
            brief_off = f_off.result()
            brief_on = f_on.result()

        comparison = f"""
# EXECUTIVE COMPARISON: ISOLATED SNAPSHOT vs. CUMULATIVE INTELLIGENCE
> **Core Intelligence Principle:** *Competitive intelligence is only useful if it is cumulative. An agent that remembers competitor activity over time spots patterns that a weekly check never would.*

---

## [MODE A] ISOLATED SNAPSHOT (MEMORY INACTIVE)
*Simulates what a standard check sees today in isolation without historical context.*

{brief_off}

---

## [MODE B] CUMULATIVE INTELLIGENCE (MEMORY ACTIVE)
*Connecting continuous strategic signals across pricing, product launches, messaging, and hiring.*

{brief_on}
"""
        return comparison + disclaimer

    else:
        raw = generate_memory_on_response(competitor, question)
        return raw + disclaimer