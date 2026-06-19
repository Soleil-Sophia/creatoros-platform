export type SourceType =
  | 'tech_doc'
  | 'changelog'
  | 'engineering_blog'
  | 'rfc'
  | 'incident_report'
  | 'research_paper'
  | 'other';

export type Platform = 'LinkedIn' | 'X' | 'Threads' | 'TikTok' | 'Reels' | 'YouTube';

export type ContentGoal = 'awareness' | 'authority' | 'trust' | 'education' | 'conversion';

export type EngineeringZone =
  | 'quality'
  | 'velocity'
  | 'developer_happiness'
  | 'reliability'
  | 'cost'
  | 'security';

export interface SourcePack {
  title: string;
  sourceType: SourceType;
  body: string;
  url?: string;
}

export interface AuthorityAnalysis {
  keyPoints: string[];
  excludedNoise: string[];
  systemInsight: string;
  detectedFriction: string[];
  antiPattern: string;
  metricLens: string[];
  contentAngles: string[];
  affectedZones: EngineeringZone[];
}

export interface ContentAsset {
  id: string;
  goal: ContentGoal;
  platform: Platform;
  title: string;
  body: string;
  cta: string;
  wordCount: number;
}

export interface QualityGate {
  hookInFirstSentence: boolean;
  noHype: boolean;
  clearAudience: boolean;
  systemInsightPresent: boolean;
  ctaPresent: boolean;
  positioningVisible: boolean;
  platformFormatValid: boolean;
  technicalClaimsSafe: boolean;
  notes: string[];
}

export interface CalendarEntry {
  week: string;
  day: string;
  platform: Platform;
  goal: ContentGoal;
  assetId: string;
  title: string;
}

export interface PositioningInput {
  audience: string;
  positioning: string;
  platforms: Platform[];
  contentGoals: ContentGoal[];
  offer: string;
  ctaGoal: string;
  calendarWeek: string;
  seriesName: string;
}

export interface AuthorityRun {
  id: string;
  createdAt: string;
  updatedAt: string;
  source: SourcePack;
  positioning: PositioningInput;
  analysis: AuthorityAnalysis | null;
  assets: ContentAsset[];
  qualityGate: QualityGate | null;
  calendar: CalendarEntry[];
}
