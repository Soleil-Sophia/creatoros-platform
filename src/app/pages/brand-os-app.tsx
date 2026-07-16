import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft, ArrowRight, Check, Save, Download, CircleCheckBig, Circle, Sparkles, Copy,
} from 'lucide-react';
import {
  readBrandProfileExtended,
  writeBrandProfileExtended,
  buildAIReadyBrandProfile,
  isPhaseComplete,
  completionPercent,
  type PhaseId,
} from '../lib/brand-profile/extendedStorage';
import {
  emptyBrandProfileExtended,
  type BrandProfileExtended,
} from '../lib/brand-profile/extendedTypes';

// ─── Visual tokens (match existing dark theme) ───────────────────────────────
const ACCENT = '#E7C6F3';
const CARD_BG = '#171923';
const CARD_BORDER = 'rgba(255,255,255,0.08)';
const inputBase = 'w-full px-4 py-3 rounded-lg transition-all focus:outline-none';
const inputStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#F4F3F8',
  fontSize: '15px',
} as const;

const PHASES: { id: PhaseId; number: string; name: string; tagline: string }[] = [
  { id: 'identity', number: '01', name: 'Brand Identity',  tagline: 'Mission · Vision · Positioning' },
  { id: 'audience', number: '02', name: 'Audience',        tagline: 'Pain · Desire · Transformation' },
  { id: 'voice',    number: '03', name: 'Brand Voice',     tagline: 'Style · Tone · Do / Don’t' },
  { id: 'visual',   number: '04', name: 'Visual Identity', tagline: 'Colors · Typography · Mood' },
  { id: 'output',   number: '05', name: 'AI-Ready Profile', tagline: 'Export & hand off to ContentOS' },
];

