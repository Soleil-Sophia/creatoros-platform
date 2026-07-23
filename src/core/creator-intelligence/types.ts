export type GovernanceState = 'canonical' | 'experimental' | 'recommended';

export type BusinessGoal =
  | 'lead_generation'
  | 'sales'
  | 'authority'
  | 'reach'
  | 'community';

export type CreatorChannel =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'x';

export type CreatorFormat =
  | 'case_study_video'
  | 'educational_video'
  | 'short_form'
  | 'long_form'
  | 'livestream'
  | 'carousel'
  | 'image'
  | 'text_post';

export type FunnelStage =
  | 'awareness'
  | 'consideration'
  | 'conversion'
  | 'retention';

export type RecommendationConfidence = 'low' | 'medium' | 'high';

export type PolicyCheckStatus = 'passed' | 'needs_review';

export interface BrandPlaybook {
  schemaVersion: 'brand-playbook-v1';
  governance: GovernanceState;
  revision: number;
  updatedAt?: string;

  brandName: string;
  brandDescription: string;
  positioning: string;
  primaryOffer: string;
  primaryAudience: string;
  audienceProblem: string;

  brandValues: string[];
  toneOfVoice: string[];
  allowedClaims: string[];
  prohibitedClaims: string[];
  contentPillars: string[];
  preferredCTAs: string[];
}

export interface CreatorRequestContext {
  businessGoal: BusinessGoal;
  channel: CreatorChannel;
  formatPreference: CreatorFormat;
  funnelStage: FunnelStage;
}

export interface EvidenceItem {
  kind: 'brand' | 'analytics' | 'context';
  label: string;
  detail: string;
  sourceId?: string;
}

export interface MeasurementPlan {
  primaryMetric: string;
  secondaryMetric: string;
  targetRule: string;
  evaluationWindowDays: number;
}

export interface ProhibitedClaimTrigger {
  claim: string;
  foundIn: 'hook' | 'coreMessage' | 'captionGuidance' | 'cta';
}

export interface BrandPolicyCheck {
  status: PolicyCheckStatus;
  toneAligned: boolean;
  ctaAligned: boolean;
  allowedClaimsReferenced: string[];
  prohibitedClaimTriggers: ProhibitedClaimTrigger[];
  reasons: string[];
}

export interface ContentRecommendation {
  recommendedFormat: CreatorFormat;
  targetAudience: string;
  businessGoal: BusinessGoal;
  hook: string;
  coreMessage: string;
  contentStructure: string[];
  visualDirection: string[];
  cta: string;
  captionGuidance: string;
  brandPolicyCheck: BrandPolicyCheck;
  reasoning: string[];
  evidence: EvidenceItem[];
  expectedImpact: string;
  confidence: RecommendationConfidence;
  measurementPlan: MeasurementPlan;
}

export interface RecommendationDraft {
  hook: string;
  coreMessage: string;
  captionGuidance: string;
  cta: string;
}
