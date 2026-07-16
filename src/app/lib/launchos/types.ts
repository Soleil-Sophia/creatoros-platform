// LaunchOS — Execution Engine contracts
// Sprint 18. Builds on existing SavedContentAsset and BrandProfileExtended.

export type LaunchGoal = 'awareness' | 'consideration' | 'conversion';

export type LaunchItemStatus = 'draft' | 'ready' | 'scheduled' | 'published';

export type LaunchItemKind =
  | 'post'
  | 'story-reminder'
  | 'follow-up'
  | 'comment-strategy'
  | 'metrics-check';

export interface LaunchPlanItem {
  /** Stable id within the plan */
  id: string;
  /** Sequential day offset from start (0 = launch day) */
  dayOffset: number;
  /** Hour of day in 24h (planner default per goal/frequency) */
  hour: number;
  /** Source asset id from the Content Library, when applicable */
  assetId: string | null;
  /** Mirrors SavedContentAsset.title for quick display */
  assetTitle: string;
  /** Mirrors SavedContentAsset.platform */
  platform: string;
  /** Step kind in the launch sequence */
  kind: LaunchItemKind;
  /** Human-readable step label, e.g. "Carousel — Hook Reveal" */
  label: string;
  /** Short note / recommendation */
  note: string;
  /** Execution status */
  status: LaunchItemStatus;
}

export type PublishingFrequency = 'daily' | 'every-other-day' | 'twice-weekly' | 'weekly';

export interface LaunchRequest {
  campaignName: string;
  goal: LaunchGoal;
  /** ISO date (yyyy-mm-dd) of launch day */
  targetDate: string;
  frequency: PublishingFrequency;
  /** Selected asset ids from the Content Library */
  selectedAssetIds: string[];
}

export interface LaunchPlan {
  id: string;
  campaignName: string;
  goal: LaunchGoal;
  targetDate: string;
  frequency: PublishingFrequency;
  brandName: string;
  createdAt: string;
  updatedAt: string;
  /** Source asset ids included in the plan */
  assetIds: string[];
  /** Ordered execution timeline */
  items: LaunchPlanItem[];
  /** Planner-generated narrative recommendations */
  recommendations: string[];
}
