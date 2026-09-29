from app.analyzer import generate_memory_aware_brief


print("========================================")
print("     COMPASS MEMORY-AWARE ANALYSIS")
print("========================================")

print("\nAnalyzing Atlas using long-term memory...\n")

brief = generate_memory_aware_brief("Atlas")

print("COMPASS INTELLIGENCE BRIEF")
print("----------------------------------------")
print(brief)
print("----------------------------------------")

print("\nMemory-aware analysis completed successfully!")