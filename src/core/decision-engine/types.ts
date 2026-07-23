export type DecisionOrigin =
  | 'guide'
  | 'brandos'
  | 'designos'
  | 'creatoros'
  | 'intelligenceos'
  | 'salesos'
  | 'growthos'
  | 'human';

export type DecisionTargetOS =
  | 'BrandOS'
  | 'DesignOS'
  | 'CreatorOS'
  | 'IntelligenceOS'
  | 'SalesOS'
  | 'GrowthOS';

export type RecommendationStatus =
  | 'draft'
  | 'recommended'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'deferred'
  | 'canonical'
  | 'implemented'
  | 'observed';

export type DecisionAction = 'approve' | 'reject' | 'defer' | 'edit';
export type DecisionConfidence = 'low' | 'medium' | 'high';

export interface DecisionEvidence {
  id: string;
  type: 'questionnaire' | 'analytics' | 'brand' | 'experiment' | 'feedback' | 'manual';
  source: string;
  summary: string;
  strength: DecisionConfidence;
  createdAt: string;
}

export interface RecommendationChange<TValue = unknown> {
  path: string;
  currentValue?: TValue;
  recommendedValue: TValue;
}

export interface DecisionHistoryEntry {
  id: string;
  action: 'created' | 'submitted' | 'edited' | DecisionAction | 'canonicalized' | 'implemented' | 'observed';
  actor: string;
  reason?: string;
  createdAt: string;
}

export interface PlatformRecommendation<TValue = unknown> {
  id: string;
  schemaVersion: 'platform-recommendation-v1';
  title: string;
  summary: string;
  origin: DecisionOrigin;
  targetOS: DecisionTargetOS;
  status: RecommendationStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  confidence: DecisionConfidence;
  reason: string;
  expectedImpact?: string;
  recommendedAction: string;
  changes: RecommendationChange<TValue>[];
  evidence: DecisionEvidence[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deferredUntil?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  decisionReason?: string;
  history: DecisionHistoryEntry[];
}

export interface DecisionRecord {
  id: string;
  recommendationId: string;
  action: Exclude<DecisionAction, 'edit'>;
  decidedBy: string;
  reason: string;
  decidedAt: string;
  targetOS: DecisionTargetOS;
  resultingStatus: RecommendationStatus;
}
