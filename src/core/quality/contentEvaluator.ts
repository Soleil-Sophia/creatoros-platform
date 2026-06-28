import type { InstagramAssetV1 } from '../instagram';
import type { BrandProfile } from '../brand';

// ─── Quality Dimensions ───────────────────────────────────────────────────────

export interface QualityDimension {
  score:   number;    // 0–100
  pass:    boolean;   // >= 65
  signals: string[];  // what contributed to this score
}

export interface QualityEvaluation {
  assetId:          string;
  title:            string;
  topic:            string;
  intent:           string;
  format:           string;
  hookStrength:     QualityDimension;
  bodyCompleteness: QualityDimension;
  ctaStrength:      QualityDimension;
  formatFit:        QualityDimension;
  overallScore:     number;
  grade:            'A' | 'B' | 'C' | 'D' | 'F';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function grade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function dim(score: number, signals: string[]): QualityDimension {
  return { score: Math.max(0, Math.min(100, score)), pass: score >= 65, signals };
}

// Known template patterns in DeterministicContentGenerator
const HOOK_TEMPLATES = [
  /^Most .+ don't know this about/i,
  /^Here's why .+ changes everything/i,
  /^If you're serious about/i,
];

function isTemplateHook(hook: string): boolean {
  return HOOK_TEMPLATES.some((re) => re.test(hook));
}

// ─── Dimension scorers ────────────────────────────────────────────────────────

function scoreHookStrength(hook: string): QualityDimension {
  let score = 0;
  const signals: string[] = [];

  // Curiosity gap present
  if (/don't know|secret|truth|mistake|actually|real reason/i.test(hook)) {
    score += 20;
    signals.push('curiosity gap present');
  }

  // Audience specificity
  if (/solopreneur|creator|freelancer|founder|marketer/i.test(hook)) {
    score += 20;
    signals.push('audience specificity');
  }

  // Topic mention
  if (hook.length > 20 && !hook.startsWith('Most')) {
    score += 10;
    signals.push('non-template opening');
  }

  // Conciseness (ideal 40–100 chars)
  if (hook.length >= 40 && hook.length <= 100) {
    score += 15;
    signals.push('ideal length');
  } else if (hook.length > 100) {
    score += 5;
    signals.push('slightly long');
  }

  // Number or stat present (specificity signal)
  if (/\d/.test(hook)) {
    score += 15;
    signals.push('contains number/stat');
  }

  // Template penalty — deterministic output always matches a template
  if (isTemplateHook(hook)) {
    score -= 20;
    signals.push('⚠ template pattern detected (−20)');
  }

  // No first-person → good
  if (!/^(I |We |My |Our )/i.test(hook)) {
    score += 10;
    signals.push('audience-first framing');
  }

  // Ends with period or em-dash (complete thought, not clickbait fragment)
  if (/[.!?]$/.test(hook.trim())) {
    score += 10;
    signals.push('complete sentence');
  }

  return dim(score, signals);
}

function scoreBodyCompleteness(body: string): QualityDimension {
  let score = 0;
  const signals: string[] = [];

  // Placeholder brackets detected — major penalty
  const placeholderCount = (body.match(/\[.+?\]/g) ?? []).length;
  if (placeholderCount > 0) {
    score -= placeholderCount * 20;
    signals.push(`⚠ ${placeholderCount} placeholder bracket(s) detected (−${placeholderCount * 20})`);
  } else {
    score += 40;
    signals.push('no placeholder brackets');
  }

  // Length signal — longer = more content
  if (body.length > 80) {
    score += 20;
    signals.push('substantial content length');
  }

  // Voice/tone reference (brand signal)
  if (/voice:/i.test(body)) {
    score += 10;
    signals.push('brand voice referenced');
  } else {
    score += 15;
    signals.push('no template voice tag');
  }

  // "scattered → strategic" or actual transformation language
  if (/→/.test(body)) {
    score += 15;
    signals.push('transformation language');
  }

  // Has at least 2 content elements (structure)
  if (body.split(/[.,:]/).length >= 3) {
    score += 20;
    signals.push('multi-element structure');
  }

  return dim(score, signals);
}

function scoreCTAStrength(cta: string, intent: string): QualityDimension {
  let score = 0;
  const signals: string[] = [];

  // Action verb present
  if (/save|learn|get|start|discover|grab|join|try|build|download/i.test(cta)) {
    score += 35;
    signals.push('action verb present');
  }

  // Intent alignment
  const intentMap: Record<string, RegExp> = {
    awareness:     /save|bookmark|share/i,
    consideration: /learn|explore|read|see/i,
    conversion:    /get|start|join|buy|try/i,
  };
  const alignmentRe = intentMap[intent];
  if (alignmentRe && alignmentRe.test(cta)) {
    score += 40;
    signals.push(`intent-aligned CTA (${intent})`);
  } else {
    score += 10;
    signals.push(`CTA not fully aligned with intent (${intent})`);
  }

  // Visual momentum — arrow
  if (/→|>>|>/.test(cta)) {
    score += 15;
    signals.push('visual momentum (arrow)');
  }

  // Specificity — not just "Click here" or "Learn more"
  if (cta.length > 10) {
    score += 10;
    signals.push('specific CTA text');
  }

  return dim(score, signals);
}

function scoreFormatFit(format: string, intent: string): QualityDimension {
  let score = 0;
  const signals: string[] = [];

  // Format × intent pairings (industry best practices)
  const fits: Record<string, string[]> = {
    carousel: ['awareness', 'consideration'],
    reel:     ['awareness', 'conversion'],
    story:    ['conversion', 'consideration'],
  };

  const goodFit = fits[format]?.includes(intent);
  if (goodFit) {
    score += 60;
    signals.push(`${format} × ${intent}: ideal pairing`);
  } else {
    score += 25;
    signals.push(`${format} × ${intent}: acceptable pairing`);
  }

  // Evergreen formats
  if (format === 'carousel') {
    score += 25;
    signals.push('carousel = evergreen / high save rate');
  } else if (format === 'reel') {
    score += 20;
    signals.push('reel = high reach');
  } else if (format === 'story') {
    score += 15;
    signals.push('story = ephemeral / lower evergreen value');
  }

  // All assets are Instagram — platform fit is always good
  score += 15;
  signals.push('instagram platform fit');

  return dim(score, signals);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function evaluateAsset(
  asset: InstagramAssetV1,
  _brandProfile: BrandProfile,
): QualityEvaluation {
  const hookStrength     = scoreHookStrength(asset.hook);
  const bodyCompleteness = scoreBodyCompleteness(asset.bodySkeleton);
  const ctaStrength      = scoreCTAStrength(asset.cta, asset.intent);
  const formatFit        = scoreFormatFit(asset.format, asset.intent);

  // Weighted overall: hook 40%, body 30%, cta 20%, format 10%
  const overallScore = Math.round(
    hookStrength.score     * 0.40 +
    bodyCompleteness.score * 0.30 +
    ctaStrength.score      * 0.20 +
    formatFit.score        * 0.10,
  );

  // Derive topic + intent from asset data
  const topic  = asset.title.split(' — ')[0] ?? asset.title;
  const intent = asset.intent;
  const format = asset.format;

  return {
    assetId: asset.assetId,
    title:   asset.title,
    topic,
    intent,
    format,
    hookStrength,
    bodyCompleteness,
    ctaStrength,
    formatFit,
    overallScore,
    grade: grade(overallScore),
  };
}
