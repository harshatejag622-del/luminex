from app.memory import remember_feedback


print("========================================")
print("        COMPASS FEEDBACK TEST")
print("========================================")

feedback = (
    "For our competitive analysis, treat pricing reductions "
    "as a possible market-expansion signal rather than "
    "automatically interpreting them as a weakness."
)

print("\nStoring feedback:")
print(feedback)

remember_feedback(feedback)

print("\nFeedback stored successfully!")