# Luminx / Stratis - Cumulative Competitive Intelligence Agent

An AI-driven competitive intelligence platform that monitors, retains, and analyzes competitor strategic moves across pricing, features, messaging, and hiring over time.

## 🌟 Key Features

- **Cumulative Intelligence Memory**: Retains and synthesizes competitor shifts across multiple quarters rather than isolated snapshots.
- **Pattern Radar**: Analyzes competitor behaviors and flags strategic pivots, aggressive expansion, or defensive positioning.
- **Competitive Dossiers & Battlecards**: Instant battlecards summarizing key vulnerabilities, pricing trajectories, and counter-strategies.
- **Executive Query Console**: Natural language queries against cumulative intelligence records with configurable memory modes.
- **Interactive Timeline**: Visualizes chronological shifts and strategic signals across competitors.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend / Intelligence Engine**: Python, Flask, Groq LPU, Gemini API, Hindsight

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python (3.10+)

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup (f1)

```bash
cd f1

# Copy environment template and fill in your keys
cp .env.example .env

# Run the Flask web app
python web_app.py
```