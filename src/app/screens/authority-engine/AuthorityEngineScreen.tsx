import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import type {
  AuthorityRun,
  PositioningInput,
  SourcePack,
} from '../../types/authority';
import {
  analyzeSource,
  buildCalendarEntries,
  generateAssets,
  newRunId,
} from '../../lib/authority-engine/authorityEngine';
import { evaluateQualityGate } from '../../lib/authority-engine/validators';
import {
  deleteRun as storageDeleteRun,
  getRun as storageGetRun,
  listRuns,
  saveRun as storageSaveRun,
} from '../../lib/authority-engine/storage';
import { exampleAuthoritySources } from '../../data/exampleAuthoritySources';
import { defaultAuthorityVoiceProfile } from '../../data/defaultAuthorityVoiceProfile';
import { PageHeader, Badge, HelperNote } from '../../components/shared';
import { SourceIntakePanel } from './components/SourceIntakePanel';
import { PositioningPanel } from './components/PositioningPanel';
import { AnalysisPanel } from './components/AnalysisPanel';
import { AssetsPanel } from './components/AssetsPanel';
import { QualityGatePanel } from './components/QualityGatePanel';
import { CalendarEntriesPanel } from './components/CalendarEntriesPanel';
import { ExportPanel } from './components/ExportPanel';
import { RunHistoryPanel } from './components/RunHistoryPanel';

const EMPTY_SOURCE: SourcePack = { title: '', sourceType: 'engineering_blog', body: '', url: '' };

type Step = 1 | 2 | 3 | 4 | 5;

function deriveStep(run: AuthorityRun): Step {
  if (run.assets.length > 0) return 5;
  if (run.analysis) return 4;
  if (run.source.body.trim().length > 50) return 3;
  if (run.positioning.audience.trim() && run.positioning.contentGoals.length > 0) return 2;
  return 1;
}

const STEP_LABELS: Record<Step, string> = {
  1: 'Source',
  2: 'Positioning',
  3: 'Analyze',
  4: 'Generate',
  5: 'Export',
};

function makeBlankRun(): AuthorityRun {
  const now = new Date().toISOString();
  return {
    id: newRunId(),
    createdAt: now,
    updatedAt: now,
    source: { ...EMPTY_SOURCE },
    positioning: { ...defaultAuthorityVoiceProfile, contentGoals: [...defaultAuthorityVoiceProfile.contentGoals], platforms: [...defaultAuthorityVoiceProfile.platforms] },
    analysis: null,
    assets: [],
    qualityGate: null,
    calendar: [],
  };
}

