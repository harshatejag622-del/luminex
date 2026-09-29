import React from 'react';
import { EyeOff, Brain, AlertTriangle, CheckCircle2, TrendingUp, Compass, ArrowUpRight, Zap, Target } from 'lucide-react';
import { AgentSynthesisResult, MemoryMode, SignalPillar } from '../types/intelligence';

interface AgentResponseViewProps {
  synthesis: AgentSynthesisResult;
  mode: MemoryMode;
}

const getPillarBadge = (pillar: SignalPillar) => {
  switch (pillar) {
    case 'pricing':
      return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">Pricing</span>;
    case 'features':
      return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Feature</span>;
    case 'messaging':
      return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Messaging</span>;
    case 'hiring':
      return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Hiring</span>;
  }
};

export const AgentResponseView: React.FC<AgentResponseViewProps> = ({ synthesis, mode }) => {
  const { memoryOff, memoryOn, companyName, query, timestamp } = synthesis;

  // Single Snapshot Card (Memory OFF)
  const renderMemoryOffCard = () => (
    <div className="glass-panel rounded-2xl p-6 border-rose-900/40 bg-gradient-to-b from-rose-950/20 via-slate-900/60 to-slate-900/90 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-900/30">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <EyeOff className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                Simulation: Memory OFF
              </div>
              <div className="text-xs text-slate-400">Isolated Single-Snapshot Check (Today Only)</div>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-rose-900/40 text-rose-300 border border-rose-800/60">
              Confidence: {memoryOff.confidence}%
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="my-4">
          <h3 className="text-lg font-bold text-white leading-snug">
            {memoryOff.headline}
          </h3>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {memoryOff.verdict}
          </p>
        </div>

        {/* Snapshot Evidence Box */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span> Observed Surface Telemetry:
          </div>
          <p className="text-xs text-slate-300 italic">
            "{memoryOff.snapshotEvidence}"
          </p>
        </div>

        {/* Critical Blindspot Callout (The Hackathon WOW factor) */}
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40">
          <div className="flex items-center space-x-2 text-rose-300 font-semibold text-xs mb-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>THE CUMULATIVE BLINDSPOT</span>
          </div>
          <p className="text-xs text-rose-200/90 leading-relaxed font-sans">
            {memoryOff.criticalBlindspot}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>Analysis Mode: Point-In-Time</span>
        <span className="text-rose-400">Status: Blind to 6-Month Patterns</span>
      </div>
    </div>
  );

  // Cumulative Intelligence Card (Memory ON)
  const renderMemoryOnCard = () => (
    <div className="glass-panel rounded-2xl p-6 border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 via-slate-900/70 to-slate-900/95 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Subtle top glow */}
      <div className="absolute top-0 right-0 w-72 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-800/40">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/30">
              <Brain className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                Simulation: Memory ON
                <span className="px-1.5 py-0.2 text-[9px] rounded bg-cyan-500/30 text-cyan-200 uppercase font-mono">
                  6-Month Cumulative
                </span>
              </div>
              <div className="text-xs text-slate-400">Synthesizing 6 Months Across All 4 Pillars</div>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-600/50 shadow-sm">
              Pattern Confidence: {memoryOn.confidence}%
            </span>
          </div>
        </div>

        {/* Headline & Strategic Verdict */}
        <div className="my-4">
          <h3 className="text-lg font-bold text-white leading-snug flex items-center gap-2">
            {memoryOn.headline}
          </h3>
          <p className="mt-2 text-sm text-cyan-100/90 leading-relaxed font-medium">
            {memoryOn.strategicVerdict}
          </p>
        </div>

        {/* 6-Month Chronological Connected Dots Breadcrumbs */}
        <div className="mb-4">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> 6-Month Connected Evidence Chain:
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {memoryOn.timelineBreadcrumbs.map((crumb, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs hover:border-slate-700 transition-all"
              >
                <div className="flex items-start space-x-2">
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap mt-0.5">
                    {crumb.period}
                  </span>
                  {getPillarBadge(crumb.pillar)}
                  <span className="text-slate-200 text-xs leading-tight">{crumb.eventSnippet}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connective Synthesis Rationale */}
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 mb-4">
          <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> Strategic Intent Unmasked:
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {memoryOn.patternAnalysis}
          </p>
        </div>

        {/* Predictive Forecast & Counter-Tactics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
              <Compass className="w-3 h-3" /> 60-90 Day Predictive Move:
            </div>
            <p className="text-xs text-slate-300 leading-tight">
              {memoryOn.predictedNextMove}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
              <Target className="w-3 h-3" /> Recommended Counter-Action:
            </div>
            <p className="text-xs text-slate-300 leading-tight">
              {memoryOn.counterTactics[0]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px] text-cyan-400 font-mono">
        <span>Analysis Mode: Cumulative Memory</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" /> Full Pattern Detected
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-4">
      {/* Prompt summary bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-slate-500">Query for</span>
          <span className="text-white font-semibold">{companyName}</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-slate-300 italic">"{query}"</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Timestamp: {timestamp}</span>
      </div>

      {/* Dynamic View rendering based on mode */}
      {mode === 'off' && (
        <div className="w-full">
          {renderMemoryOffCard()}
        </div>
      )}

      {mode === 'on' && (
        <div className="w-full">
          {renderMemoryOnCard()}
        </div>
      )}

      {mode === 'side-by-side' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {renderMemoryOffCard()}
          {renderMemoryOnCard()}
        </div>
      )}
    </div>
  );
};
