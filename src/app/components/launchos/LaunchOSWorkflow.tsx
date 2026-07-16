import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { BackLink } from '../shared/BackLink';
import {
  Rocket, ArrowRight, ArrowLeft, Calendar, CircleCheckBig, Circle,
  TriangleAlert, ListChecks, Sparkles, Trash2, Plus, Save, ChevronUp, ChevronDown,
  Target, Megaphone, Repeat, MessageSquare, ChartColumn, Library, X,
} from 'lucide-react';
import { listSavedAssets } from '../../lib/content-library/storage';
import type { SavedContentAsset } from '../../lib/content-library/types';
import { readBrandProfileExtended } from '../../lib/brand-profile/extendedStorage';
import { readBrandProfile as readV1BrandProfile } from '../../lib/brand-profile/storage';
import {
  defaultTargetDate, generateLaunchPlan, resolveDate,
} from '../../lib/launchos/planner';
import {
  deleteLaunchPlan, listLaunchPlans, reorderItems, saveLaunchPlan, updateItem,
} from '../../lib/launchos/storage';
import type {
  LaunchGoal, LaunchItemStatus, LaunchPlan, LaunchPlanItem,
  LaunchRequest, PublishingFrequency,
} from '../../lib/launchos/types';

// ─── Visual tokens (match Content/BrandOS wizards) ──────────────────────────
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

type Phase = 'select' | 'request' | 'planner' | 'timeline' | 'queue' | 'handoff';

const PHASES: { id: Phase; number: string; name: string; tagline: string }[] = [
  { id: 'select',   number: '01', name: 'Asset Selection', tagline: 'Pick saved assets from Library' },
  { id: 'request',  number: '02', name: 'Launch Request',   tagline: 'Goal · Campaign · Date · Cadence' },
  { id: 'planner',  number: '03', name: 'Planner',          tagline: 'Generate the Launch Blueprint' },
  { id: 'timeline', number: '04', name: 'Timeline',         tagline: 'Visualize the execution flow' },
  { id: 'queue',    number: '05', name: 'Queue',            tagline: 'Edit · reorder · status' },
  { id: 'handoff',  number: '06', name: 'Handoff',          tagline: 'Continue to ManagementOS' },
];

const GOALS: { id: LaunchGoal; label: string; hint: string }[] = [
  { id: 'awareness',     label: 'Awareness',     hint: 'Reach new audiences' },
  { id: 'consideration', label: 'Consideration', hint: 'Build trust & repeat views' },
  { id: 'conversion',    label: 'Conversion',    hint: 'Drive a specific action' },
];

const FREQUENCIES: { id: PublishingFrequency; label: string }[] = [
  { id: 'daily',           label: 'Daily' },
  { id: 'every-other-day', label: 'Every other day' },
  { id: 'twice-weekly',    label: 'Twice weekly' },
  { id: 'weekly',          label: 'Weekly' },
];

const STATUS_ORDER: LaunchItemStatus[] = ['draft', 'ready', 'scheduled', 'published'];
const STATUS_COLOR: Record<LaunchItemStatus, string> = {
  draft:     '#8B8F9E',
  ready:     '#FFD27A',
  scheduled: ACCENT,
  published: '#A7F3D0',
};

const KIND_ICON: Record<LaunchPlanItem['kind'], typeof Megaphone> = {
  'post':             Megaphone,
  'story-reminder':   Sparkles,
  'follow-up':        Repeat,
  'comment-strategy': MessageSquare,
  'metrics-check':    ChartColumn,
};

// ─── Persistence status ──────────────────────────────────────────────────────
// Platform adaptation (not present in source): the source's save/update/
// reorder/delete handlers call storage.ts's write functions without checking
// their result at all -- prior to CML-015 those functions always returned an
// unconditional success shape, so there was nothing to check. CML-015 now
// returns a truthful { plan, persisted } / { deleted, persisted } result, and
// this component surfaces that truthfully instead of assuming every write
// succeeds. A single, persistent status region (visible across phase
// navigation, not a transient toast) tracks the most recent outcome.

