import React, { useState } from 'react';
import { Calendar, DollarSign, Rocket, Megaphone, Users, Filter, Check, ExternalLink } from 'lucide-react';
import { CompetitorCompany, IntelligenceEvent, SignalPillar } from '../types/intelligence';

interface CumulativeTimelineProps {
  company: CompetitorCompany;
}

export const CumulativeTimeline: React.FC<CumulativeTimelineProps> = ({ company }) => {
  const [selectedPillar, setSelectedPillar] = useState<SignalPillar | 'all'>('all');

  const filteredEvents = selectedPillar === 'all'
    ? company.events
    : company.events.filter(e => e.pillar === selectedPillar);

  const getPillarIcon = (pillar: SignalPillar) => {
    switch (pillar) {
      case 'pricing':
        return <DollarSign className="w-4 h-4 text-rose-400" />;
      case 'features':
        return <Rocket className="w-4 h-4 text-cyan-400" />;
      case 'messaging':
        return <Megaphone className="w-4 h-4 text-amber-400" />;
      case 'hiring':
        return <Users className="w-4 h-4 text-purple-400" />;
    }
  };

  const getPillarColor = (pillar: SignalPillar) => {
    switch (pillar) {
      case 'pricing':
        return 'border-rose-500/40 bg-rose-500/10 text-rose-300';
      case 'features':
        return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300';
      case 'messaging':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
      case 'hiring':
        return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'critical':
        return <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-rose-950 text-rose-300 border border-rose-700/60 uppercase">Critical Impact</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-amber-950 text-amber-300 border border-amber-700/60 uppercase">High Shift</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-700/60 uppercase">Medium</span>;
      default:
        return <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-700 uppercase">Low</span>;
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-slate-700/60 shadow-xl">
      {/* Header & Pillar Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Cumulative 6-Month Timeline: {company.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Chronological audit trail of moves across all 4 pillars of competitive advantage.
          </p>
        </div>

        {/* Pillar Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedPillar('all')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              selectedPillar === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            All ({company.events.length})
          </button>

          <button
            onClick={() => setSelectedPillar('pricing')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              selectedPillar === 'pricing'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-3 h-3 text-rose-400" /> Pricing
          </button>

          <button
            onClick={() => setSelectedPillar('features')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              selectedPillar === 'features'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
            }`}
          >
            <Rocket className="w-3 h-3 text-cyan-400" /> Launches
          </button>

          <button
            onClick={() => setSelectedPillar('messaging')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              selectedPillar === 'messaging'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/60'
            }`}
          >
            <Megaphone className="w-3 h-3 text-amber-400" /> Messaging
          </button>

          <button
            onClick={() => setSelectedPillar('hiring')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              selectedPillar === 'hiring'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-3 h-3 text-purple-400" /> Hiring
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative mt-6 pl-4 sm:pl-6 border-l-2 border-slate-800 space-y-6">
        {filteredEvents.map((evt, idx) => {
          return (
            <div key={evt.id} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500/60 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:scale-110 transition-all">
                {getPillarIcon(evt.pillar)}
              </div>

              {/* Event Content Card */}
              <div className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 hover:border-slate-700/80 transition-all shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                      {evt.date}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-mono rounded uppercase font-semibold border ${getPillarColor(evt.pillar)}`}>
                      {evt.pillar}
                    </span>
                    {getImpactBadge(evt.impact)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    Source: {evt.source}
                  </span>
                </div>

                {/* Event Headline */}
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {evt.headline}
                </h4>

                {/* Event Summary */}
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {evt.summary}
                </p>

                {/* Detected Strategic Signal Banner */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-start space-x-2">
                  <span className="text-cyan-400 font-mono text-xs font-bold whitespace-nowrap">Agent Detection:</span>
                  <span className="text-xs text-slate-200">{evt.detectedSignal}</span>
                </div>

                {/* Metrics if present */}
                {evt.metrics && (
                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                    {evt.metrics.before && <div><span className="text-slate-500">Before:</span> <span className="text-slate-300">{evt.metrics.before}</span></div>}
                    {evt.metrics.after && <div><span className="text-slate-500">After:</span> <span className="text-slate-200">{evt.metrics.after}</span></div>}
                    {evt.metrics.changeRate && <div><span className="text-slate-500">Delta:</span> <span className="text-rose-400 font-bold">{evt.metrics.changeRate}</span></div>}
                  </div>
                )}

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {evt.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/40">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
