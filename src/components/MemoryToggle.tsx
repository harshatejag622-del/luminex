import React from 'react';
import { Brain, EyeOff, Columns, Sparkles, AlertCircle } from 'lucide-react';
import { MemoryMode } from '../types/intelligence';

interface MemoryToggleProps {
  mode: MemoryMode;
  onChangeMode: (mode: MemoryMode) => void;
}

export const MemoryToggle: React.FC<MemoryToggleProps> = ({ mode, onChangeMode }) => {
  return (
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-xl relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Core Thesis Header */}
        <div className="max-w-xl">
          <div className="flex items-center space-x-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-cyan-400 font-mono">
              Core Thesis &bull; Temporal Memory Engine
            </h2>
          </div>
          <p className="text-sm text-slate-300 font-medium">
            <span className="text-white font-semibold">"Competitive intelligence is only useful if it is cumulative."</span>{' '}
            An agent that remembers 6 months of competitor activity spots patterns that a weekly check never would.
          </p>
        </div>

        {/* Toggle Switcher */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto shadow-inner">
          {/* Memory OFF button */}
          <button
            onClick={() => onChangeMode('off')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'off'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <EyeOff className="w-4 h-4 text-rose-400" />
            <div className="text-left">
              <div>Memory OFF</div>
              <div className="text-[10px] font-normal opacity-70 font-mono">Single Snapshot</div>
            </div>
          </button>

          {/* Memory ON button */}
          <button
            onClick={() => onChangeMode('on')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'on'
                ? 'bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Brain className="w-4 h-4 text-cyan-400" />
            <div className="text-left">
              <div className="flex items-center gap-1">
                Memory ON
                <span className="px-1 py-0.2 bg-cyan-400/20 text-cyan-300 text-[9px] rounded uppercase font-mono">6 Mo</span>
              </div>
              <div className="text-[10px] font-normal opacity-70 font-mono">Cumulative Patterns</div>
            </div>
          </button>

          {/* Side-by-Side Comparison */}
          <button
            onClick={() => onChangeMode('side-by-side')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'side-by-side'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Columns className="w-4 h-4 text-indigo-400" />
            <div className="text-left">
              <div className="flex items-center gap-1">
                What-If Split
                <Sparkles className="w-3 h-3 text-amber-400 inline" />
              </div>
              <div className="text-[10px] font-normal opacity-70 font-mono">Side-by-Side Diff</div>
            </div>
          </button>
        </div>
      </div>

      {/* Mode Status Indicator Banner */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center space-x-2 font-mono">
          <span className="text-slate-500">Active Simulation:</span>
          {mode === 'off' && (
            <span className="inline-flex items-center text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/50">
              <EyeOff className="w-3 h-3 mr-1" /> Isolated Point-in-Time Check (Blind to 6-Month Timeline)
            </span>
          )}
          {mode === 'on' && (
            <span className="inline-flex items-center text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
              <Brain className="w-3 h-3 mr-1" /> Cumulative Pattern Recognition Active (Multi-Month Dots Connected)
            </span>
          )}
          {mode === 'side-by-side' && (
            <span className="inline-flex items-center text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-800/50">
              <Columns className="w-3 h-3 mr-1" /> What-If Comparison: Proving the Value of Cumulative Memory
            </span>
          )}
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          Hackathon Tip: Switch modes to see how Memory ON exposes stealth competitor pivots.
        </div>
      </div>
    </div>
  );
};