export function BrandOSAppPage() {
  const [profile, setProfile] = useState<BrandProfileExtended>(emptyBrandProfileExtended);
  const [activePhase, setActivePhase] = useState<PhaseId>('identity');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    const p = readBrandProfileExtended();
    if (p) {
      setProfile(p);
      setSavedAt(p.updatedAt ?? null);
    }
  }, []);

  const pct = useMemo(() => completionPercent(profile), [profile]);

  function save(next: BrandProfileExtended = profile) {
    const written = writeBrandProfileExtended(next);
    setProfile(written);
    setSavedAt(written.updatedAt ?? null);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 1800);
  }

  function patch<K extends keyof BrandProfileExtended>(key: K, value: BrandProfileExtended[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function nextPhase() {
    save();
    const idx = PHASES.findIndex((p) => p.id === activePhase);
    if (idx < PHASES.length - 1) setActivePhase(PHASES[idx + 1].id);
  }
  function prevPhase() {
    const idx = PHASES.findIndex((p) => p.id === activePhase);
    if (idx > 0) setActivePhase(PHASES[idx - 1].id);
  }

  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      {/* Top Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(14,15,20,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 min-w-0">
            <Link
              to="/modules/brandos"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ color: '#B4B8C7', fontSize: '14px', textDecoration: 'none' }}
            >
              <ArrowLeft size={16} /> Back to BrandOS
            </Link>
            <div className="h-6 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <h1 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>
              BrandOS · Setup
            </h1>
            <div
              className="px-2.5 py-1 rounded-md hidden md:inline-flex items-center gap-2"
              style={{
                background: `${ACCENT}14`,
                border: `1px solid ${ACCENT}33`,
                fontSize: '11px',
                fontWeight: 600,
                color: ACCENT,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <Sparkles size={11} /> {pct}% complete
            </div>
          </div>
          <div className="flex items-center gap-3">
            {savedAt && !justSaved && (
              <span style={{ fontSize: '12px', color: '#8B8F9E' }} className="hidden md:inline">
                Saved {new Date(savedAt).toLocaleTimeString()}
              </span>
            )}
            {justSaved && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                style={{
                  background: 'rgba(191,255,222,0.1)',
                  border: '1px solid rgba(191,255,222,0.2)',
                  color: '#BFFFDE',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                <Check size={12} /> Saved
              </span>
            )}
            <button
              onClick={() => save()}
              className="px-4 py-2 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F4F3F8',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              <Save size={16} /> Save
            </button>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-24 px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-8">
          {/* ── Phase Rail ── */}
          <aside className="lg:col-span-3">
            <nav className="lg:sticky lg:top-24 space-y-2">
              {PHASES.map((ph) => {
                const done = isPhaseComplete(profile, ph.id);
                const active = ph.id === activePhase;
                return (
                  <button
                    key={ph.id}
                    onClick={() => setActivePhase(ph.id)}
                    className="w-full text-left p-4 rounded-[14px] transition-all"
                    style={{
                      background: active ? `${ACCENT}10` : CARD_BG,
                      border: active ? `1px solid ${ACCENT}40` : `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span style={{ marginTop: 2 }}>
                        {done ? (
                          <CircleCheckBig size={16} style={{ color: ACCENT }} />
                        ) : (
                          <Circle size={16} style={{ color: '#8B8F9E' }} />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: active ? ACCENT : '#8B8F9E',
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em',
                            }}
                          >
                            Phase {ph.number}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginTop: '2px' }}>
                          {ph.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8B8F9E', marginTop: '2px' }}>
                          {ph.tagline}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* progress */}
              <div className="p-4 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
                <div className="flex items-baseline justify-between mb-2">
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Brand Readiness
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: ACCENT }}>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: ACCENT }} />
                </div>
              </div>
            </nav>
          </aside>

          {/* ── Phase Body ── */}
          <main className="lg:col-span-9">
            <PhaseBody
              phase={activePhase}
              profile={profile}
              setProfile={setProfile}
              patch={patch}
              onSave={() => save()}
            />

            {/* Footer Nav */}
            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={prevPhase}
                disabled={activePhase === 'identity'}
                className="px-5 py-3 rounded-lg transition-all flex items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#B4B8C7',
                  fontSize: '14px',
                  fontWeight: 500,
                  opacity: activePhase === 'identity' ? 0.4 : 1,
                  cursor: activePhase === 'identity' ? 'not-allowed' : 'pointer',
                }}
              >
                <ArrowLeft size={16} /> Previous
              </button>

              {activePhase !== 'output' ? (
                <button
                  onClick={nextPhase}
                  className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #DABFFF 100%)`,
                    color: '#0E0F14',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: `0 4px 16px ${ACCENT}40`,
                  }}
                >
                  Save & Continue <ArrowRight size={16} />
                </button>
              ) : (
                <Link
                  to="/app/content-os/generate"
                  className="px-6 py-3 rounded-lg transition-all hover:opacity-90 inline-flex items-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #DABFFF 100%)`,
                    color: '#0E0F14',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: `0 4px 16px ${ACCENT}40`,
                    textDecoration: 'none',
                  }}
                >
                  Continue to Messaging Framework <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── Phase Body ───────────────────────────────────────────────────────────────

function PhaseBody({
  phase, profile, setProfile, patch, onSave,
}: {
  phase: PhaseId;
  profile: BrandProfileExtended;
  setProfile: React.Dispatch<React.SetStateAction<BrandProfileExtended>>;
  patch: <K extends keyof BrandProfileExtended>(k: K, v: BrandProfileExtended[K]) => void;
  onSave: () => void;
}) {
  const ph = PHASES.find((p) => p.id === phase)!;
  return (
    <section>
      <header className="mb-8">
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: ACCENT,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          Phase {ph.number} of 05
        </span>
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#F4F3F8',
            marginTop: '8px',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          {ph.name}
        </h2>
        <p style={{ fontSize: '16px', color: '#B4B8C7', lineHeight: 1.55, maxWidth: '640px' }}>
          {phaseIntro(phase)}
        </p>
      </header>

      <div className="space-y-5">
        {phase === 'identity' && (
          <>
            <Field
              label="Brand Name"
              hint="The name creators, audience, and platforms will recognize."
              value={profile.brandName}
              onChange={(v) => patch('brandName', v)}
              placeholder="e.g. CreatorOS"
            />
            <Field
              label="Mission"
              hint="The reason your brand exists today, in one sentence."
              value={profile.identity.mission}
              onChange={(v) => setProfile((p) => ({ ...p, identity: { ...p.identity, mission: v } }))}
              placeholder="Help solopreneurs ship content systematically."
              multiline
            />
            <Field
              label="Vision"
              hint="The future state your brand is moving the world toward."
              value={profile.identity.vision}
              onChange={(v) => setProfile((p) => ({ ...p, identity: { ...p.identity, vision: v } }))}
              placeholder="A world where every independent creator runs a content system, not a content hustle."
              multiline
            />
            <Field
              label="Positioning"
              hint="How you sit in the market versus alternatives."
              value={profile.identity.positioning}
              onChange={(v) => setProfile((p) => ({ ...p, identity: { ...p.identity, positioning: v } }))}
              placeholder="For solopreneurs who outgrew ChatGPT — a production system, not a chat."
              multiline
            />
          </>
        )}

        {phase === 'audience' && (
          <>
            <Field
              label="Audience"
              hint="Who you are speaking to. Be specific."
              value={profile.audience.audience}
              onChange={(v) => setProfile((p) => ({ ...p, audience: { ...p.audience, audience: v } }))}
              placeholder="Solopreneurs and creators between 5k–100k followers."
              multiline
            />
            <Field
              label="Pain Points"
              hint="The frustrations they live with today."
              value={profile.audience.painPoints}
              onChange={(v) => setProfile((p) => ({ ...p, audience: { ...p.audience, painPoints: v } }))}
              placeholder="Inconsistent posting, blank-page paralysis, AI output that doesn't sound like them."
              multiline
            />
            <Field
              label="Desired Outcome"
              hint="What success looks like for them."
              value={profile.audience.desiredOutcome}
              onChange={(v) => setProfile((p) => ({ ...p, audience: { ...p.audience, desiredOutcome: v } }))}
              placeholder="A weekly content engine that runs without them holding the prompt."
              multiline
            />
            <Field
              label="Transformation"
              hint="The before → after they live through with you."
              value={profile.audience.transformation}
              onChange={(v) => setProfile((p) => ({ ...p, audience: { ...p.audience, transformation: v } }))}
              placeholder="From scattered ideas to a structured weekly content system."
              multiline
            />
          </>
        )}

        {phase === 'voice' && (
          <>
            <Field
              label="Writing Style"
              hint="A short description of how your brand writes."
              value={profile.voice.writingStyle}
              onChange={(v) => setProfile((p) => ({ ...p, voice: { ...p.voice, writingStyle: v } }))}
              placeholder="Punchy, second-person, structured. Short sentences. No filler."
              multiline
            />
            <div className="grid md:grid-cols-2 gap-5">
              <Field
                label="Tone"
                hint="e.g. Motivational & Direct"
                value={profile.voice.tone}
                onChange={(v) => setProfile((p) => ({ ...p, voice: { ...p.voice, tone: v } }))}
                placeholder="Motivational & Direct"
              />
              <Field
                label="Complexity"
                hint="e.g. Clear & Accessible"
                value={profile.voice.complexity}
                onChange={(v) => setProfile((p) => ({ ...p, voice: { ...p.voice, complexity: v } }))}
                placeholder="Clear & Accessible"
              />
              <Field
                label="Formality"
                hint="e.g. Casual Professional"
                value={profile.voice.formality}
                onChange={(v) => setProfile((p) => ({ ...p, voice: { ...p.voice, formality: v } }))}
                placeholder="Casual Professional"
              />
              <Field
                label="Energy"
                hint="e.g. High Drive"
                value={profile.voice.energy}
                onChange={(v) => setProfile((p) => ({ ...p, voice: { ...p.voice, energy: v } }))}
                placeholder="High Drive"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Field
                label="Do"
                hint="One rule per line. These steer every AI generation."
                value={profile.voice.doList}
                onChange={(v) => setProfile((p) => ({ ...p, voice: { ...p.voice, doList: v } }))}
                placeholder={'Use second-person\nLead with a concrete claim\nKeep sentences under 16 words'}
                multiline
                rows={5}
              />
              <Field
                label="Don't"
                hint="One rule per line. Guardrails the AI must respect."
                value={profile.voice.dontList}
                onChange={(v) => setProfile((p) => ({ ...p, voice: { ...p.voice, dontList: v } }))}
                placeholder={'No corporate jargon\nNo emojis at sentence ends\nNo "unleash your potential"'}
                multiline
                rows={5}
              />
            </div>
          </>
        )}

        {phase === 'visual' && (
          <>
            <div className="grid md:grid-cols-3 gap-5">
              <ColorField
                label="Primary"
                value={profile.visual.colorPrimary}
                onChange={(v) => setProfile((p) => ({ ...p, visual: { ...p.visual, colorPrimary: v } }))}
              />
              <ColorField
                label="Accent"
                value={profile.visual.colorAccent}
                onChange={(v) => setProfile((p) => ({ ...p, visual: { ...p.visual, colorAccent: v } }))}
              />
              <ColorField
                label="Background"
                value={profile.visual.colorBackground}
                onChange={(v) => setProfile((p) => ({ ...p, visual: { ...p.visual, colorBackground: v } }))}
              />
            </div>
            <Field
              label="Heading Typography"
              hint="Font family for headlines."
              value={profile.visual.typographyHeading}
              onChange={(v) => setProfile((p) => ({ ...p, visual: { ...p.visual, typographyHeading: v } }))}
              placeholder="e.g. Söhne, Geist, Space Grotesk"
            />
            <Field
              label="Body Typography"
              hint="Font family for body text."
              value={profile.visual.typographyBody}
              onChange={(v) => setProfile((p) => ({ ...p, visual: { ...p.visual, typographyBody: v } }))}
              placeholder="e.g. Inter, IBM Plex Sans"
            />
            <Field
              label="Mood"
              hint="3–5 mood words. These guide visual generation downstream."
              value={profile.visual.mood}
              onChange={(v) => setProfile((p) => ({ ...p, visual: { ...p.visual, mood: v } }))}
              placeholder="Editorial · Quiet · Confident · Precise"
              multiline
            />
          </>
        )}

        {phase === 'output' && <OutputPhase profile={profile} onSave={onSave} />}
      </div>
    </section>
  );
}

function phaseIntro(p: PhaseId): string {
  switch (p) {
    case 'identity': return 'Lock in what your brand stands for. This becomes the strategic anchor every other module inherits from.';
    case 'audience': return 'Define who you serve and the transformation you deliver. This shapes every hook, script, and CTA downstream.';
    case 'voice':    return 'Set the rules the AI must follow when it writes as you. Tone, complexity, and explicit do / don’t lists.';
    case 'visual':   return 'Capture the visual system — color, typography, mood. Used by ContentOS and LaunchOS when they render assets.';
    case 'output':   return 'Your AI-Ready Brand Profile. Copy it, download it, or hand it off to ContentOS.';
  }
}

// ─── Reusable inputs ──────────────────────────────────────────────────────────

function Field({
  label, hint, value, onChange, placeholder, multiline, rows = 3,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div className="mb-3">
        <div style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>{label}</div>
        {hint && <div style={{ fontSize: '13px', color: '#8B8F9E', marginTop: '4px' }}>{hint}</div>}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={inputBase}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.55 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputBase}
          style={inputStyle}
        />
      )}
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="p-5 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', marginBottom: '10px' }}>{label}</div>
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg flex-shrink-0"
          style={{ background: value, border: '1px solid rgba(255,255,255,0.1)' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md font-mono"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F4F3F8',
            fontSize: '13px',
          }}
        />
      </div>
    </div>
  );
}

// ─── Output Phase ─────────────────────────────────────────────────────────────

function OutputPhase({ profile, onSave }: { profile: BrandProfileExtended; onSave: () => void }) {
  const aiReady = useMemo(() => buildAIReadyBrandProfile(profile), [profile]);
  const json = useMemo(() => JSON.stringify(aiReady, null, 2), [aiReady]);
  const [copied, setCopied] = useState(false);

  const phasesDone = (['identity', 'audience', 'voice', 'visual'] as PhaseId[])
    .filter((p) => isPhaseComplete(profile, p));
  const allDone = phasesDone.length === 4;

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable (non-secure context or permission denied) */ }
  }

  function downloadJson() {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(profile.brandName || 'brand-profile').replace(/\s+/g, '-').toLowerCase()}.brandprofile.v1.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div
        className="p-6 rounded-[16px] flex items-start gap-4"
        style={{
          background: allDone ? `${ACCENT}10` : 'rgba(255,191,222,0.06)',
          border: `1px solid ${allDone ? `${ACCENT}30` : 'rgba(255,191,222,0.2)'}`,
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: allDone ? ACCENT : 'rgba(255,191,222,0.2)' }}
        >
          {allDone
            ? <Check size={18} style={{ color: '#0E0F14' }} />
            : <Sparkles size={18} style={{ color: '#FFBFDE' }} />}
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>
            {allDone ? 'Brand Profile Ready' : `${phasesDone.length} of 4 phases complete`}
          </div>
          <p style={{ fontSize: '14px', color: '#B4B8C7', marginTop: '4px', lineHeight: 1.55 }}>
            {allDone
              ? 'Your AI-Ready Brand Profile is locked. ContentOS, LaunchOS, and downstream modules will inherit it automatically.'
              : 'Fill out the remaining phases for a full brand handoff. Partial profiles are saved and reusable.'}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <SummaryCard label="Brand" lines={[
          profile.brandName || '—',
          profile.identity.positioning || 'Positioning not set',
        ]} />
        <SummaryCard label="Audience" lines={[
          profile.audience.audience || 'Audience not set',
          profile.audience.transformation || 'Transformation not set',
        ]} />
        <SummaryCard label="Voice" lines={[
          [profile.voice.tone, profile.voice.formality].filter(Boolean).join(' · ') || 'Voice not set',
          profile.voice.writingStyle || 'Writing style not set',
        ]} />
        <SummaryCard label="Visual" lines={[
          [profile.visual.typographyHeading, profile.visual.typographyBody].filter(Boolean).join(' / ') || 'Typography not set',
          profile.visual.mood || 'Mood not set',
        ]} swatches={[profile.visual.colorPrimary, profile.visual.colorAccent, profile.visual.colorBackground]} />
      </div>

      {/* JSON preview */}
      <div className="p-6 rounded-[16px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>AI-Ready Brand Profile</div>
            <div style={{ fontSize: '12px', color: '#8B8F9E', marginTop: '2px' }}>
              schema: <span className="font-mono">creatoros.brandprofile.v1</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyJson}
              className="px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all hover:opacity-90"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F4F3F8',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy JSON'}
            </button>
            <button
              onClick={downloadJson}
              className="px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all hover:opacity-90"
              style={{
                background: `${ACCENT}18`,
                border: `1px solid ${ACCENT}33`,
                color: ACCENT,
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <Download size={12} /> Download
            </button>
            <button
              onClick={onSave}
              className="px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all hover:opacity-90"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F4F3F8',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <Save size={12} /> Save
            </button>
          </div>
        </div>
        <pre
          className="overflow-auto rounded-md p-4 font-mono"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#D6D9E6',
            fontSize: '12px',
            lineHeight: 1.55,
            maxHeight: '420px',
          }}
        >
          {json}
        </pre>
      </div>
    </div>
  );
}

function SummaryCard({
  label, lines, swatches,
}: { label: string; lines: string[]; swatches?: string[] }) {
  return (
    <div className="p-5 rounded-[14px]" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#8B8F9E',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '10px',
        }}
      >
        {label}
      </div>
      <div className="space-y-1.5">
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: '14px', color: i === 0 ? '#F4F3F8' : '#B4B8C7', lineHeight: 1.5 }}>
            {l}
          </div>
        ))}
      </div>
      {swatches && (
        <div className="flex gap-2 mt-4">
          {swatches.map((c, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-md"
              style={{ background: c, border: '1px solid rgba(255,255,255,0.1)' }}
              title={c}
            />
          ))}
        </div>
      )}
    </div>
  );
}
