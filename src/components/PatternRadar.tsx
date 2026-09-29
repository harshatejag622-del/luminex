import React from 'react';
import { Radar, ShieldAlert, Zap, ArrowRight, EyeOff, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { CompetitorCompany, PatternInsight } from '../types/intelligence';

interface PatternRadarProps {
  company: CompetitorCompany;
}

export const PatternRadar: React.FC<PatternRadarProps> = ({ company }) => {
  if (company.patterns.length === 0) {
    return (
      <div className="w-full glass-panel rounded-2xl p-6 border border-slate-700/60 text-center">
        <Radar className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-spin" />
        <h4 className="text-sm font-semibold text-slate-300">Continuous Pattern Detection Active</h4>
        <p className="text-xs text-slate-500 mt-1">Collecting and correlating 6-month telemetry across pillars...</p>
      </div>
    );
  }

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-slate-700/60 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Radar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Pattern Radar &bull; Connected Strategic Signals
            </h3>
            <p className="text-xs text-slate-400">
              Correlating multi-month moves that isolated weekly checks miss.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60">
          {company.patterns.length} Macro Pattern Detected
        </span>
      </div>

      {/* Pattern Cards */}
      <div className="space-y-4">
        {company.patterns.map((pattern) => {
          return (
            <div
              key={pattern.id}
              className="p-5 rounded-xl bg-slate-900/90 border border-indigo-900/40 relative overflow-hidden space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                    Threat: {pattern.threatLevel}
                  </span>
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                    {pattern.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({pattern.timeframe})
                  </span>
                </div>
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Confidence: {pattern.confidenceScore}%
                </div>
              </div>

              {/* Title & Strategic Intent */}
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  {pattern.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <span className="text-cyan-400 font-semibold">Strategic Intent:</span> {pattern.strategicIntent}
                </p>
              </div>

              {/* Memory Contrast Grid (Direct proof of value) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {/* Single Check Perspective */}
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-rose-400 font-bold mb-1">
                    <EyeOff className="w-3.5 h-3.5" /> What a Weekly Check Sees (Memory OFF):
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    {pattern.whatSingleCheckSees}
                  </p>
                </div>

                {/* Cumulative Memory Perspective */}
                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-900/30">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-300 font-bold mb-1">
                    <Brain className="w-3.5 h-3.5" /> What Cumulative Memory Unmasks (Memory ON):
                  </div>
                  <p className="text-xs text-slate-200 leading-normal">
                    {pattern.whatCumulativeMemoryReveals}
                  </p>
                </div>
              </div>

              {/* Counter-Move Recommendation */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 flex items-start space-x-2">
                <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                    Recommended Executive Counter-Move:
                  </div>
                  <p className="text-xs text-emerald-100/90 mt-0.5 leading-relaxed">
                    {pattern.counterMove}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
