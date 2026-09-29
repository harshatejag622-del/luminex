from flask import Flask, render_template, request, jsonify
import markdown

from app.analyzer import generate_memory_aware_brief
from app.memory import ensure_company_memories, recall


web_app = Flask(__name__)


@web_app.route("/", methods=["GET", "POST"])
def home():
    brief = None
    competitor = ""
    question = ""
    memory_mode = "on"

    if request.method == "POST":
        competitor = request.form.get("competitor", "").strip()
        question = request.form.get("question", "").strip()
        memory_mode = request.form.get("memory_mode", "on").strip().lower()

        if competitor:
            raw_brief = generate_memory_aware_brief(
                competitor=competitor,
                question=question if question else None,
                memory_mode=memory_mode,
            )

            brief = markdown.markdown(
                raw_brief,
                extensions=["tables", "fenced_code", "nl2br"]
            )

    return render_template(
        "index.html",
        brief=brief,
        competitor=competitor,
        question=question,
        memory_mode=memory_mode,
    )


@web_app.route("/analyze", methods=["POST"])
@web_app.route("/api/query", methods=["POST"])
def api_query():
    """Unified JSON endpoint for real-time intelligence queries."""
    data = request.get_json(silent=True) or {}
    competitor = (data.get("competitor") or data.get("company") or request.form.get("competitor") or "").strip()
    question = (data.get("question") or data.get("query") or request.form.get("question") or "").strip()
    memory_mode = (data.get("memory_mode") or data.get("mode") or request.form.get("memory_mode") or "on").strip().lower()

    import re

    if not competitor or len(competitor) < 2:
        return jsonify({"error": "Please provide a valid company or competitor name (minimum 2 characters)."}), 400

    if not re.search(r'[a-zA-Z]', competitor) or not re.match(r'^[\w\s.\-&\'",/]+$', competitor):
        return jsonify({"error": f"'{competitor}' is not recognized as a valid company or entity. Please enter a valid competitor name."}), 400

    if not question:
        return jsonify({"error": "Intelligence question is compulsory. Please enter your strategic inquiry."}), 400

    raw_brief = generate_memory_aware_brief(
        competitor=competitor,
        question=question,
        memory_mode=memory_mode,
    )

    rendered_html = markdown.markdown(raw_brief, extensions=["tables", "fenced_code", "nl2br"])

    return jsonify({
        "competitor": competitor,
        "company": competitor,
        "question": question,
        "query": question,
        "mode": memory_mode,
        "memory_mode": memory_mode,
        "analysis": raw_brief,
        "markdown_brief": raw_brief,
        "html_brief": rendered_html
    })


if __name__ == "__main__":
    web_app.run(debug=True, host="0.0.0.0", port=5000)