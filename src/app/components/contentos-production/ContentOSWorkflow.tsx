import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  Sparkles, WandSparkles, ArrowRight, ArrowLeft, Save, Check, RefreshCw,
  CircleCheckBig, Circle, TriangleAlert, FileText, Library, Rocket, Lock,
} from 'lucide-react';
import {
  DEFAULT_PRODUCTION_REQUEST,
  emptyEditableAsset,
  generateAsset,
  loadBrandContext,
  rebuildAndEvaluate,
  saveProductionAsset,
  type EditableAsset,
  type ProductionContentRequest,
} from '../../lib/contentos-production/workflow';
import type { InstagramAssetV1, InstagramFormat, InstagramIntent } from '../../../core/instagram';

// ─── Visual tokens (match BrandOS wizard) ────────────────────────────────────
const ACCENT = '#FFBFDE';
const CARD_BG = '#171923';
const CARD_BORDER = 'rgba(255,255,255,0.08)';
const inputBase = 'w-full px-4 py-3 rounded-lg transition-all focus:outline-none';
const inputStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#F4F3F8',
  fontSize: '15px',
} as const;

type Phase = 'request' | 'generate' | 'review' | 'edit' | 'save' | 'handoff';

const PHASES: { id: Phase; number: string; name: string; tagline: string }[] = [
  { id: 'request',  number: '01', name: 'Content Request', tagline: 'Topic · Intent · Format · Goal' },
  { id: 'generate', number: '02', name: 'Generate',         tagline: 'Run the brand-aware generator' },
  { id: 'review',   number: '03', name: 'Review',           tagline: 'Hook · Body · CTA scores' },
  { id: 'edit',     number: '04', name: 'Edit',             tagline: 'Refine every field' },
  { id: 'save',     number: '05', name: 'Save',             tagline: 'Registry → Library' },
  { id: 'handoff',  number: '06', name: 'Handoff',          tagline: 'Continue to LaunchOS' },
];

const INTENTS: InstagramIntent[] = ['awareness', 'consideration', 'conversion'];
const FORMATS: InstagramFormat[] = ['carousel', 'reel', 'story'];

