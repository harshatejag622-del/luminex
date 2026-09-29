import React, { useState } from 'react';
import { Search, Sparkles, Building2, HelpCircle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CompetitorCompany } from '../types/intelligence';

interface QueryConsoleProps {
  activeCompany: CompetitorCompany;
  onCompanyChange: (companyName: string) => void;
  onQuerySubmit: (companyName: string, query: string) => void;
  isLoading: boolean;
}

const PRESET_QUESTIONS = [
  'Are they quietly preparing an upmarket enterprise pivot?',
  'How have their pricing tiers and monetization shifted over the last 6 months?',
  'What strategic product roadmap is signaled by their recent hiring spikes?',
  'What features or permissions did they move behind higher paywalls?',
  'Where are they most vulnerable to a counter-positioning attack?'
];

export const QueryConsole: React.FC<QueryConsoleProps> = ({
  activeCompany,
  onCompanyChange,
  onQuerySubmit,
  isLoading
}) => {
  const [companyInput, setCompanyInput] = useState(activeCompany.name);
  const [queryInput, setQueryInput] = useState('Are they quietly preparing an upmarket enterprise pivot?');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!companyInput.trim()) return;
    onQuerySubmit(companyInput.trim(), queryInput.trim() || 'Analyze competitor moves and detect underlying strategy');
  };

  const handleSelectPreset = (q: string) => {
    setQueryInput(q);
    onQuerySubmit(companyInput.trim() || activeCompany.name, q);
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Target Company Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Target Competitor Company
            </label>
            <div className="relative">
              <input
                type="text"
                value={companyInput}
                onChange={(e) => {
                  setCompanyInput(e.target.value);
                  onCompanyChange(e.target.value);
                }}
                placeholder="Enter ANY company (e.g. Notion, Stripe, Figma...)"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-medium transition-all"
              />
              <span className="absolute right-3 top-2.5 text-[11px] font-mono text-slate-500 pointer-events-none">
                {activeCompany.tier}
              </span>
            </div>
          </div>

          {/* Row 2: Question Input */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Strategic Intelligence Question
              </span>
              <span className="text-[11px] text-slate-500 font-normal">Ask anything about pricing, hiring, features, or positioning</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask about competitor moves, stealth pivots, pricing changes..."
                className="w-full pl-3.5 pr-28 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-medium transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <span>Query Agent</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Strategic Preset Query Chips */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested Strategic Inquiries (Click to test):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(question)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition-all text-left flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"></span>
                <span>{question}</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
