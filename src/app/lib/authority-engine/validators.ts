import type {
  AuthorityAnalysis,
  ContentAsset,
  PositioningInput,
  QualityGate,
} from '../../types/authority';

const HYPE_WORDS = [
  'revolutionary',
  'game-changer',
  'game changing',
  'unbelievable',
  'mind-blowing',
  '10x',
  'insane',
  'crazy',
  'magic',
  'guaranteed',
];

const UNSAFE_CLAIMS = [
  'always works',
  'never fails',
  '100% safe',
  'zero bugs',
  'eliminates all',
];

function hasHype(text: string): boolean {
  const lower = text.toLowerCase();
  return HYPE_WORDS.some((w) => lower.includes(w));
}

function hasUnsafeClaim(text: string): boolean {
  const lower = text.toLowerCase();
  return UNSAFE_CLAIMS.some((c) => lower.includes(c));
}

function isValidPlatformFormat(asset: ContentAsset): boolean {
  switch (asset.platform) {
    case 'X':
      // X (formerly Twitter): numbered tweet thread, each line under ~280 chars
      return /\d\//.test(asset.body) && asset.body.split('\n').every((l) => l.length <= 280);
    case 'TikTok':
    case 'Reels':
      // Script should have timing markers
      return /\[HOOK|\[PROBLEM|\[INSIGHT|\[CLOSE/i.test(asset.body);
    case 'LinkedIn':
      // Long-form, multi-paragraph
      return asset.wordCount >= 60 && asset.body.includes('\n');
    case 'Threads':
      return asset.wordCount <= 500;
    case 'YouTube':
      return asset.wordCount >= 100;
    default:
      return true;
  }
}

export function evaluateQualityGate(
  assets: ContentAsset[],
  analysis: AuthorityAnalysis,
  positioning: PositioningInput,
): QualityGate {
  const allText = assets.map((a) => a.body).join('\n\n');
  const firstLines = assets.map((a) => a.body.trim().split('\n')[0] || '');

  const hookInFirstSentence = firstLines.every((line) => {
    if (!line) return false;
    // A hook is short-ish, ends with a strong punctuation OR is an attention-grab.
    const trimmed = line.trim();
    return trimmed.length >= 10 && trimmed.length <= 240;
  });

  const noHype = !hasHype(allText);
  const clearAudience = positioning.audience.trim().length >= 12;
  const systemInsightPresent = analysis.systemInsight.trim().length > 0;
  const ctaPresent =
    positioning.ctaGoal.trim().length > 0 &&
    assets.some((a) => a.cta.trim().length > 0 || /→|DM|book|call|audit/i.test(a.body));
  const positioningVisible = positioning.positioning.trim().length >= 12;
  const platformFormatValid = assets.every(isValidPlatformFormat);
  const technicalClaimsSafe = !hasUnsafeClaim(allText);

  const notes: string[] = [];
  if (!hookInFirstSentence) notes.push('One or more assets are missing a clear opening hook.');
  if (!noHype) notes.push('Hype language detected — soften claims for authority tone.');
  if (!clearAudience) notes.push('Audience description is too short to drive targeting.');
  if (!ctaPresent) notes.push('CTA goal is missing or not surfaced inside assets.');
  if (!positioningVisible) notes.push('Positioning statement is too short to be visible in copy.');
  if (!platformFormatValid) notes.push('At least one asset does not match its platform format.');
  if (!technicalClaimsSafe) notes.push('Unsafe absolute technical claim detected.');

  return {
    hookInFirstSentence,
    noHype,
    clearAudience,
    systemInsightPresent,
    ctaPresent,
    positioningVisible,
    platformFormatValid,
    technicalClaimsSafe,
    notes,
  };
}
