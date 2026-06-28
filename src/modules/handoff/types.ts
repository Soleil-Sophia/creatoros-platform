export interface StrategicNotes {
  enemy: string;
  desire: string;
  mechanism: string;
  transformation: string;
}

export interface CoreAsset {
  id: string;
  asset_key: string;
  title: string;
  theme: string;
  source_module: string;
  brand_blueprint_id: string;
  core_thesis: string;
  strategic_notes: StrategicNotes;
  body_markdown: string;
  status: 'draft' | 'review' | 'launch-ready' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface LaunchIntent {
  target_launch_date: string;
  launch_goal: 'category-definition' | 'authority-building' | 'lead-generation' | 'offer-launch';
  conversion_goal: string;
  audience_stage: 'unaware' | 'problem-aware' | 'solution-aware' | 'most-aware';
  primary_cta: string;
  secondary_cta?: string;
}

export interface QualityGateChecks {
  thesisLongEnough: boolean;
  wordCountPassed: boolean;
  hasSubpoints: boolean;
  cleanVoice: boolean;
  ctaDefined: boolean;
}

export interface DistributionAsset {
  id: string;
  launch_package_id: string;
  channel: 'Newsletter' | 'LinkedIn' | 'X' | 'YouTube-Shorts';
  format: string;
  target_date: string;
  goal: string;
  cta: string;
  content_markdown: string;
  status: 'draft' | 'scheduled' | 'published';
  performance_notes?: string;
}
