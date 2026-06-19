import { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { Link } from 'react-router';
import { ArrowRight, Lock, CheckCircle2, Clock } from 'lucide-react';
import {
  readBrandProfile,
  createVoiceLabel,
  getBrandProfileStatus,
} from '../lib/brand-profile/storage';
import {
  getBrandOSReadinessStatus,
} from '../lib/brand-profile/service';
import type { BrandOSReadinessStatus } from '../lib/brand-profile/types';
import { listSavedAssets } from '../lib/content-library/storage';
import { listRuns } from '../lib/authority-engine/storage';

type LocalSystemState = {
  brandStatus: 'not_started' | 'in_progress' | 'complete';
  brandConnected: boolean;
  brandReadinessStatus: BrandOSReadinessStatus;
  brandVoiceLabel: string | null;
  brandUpdatedAt: string | null;
  savedAssetCount: number;
  latestAsset: { title: string; createdAt: string } | null;
  authorityRunCount: number;
  latestRun: { title: string; updatedAt: string } | null;
};

function readLocalSystemState(): LocalSystemState {
  const profile = readBrandProfile();
  const brandStatus = getBrandProfileStatus(profile);
  const connected = brandStatus === 'complete';
  const assets = listSavedAssets();
  const sortedAssets = [...assets].sort((a, b) =>
    (a.createdAt ?? '') < (b.createdAt ?? '') ? 1 : -1
  );
  const runs = listRuns();
  return {
    brandStatus,
    brandVoiceLabel: connected && profile ? profile.voiceLabel ?? createVoiceLabel(profile) : null,
    brandUpdatedAt: profile?.updatedAt ?? null,
    savedAssetCount: assets.length,
    latestAsset: sortedAssets[0]
      ? { title: sortedAssets[0].title, createdAt: sortedAssets[0].createdAt }
      : null,
    authorityRunCount: runs.length,
    latestRun: runs[0]
      ? { title: runs[0].source?.title ?? 'Untitled run', updatedAt: runs[0].updatedAt }
      : null,
  };
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

const coreWorkflow = [
  {
    id: '01',
    name: 'Brand OS',
    tagline: 'Voice & Identity Foundation',
    description: 'The strategic foundation of your workflow — defines identity, voice & messaging before content, launches, and execution.',
    status: 'active',
    completed: false,
    accent: '#E7C6F3',
    route: '/modules/brand-os',
    appRoute: '/app/brand-os/setup',
  },
  {
    id: '02',
    name: 'Content OS',
    tagline: 'Structured Content Generation',
    description: 'Turn ideas into structured content assets across platforms.',
    status: 'active',
    completed: false,
    accent: '#FFBFDE',
    route: '/modules/content-os',
    appRoute: '/app/content-os/generate',
  },
  {
    id: '03',
    name: 'Launch OS',
    tagline: 'Rollout & Coordination',
    description: 'Structure launches, coordinate rollouts, and orchestrate content phases.',
    status: 'coming-soon',
    progress: 0,
    completed: false,
    accent: '#DABFFF',
    route: '/modules/launch-os',
    appRoute: null,
  },
  {
    id: '04',
    name: 'Management OS',
    tagline: 'Scheduling & Execution',
    description: 'Schedule content, manage publishing queue, and execute multi-platform posting.',
    status: 'coming-soon',
    completed: false,
    accent: '#C4B5FD',
    route: '/modules/management-os',
    appRoute: null,
  },
  {
    id: '05',
    name: 'Analytics OS',
    tagline: 'Performance Intelligence',
    description: 'Track content performance and get AI-powered insights.',
    status: 'coming-soon',
    completed: false,
    accent: '#B8A3FF',
    route: '/modules/analytics-os',
    appRoute: null,
  }
];

const addOnModules = [
  {
    name: 'Community OS',
    tagline: 'Audience Relationship Management',
    status: 'planned',
    accent: '#E7C6F3',
  },
  {
    name: 'Research OS',
    tagline: 'Audience & Market Intelligence',
    status: 'planned',
    accent: '#DABFFF',
  }
];

export function DashboardPage() {
  const [state, setState] = useState<LocalSystemState>(() => ({
    brandStatus: 'not_started',
    brandVoiceLabel: null,
    brandUpdatedAt: null,
    savedAssetCount: 0,
    latestAsset: null,
    authorityRunCount: 0,
    latestRun: null,
  }));

  // Read once on mount (and again on window focus so a tab change in
  // another module is reflected when the user comes back).
  useEffect(() => {
    const refresh = () => setState(readLocalSystemState());
    refresh();
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 
                style={{ 
                  fontSize: '42px', 
                  fontWeight: 700, 
                  color: '#F4F3F8',
                  marginBottom: '12px',
                  letterSpacing: '-0.03em'
                }}
              >
                Your Creator System
              </h1>
              <p style={{ fontSize: '18px', color: '#B4B8C7' }}>
                Build your workflow step by step. Start with the core, add what you need.
              </p>
            </div>
            
            <Link
              to="/modules"
              className="px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#F4F3F8',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Browse All Modules
            </Link>
          </div>
        </div>
      </section>

      {/* Local System State — real localStorage-backed status */}
      <section className="pb-12 px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>
              Local System State
            </h2>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#8B8F9E',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              This browser · Local only
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Brand Profile */}
            <div
              className="p-5 rounded-[14px]"
              style={{
                background: '#171923',
                border: `1px solid ${
                  state.brandStatus === 'complete'
                    ? 'rgba(231, 198, 243, 0.25)'
                    : state.brandStatus === 'in_progress'
                    ? 'rgba(255, 191, 222, 0.18)'
                    : 'rgba(255, 255, 255, 0.06)'
                }`,
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Brand Profile
              </div>
              <div className="flex items-center gap-2 mb-1">
                {state.brandStatus === 'complete' ? (
                  <>
                    <CheckCircle2 size={14} style={{ color: '#E7C6F3' }} />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>Complete</span>
                  </>
                ) : state.brandStatus === 'in_progress' ? (
                  <>
                    <Clock size={14} style={{ color: '#FFBFDE' }} />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>In Progress</span>
                {state.brandReadinessStatus === 'complete' && (
                  <>
                    <CheckCircle2 size={14} style={{ color: '#BFFFDE' }} />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>Complete</span>
                  </>
                )}
                {state.brandReadinessStatus === 'in_progress' && (
                  <>
                    <Clock size={14} style={{ color: '#E7C6F3' }} />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>In Progress</span>
                  </>
                )}
                {state.brandReadinessStatus === 'not_started' && (
                  <>
                    <Lock size={14} style={{ color: '#8B8F9E' }} />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#B4B8C7' }}>Not Started</span>
                  </>
                )}
              </div>
              {state.brandStatus === 'complete' ? (
                <>
                  <div style={{ fontSize: '13px', color: '#B4B8C7' }}>
                    Voice: <span style={{ color: '#F4F3F8', fontWeight: 500 }}>{state.brandVoiceLabel || '—'}</span>
                  </div>
                  {state.brandUpdatedAt && (
                    <div style={{ fontSize: '12px', color: '#8B8F9E', marginTop: '4px' }}>
                      Updated {formatDate(state.brandUpdatedAt)}
                    </div>
                  )}
                </>
              ) : state.brandStatus === 'in_progress' ? (
                <>
                  <div style={{ fontSize: '13px', color: '#B4B8C7' }}>
                    Your Brand Profile is incomplete. Content will still generate, but it may not fully reflect your brand voice.
                  </div>
                  {state.brandUpdatedAt && (
                    <div style={{ fontSize: '12px', color: '#8B8F9E', marginTop: '4px' }}>
                      Updated {formatDate(state.brandUpdatedAt)}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ fontSize: '13px', color: '#8B8F9E' }}>
                  Complete BrandOS to unlock brand-aware content generation.
                </div>
              )}
            </div>

            {/* Saved Assets */}
            <div
              className="p-5 rounded-[14px]"
              style={{ background: '#171923', border: '1px solid rgba(255, 255, 255, 0.06)' }}
            >
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Saved Content Assets
              </div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#F4F3F8', lineHeight: 1, marginBottom: '6px' }}>
                {state.savedAssetCount}
              </div>
              {state.latestAsset ? (
                <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
                  Latest:{' '}
                  <span style={{ color: '#B4B8C7' }}>{state.latestAsset.title}</span>
                  {formatDate(state.latestAsset.createdAt) && (
                    <> · {formatDate(state.latestAsset.createdAt)}</>
                  )}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
                  No assets saved yet.
                </div>
              )}
            </div>

            {/* Authority Runs */}
            <div
              className="p-5 rounded-[14px]"
              style={{ background: '#171923', border: '1px solid rgba(218, 191, 255, 0.18)' }}
            >
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Authority Engine Runs
              </div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#F4F3F8', lineHeight: 1, marginBottom: '6px' }}>
                {state.authorityRunCount}
              </div>
              {state.latestRun ? (
                <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
                  Latest:{' '}
                  <span style={{ color: '#B4B8C7' }}>{state.latestRun.title}</span>
                  {formatDate(state.latestRun.updatedAt) && (
                    <> · {formatDate(state.latestRun.updatedAt)}</>
                  )}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
                  No runs captured yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflow */}
      <section className="pb-12 px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 
              style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                color: '#F4F3F8',
                marginBottom: '8px'
              }}
            >
              Core Workflow
            </h2>
            <p style={{ fontSize: '15px', color: '#8B8F9E' }}>
              The recommended path. Each module is standalone, but strongest together.
            </p>
          </div>

          {/* Workflow Steps with Connectors */}
          <div className="space-y-6">
            {coreWorkflow.map((module, idx) => (
              <div key={module.id} className="relative">
                {/* Module Card */}
                <div
                  className="group relative"
                  style={{
                    opacity: module.status === 'planned' ? 0.5 : 1
                  }}
                >
                  <div
                    className="p-6 rounded-[16px] transition-all duration-300"
                    style={{
                      background: module.status === 'active' 
                        ? `linear-gradient(135deg, ${module.accent}08 0%, ${module.accent}04 100%)`
                        : '#171923',
                      border: module.status === 'active'
                        ? `1px solid ${module.accent}30`
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: module.status === 'active'
                        ? `0 4px 16px ${module.accent}10`
                        : 'none'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {/* Left: Info */}
                      <div className="flex items-center gap-6 flex-1">
                        {/* Step Number */}
                        <div 
                          className="w-14 h-14 rounded-[12px] flex items-center justify-center flex-shrink-0"
                          style={{ 
                            background: module.status === 'active'
                              ? `linear-gradient(135deg, ${module.accent}, ${module.accent}CC)`
                              : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${module.status === 'active' ? module.accent : 'rgba(255, 255, 255, 0.1)'}`,
                            boxShadow: module.status === 'active' ? `0 4px 12px ${module.accent}30` : 'none'
                          }}
                        >
                          <span 
                            style={{ 
                              fontSize: '20px', 
                              fontWeight: 700, 
                              color: module.status === 'active' ? '#0E0F14' : '#8B8F9E'
                            }}
                          >
                            {module.id}
                          </span>
                        </div>

                        {/* Module Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#F4F3F8' }}>
                              {module.name}
                            </h3>
                            
                            {/* Status Badge */}
                            <div
                              className="px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                              style={{
                                background: module.status === 'active'
                                  ? `${module.accent}20`
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: module.status === 'active'
                                  ? `1px solid ${module.accent}30`
                                  : '1px solid rgba(255, 255, 255, 0.1)',
                                fontSize: '11px',
                                fontWeight: 600,
                                color: module.status === 'active' ? module.accent : '#8B8F9E',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em'
                              }}
                            >
                              {module.status === 'active' && (
                                <>
                                  <CheckCircle2 size={12} />
                                  Active
                                </>
                              )}
                              {module.status === 'coming-soon' && (
                                <>
                                  <Clock size={12} />
                                  Coming Soon
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div style={{ fontSize: '13px', color: '#8B8F9E', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                            {module.tagline}
                          </div>
                          <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.5 }}>
                            {module.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-3 ml-6">
                        {module.status === 'active' && (
                          <>
                            <Link
                              to={module.route}
                              className="px-4 py-2 rounded-lg transition-all hover:opacity-90"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid ${module.accent}30`,
                                color: module.accent,
                                fontSize: '13px',
                                fontWeight: 600,
                                textDecoration: 'none'
                              }}
                            >
                              Learn More
                            </Link>
                            
                            {module.appRoute && (
                              <Link
                                to={module.appRoute}
                                className="px-4 py-2 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
                                style={{
                                  background: `linear-gradient(135deg, ${module.accent}, ${module.accent}CC)`,
                                  color: '#0E0F14',
                                  fontSize: '13px',
                                  fontWeight: 600,
                                  boxShadow: `0 4px 12px ${module.accent}25`,
                                  textDecoration: 'none'
                                }}
                              >
                                Launch
                                <ArrowRight size={14} />
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Arrow */}
                {idx < coreWorkflow.length - 1 && (
                  <div className="flex justify-center py-3">
                    <div
                      className="w-px h-8"
                      style={{
                        background: 'linear-gradient(180deg, rgba(231, 198, 243, 0.3) 0%, rgba(231, 198, 243, 0.1) 100%)'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Modules */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 
              style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                color: '#F4F3F8',
                marginBottom: '8px'
              }}
            >
              Add-on Modules
            </h2>
            <p style={{ fontSize: '15px', color: '#8B8F9E' }}>
              Optional extensions. Not part of the core flow, but equally valuable when you need them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addOnModules.map((module, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[16px]"
                style={{
                  background: '#171923',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  opacity: 0.6
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
                      {module.name}
                    </h3>
                    <div style={{ fontSize: '13px', color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                      {module.tagline}
                    </div>
                  </div>
                  
                  <div
                    className="px-2.5 py-1 rounded-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#8B8F9E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    Planned
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/modules"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#F4F3F8',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              View All Modules
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Subtle internal Labs link — not a core module */}
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#8B8F9E',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '4px'
                  }}
                >
                  Internal · Labs
                </div>
                <p style={{ fontSize: '13px', color: '#8B8F9E' }}>
                  Experimental modules — isolated from the core workflow.
                </p>
              </div>
              <Link
                to="/app/labs/authority-engine"
                className="text-xs px-3 py-1.5 rounded-md transition-colors"
                style={{
                  background: 'rgba(218, 191, 255, 0.08)',
                  border: '1px solid rgba(218, 191, 255, 0.2)',
                  color: '#DABFFF',
                  textDecoration: 'none'
                }}
              >
                Authority Engine →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}