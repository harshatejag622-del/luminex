import React from 'react';
import { ShieldAlert, Brain, Sparkles, PlusCircle, FileText, Activity } from 'lucide-react';
import { CompetitorCompany } from '../types/intelligence';

interface NavbarProps {
  competitors: CompetitorCompany[];
  activeCompany: CompetitorCompany;
  onSelectCompany: (company: CompetitorCompany) => void;
  onOpenAddMove: () => void;
  onOpenBattlecard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  competitors,
  activeCompany,
  onSelectCompany,
  onOpenAddMove,
  onOpenBattlecard
}) => {
  const totalEvents = competitors.reduce((acc, c) => acc + c.events.length, 0);
  const totalPatterns = competitors.reduce((acc, c) => acc + c.patterns.length, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  STRATIS
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  AI Intelligence Agent
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Cumulative Competitor Radar &bull; 6-Month Pattern Memory
              </p>
            </div>
          </div>

          {/* Center: Monitored Competitors Pill List */}
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs text-slate-400 mr-1.5 flex items-center gap-1 font-mono">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> Monitored:
            </span>
            {competitors.slice(0, 5).map(c => {
              const isActive = c.id === activeCompany.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCompany(c)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenBattlecard}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 transition-all hover:text-white"
              title="Generate Executive Battlecard for active competitor"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Battlecard</span>
            </button>

            <button
              onClick={onOpenAddMove}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all"
              title="Add a new competitor observation to memory"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Log Move</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
