// ─── ContentOS Production Workflow (Sprint 17) ───────────────────────────────
// Thin orchestrator that wires the existing src/core pipeline:
//   BrandProfileExtended → ContentRequest → Generator → evaluateAndTag
//   → registerAndPersist → assetStore → Content Library
//
// No new contracts. No router changes. Pure composition of the existing kernel.

import { createBlueprint, type Blueprint } from '../../../core/blueprint';
import { hashBlueprint } from '../../../core/hashing';
import { createContentGenerator } from '../../../core/ai/generatorFactory';
import { evaluateAndTag } from '../../../core/intelligence/assetTagger';
import { registerAndPersist } from '../../../core/persistence/registryStore';
import { assetStore } from '../../../core/persistence/assetStore';
import { syncRegistryEntryToLibrary } from '../../../core/library/libraryAdapter';
import { createAsset } from '../../../core/assets';
import { createInstagramAsset } from '../../../core/instagram/instagramAssetFactory';
import { evaluateAsset } from '../../../core/quality/contentEvaluator';
import type { ContentRequest } from '../../../core/content/contentRequest';
import type { InstagramAssetV1, InstagramFormat, InstagramIntent } from '../../../core/instagram';
import type { BrandProfile } from '../../../core/brand';
import type { BrandProfileExtended } from '../brand-profile/extendedTypes';
import { readBrandProfileExtended } from '../brand-profile/extendedStorage';
import { readBrandProfile as readV1BrandProfile } from '../brand-profile/storage';
import { registryEntryToLibraryAsset } from '../../../core/library/libraryMapper';

// ─── Singleton Blueprint for Instagram assets ────────────────────────────────
// One blueprint covers all ContentOS production runs in this app.
// Created lazily on first use so module load is cheap.

let cachedBlueprint: Blueprint | null = null;
let cachedBlueprintHash: string | null = null;

function getInstagramBlueprint(): { blueprint: Blueprint; blueprintHash: string } {
  if (cachedBlueprint && cachedBlueprintHash) {
    return { blueprint: cachedBlueprint, blueprintHash: cachedBlueprintHash };
  }
  const blueprint = createBlueprint({
    slug: 'instagram-asset-production',
    version: 1,
    status: 'active',
    states: ['default'],
    fixtures: {
      default: { title: 'Topic', hook: 'Hook', bodySkeleton: 'Body', cta: 'CTA' },
    },
    fields: [
      { key: 'title',        label: 'Title',         type: 'text',      required: true },
      { key: 'hook',         label: 'Hook',          type: 'multiline', required: true },
      { key: 'bodySkeleton', label: 'Body',          type: 'multiline', required: true },
      { key: 'cta',          label: 'Call to action', type: 'text',     required: true },
    ],
  });
  const { blueprintHash } = hashBlueprint(blueprint);
  cachedBlueprint = blueprint;
  cachedBlueprintHash = blueprintHash;
  return { blueprint, blueprintHash };
}

// ─── BrandProfileExtended → core BrandProfile ────────────────────────────────

export function coreBrandProfileFrom(extended: BrandProfileExtended | null): BrandProfile {
  if (extended && extended.brandName.trim()) {
    return {
      brandName:   extended.brandName.trim(),
      voice:       [extended.voice.tone, extended.voice.formality].filter(Boolean).join(' & ') || 'Conversational',
      audience:    extended.audience.audience.trim() || 'Independent creators',
      positioning: extended.identity.positioning.trim() || extended.identity.mission.trim() || '',
    };
  }
  // Fallback: try v1 profile
  const v1 = readV1BrandProfile();
  if (v1 && v1.brandName) {
    return {
      brandName:   v1.brandName,
      voice:       v1.voiceTone || v1.voiceLabel || 'Conversational',
      audience:    'Independent creators',
      positioning: '',
    };
  }
  return {
    brandName:   'Your brand',
    voice:       'Conversational',
    audience:    'Independent creators',
    positioning: '',
  };
}

export function loadBrandContext(): {
  extended: BrandProfileExtended | null;
  core: BrandProfile;
} {
  const extended = readBrandProfileExtended();
  return { extended, core: coreBrandProfileFrom(extended) };
}

// ─── Request defaults ────────────────────────────────────────────────────────

export interface ProductionContentRequest {
  topic: string;
  intent: InstagramIntent;
  format: InstagramFormat;
  goal: string;
}

export const DEFAULT_PRODUCTION_REQUEST: ProductionContentRequest = {
  topic: '',
  intent: 'awareness',
  format: 'carousel',
  goal: '',
};

// ─── Editable asset (what the workspace renders) ─────────────────────────────