export function AuthorityEngineScreen() {
  const [run, setRun] = useState<AuthorityRun>(() => makeBlankRun());
  const [runs, setRuns] = useState<AuthorityRun[]>([]);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Load saved runs once on mount
  useEffect(() => {
    setRuns(listRuns());
  }, []);

  const step = useMemo(() => deriveStep(run), [run]);

  const updateSource = (source: SourcePack) =>
    setRun((r) => ({ ...r, source, updatedAt: new Date().toISOString() }));

  const updatePositioning = (positioning: PositioningInput) =>
    setRun((r) => ({ ...r, positioning, updatedAt: new Date().toISOString() }));

  const handleLoadExample = () => {
    const example = exampleAuthoritySources[0];
    setRun((r) => ({
      ...r,
      source: { ...example },
      positioning: { ...defaultAuthorityVoiceProfile, contentGoals: [...defaultAuthorityVoiceProfile.contentGoals], platforms: [...defaultAuthorityVoiceProfile.platforms] },
      analysis: null,
      assets: [],
      qualityGate: null,
      calendar: [],
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleAnalyze = () => {
    if (!run.source.body.trim()) return;
    setAnalyzing(true);
    // simulate small async beat so user sees state change
    setTimeout(() => {
      const analysis = analyzeSource(run.source, run.positioning);
      setRun((r) => ({
        ...r,
        analysis,
        assets: [],
        qualityGate: null,
        calendar: [],
        updatedAt: new Date().toISOString(),
      }));
      setAnalyzing(false);
    }, 250);
  };

  const handleGenerate = () => {
    if (!run.analysis || run.positioning.contentGoals.length === 0) return;
    const assets = generateAssets(run.analysis, run.positioning);
    const qualityGate = evaluateQualityGate(assets, run.analysis, run.positioning);
    const calendar = buildCalendarEntries(assets, run.positioning);
    setRun((r) => ({
      ...r,
      assets,
      qualityGate,
      calendar,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    const saved = storageSaveRun(run);
    setRun(saved);
    setRuns(listRuns());
    setSavedId(saved.id);
  };

  const handleOpen = (id: string) => {
    const loaded = storageGetRun(id);
    if (!loaded) return;
    setRun(loaded);
    setSavedId(loaded.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    storageDeleteRun(id);
    setRuns(listRuns());
    if (savedId === id) setSavedId(null);
  };

  const handleNewRun = () => {
    setRun(makeBlankRun());
    setSavedId(null);
  };

  const canAnalyze = run.source.body.trim().length > 50;
  const canGenerate = !!run.analysis && run.positioning.contentGoals.length > 0;

  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      {/* Topbar */}
      <div
        className="px-6 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-xs"
            style={{ color: '#8B8F9E' }}
          >
            ← Dashboard
          </Link>
          <span style={{ color: '#3A3D4A' }}>/</span>
          <span className="text-xs uppercase tracking-wider" style={{ color: '#DABFFF' }}>
            Labs
          </span>
          <span style={{ color: '#3A3D4A' }}>/</span>
          <span className="text-xs" style={{ color: '#F4F3F8' }}>
            Authority Engine
          </span>
          <Badge variant="purple" size="sm">
            Experimental
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs hidden md:flex items-center gap-1.5" style={{ color: '#8B8F9E' }}>
            {(['1', '2', '3', '4', '5'] as const).map((s) => {
              const sNum = Number(s) as Step;
              const active = sNum === step;
              const done = sNum < step;
              return (
                <span
                  key={s}
                  className="px-2 py-1 rounded"
                  style={{
                    background: active
                      ? 'rgba(218, 191, 255, 0.18)'
                      : done
                        ? 'rgba(120, 230, 180, 0.08)'
                        : 'rgba(255, 255, 255, 0.04)',
                    color: active ? '#DABFFF' : done ? '#78E6B4' : '#8B8F9E',
                    border: active
                      ? '1px solid rgba(218, 191, 255, 0.35)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: 11,
                  }}
                >
                  {s}. {STEP_LABELS[sNum]}
                </span>
              );
            })}
          </div>
          <button
            type="button"
            onClick={handleNewRun}
            className="text-xs px-3 py-1.5 rounded-md transition-colors"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#B4B8C7',
            }}
          >
            New run
          </button>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto p-6">
        <PageHeader
          title="Tech Docs → Authority Content Engine"
          description="Turn technical documentation into structured authority content. Source → System Insight → Angle → Asset → Calendar → Learning Loop."
          badge="Authority Engine"
        />

        <div className="mb-6">
          <HelperNote>
            <span style={{ color: '#DABFFF', fontWeight: 600 }}>Labs · Experimental.</span> This
            is an isolated internal module. No backend, no live AI calls, no publishing — runs
            entirely in your browser and saves to local storage. Not part of the core CreatorOS
            workflow.
          </HelperNote>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6 min-w-0">
            <SourceIntakePanel
              source={run.source}
              onChange={updateSource}
              onLoadExample={handleLoadExample}
              onAnalyze={handleAnalyze}
              canAnalyze={canAnalyze}
              analyzing={analyzing}
            />
            <PositioningPanel value={run.positioning} onChange={updatePositioning} />
            <AnalysisPanel
              analysis={run.analysis}
              onGenerate={handleGenerate}
              canGenerate={canGenerate}
            />
            <AssetsPanel assets={run.assets} />
            <QualityGatePanel gate={run.qualityGate} />
            <CalendarEntriesPanel entries={run.calendar} />
            <ExportPanel run={run} onSave={handleSave} saved={savedId === run.id} />
          </div>

          <div className="space-y-6">
            <RunHistoryPanel
              runs={runs}
              currentRunId={savedId}
              onOpen={handleOpen}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorityEngineScreen;
