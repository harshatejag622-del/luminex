import React, { useState, useEffect } from 'react';
import { agentService } from './services/intelligenceAgent';
import { CompetitorCompany, MemoryMode, AgentSynthesisResult, SignalPillar } from './types/intelligence';
import { Navbar } from './components/Navbar';
import { MemoryToggle } from './components/MemoryToggle';
import { QueryConsole } from './components/QueryConsole';
import { AgentResponseView } from './components/AgentResponseView';
import { CumulativeTimeline } from './components/CumulativeTimeline';
import { PatternRadar } from './components/PatternRadar';
import { BattlecardModal } from './components/BattlecardModal';
import { AddMoveModal } from './components/AddMoveModal';
import { DollarSign, Rocket, Megaphone, Users, Award, Shield, BarChart3, Info } from 'lucide-react';

export const App: React.FC = () => {
  const [competitors, setCompetitors] = useState<CompetitorCompany[]>([]);
  const [activeCompany, setActiveCompany] = useState<CompetitorCompany | null>(null);
  const [memoryMode, setMemoryMode] = useState<MemoryMode>('side-by-side');
  const [synthesis, setSynthesis] = useState<AgentSynthesisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBattlecardOpen, setIsBattlecardOpen] = useState(false);
  const [isAddMoveOpen, setIsAddMoveOpen] = useState(false);

  // Initialize
  useEffect(() => {
    const list = agentService.getCompetitors();
    setCompetitors(list);
    if (list.length > 0) {
      const defaultComp = list[0]; // Notion default
      setActiveCompany(defaultComp);
      const defaultSynthesis = agentService.analyzeCompanyQuery(
        defaultComp,
        'Are they quietly preparing an upmarket enterprise pivot?'
      );
      setSynthesis(defaultSynthesis);
    }
  }, []);

  const handleSelectCompany = (comp: CompetitorCompany) => {
    setActiveCompany(comp);
    const newSynth = agentService.analyzeCompanyQuery(
      comp,
      'Are they quietly preparing an upmarket enterprise pivot?'
    );
    setSynthesis(newSynth);
  };

  const handleCompanyInputChange = (companyName: string) => {
    if (!companyName.trim()) return;
    const found = agentService.getCompetitors().find(
      c => c.name.toLowerCase() === companyName.trim().toLowerCase()
    );
    if (found && found.id !== activeCompany?.id) {
      setActiveCompany(found);
    }
  };

  const handleQuerySubmit = (companyName: string, query: string) => {
    setIsLoading(true);
    // Find or dynamically create company dossier
    setTimeout(() => {
      const targetComp = agentService.getOrCreateCompany(companyName);
      setCompetitors(agentService.getCompetitors());
      setActiveCompany(targetComp);

      const result = agentService.analyzeCompanyQuery(targetComp, query);
      setSynthesis(result);
      setIsLoading(false);
    }, 400);
  };

  const handleAddMove = (moveData: any) => {
    if (!activeCompany) return;
    agentService.addEventToCompany(activeCompany.id, moveData);
    setCompetitors([...agentService.getCompetitors()]);
    const updated = agentService.getCompetitorById(activeCompany.id);
    if (updated) {
      setActiveCompany(updated);
      // Re-trigger analysis
      const updatedSynth = agentService.analyzeCompanyQuery(
        updated,
        synthesis?.query || 'Analyze latest competitor moves'
      );
      setSynthesis(updatedSynth);
    }
  };

  if (!activeCompany || !synthesis) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#090D16] text-cyan-400 font-mono">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div>Initializing Stratis Cumulative Memory Engine...</div>
        </div>
      </div>
    );
  }

  // Count signals for active company
  const pricingCount = activeCompany.events.filter(e => e.pillar === 'pricing').length;
  const featuresCount = activeCompany.events.filter(e => e.pillar === 'features').length;
  const messagingCount = activeCompany.events.filter(e => e.pillar === 'messaging').length;
  const hiringCount = activeCompany.events.filter(e => e.pillar === 'hiring').length;

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        competitors={competitors}
        activeCompany={activeCompany}
        onSelectCompany={handleSelectCompany}
        onOpenAddMove={() => setIsAddMoveOpen(true)}
        onOpenBattlecard={() => setIsBattlecardOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero Banner / Memory Toggle (Core Value Thesis) */}
        <MemoryToggle mode={memoryMode} onChangeMode={setMemoryMode} />

        {/* Company & Question Console */}
        <QueryConsole
          activeCompany={activeCompany}
          onCompanyChange={handleCompanyInputChange}
          onQuerySubmit={handleQuerySubmit}
          isLoading={isLoading}
        />

        {/* 4-Pillar Telemetry Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass-card rounded-xl p-3.5 border border-slate-800 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Pricing Moves</div>
              <div className="text-lg font-bold text-white">{pricingCount} tracked</div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3.5 border border-slate-800 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Feature Launches</div>
              <div className="text-lg font-bold text-white">{featuresCount} releases</div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3.5 border border-slate-800 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Messaging Shifts</div>
              <div className="text-lg font-bold text-white">{messagingCount} shifts</div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-3.5 border border-slate-800 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Hiring Signals</div>
              <div className="text-lg font-bold text-white">{hiringCount} surges</div>
            </div>
          </div>
        </div>

        {/* The Agent Response (Memory ON vs OFF / What-If View) */}
        <AgentResponseView synthesis={synthesis} mode={memoryMode} />

        {/* Pattern Radar: Macro Strategic Connected Dots */}
        <PatternRadar company={activeCompany} />

        {/* 6-Month Cumulative Timeline */}
        <CumulativeTimeline company={activeCompany} />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="text-slate-400 font-bold">Stratis Agent</span> &bull; Hackathon Project: Competitive Intelligence Agent
          </div>
          <div className="text-cyan-400/80">
            "Competitive intelligence is only useful if it is cumulative."
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BattlecardModal
        company={activeCompany}
        isOpen={isBattlecardOpen}
        onClose={() => setIsBattlecardOpen(false)}
      />

      <AddMoveModal
        company={activeCompany}
        isOpen={isAddMoveOpen}
        onClose={() => setIsAddMoveOpen(false)}
        onAddMove={handleAddMove}
      />
    </div>
  );
};

export default App;
