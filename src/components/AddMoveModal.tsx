import React, { useState } from 'react';
import { X, PlusCircle, DollarSign, Rocket, Megaphone, Users, Sparkles } from 'lucide-react';
import { CompetitorCompany, EventImpact, SignalPillar } from '../types/intelligence';

interface AddMoveModalProps {
  company: CompetitorCompany;
  isOpen: boolean;
  onClose: () => void;
  onAddMove: (move: {
    pillar: SignalPillar;
    date: string;
    monthOffset: number;
    headline: string;
    summary: string;
    detectedSignal: string;
    source: string;
    impact: EventImpact;
    confidence: number;
    tags: string[];
  }) => void;
}

export const AddMoveModal: React.FC<AddMoveModalProps> = ({ company, isOpen, onClose, onAddMove }) => {
  const [pillar, setPillar] = useState<SignalPillar>('pricing');
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [detectedSignal, setDetectedSignal] = useState('');
  const [source, setSource] = useState('Pricing Page Diff & Public Changelog');
  const [impact, setImpact] = useState<EventImpact>('high');
  const [timePeriod, setTimePeriod] = useState('Current Month');
  const [tagInput, setTagInput] = useState('Price Hike, AI Monetization');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim() || !summary.trim()) return;

    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);

    onAddMove({
      pillar,
      date: timePeriod,
      monthOffset: 0,
      headline: headline.trim(),
      summary: summary.trim(),
      detectedSignal: detectedSignal.trim() || 'Observed strategic tactical adjustment',
      source: source.trim() || 'Manual Intel Telemetry',
      impact,
      confidence: 95,
      tags: tags.length ? tags : ['Competitor Move', pillar]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-slate-700 p-6 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                LIVE TELEMETRY INGESTION
              </span>
              <span className="text-xs text-slate-400 font-mono">Agent Memory Buffer</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Log Move for {company.name}
            </h3>
            <p className="text-xs text-slate-400">
              Inject a new signal to update the agent's 6-month evolving picture in real-time.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Pillar Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Signal Pillar:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPillar('pricing')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all ${
                  pillar === 'pricing'
                    ? 'border-rose-500 bg-rose-500/20 text-rose-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-rose-400" /> Pricing
              </button>
              <button
                type="button"
                onClick={() => setPillar('features')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all ${
                  pillar === 'features'
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Rocket className="w-3.5 h-3.5 text-cyan-400" /> Launch
              </button>
              <button
                type="button"
                onClick={() => setPillar('messaging')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all ${
                  pillar === 'messaging'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5 text-amber-400" /> Messaging
              </button>
              <button
                type="button"
                onClick={() => setPillar('hiring')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all ${
                  pillar === 'hiring'
                    ? 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-purple-400" /> Hiring
              </button>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Headline:
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Cut free workspace seat limit or Hired VP of AI"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Summary / Observed Evidence:
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe the exact change detected on pricing page, github changelog, or job boards..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Detected Strategic Signal */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Strategic Signal Interpretation:
            </label>
            <input
              type="text"
              value={detectedSignal}
              onChange={(e) => setDetectedSignal(e.target.value)}
              placeholder="e.g. Squeezing margins or preparing top-down enterprise expansion"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Row: Impact & Timeframe */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Strategic Impact:
              </label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value as EventImpact)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="critical">Critical Impact</option>
                <option value="high">High Shift</option>
                <option value="medium">Medium</option>
                <option value="low">Low / Noise</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Observation Time:
              </label>
              <input
                type="text"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="Current Month"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Tags (Comma separated):
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Pricing, Enterprise, Paywall"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commit to Memory</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