export function ContentOSWorkflow() {
  // Brand context
  const brandCtx = useMemo(() => loadBrandContext(), []);
  const brand = brandCtx.core;
  const hasExtendedBrand = Boolean(brandCtx.extended?.brandName);

  // Phase state
  const [phase, setPhase] = useState<Phase>('request');
  const [reachable, setReachable] = useState<Set<Phase>>(new Set(['request']));

  // Request
  const [request, setRequest] = useState<ProductionContentRequest>(() => ({
    ...DEFAULT_PRODUCTION_REQUEST,
    topic: '',
    goal: brandCtx.extended?.audience.desiredOutcome || '',
  }));

  // Generated / Editable
  const [editable, setEditable] = useState<EditableAsset>(emptyEditableAsset);
  const [asset, setAsset] = useState<InstagramAssetV1 | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  // Save state
  const [saveResult, setSaveResult] = useState<{ libraryId: string; isDuplicate: boolean } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Re-evaluate quality on every edit (cheap, deterministic)
  useEffect(() => {
    if (!asset) return;
    const re = rebuildAndEvaluate(editable, brand);
    setAsset(re);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable.hook, editable.bodySkeleton, editable.cta, editable.intent, editable.format]);

  function unlock(...phases: Phase[]) {
    setReachable((prev) => {
      const next = new Set(prev);
      for (const p of phases) next.add(p);
      return next;
    });
  }

  async function handleGenerate() {
    if (!request.topic.trim()) {
      setGenError('Add a topic before generating.');
      return;
    }
    setGenError(null);
    setIsGenerating(true);
    setPhase('generate');
    unlock('generate');
    try {
      const { asset: a, editable: e } = await generateAsset(request, brand);
      setAsset(a);
      setEditable(e);
      unlock('review', 'edit');
      setPhase('review');
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Generation failed');
      setPhase('request');
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSave() {
    if (!asset) return;
    setSaveError(null);
    setIsSaving(true);
    try {
      const result = saveProductionAsset(editable, brand, {
        caption: editable.caption,
        hashtags: editable.hashtags,
        visualNotes: editable.visualNotes,
      });
      setSaveResult({ libraryId: result.libraryId, isDuplicate: result.isDuplicate });
      unlock('save', 'handoff');
      setPhase('handoff');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  }

  function goTo(p: Phase) {
    if (reachable.has(p)) setPhase(p);
  }

  return (
    <div className="flex-1 min-h-0 overflow-auto" style={{ background: '#0E0F14' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} style={{ color: ACCENT }} />
            <span style={{
              fontSize: '11px', fontWeight: 700, color: ACCENT,
              textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>
              ContentOS · Production Workflow
            </span>
          </div>
          <h1 style={{
            fontSize: '36px', fontWeight: 700, color: '#F4F3F8',
            letterSpacing: '-0.02em', marginBottom: '6px',
          }}>
            Generate an Instagram asset
          </h1>
          <p style={{ fontSize: '15px', color: '#B4B8C7', maxWidth: '680px', lineHeight: 1.55 }}>
            Brand profile → request → generator → review → edit → save. The full pipeline runs locally on the CreatorOS Core.
          </p>
          {!hasExtendedBrand && (
            <div
              className="mt-4 p-3 rounded-lg flex items-center gap-3"
              style={{
                background: 'rgba(255,191,222,0.06)',
                border: '1px solid rgba(255,191,222,0.2)',
              }}
            >
              <TriangleAlert size={16} style={{ color: ACCENT }} />
              <span style={{ fontSize: '13px', color: '#B4B8C7' }}>
                No Brand Profile detected. ContentOS will use safe defaults — for better output, complete BrandOS first.{' '}
                <Link to="/app/brand-os/setup" style={{ color: ACCENT, fontWeight: 600, textDecoration: 'none' }}>
                  Open BrandOS →
                </Link>
              </span>
            </div>
          )}
        </header>

        {/* Phase Rail (horizontal) */}
        <nav className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {PHASES.map((p) => {
            const active = p.id === phase;
            const reach = reachable.has(p.id);
            const done = isPhaseDone(p.id, { hasAsset: !!asset, isSaved: !!saveResult });
            return (
              <button
                key={p.id}
                onClick={() => goTo(p.id)}
                disabled={!reach}
                className="text-left p-3 rounded-[12px] transition-all"
                style={{
                  background: active ? `${ACCENT}10` : CARD_BG,
                  border: active ? `1px solid ${ACCENT}40` : `1px solid ${CARD_BORDER}`,
                  opacity: reach ? 1 : 0.4,
                  cursor: reach ? 'pointer' : 'not-allowed',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {done
                    ? <CircleCheckBig size={14} style={{ color: ACCENT }} />
                    : <Circle size={14} style={{ color: '#8B8F9E' }} />}
                  <span style={{
                    fontSize: '10px', fontWeight: 700,
                    color: active ? ACCENT : '#8B8F9E',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    Phase {p.number}
                  </span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8' }}>{p.name}</div>
                <div style={{ fontSize: '11px', color: '#8B8F9E', marginTop: '2px' }}>{p.tagline}</div>
              </button>
            );
          })}
        </nav>

        {/* Phase Body */}
        {phase === 'request' && (
          <RequestPhase
            request={request}
            setRequest={setRequest}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            error={genError}
            brandName={brand.brandName}
          />
        )}

        {phase === 'generate' && (
          <GeneratingPhase brand={brand} request={request} />
        )}

        {(phase === 'review' || phase === 'edit') && asset && (
          <ReviewEditPhase
            phase={phase}
            asset={asset}
            editable={editable}
            setEditable={setEditable}
            onSwitchToEdit={() => { setPhase('edit'); }}
            onSwitchToReview={() => { setPhase('review'); }}
            onContinueToSave={() => { setPhase('save'); unlock('save'); }}
            onRegenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        )}

        {phase === 'save' && asset && (
          <SavePhase
            asset={asset}
            editable={editable}
            isSaving={isSaving}
            saveError={saveError}
            onSave={handleSave}
            onBack={() => setPhase('edit')}
          />
        )}

        {phase === 'handoff' && saveResult && (
          <HandoffPhase saveResult={saveResult} />
        )}
      </div>
    </div>
  );
}

function isPhaseDone(p: Phase, ctx: { hasAsset: boolean; isSaved: boolean }): boolean {
  if (p === 'request')  return ctx.hasAsset;
  if (p === 'generate') return ctx.hasAsset;
  if (p === 'review')   return ctx.hasAsset;
  if (p === 'edit')     return ctx.hasAsset;
  if (p === 'save')     return ctx.isSaved;
  if (p === 'handoff')  return ctx.isSaved;
  return false;
}

// ────────────────────────────────────────────────────────────────────────────
// Phase: Request
// ────────────────────────────────────────────────────────────────────────────

function RequestPhase({
  request, setRequest, onGenerate, isGenerating, error, brandName,
}: {
  request: ProductionContentRequest;
  setRequest: React.Dispatch<React.SetStateAction<ProductionContentRequest>>;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string | null;
  brandName: string;
}) {
  return (
    <section className="space-y-5">
      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <Label name="Topic" hint={`What this asset is about. Inherits brand voice from ${brandName}.`} />
        <input
          type="text"
          value={request.topic}
          onChange={(e) => setRequest((r) => ({ ...r, topic: e.target.value }))}
          placeholder="e.g. Content Batching for Solopreneurs"
          className={inputBase}
          style={inputStyle}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <Label name="Intent" hint="What the post should achieve." />
          <div className="grid grid-cols-3 gap-2">
            {INTENTS.map((i) => (
              <Chip key={i} active={request.intent === i} onClick={() => setRequest((r) => ({ ...r, intent: i }))}>
                {i}
              </Chip>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <Label name="Format" hint="Instagram surface this targets." />
          <div className="grid grid-cols-3 gap-2">
            {FORMATS.map((f) => (
              <Chip key={f} active={request.format === f} onClick={() => setRequest((r) => ({ ...r, format: f }))}>
                {f}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <Label name="Goal (optional)" hint="What outcome you want for the audience after they see this post." />
        <textarea
          value={request.goal}
          onChange={(e) => setRequest((r) => ({ ...r, goal: e.target.value }))}
          placeholder="e.g. Save the post and revisit before their next batching session."
          rows={3}
          className={inputBase}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.55 }}
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg flex items-center gap-2" style={{
          background: 'rgba(255,120,140,0.08)', border: '1px solid rgba(255,120,140,0.25)', color: '#FFAFC0', fontSize: '13px',
        }}>
          <TriangleAlert size={14} /> {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !request.topic.trim()}
          className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${ACCENT} 0%, #DABFFF 100%)`,
            color: '#0E0F14',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: `0 4px 16px ${ACCENT}40`,
            opacity: (isGenerating || !request.topic.trim()) ? 0.5 : 1,
            cursor: (isGenerating || !request.topic.trim()) ? 'not-allowed' : 'pointer',
          }}
        >
          <WandSparkles size={16} /> {isGenerating ? 'Generating…' : 'Generate Asset'} <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase: Generate (transient)
// ────────────────────────────────────────────────────────────────────────────

function GeneratingPhase({ brand, request }: { brand: { brandName: string }; request: ProductionContentRequest }) {
  return (
    <div className="p-10 rounded-[16px] text-center" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: `${ACCENT}20` }}>
        <WandSparkles size={20} style={{ color: ACCENT }} className="animate-pulse" />
      </div>
      <div style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
        Generating {request.format} for {brand.brandName}…
      </div>
      <p style={{ fontSize: '13px', color: '#8B8F9E' }}>
        Pipeline: blueprint → request → generator → quality tag
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase: Review + Edit (combined workspace, two tabs)
// ────────────────────────────────────────────────────────────────────────────

function ReviewEditPhase({
  phase, asset, editable, setEditable,
  onSwitchToEdit, onSwitchToReview, onContinueToSave, onRegenerate, isGenerating,
}: {
  phase: 'review' | 'edit';
  asset: InstagramAssetV1;
  editable: EditableAsset;
  setEditable: React.Dispatch<React.SetStateAction<EditableAsset>>;
  onSwitchToEdit: () => void;
  onSwitchToReview: () => void;
  onContinueToSave: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}) {
  const q = asset.qualityMeta;
  return (
    <section className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-5">
        {/* tabs */}
        <div className="inline-flex p-1 rounded-lg" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <button
            onClick={onSwitchToReview}
            className="px-4 py-1.5 rounded-md"
            style={{
              background: phase === 'review' ? `${ACCENT}20` : 'transparent',
              color: phase === 'review' ? ACCENT : '#8B8F9E',
              fontSize: '13px', fontWeight: 600,
            }}
          >Review</button>
          <button
            onClick={onSwitchToEdit}
            className="px-4 py-1.5 rounded-md"
            style={{
              background: phase === 'edit' ? `${ACCENT}20` : 'transparent',
              color: phase === 'edit' ? ACCENT : '#8B8F9E',
              fontSize: '13px', fontWeight: 600,
            }}
          >Edit</button>
        </div>

        {phase === 'review' ? (
          <ReadOnlyAsset editable={editable} />
        ) : (
          <EditableAssetForm editable={editable} setEditable={setEditable} />
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#B4B8C7',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <RefreshCw size={14} /> Regenerate
          </button>
          <button
            onClick={onContinueToSave}
            className="px-5 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #DABFFF 100%)`,
              color: '#0E0F14', fontSize: '14px', fontWeight: 600,
              boxShadow: `0 4px 16px ${ACCENT}40`,
            }}
          >
            Continue to Save <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Quality sidebar */}
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-6 space-y-4">
          <div className="p-5 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
            <div className="flex items-baseline justify-between mb-4">
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Quality
              </span>
              <span style={{
                fontSize: '11px', fontWeight: 700,
                color: ACCENT,
                background: `${ACCENT}18`, border: `1px solid ${ACCENT}30`,
                padding: '3px 8px', borderRadius: '6px',
              }}>
                Grade {q?.grade ?? '—'}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span style={{ fontSize: '40px', fontWeight: 700, color: '#F4F3F8', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {q?.qualityScore ?? 0}
              </span>
              <span style={{ fontSize: '14px', color: '#8B8F9E' }}>/ 100</span>
            </div>
            <div style={{ fontSize: '12px', color: '#8B8F9E', marginBottom: '14px' }}>Overall score · live</div>

            <div className="space-y-3">
              <ScoreBar label="Hook"   score={q?.hookScore ?? 0} />
              <ScoreBar label="Body"   score={q?.bodyScore ?? 0} />
              <ScoreBar label="CTA"    score={q?.ctaScore ?? 0} />
              <ScoreBar label="Format" score={q?.formatScore ?? 0} />
            </div>
          </div>

          <div className="p-4 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
              Asset
            </div>
            <div style={{ fontSize: '12px', color: '#B4B8C7', lineHeight: 1.5 }}>
              <div>Format: <span style={{ color: '#F4F3F8' }}>{asset.format}</span></div>
              <div>Intent: <span style={{ color: '#F4F3F8' }}>{asset.intent}</span></div>
              <div className="mt-1 font-mono" style={{ fontSize: '11px', color: '#8B8F9E' }}>
                {asset.artifactHash.slice(0, 14)}…
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 75 ? '#A7F3D0' : score >= 60 ? ACCENT : score >= 40 ? '#FFD27A' : '#FFAFC0';
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span style={{ fontSize: '12px', color: '#B4B8C7', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '12px', color: '#F4F3F8', fontWeight: 600 }}>{score}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  );
}

function ReadOnlyAsset({ editable }: { editable: EditableAsset }) {
  return (
    <div className="space-y-4">
      <PreviewBlock label="Title"   value={editable.title} />
      <PreviewBlock label="Hook"    value={editable.hook} />
      <PreviewBlock label="Body"    value={editable.bodySkeleton} multiline />
      <PreviewBlock label="CTA"     value={editable.cta} />
      <PreviewBlock label="Caption" value={editable.caption} multiline />
      <PreviewBlock label="Hashtags" value={editable.hashtags} mono />
      <PreviewBlock label="Visual Notes" value={editable.visualNotes} multiline />
    </div>
  );
}

function PreviewBlock({ label, value, multiline, mono }: { label: string; value: string; multiline?: boolean; mono?: boolean }) {
  return (
    <div className="p-5 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
        {label}
      </div>
      <div
        style={{
          fontSize: '14px',
          color: '#F4F3F8',
          whiteSpace: multiline ? 'pre-wrap' : 'normal',
          fontFamily: mono ? 'ui-monospace, SFMono-Regular, monospace' : 'inherit',
          lineHeight: 1.55,
        }}
      >
        {value || <span style={{ color: '#8B8F9E', fontStyle: 'italic' }}>—</span>}
      </div>
    </div>
  );
}

function EditableAssetForm({
  editable, setEditable,
}: {
  editable: EditableAsset;
  setEditable: React.Dispatch<React.SetStateAction<EditableAsset>>;
}) {
  function patch<K extends keyof EditableAsset>(k: K, v: EditableAsset[K]) {
    setEditable((e) => ({ ...e, [k]: v }));
  }
  return (
    <div className="space-y-4">
      <EditBlock label="Title" value={editable.title} onChange={(v) => patch('title', v)} />
      <EditBlock label="Hook" value={editable.hook} onChange={(v) => patch('hook', v)} multiline rows={2} />
      <EditBlock label="Body" value={editable.bodySkeleton} onChange={(v) => patch('bodySkeleton', v)} multiline rows={4} />
      <EditBlock label="CTA" value={editable.cta} onChange={(v) => patch('cta', v)} />
      <EditBlock label="Caption" value={editable.caption} onChange={(v) => patch('caption', v)} multiline rows={5} />
      <EditBlock label="Hashtags" value={editable.hashtags} onChange={(v) => patch('hashtags', v)} mono />
      <EditBlock label="Visual Notes" value={editable.visualNotes} onChange={(v) => patch('visualNotes', v)} multiline rows={3} />

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <Label name="Intent" />
          <div className="grid grid-cols-3 gap-2">
            {INTENTS.map((i) => (
              <Chip key={i} active={editable.intent === i} onClick={() => patch('intent', i)}>{i}</Chip>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <Label name="Format" />
          <div className="grid grid-cols-3 gap-2">
            {FORMATS.map((f) => (
              <Chip key={f} active={editable.format === f} onClick={() => patch('format', f)}>{f}</Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditBlock({
  label, value, onChange, multiline, rows = 3, mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <div className="p-5 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <Label name={label} />
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={inputBase}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: mono ? 'ui-monospace, SFMono-Regular, monospace' : 'inherit', lineHeight: 1.55 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
          style={{ ...inputStyle, fontFamily: mono ? 'ui-monospace, SFMono-Regular, monospace' : 'inherit' }}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase: Save
// ────────────────────────────────────────────────────────────────────────────

function SavePhase({
  asset, editable, isSaving, saveError, onSave, onBack,
}: {
  asset: InstagramAssetV1;
  editable: EditableAsset;
  isSaving: boolean;
  saveError: string | null;
  onSave: () => void;
  onBack: () => void;
}) {
  const q = asset.qualityMeta;
  return (
    <section className="space-y-5">
      <div className="p-6 rounded-[16px]" style={{
        background: `linear-gradient(135deg, ${ACCENT}10 0%, transparent 100%)`,
        border: `1px solid ${ACCENT}30`,
      }}>
        <div className="flex items-center gap-2 mb-3">
          <Save size={14} style={{ color: ACCENT }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Ready to Save
          </span>
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px', letterSpacing: '-0.01em' }}>
          {editable.title || 'Untitled asset'}
        </h3>
        <p style={{ fontSize: '14px', color: '#B4B8C7', maxWidth: '560px', lineHeight: 1.55 }}>
          One click writes through the full Core pipeline: <span style={{ color: '#F4F3F8' }}>Registry → AssetStore → Content Library</span>. No additional confirmation needed.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <PipelineStep number="1" name="Registry" detail="Dedupes & versions by artifact hash" />
        <PipelineStep number="2" name="AssetStore" detail="Persisted via StorageProvider" />
        <PipelineStep number="3" name="Content Library" detail="Visible in the Library tab" />
      </div>

      <div className="p-5 rounded-[14px] grid md:grid-cols-4 gap-4" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <MiniMeta label="Format" value={asset.format} />
        <MiniMeta label="Intent" value={asset.intent} />
        <MiniMeta label="Quality" value={`${q?.qualityScore ?? 0} / 100 (${q?.grade ?? '—'})`} />
        <MiniMeta label="Hash" value={asset.artifactHash.slice(0, 12) + '…'} mono />
      </div>

      {saveError && (
        <div className="p-3 rounded-lg flex items-center gap-2" style={{
          background: 'rgba(255,120,140,0.08)', border: '1px solid rgba(255,120,140,0.25)', color: '#FFAFC0', fontSize: '13px',
        }}>
          <TriangleAlert size={14} /> {saveError}
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2.5 rounded-lg flex items-center gap-2"
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: '#B4B8C7', fontSize: '13px', fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} /> Back to Edit
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${ACCENT} 0%, #DABFFF 100%)`,
            color: '#0E0F14', fontSize: '15px', fontWeight: 600,
            boxShadow: `0 4px 16px ${ACCENT}40`,
            opacity: isSaving ? 0.6 : 1,
          }}
        >
          <Save size={16} /> {isSaving ? 'Saving…' : 'Save to Library'} <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

function PipelineStep({ number, name, detail }: { number: string; name: string; detail: string }) {
  return (
    <div className="p-4 rounded-[12px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span style={{
          width: 22, height: 22, borderRadius: 6,
          background: `${ACCENT}20`, color: ACCENT,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 700,
        }}>{number}</span>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{name}</span>
      </div>
      <p style={{ fontSize: '12px', color: '#8B8F9E', lineHeight: 1.45 }}>{detail}</p>
    </div>
  );
}

function MiniMeta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: '10px', fontWeight: 700, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '13px', color: '#F4F3F8', fontWeight: 500, fontFamily: mono ? 'ui-monospace, SFMono-Regular, monospace' : 'inherit' }}>
        {value}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase: Handoff
// ────────────────────────────────────────────────────────────────────────────

function HandoffPhase({ saveResult }: { saveResult: { libraryId: string; isDuplicate: boolean } }) {
  return (
    <section className="space-y-5">
      <div className="p-8 rounded-[16px] text-center" style={{
        background: `linear-gradient(135deg, ${ACCENT}10 0%, transparent 100%)`,
        border: `1px solid ${ACCENT}30`,
      }}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: ACCENT }}>
          <Check size={20} style={{ color: '#0E0F14' }} />
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.01em', marginBottom: '6px' }}>
          {saveResult.isDuplicate ? 'Already in your Library' : 'Saved to your Library'}
        </h3>
        <p style={{ fontSize: '14px', color: '#B4B8C7', maxWidth: '480px', margin: '0 auto', lineHeight: 1.55 }}>
          Registry, AssetStore, and Content Library are in sync. You can reuse this asset anywhere in CreatorOS.
        </p>
        <div style={{ fontSize: '11px', color: '#8B8F9E', marginTop: '12px', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
          id: {saveResult.libraryId.slice(0, 18)}…
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <HandoffCard
          icon={<Library size={18} />}
          title="Open Library"
          description="See the asset you just saved alongside the rest of your content."
          to="/app/content-os/library"
          ctaLabel="Open Library"
        />
        <HandoffCard
          icon={<FileText size={18} />}
          title="Generate Another"
          description="Run the same pipeline for the next post, story, or reel."
          to="/modules/contentos/app"
          ctaLabel="New Asset"
          reload
        />
        <HandoffCard
          icon={<Rocket size={18} />}
          title="Continue to LaunchOS"
          description="Plan the rollout for this asset across phases and channels."
          ctaLabel="Available after LaunchOS setup"
          disabled
        />
      </div>
    </section>
  );
}

function HandoffCard({
  icon, title, description, to, ctaLabel, accent, reload, disabled,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to?: string;
  ctaLabel: string;
  accent?: boolean;
  reload?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="p-5 rounded-[16px] flex flex-col" style={{
      background: CARD_BG,
      border: accent ? `1px solid ${ACCENT}40` : `1px solid ${CARD_BORDER}`,
      boxShadow: accent ? `0 8px 24px ${ACCENT}14` : 'none',
      opacity: disabled ? 0.6 : 1,
    }}>
      <div className="flex items-center gap-2 mb-2" style={{ color: accent ? ACCENT : '#B4B8C7' }}>
        {icon}
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{title}</span>
        {disabled && (
          <span
            className="ml-auto px-2 py-0.5 rounded-full"
            style={{
              fontSize: '10px', fontWeight: 700, color: '#8B8F9E',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}
          >
            Coming soon
          </span>
        )}
      </div>
      <p style={{ fontSize: '13px', color: '#8B8F9E', lineHeight: 1.55, flexGrow: 1, marginBottom: '14px' }}>
        {description}
      </p>
      {disabled || !to ? (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#8B8F9E',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'not-allowed',
          }}
        >
          <Lock size={13} /> {ctaLabel}
        </button>
      ) : (
        <Link
          to={to}
          reloadDocument={reload}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
          style={{
            background: accent ? `linear-gradient(135deg, ${ACCENT} 0%, #DABFFF 100%)` : 'rgba(255,255,255,0.05)',
            border: accent ? 'none' : '1px solid rgba(255,255,255,0.1)',
            color: accent ? '#0E0F14' : '#F4F3F8',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {ctaLabel} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Small primitives
// ────────────────────────────────────────────────────────────────────────────

function Label({ name, hint }: { name: string; hint?: string }) {
  return (
    <div className="mb-3">
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{name}</div>
      {hint && <div style={{ fontSize: '12px', color: '#8B8F9E', marginTop: '2px' }}>{hint}</div>}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 rounded-lg transition-all"
      style={{
        background: active ? `${ACCENT}20` : 'rgba(255,255,255,0.03)',
        border: active ? `1px solid ${ACCENT}40` : '1px solid rgba(255,255,255,0.08)',
        color: active ? ACCENT : '#B4B8C7',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'capitalize',
      }}
    >
      {children}
    </button>
  );
}
