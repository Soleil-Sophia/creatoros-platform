// LaunchOS Planner — converts (assets, request) → LaunchPlan
// Deterministic, no AI required. Pure composition of existing CreatorOS data.

import type { SavedContentAsset } from '../content-library/types';
import type {
  LaunchGoal,
  LaunchPlan,
  LaunchPlanItem,
  LaunchRequest,
  PublishingFrequency,
} from './types';

// Cadence (days between primary posts) per frequency
const CADENCE: Record<PublishingFrequency, number> = {
  'daily': 1,
  'every-other-day': 2,
  'twice-weekly': 3,
  'weekly': 7,
};

// Recommended posting hour per goal
const HOUR_BY_GOAL: Record<LaunchGoal, number> = {
  awareness: 11,
  consideration: 18,
  conversion: 20,
};

function id(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function recommendations(goal: LaunchGoal, count: number): string[] {
  const base = [
    `Launch sequence built for ${count} asset${count === 1 ? '' : 's'}.`,
    'Pin the hero post for 48h after launch to maximize discovery.',
  ];
  if (goal === 'awareness') {
    base.push('Add a story reminder 4h after each post to extend reach.');
    base.push('Reply to every comment in the first 2 hours — algorithm window.');
  } else if (goal === 'consideration') {
    base.push('Pair every post with a follow-up reel re-framing the same idea.');
    base.push('DM the top 5 commenters with a soft-touch resource link.');
  } else {
    base.push('Add a metrics check 24h after each conversion post.');
    base.push('Run a closing reminder story on the last day of the campaign.');
  }
  return base;
}

/**
 * Generate a Launch Blueprint from selected assets and a request.
 * Strategy: each asset becomes a primary "post" item, then expands with
 * supporting steps (story reminder, follow-up, comment strategy, metrics check)
 * appropriate for the goal.
 */
export function generateLaunchPlan(
  assets: SavedContentAsset[],
  request: LaunchRequest,
  brandName: string,
): LaunchPlan {
  const cadence = CADENCE[request.frequency];
  const baseHour = HOUR_BY_GOAL[request.goal];
  const now = new Date().toISOString();

  const items: LaunchPlanItem[] = [];

  assets.forEach((asset, index) => {
    const dayOffset = index * cadence;
    const primary: LaunchPlanItem = {
      id: id('itm'),
      dayOffset,
      hour: baseHour,
      assetId: asset.id,
      assetTitle: asset.title,
      platform: asset.platform,
      kind: 'post',
      label: `${asset.type || 'Post'} — ${asset.title}`,
      note: asset.preview?.slice(0, 140) || 'Primary launch post.',
      status: 'draft',
    };
    items.push(primary);

    // Story reminder a few hours later
    items.push({
      id: id('itm'),
      dayOffset,
      hour: Math.min(23, baseHour + 4),
      assetId: asset.id,
      assetTitle: asset.title,
      platform: asset.platform,
      kind: 'story-reminder',
      label: `Story reminder — "${asset.title}"`,
      note: 'Sticker poll or question to drive return visits to the post.',
      status: 'draft',
    });

    // Follow-up the next day
    items.push({
      id: id('itm'),
      dayOffset: dayOffset + 1,
      hour: baseHour,
      assetId: asset.id,
      assetTitle: asset.title,
      platform: asset.platform,
      kind: 'follow-up',
      label: `Follow-up — re-frame the hook`,
      note: 'Short reel or carousel re-stating the core insight in a new angle.',
      status: 'draft',
    });

    // Comment strategy same day
    items.push({
      id: id('itm'),
      dayOffset,
      hour: Math.min(23, baseHour + 1),
      assetId: asset.id,
      assetTitle: asset.title,
      platform: asset.platform,
      kind: 'comment-strategy',
      label: `Comment block — reply within 2h`,
      note: 'Reply to every comment with a question that invites a second reply.',
      status: 'draft',
    });

    // Metrics check 2 days after
    items.push({
      id: id('itm'),
      dayOffset: dayOffset + 2,
      hour: 21,
      assetId: asset.id,
      assetTitle: asset.title,
      platform: asset.platform,
      kind: 'metrics-check',
      label: `Metrics check — reach, saves, profile visits`,
      note: 'Capture saves, reach, profile visits. Feed back into ContentOS.',
      status: 'draft',
    });
  });

  // Sort by dayOffset, then hour, then kind priority
  const kindOrder: Record<LaunchPlanItem['kind'], number> = {
    'post': 0,
    'comment-strategy': 1,
    'story-reminder': 2,
    'follow-up': 3,
    'metrics-check': 4,
  };
  items.sort((a, b) => {
    if (a.dayOffset !== b.dayOffset) return a.dayOffset - b.dayOffset;
    if (a.hour !== b.hour) return a.hour - b.hour;
    return kindOrder[a.kind] - kindOrder[b.kind];
  });

  return {
    id: id('plan'),
    campaignName: request.campaignName.trim() || 'Untitled launch',
    goal: request.goal,
    targetDate: request.targetDate,
    frequency: request.frequency,
    brandName,
    createdAt: now,
    updatedAt: now,
    assetIds: assets.map((a) => a.id),
    items,
    recommendations: recommendations(request.goal, assets.length),
  };
}

// ─── UTC-safe calendar-date helpers ──────────────────────────────────────────
// Platform adaptation (not present in source): resolveDate/defaultTargetDate
// previously constructed `new Date(targetDate + 'T00:00:00')` and mutated it
// with local-time setDate()/getDate(), then read the result back via
// toISOString().slice(0, 10) -- a UTC read of a local-time value. For any
// timezone ahead of UTC this silently shifts the resulting calendar date
// backward by one day. YYYY-MM-DD values here are treated as plain UTC
// calendar dates throughout, with no local-time construction or mutation
// at any point, so the result is identical regardless of the host's
// timezone. This is the one intentional semantic deviation from source in
// this migration -- everything else is verbatim.

/** Parses a YYYY-MM-DD string into a UTC Date, or null if invalid/impossible. */
function parseCalendarDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  // Rejects impossible calendar dates (e.g. 2026-02-30) that Date would
  // otherwise silently roll forward into the next month.
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

/** Formats a UTC Date back into a YYYY-MM-DD string. */
function formatCalendarDate(date: Date): string {
  const year = date.getUTCFullYear().toString().padStart(4, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Resolve a day offset to a calendar date string (yyyy-mm-dd). */
export function resolveDate(targetDate: string, dayOffset: number): string {
  const base = parseCalendarDate(targetDate);
  if (!base) return targetDate;
  base.setUTCDate(base.getUTCDate() + dayOffset);
  return formatCalendarDate(base);
}

/** Default target date = 3 days from today (yyyy-mm-dd). */
export function defaultTargetDate(): string {
  const now = new Date();
  const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  todayUtc.setUTCDate(todayUtc.getUTCDate() + 3);
  return formatCalendarDate(todayUtc);
}