export interface EditableAsset {
  title: string;
  hook: string;
  bodySkeleton: string;
  cta: string;
  caption: string;       // long-form caption (ContentOS extra)
  hashtags: string;      // space- or newline-separated
  visualNotes: string;   // notes for visual generation downstream
  format: InstagramFormat;
  intent: InstagramIntent;
}

export function emptyEditableAsset(): EditableAsset {
  return {
    title: '',
    hook: '',
    bodySkeleton: '',
    cta: '',
    caption: '',
    hashtags: '',
    visualNotes: '',
    format: 'carousel',
    intent: 'awareness',
  };
}

// ─── Generation ──────────────────────────────────────────────────────────────

export async function generateAsset(
  request: ProductionContentRequest,
  brand: BrandProfile,
): Promise<{ asset: InstagramAssetV1; editable: EditableAsset }> {
  const { blueprint, blueprintHash } = getInstagramBlueprint();
  const coreRequest: ContentRequest = {
    brandProfile: brand,
    topic: request.topic.trim() || 'Content',
    intent: request.intent,
    format: request.format,
  };
  const generator = createContentGenerator({ useAI: false });
  const raw = await generator.generate(coreRequest, blueprint, blueprintHash);
  const tagged = evaluateAndTag(raw, brand, generator.generatorType);

  const editable: EditableAsset = {
    title: tagged.title,
    hook: tagged.hook,
    bodySkeleton: tagged.bodySkeleton,
    cta: tagged.cta,
    caption: deriveCaption(tagged, request.goal),
    hashtags: deriveHashtags(coreRequest),
    visualNotes: deriveVisualNotes(coreRequest),
    format: tagged.format,
    intent: tagged.intent,
  };

  return { asset: tagged, editable };
}

function deriveCaption(asset: InstagramAssetV1, goal: string): string {
  return [asset.hook, '', asset.bodySkeleton, '', goal.trim(), '', asset.cta]
    .filter((s) => s !== undefined)
    .join('\n')
    .trim();
}

function deriveHashtags(req: ContentRequest): string {
  const slug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24);
  const tags = [
    slug(req.topic),
    slug(req.brandProfile.brandName),
    req.intent,
    req.format,
    'creatoros',
  ].filter(Boolean);
  return tags.map((t) => `#${t}`).join(' ');
}

function deriveVisualNotes(req: ContentRequest): string {
  return `Format: ${req.format}. Tone: ${req.brandProfile.voice}. Lead frame: bold typographic statement of the hook. Subsequent frames: structured body with one idea per frame. Final frame: CTA on solid brand color.`;
}

// ─── Re-evaluate after edits (quality scores update live) ────────────────────

export function rebuildAndEvaluate(
  editable: EditableAsset,
  brand: BrandProfile,
): InstagramAssetV1 {
  const { blueprint, blueprintHash } = getInstagramBlueprint();
  const asset = createAsset(blueprint, blueprintHash);
  const ig = createInstagramAsset({
    asset,
    format: editable.format,
    intent: editable.intent,
    title: editable.title || 'Untitled',
    hook: editable.hook || '',
    bodySkeleton: editable.bodySkeleton || '',
    cta: editable.cta || '',
  });
  return evaluateAndTag(ig, brand, 'deterministic');
}

// ─── Save (Registry → AssetStore → Content Library) ──────────────────────────

export interface SaveResult {
  libraryId: string;
  artifactHash: string;
  isDuplicate: boolean;
}

export function saveProductionAsset(
  editable: EditableAsset,
  brand: BrandProfile,
  extras: { caption: string; hashtags: string; visualNotes: string },
): SaveResult {
  // Rebuild to ensure artifactHash reflects current edited content.
  const finalAsset = rebuildAndEvaluate(editable, brand);

  // 1) Registry (in-memory + LocalStorage via registryStore)
  const entry = registerAndPersist(finalAsset);

  // 2) AssetStore — map to SavedContentAsset shape (uses artifactHash as id)
  const libraryAsset = registryEntryToLibraryAsset(entry, brand);
  // Enrich with ContentOS production extras (caption / hashtags / visual notes)
  const enriched = {
    ...libraryAsset,
    items: [
      libraryAsset.items[0] ?? finalAsset.hook,
      libraryAsset.items[1] ?? finalAsset.bodySkeleton,
      libraryAsset.items[2] ?? finalAsset.cta,
      extras.caption,
      extras.hashtags,
      extras.visualNotes,
    ].filter(Boolean),
  };
  assetStore.save(enriched);

  // 3) Legacy Content Library (the v1 list the Library screen reads)
  const sync = syncRegistryEntryToLibrary(entry, brand);

  return {
    libraryId: sync.id,
    artifactHash: entry.artifactHash,
    isDuplicate: entry.isDuplicate,
  };
}
