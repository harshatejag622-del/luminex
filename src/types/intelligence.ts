export type SignalPillar = 'pricing' | 'features' | 'messaging' | 'hiring';

export type EventImpact = 'critical' | 'high' | 'medium' | 'low';

export interface IntelligenceEvent {
  id: string;
  companyId: string;
  date: string;
  monthOffset: number; // 0 = current, -1 = 1 month ago, ..., -6 = 6 months ago
  pillar: SignalPillar;
  headline: string;
  summary: string;
  detectedSignal: string;
  source: string;
  confidence: number; // 0-100
  impact: EventImpact;
  tags: string[];
  metrics?: {
    before?: string;
    after?: string;
    changeRate?: string;
  };
}

export interface PatternInsight {
  id: string;
  title: string;
  threatLevel: 'critical' | 'high' | 'medium' | 'monitoring';
  category: 'Stealth Upmarket Pivot' | 'Margin Optimization' | 'AI Platform Transition' | 'Ecosystem Lock-in' | 'Talent Poaching Surge';
  timeframe: string;
  connectedEventIds: string[];
  strategicIntent: string;
  whatSingleCheckSees: string; // The blindspot in Memory OFF
  whatCumulativeMemoryReveals: string; // The breakthrough in Memory ON
  counterMove: string;
  confidenceScore: number;
}

export interface CompetitorCompany {
  id: string;
  name: string;
  domain: string;
  category: string;
  tier: 'Direct Rival' | 'Adjacent Competitor' | 'Emerging Threat';
  overview: string;
  tagline: string;
  events: IntelligenceEvent[];
  patterns: PatternInsight[];
  strengths: string[];
  weaknesses: string[];
  landmines: string[];
  counterTactics: string[];
}

export type MemoryMode = 'on' | 'off' | 'side-by-side';

export interface AgentSynthesisResult {
  query: string;
  companyName: string;
  timestamp: string;
  memoryOff: {
    headline: string;
    verdict: string;
    snapshotEvidence: string;
    criticalBlindspot: string;
    confidence: number;
  };
  memoryOn: {
    headline: string;
    strategicVerdict: string;
    timelineBreadcrumbs: {
      period: string;
      pillar: SignalPillar;
      eventSnippet: string;
      impact: EventImpact;
    }[];
    patternAnalysis: string;
    predictedNextMove: string;
    counterTactics: string[];
    confidence: number;
  };
}