type PersistenceStatus =
  | { kind: 'idle' }
  | { kind: 'success'; message: string }
  | {
      kind: 'error';
      action: 'save' | 'update' | 'reorder' | 'item-delete' | 'plan-delete' | 'missing-plan';
      message: string;
    };

function StatusBanner({ status, onDismiss }: { status: PersistenceStatus; onDismiss: () => void }) {
  if (status.kind === 'idle') return null;
  const isError = status.kind === 'error';
  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className="mb-6 p-4 rounded-lg flex items-center justify-between gap-3"
      style={{
        background: isError ? 'rgba(255,107,107,0.08)' : 'rgba(167,243,208,0.08)',
        border: isError ? '1px solid rgba(255,107,107,0.3)' : '1px solid rgba(167,243,208,0.3)',
      }}
    >
      <div className="flex items-center gap-2">
        {isError
          ? <TriangleAlert size={16} style={{ color: '#FF6B6B', flexShrink: 0 }} />
          : <CircleCheckBig size={16} style={{ color: '#A7F3D0', flexShrink: 0 }} />}
        <span style={{ fontSize: '13px', color: isError ? '#FF9B9B' : '#A7F3D0' }}>
          {status.message}
        </span>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="p-1 rounded"
        style={{ color: isError ? '#FF9B9B' : '#A7F3D0', flexShrink: 0 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

function getBrandName(): string {
  const ext = readBrandProfileExtended();
  if (ext?.brandName?.trim()) return ext.brandName.trim();
  const v1 = readV1BrandProfile();
  return v1?.brandName?.trim() || 'Your brand';
}

export function LaunchOSWorkflow() {
  const brandName = useMemo(() => getBrandName(), []);
  const savedAssets = useMemo<SavedContentAsset[]>(() => listSavedAssets(), []);

  const [phase, setPhase] = useState<Phase>('select');
  const [reachable, setReachable] = useState<Set<Phase>>(new Set(['select']));

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedAssets = useMemo(
    () => savedAssets.filter((a) => selectedIds.includes(a.id)),
    [savedAssets, selectedIds],
  );

  // Request
  const [request, setRequest] = useState<LaunchRequest>(() => ({
    campaignName: '',
    goal: 'awareness',
    targetDate: defaultTargetDate(),
    frequency: 'every-other-day',
    selectedAssetIds: [],
  }));

  // Plan
  const [plan, setPlan] = useState<LaunchPlan | null>(null);
  const [saved, setSaved] = useState(false);
  const [existingPlans, setExistingPlans] = useState<LaunchPlan[]>(() => listLaunchPlans());
  const [status, setStatus] = useState<PersistenceStatus>({ kind: 'idle' });

  function clearErrorStatus() {
    setStatus((s) => (s.kind === 'error' ? { kind: 'idle' } : s));
  }

  function unlock(...phases: Phase[]) {
    setReachable((prev) => {
      const next = new Set(prev);
      for (const p of phases) next.add(p);
      return next;
    });
  }

  function toggleSelect(id: string) {
    setSelectedIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  function goToRequest() {
    if (!selectedIds.length) return;
    unlock('request');
    setRequest((r) => ({ ...r, selectedAssetIds: selectedIds }));
    setPhase('request');
  }

  function runPlanner() {
    const next = generateLaunchPlan(selectedAssets, request, brandName);
    setPlan(next);
    setSaved(false);
    setStatus({ kind: 'idle' });
    unlock('planner', 'timeline', 'queue');
    setPhase('timeline');
  }

  function handleSavePlan() {
    if (!plan) return;
    const result = saveLaunchPlan(plan);
    // result.plan always carries the same id as the plan we submitted (save
    // only ever updates-in-place or prepends-new by id, it never changes it)
    // -- retaining it here, on both success and failure, means a retry after
    // a failed save resubmits the SAME plan rather than a freshly generated
    // one with a new random id.
    setPlan(result.plan);
    if (result.persisted) {
      setSaved(true);
      setExistingPlans(listLaunchPlans());
      unlock('queue', 'handoff');
      setStatus({ kind: 'success', message: 'Plan saved.' });
    } else {
      setSaved(false);
      setStatus({
        kind: 'error',
        action: 'save',
        message: 'Plan could not be saved. Your changes are not yet persisted.',
      });
    }
  }

  function handleItemStatus(itemId: string, itemStatus: LaunchItemStatus) {
    if (!plan) return;
    const previous = plan;
    const next = { ...plan, items: plan.items.map((it) => (it.id === itemId ? { ...it, status: itemStatus } : it)) };
    setPlan(next);
    if (!saved) return;
    const result = updateItem(plan.id, itemId, { status: itemStatus });
    if (result.persisted) {
      setPlan(result.plan);
      clearErrorStatus();
    } else if (result.plan === null) {
      setPlan(previous);
      setStatus({
        kind: 'error',
        action: 'missing-plan',
        message: 'The saved plan could no longer be found. Reload the view or create a new plan.',
      });
    } else {
      setPlan(previous);
      setStatus({ kind: 'error', action: 'update', message: 'Status update could not be saved.' });
    }
  }

  function handleMove(itemId: string, dir: -1 | 1) {
    if (!plan) return;
    const idx = plan.items.findIndex((it) => it.id === itemId);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= plan.items.length) return;
    const previous = plan;
    const items = [...plan.items];
    [items[idx], items[target]] = [items[target], items[idx]];
    const next = { ...plan, items };
    setPlan(next);
    if (!saved) return;
    const result = reorderItems(plan.id, items.map((it) => it.id));
    if (result.persisted) {
      setPlan(result.plan);
      clearErrorStatus();
    } else if (result.plan === null) {
      setPlan(previous);
      setStatus({
        kind: 'error',
        action: 'missing-plan',
        message: 'The saved plan could no longer be found. Reload the view or create a new plan.',
      });
    } else {
      setPlan(previous);
      setStatus({ kind: 'error', action: 'reorder', message: 'Reorder could not be saved.' });
    }
  }

  function handleDeleteItem(itemId: string) {
    if (!plan) return;
    const previous = plan;
    const items = plan.items.filter((it) => it.id !== itemId);
    const next = { ...plan, items };
    setPlan(next);
    if (!saved) return;
    const result = saveLaunchPlan(next);
    if (result.persisted) {
      setPlan(result.plan);
      clearErrorStatus();
    } else {
      setPlan(previous);
      setStatus({ kind: 'error', action: 'item-delete', message: 'Item could not be deleted.' });
    }
  }

  function handleDeletePlan(id: string) {
    const result = deleteLaunchPlan(id);
    if (result.persisted) {
      // Covers both a genuine deletion and the already-absent no-op case
      // (deleted: false, persisted: true) -- either way the current stored
      // state is what listLaunchPlans() should now reflect.
      setExistingPlans(listLaunchPlans());
      clearErrorStatus();
    } else {
      // deleted: true, persisted: false -- removal was computed but not
      // saved. The plan is still in storage; do not touch existingPlans so
      // it remains visible, matching the real persisted state.
      setStatus({ kind: 'error', action: 'plan-delete', message: 'This plan could not be deleted.' });
    }
  }

  function goTo(p: Phase) {
    if (reachable.has(p)) setPhase(p);
  }

  function hardReset() {
    setSelectedIds([]);
    setPlan(null);
    setSaved(false);
    setReachable(new Set(['select']));
    setPhase('select');
    setStatus({ kind: 'idle' });
  }

  return (
    <div className="flex-1 min-h-0 overflow-auto" style={{ background: '#0E0F14' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <BackLink to="/modules/launchos" label="Back to LaunchOS" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Rocket size={14} style={{ color: ACCENT }} />
            <span style={{
              fontSize: '11px', fontWeight: 700, color: ACCENT,
              textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>
              LaunchOS · Execution Engine
            </span>
          </div>
          <h1 style={{
            fontSize: '36px', fontWeight: 700, color: '#F4F3F8',
            letterSpacing: '-0.02em', marginBottom: '6px',
          }}>
            Plan & execute your launch
          </h1>
          <p style={{ fontSize: '15px', color: '#B4B8C7', maxWidth: '720px', lineHeight: 1.55 }}>
            Select saved Library assets → build a Launch Blueprint → manage the queue. Reuses your Registry, AssetStore and Brand Profile.
          </p>
          {savedAssets.length === 0 && (
            <div
              className="mt-4 p-3 rounded-lg flex items-center gap-3"
              style={{ background: 'rgba(255,191,222,0.06)', border: '1px solid rgba(255,191,222,0.2)' }}
            >
              <TriangleAlert size={16} style={{ color: ACCENT }} />
              <span style={{ fontSize: '13px', color: '#B4B8C7' }}>
                Your Content Library is empty. Generate at least one asset in ContentOS first.{' '}
                <Link to="/modules/contentos/app" style={{ color: ACCENT, fontWeight: 600, textDecoration: 'none' }}>
                  Open ContentOS →
                </Link>
              </span>
            </div>
          )}
        </header>

        {/* Phase Rail */}
        <nav className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {PHASES.map((p) => {
            const active = p.id === phase;
            const reach = reachable.has(p.id);
            const done = isPhaseDone(p.id, {
              hasSelection: selectedIds.length > 0,
              hasPlan: !!plan,
              isSaved: saved,
            });
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

        <StatusBanner status={status} onDismiss={() => setStatus({ kind: 'idle' })} />

        {/* Phase Bodies */}
        {phase === 'select' && (
          <SelectPhase
            assets={savedAssets}
            selectedIds={selectedIds}
            onToggle={toggleSelect}
            onContinue={goToRequest}
            existingPlans={existingPlans}
            onDeletePlan={handleDeletePlan}
          />
        )}

        {phase === 'request' && (
          <RequestPhase
            request={request}
            setRequest={setRequest}
            selectedCount={selectedAssets.length}
            onBack={() => setPhase('select')}
            onContinue={() => { unlock('planner'); setPhase('planner'); }}
          />
        )}

        {phase === 'planner' && (
          <PlannerPhase
            selectedAssets={selectedAssets}
            request={request}
            brandName={brandName}
            existingPlan={plan}
            onGenerate={runPlanner}
            onBack={() => setPhase('request')}
          />
        )}

        {phase === 'timeline' && plan && (
          <TimelinePhase
            plan={plan}
            onContinue={() => setPhase('queue')}
            onBack={() => setPhase('planner')}
          />
        )}

        {phase === 'queue' && plan && (
          <QueuePhase
            plan={plan}
            saved={saved}
            saveFailed={status.kind === 'error' && status.action === 'save'}
            onStatus={handleItemStatus}
            onMove={handleMove}
            onDelete={handleDeleteItem}
            onSave={handleSavePlan}
            onContinue={() => { unlock('handoff'); setPhase('handoff'); }}
            onBack={() => setPhase('timeline')}
          />
        )}

        {phase === 'handoff' && plan && (
          <HandoffPhase plan={plan} onReset={hardReset} />
        )}
      </div>
    </div>
  );
}

function isPhaseDone(p: Phase, ctx: { hasSelection: boolean; hasPlan: boolean; isSaved: boolean }) {
  if (p === 'select')   return ctx.hasSelection;
  if (p === 'request')  return ctx.hasPlan || ctx.hasSelection;
  if (p === 'planner')  return ctx.hasPlan;
  if (p === 'timeline') return ctx.hasPlan;
  if (p === 'queue')    return ctx.isSaved;
  if (p === 'handoff')  return ctx.isSaved;
  return false;
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 1 — Select assets
// ────────────────────────────────────────────────────────────────────────────

function SelectPhase({
  assets, selectedIds, onToggle, onContinue, existingPlans, onDeletePlan,
}: {
  assets: SavedContentAsset[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onContinue: () => void;
  existingPlans: LaunchPlan[];
  onDeletePlan: (id: string) => void;
}) {
  return (
    <section className="space-y-6">
      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Content Library
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginTop: '4px' }}>
              Select one or more saved assets
            </div>
          </div>
          <Link to="/app/content-os/library"
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${CARD_BORDER}`, color: '#B4B8C7', fontSize: '13px' }}>
            <Library size={14} /> Open Library
          </Link>
        </div>

        {assets.length === 0 ? (
          <div className="text-center py-10" style={{ color: '#8B8F9E', fontSize: '14px' }}>
            No saved assets yet. Use ContentOS to generate your first one.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {assets.map((a) => {
              const checked = selectedIds.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => onToggle(a.id)}
                  className="text-left p-4 rounded-[12px] transition-all"
                  style={{
                    background: checked ? `${ACCENT}10` : 'rgba(255,255,255,0.02)',
                    border: checked ? `1px solid ${ACCENT}60` : `1px solid ${CARD_BORDER}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', lineHeight: 1.3 }}>
                      {a.title}
                    </div>
                    {checked
                      ? <CircleCheckBig size={16} style={{ color: ACCENT, flexShrink: 0 }} />
                      : <Circle size={16} style={{ color: '#8B8F9E', flexShrink: 0 }} />}
                  </div>
                  <div style={{ fontSize: '12px', color: '#B4B8C7', lineHeight: 1.5, marginBottom: '10px' }}>
                    {(a.preview || '').slice(0, 130)}{(a.preview || '').length > 130 ? '…' : ''}
                  </div>
                  <div className="flex flex-wrap gap-2" style={{ fontSize: '10px', color: '#8B8F9E' }}>
                    <Tag>{a.platform}</Tag>
                    <Tag>{a.type}</Tag>
                    <Tag>{a.status}</Tag>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <div style={{ fontSize: '13px', color: '#B4B8C7' }}>
            {selectedIds.length} selected
          </div>
          <PrimaryButton onClick={onContinue} disabled={!selectedIds.length}>
            Continue <ArrowRight size={16} />
          </PrimaryButton>
        </div>
      </div>

      {existingPlans.length > 0 && (
        <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            Saved Launch Plans
          </div>
          <div className="space-y-2">
            {existingPlans.map((p) => (
              <div key={p.id}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${CARD_BORDER}` }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{p.campaignName}</div>
                  <div style={{ fontSize: '11px', color: '#8B8F9E' }}>
                    {p.goal} · {p.items.length} items · target {p.targetDate}
                  </div>
                </div>
                <button onClick={() => onDeletePlan(p.id)}
                  className="p-2 rounded-md hover:opacity-100"
                  style={{ color: '#8B8F9E', opacity: 0.7 }} aria-label="Delete plan">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 2 — Request
// ────────────────────────────────────────────────────────────────────────────

function RequestPhase({
  request, setRequest, selectedCount, onBack, onContinue,
}: {
  request: LaunchRequest;
  setRequest: React.Dispatch<React.SetStateAction<LaunchRequest>>;
  selectedCount: number;
  onBack: () => void;
  onContinue: () => void;
}) {
  const canContinue = request.campaignName.trim().length > 0 && request.targetDate.length > 0;
  return (
    <section className="space-y-5">
      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <Label name="Campaign name" hint={`Internal label. ${selectedCount} asset${selectedCount === 1 ? '' : 's'} attached.`} />
        <input
          type="text" value={request.campaignName}
          onChange={(e) => setRequest((r) => ({ ...r, campaignName: e.target.value }))}
          placeholder="e.g. Q1 Authority Sprint" className={inputBase} style={inputStyle}
        />
      </div>

      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <Label name="Launch goal" hint="Defines the supporting steps the planner will add." />
        <div className="grid md:grid-cols-3 gap-2">
          {GOALS.map((g) => (
            <button
              key={g.id}
              onClick={() => setRequest((r) => ({ ...r, goal: g.id }))}
              className="text-left p-3 rounded-lg transition-all"
              style={{
                background: request.goal === g.id ? `${ACCENT}15` : 'rgba(255,255,255,0.03)',
                border: request.goal === g.id ? `1px solid ${ACCENT}60` : `1px solid ${CARD_BORDER}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Target size={14} style={{ color: request.goal === g.id ? ACCENT : '#8B8F9E' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8' }}>{g.label}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#8B8F9E' }}>{g.hint}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <Label name="Target date" hint="Day 0 of the launch sequence." />
          <input
            type="date" value={request.targetDate}
            onChange={(e) => setRequest((r) => ({ ...r, targetDate: e.target.value }))}
            className={inputBase} style={inputStyle}
          />
        </div>
        <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
          <Label name="Publishing frequency" hint="Cadence between primary posts." />
          <div className="grid grid-cols-2 gap-2">
            {FREQUENCIES.map((f) => (
              <Chip key={f.id} active={request.frequency === f.id}
                onClick={() => setRequest((r) => ({ ...r, frequency: f.id }))}>
                {f.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <SecondaryButton onClick={onBack}><ArrowLeft size={16} /> Back</SecondaryButton>
        <PrimaryButton onClick={onContinue} disabled={!canContinue}>
          Continue <ArrowRight size={16} />
        </PrimaryButton>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 3 — Planner
// ────────────────────────────────────────────────────────────────────────────

function PlannerPhase({
  selectedAssets, request, brandName, existingPlan, onGenerate, onBack,
}: {
  selectedAssets: SavedContentAsset[];
  request: LaunchRequest;
  brandName: string;
  existingPlan: LaunchPlan | null;
  onGenerate: () => void;
  onBack: () => void;
}) {
  return (
    <section className="space-y-5">
      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <div className="flex items-center gap-2 mb-3">
          <ListChecks size={16} style={{ color: ACCENT }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>Plan summary</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4" style={{ fontSize: '13px' }}>
          <Summary label="Brand" value={brandName} />
          <Summary label="Campaign" value={request.campaignName || '—'} />
          <Summary label="Goal" value={request.goal} />
          <Summary label="Target date" value={request.targetDate} />
          <Summary label="Frequency" value={request.frequency} />
          <Summary label="Assets" value={`${selectedAssets.length}`} />
        </div>
      </div>

      <div className="flex justify-between">
        <SecondaryButton onClick={onBack}><ArrowLeft size={16} /> Back</SecondaryButton>
        <PrimaryButton onClick={onGenerate}>
          <Sparkles size={16} /> {existingPlan ? 'Regenerate blueprint' : 'Generate blueprint'} <ArrowRight size={16} />
        </PrimaryButton>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 4 — Timeline
// ────────────────────────────────────────────────────────────────────────────

function TimelinePhase({
  plan, onContinue, onBack,
}: {
  plan: LaunchPlan;
  onContinue: () => void;
  onBack: () => void;
}) {
  const byDay = useMemo(() => {
    const groups = new Map<number, LaunchPlanItem[]>();
    for (const it of plan.items) {
      const arr = groups.get(it.dayOffset) ?? [];
      arr.push(it);
      groups.set(it.dayOffset, arr);
    }
    return Array.from(groups.entries()).sort((a, b) => a[0] - b[0]);
  }, [plan]);

  return (
    <section className="space-y-5">
      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Calendar size={16} style={{ color: ACCENT }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>
            {plan.campaignName}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
          {plan.items.length} steps · launches {plan.targetDate} · {plan.frequency} cadence
        </div>
      </div>

      <div className="space-y-4">
        {byDay.map(([day, items]) => (
          <div key={day} className="p-5 rounded-[14px]"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
            <div className="flex items-baseline gap-3 mb-3">
              <div style={{ fontSize: '11px', fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Day {day}
              </div>
              <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
                {resolveDate(plan.targetDate, day)}
              </div>
            </div>
            <div className="space-y-2">
              {items.map((it) => {
                const Icon = KIND_ICON[it.kind];
                return (
                  <div key={it.id} className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${CARD_BORDER}` }}>
                    <div className="flex items-center justify-center"
                      style={{ width: 32, height: 32, borderRadius: 8, background: `${ACCENT}15`, color: ACCENT, flexShrink: 0 }}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8' }}>{it.label}</span>
                        <span style={{ fontSize: '11px', color: '#8B8F9E' }}>· {String(it.hour).padStart(2,'0')}:00</span>
                        <StatusPill status={it.status} />
                      </div>
                      <div style={{ fontSize: '12px', color: '#B4B8C7', marginTop: '4px', lineHeight: 1.5 }}>
                        {it.note}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {plan.recommendations.length > 0 && (
        <div className="p-5 rounded-[14px]"
          style={{ background: 'rgba(255,191,222,0.04)', border: `1px solid ${ACCENT}30` }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Recommendations
          </div>
          <ul className="space-y-1.5" style={{ fontSize: '13px', color: '#F4F3F8', lineHeight: 1.5 }}>
            {plan.recommendations.map((r, i) => <li key={i}>• {r}</li>)}
          </ul>
        </div>
      )}

      <div className="flex justify-between">
        <SecondaryButton onClick={onBack}><ArrowLeft size={16} /> Back</SecondaryButton>
        <PrimaryButton onClick={onContinue}>
          Manage queue <ArrowRight size={16} />
        </PrimaryButton>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 5 — Queue
// ────────────────────────────────────────────────────────────────────────────

function QueuePhase({
  plan, saved, saveFailed, onStatus, onMove, onDelete, onSave, onContinue, onBack,
}: {
  plan: LaunchPlan;
  saved: boolean;
  saveFailed: boolean;
  onStatus: (id: string, s: LaunchItemStatus) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <section className="space-y-5">
      <div className="p-5 rounded-[14px] flex items-center justify-between"
        style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{plan.campaignName}</div>
          <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
            {saved ? 'Saved · changes auto-persist' : 'Draft · save to persist your plan'}
          </div>
        </div>
        <button onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
          style={{
            background: saved ? 'rgba(167,243,208,0.1)' : `${ACCENT}20`,
            border: saved ? '1px solid rgba(167,243,208,0.4)' : `1px solid ${ACCENT}60`,
            color: saved ? '#A7F3D0' : ACCENT, fontSize: '13px', fontWeight: 600,
          }}>
          {saved
            ? <><CircleCheckBig size={14} /> Saved</>
            : <><Save size={14} /> {saveFailed ? 'Retry save' : 'Save plan'}</>}
        </button>
      </div>

      <div className="space-y-2">
        {plan.items.map((it, idx) => {
          const Icon = KIND_ICON[it.kind];
          return (
            <div key={it.id} className="p-4 rounded-[12px]"
              style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <button onClick={() => onMove(it.id, -1)} disabled={idx === 0}
                    className="p-1 rounded" style={{ color: '#8B8F9E', opacity: idx === 0 ? 0.3 : 1 }}>
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => onMove(it.id, 1)} disabled={idx === plan.items.length - 1}
                    className="p-1 rounded" style={{ color: '#8B8F9E', opacity: idx === plan.items.length - 1 ? 0.3 : 1 }}>
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-center"
                  style={{ width: 32, height: 32, borderRadius: 8, background: `${ACCENT}15`, color: ACCENT, flexShrink: 0 }}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8' }}>{it.label}</span>
                    <span style={{ fontSize: '11px', color: '#8B8F9E' }}>
                      Day {it.dayOffset} · {String(it.hour).padStart(2,'0')}:00
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#B4B8C7', lineHeight: 1.5, marginBottom: '8px' }}>
                    {it.note}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {STATUS_ORDER.map((s) => (
                      <button key={s} onClick={() => onStatus(it.id, s)}
                        className="px-2.5 py-1 rounded-md transition-all"
                        style={{
                          fontSize: '11px', fontWeight: 600,
                          background: it.status === s ? `${STATUS_COLOR[s]}20` : 'rgba(255,255,255,0.03)',
                          border: it.status === s ? `1px solid ${STATUS_COLOR[s]}80` : `1px solid ${CARD_BORDER}`,
                          color: it.status === s ? STATUS_COLOR[s] : '#8B8F9E',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => onDelete(it.id)} className="p-2 rounded" style={{ color: '#8B8F9E' }} aria-label="Delete item">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <SecondaryButton onClick={onBack}><ArrowLeft size={16} /> Back</SecondaryButton>
        <PrimaryButton onClick={onContinue} disabled={!saved}>
          Continue <ArrowRight size={16} />
        </PrimaryButton>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 6 — Handoff
// ────────────────────────────────────────────────────────────────────────────

function HandoffPhase({ plan, onReset }: { plan: LaunchPlan; onReset: () => void }) {
  const counts = STATUS_ORDER.map((s) => ({
    s, n: plan.items.filter((it) => it.status === s).length,
  }));
  return (
    <section className="space-y-5">
      <div className="p-6 rounded-[16px] text-center"
        style={{ background: `linear-gradient(135deg, ${ACCENT}10 0%, rgba(218,191,255,0.06) 100%)`, border: `1px solid ${ACCENT}40` }}>
        <CircleCheckBig size={32} style={{ color: ACCENT, margin: '0 auto 12px' }} />
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#F4F3F8', marginBottom: '4px' }}>
          Launch Blueprint saved
        </div>
        <div style={{ fontSize: '13px', color: '#B4B8C7' }}>
          {plan.campaignName} · {plan.items.length} steps · target {plan.targetDate}
        </div>
        <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
          {counts.map(({ s, n }) => (
            <span key={s} className="px-2.5 py-1 rounded-md"
              style={{
                fontSize: '11px', fontWeight: 600,
                background: `${STATUS_COLOR[s]}15`, border: `1px solid ${STATUS_COLOR[s]}40`,
                color: STATUS_COLOR[s], textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
              {n} {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <HandoffCard icon={<Rocket size={16} />} title="Continue to ManagementOS"
          desc="Coming soon — track execution and team handoffs."
          to="/modules" ctaLabel="Open Modules" />
        <HandoffCard icon={<Library size={16} />} title="Back to Library"
          desc="Pick more assets or generate new ones."
          to="/app/content-os/library" ctaLabel="Open Library" />
        <HandoffCard icon={<Plus size={16} />} title="Plan another launch"
          desc="Reset and build a new Launch Blueprint."
          onClick={onReset} ctaLabel="New plan" />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Shared atoms
// ────────────────────────────────────────────────────────────────────────────

function Label({ name, hint }: { name: string; hint?: string }) {
  return (
    <div className="mb-3">
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>{name}</div>
      {hint && <div style={{ fontSize: '12px', color: '#8B8F9E' }}>{hint}</div>}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className="px-3 py-2 rounded-lg transition-all capitalize"
      style={{
        background: active ? `${ACCENT}20` : 'rgba(255,255,255,0.03)',
        border: active ? `1px solid ${ACCENT}60` : `1px solid ${CARD_BORDER}`,
        color: active ? ACCENT : '#B4B8C7',
        fontSize: '13px', fontWeight: 600,
      }}>
      {children}
    </button>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded-md capitalize"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${CARD_BORDER}`,
        color: '#8B8F9E', fontSize: '10px', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: LaunchItemStatus }) {
  const c = STATUS_COLOR[status];
  return (
    <span className="px-2 py-0.5 rounded-md"
      style={{
        background: `${c}15`, border: `1px solid ${c}50`, color: c,
        fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
      {status}
    </span>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '11px', color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '14px', color: '#F4F3F8', fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
      style={{
        background: `linear-gradient(135deg, ${ACCENT} 0%, #DABFFF 100%)`,
        color: '#0E0F14', fontSize: '15px', fontWeight: 600,
        boxShadow: `0 4px 16px ${ACCENT}40`,
        opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
      }}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="px-5 py-3 rounded-lg transition-all flex items-center gap-2"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${CARD_BORDER}`,
        color: '#B4B8C7', fontSize: '14px', fontWeight: 500,
      }}>
      {children}
    </button>
  );
}

function HandoffCard({ icon, title, desc, to, ctaLabel, onClick }: {
  icon: React.ReactNode; title: string; desc: string; to?: string; ctaLabel: string; onClick?: () => void;
}) {
  const inner = (
    <div className="p-5 rounded-[14px] h-full flex flex-col"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div className="flex items-center gap-2 mb-2" style={{ color: ACCENT }}>
        {icon}
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8' }}>{title}</span>
      </div>
      <div style={{ fontSize: '12px', color: '#B4B8C7', lineHeight: 1.5, flex: 1 }}>{desc}</div>
      <div className="mt-3 flex items-center gap-2"
        style={{ color: ACCENT, fontSize: '12px', fontWeight: 600 }}>
        {ctaLabel} <ArrowRight size={12} />
      </div>
    </div>
  );
  if (to) return <Link to={to} className="block">{inner}</Link>;
  return <button onClick={onClick} className="block text-left w-full">{inner}</button>;
}
