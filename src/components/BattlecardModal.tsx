import React from 'react';
import { X, ShieldCheck, AlertCircle, Bomb, Crosshair, Download, Printer } from 'lucide-react';
import { CompetitorCompany } from '../types/intelligence';

interface BattlecardModalProps {
  company: CompetitorCompany;
  isOpen: boolean;
  onClose: () => void;
}

export const BattlecardModal: React.FC<BattlecardModalProps> = ({ company, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                EXECUTIVE BATTLECARD
              </span>
              <span className="text-xs text-slate-500 font-mono">Stratis Intelligence Engine</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {company.name} Competitive Dossier
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Domain: {company.domain} &bull; Category: {company.category} &bull; Tier: {company.tier}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
            Company Overview & Current Positioning
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {company.overview}
          </p>
          <div className="mt-2 text-xs text-cyan-400 italic">
            "{company.tagline}"
          </div>
        </div>

        {/* 4-Box Battlecard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Competitor Strengths (Respect These)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {company.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>Competitor Vulnerabilities (Attack Here)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {company.weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">&bull;</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Landmines */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-amber-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase">
              <Bomb className="w-4 h-4" />
              <span>Sales Landmines to Avoid in Deals</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {company.landmines.map((lm, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span>{lm}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Counter Tactics */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase">
              <Crosshair className="w-4 h-4" />
              <span>Battle-Tested Counter-Tactics</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {company.counterTactics.map((ct, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">&bull;</span>
                  <span>{ct}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Generated from {company.events.length} cumulative intelligence telemetry events</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
          >
            Close Battlecard
          </button>
        </div>
      </div>
    </div>
  );
};
