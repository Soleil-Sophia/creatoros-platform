import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Topbar } from '../components/generate/Topbar';
import { ReuseBanner } from '../components/generate/ReuseBanner';
import { InputPanel } from '../components/generate/InputPanel';
import { OutputWorkspaceHeader } from '../components/generate/OutputWorkspaceHeader';
import { AssetCard } from '../components/generate/AssetCard';
import { BrandVoiceChip } from '../components/shared';
import {
  readBrandProfile,
  createVoiceLabel,
  getBrandProfileStatus,
} from '../lib/brand-profile/storage';
import {
  getBrandOSReadinessStatus,
} from '../lib/brand-profile/service';
import { OUTPUT_TYPES } from '../../data/contentos';
import { saveAsset } from '../lib/content-library/storage';
import type { BrandVoiceSnapshot, SavedContentAsset } from '../lib/content-library/types';
import type { BrandOSReadinessStatus } from '../lib/brand-profile/types';
import { generateContent, isConnectorConfigured } from '../lib/ai-connector/service';
import type { GenerateContentResult } from '../lib/ai-connector/types';
import { addGenerationHistoryEntry } from '../lib/ai-connector/history';

type SavedInputs = {
  offer: string;
  audience: string;
  goal: string;
  tone: string;
  outputType: string;
};

type ReuseAsset = {
  id: number | string;
  type: string;
  title: string;
  preview: string;
  platform: string;
  campaign: string;
  brandVoice: string;
  date: string;
  variants: number;
  status: string;
  source?: 'generated';
  inputs?: SavedInputs;
  outputType?: string;
};

export function GenerateScreen({ showTopbar = true }: { showTopbar?: boolean } = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract reused asset from location state
  const reuseAsset = location.state?.reuseAsset as ReuseAsset | undefined;

  // Detect a full saved-input restoration (saved-asset reuse with inputs blob).
  const restoredInputs: SavedInputs | undefined =
    reuseAsset?.source === 'generated' && reuseAsset.inputs ? reuseAsset.inputs : undefined;

  // Smart prefill for assets WITHOUT a saved inputs blob (mocks / legacy saves).
  const getInitialOfferValue = () => {
    if (!reuseAsset) return '';

    // Plan → extract core concept (first sentence)
    if (reuseAsset.type === 'plan') {
      const firstSentence = reuseAsset.preview.split('.')[0];
      return firstSentence ? firstSentence + '.' : reuseAsset.preview;
    }

    // All other types → use full preview
    return reuseAsset.preview;
  };

  // Form state — when a full inputs blob is restored, every field comes from it.
  // Otherwise we fall back to the existing partial-prefill behavior (offer + platform).
  const [offer, setOffer] = useState(restoredInputs?.offer ?? getInitialOfferValue());
  const [audience, setAudience] = useState(restoredInputs?.audience ?? '');
  const [platform, setPlatform] = useState(reuseAsset?.platform || 'LinkedIn');
  const [goal, setGoal] = useState(restoredInputs?.goal ?? '');
  const [tone, setTone] = useState(restoredInputs?.tone || 'Conversational');
  const [outputType, setOutputType] = useState(
    restoredInputs?.outputType || reuseAsset?.outputType || 'hook-pack'
  );

  // Brand profile (read-only handoff from BrandOS)
  const [brandProfile, setBrandProfile] = useState(() => readBrandProfile());
  const [brandVoiceLabel, setBrandVoiceLabel] = useState<string | null>(null);
  const [brandReadinessStatus, setBrandReadinessStatus] = useState<BrandOSReadinessStatus>('not_started');

  const brandProfileStatus = getBrandProfileStatus(brandProfile);

  const syncBrandReadiness = () => {
    const profile = readBrandProfile();
    const readiness = getBrandOSReadinessStatus(profile);
    setBrandReadinessStatus(readiness);
    if (readiness === 'complete') {
      const nextLabel = profile?.voiceLabel?.trim() || (profile ? createVoiceLabel(profile) : '');
      setBrandVoiceLabel(nextLabel || null);
    } else {
      setBrandVoiceLabel(null);
    }
  };

  // Keep readiness and voice label in sync with the current profile state.
  useEffect(() => {
    syncBrandReadiness();
  }, [location.key]);

  useEffect(() => {
    const refresh = () => syncBrandReadiness();
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // Hydrate tone once on mount. Does not override restored input tone.
  useEffect(() => {
    const refresh = () => setBrandProfile(readBrandProfile());
    refresh();
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  useEffect(() => {
    if (restoredInputs) return; // saved-asset reuse owns the tone
    if (brandProfile?.voiceTone && brandProfile.voiceTone.trim()) {
      setTone((current) => (current === 'Conversational' ? brandProfile.voiceTone : current));
    }
  }, [brandProfile, brandProfileStatus, restoredInputs]);

  // UI state
  const [showReuseBanner, setShowReuseBanner] = useState(!!reuseAsset);
  // hasOutput is true once a generation completes successfully.
  const [hasOutput, setHasOutput] = useState(false);
  // genStatus shows a brief "Generated X ✓" confirmation in the output header.
  const [genStatus, setGenStatus] = useState<string | null>(null);
  // genLoading is true while the AI call is in flight.
  const [genLoading, setGenLoading] = useState(false);
  // genError holds the last generation error message, if any.
  const [genError, setGenError] = useState<string | null>(null);
  // generatedOutput holds the last successful AI response.
  const [generatedOutput, setGeneratedOutput] = useState<GenerateContentResult | null>(null);

  // Clear the generated banner if the user switches output type so the
  // confirmation never refers to a type that's no longer being shown.
  useEffect(() => {
    setGenStatus(null);
  }, [outputType]);

  // Derive display items from the AI response based on the selected output type.
  // Falls back to the mock data when no real generation has occurred yet.
  function getDisplayItems(type: string, generated: GenerateContentResult | null): string[] {
    if (generated) {
      switch (type) {
        case 'hook-pack':
          if (generated.hooks.length > 0) return generated.hooks;
          break;
        case 'short-script':
          if (generated.scripts.length > 0) return generated.scripts;
          break;
        case 'caption-draft':
          if (generated.captions.length > 0) return generated.captions;
          break;
        case 'content-brief': {
          const items = [...generated.hooks.slice(0, 2), ...generated.scripts];
          if (items.length > 0) return items;
          break;
        }
        case 'repurposing-plan': {
          const items = [...generated.captions, ...generated.hooks.slice(0, 2)];
          if (items.length > 0) return items;
          break;
        }
      }
    }
    return OUTPUT_MOCK[type]?.items ?? [];
  }

  const generationBlocked = brandReadinessStatus === 'not_started';

  const handleGenerate = async () => {
    if (generationBlocked || genLoading) return;

    setGenLoading(true);
    setGenError(null);
    setGeneratedOutput(null);
    setHasOutput(false);

    const profile = readBrandProfile();
    const brandProfilePayload = profile
      ? {
          tone: profile.tone,
          complexity: profile.complexity,
          formality: profile.formality,
          energy: profile.energy,
          voiceLabel: profile.voiceLabel ?? createVoiceLabel(profile),
        }
      : undefined;

    try {
      const result = await generateContent({
        offer,
        audience,
        platform,
        goal,
        tone,
        outputType,
        brandProfile: brandProfilePayload,
      });

      setGeneratedOutput(result);
      setHasOutput(true);

      const label = OUTPUT_TYPES.find((t) => t.id === outputType)?.label ?? 'Content';
      setGenStatus(`Generated ${label} ✓`);
      window.setTimeout(() => {
        setGenStatus((current) =>
          current === `Generated ${label} ✓` ? null : current,
        );
      }, 2500);

      // Track in generation history.
      addGenerationHistoryEntry({
        id: generateAssetId(),
        timestamp: new Date().toISOString(),
        inputs: { offer, audience, platform, goal, tone, outputType },
        itemCount:
          result.hooks.length + result.scripts.length + result.captions.length,
        success: true,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Generation failed. Please try again.';
      setGenError(message);
      setGeneratedOutput(null);
      setHasOutput(false);

      // Track failed attempt in history too.
      addGenerationHistoryEntry({
        id: generateAssetId(),
        timestamp: new Date().toISOString(),
        inputs: { offer, audience, platform, goal, tone, outputType },
        itemCount: 0,
        success: false,
      });
    } finally {
      setGenLoading(false);
    }
  };
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveResetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (saveResetTimerRef.current !== null) {
        window.clearTimeout(saveResetTimerRef.current);
      }
    };
  }, []);
  
  // Clear & Start Fresh - completely reset all state
  const handleClearAndStartFresh = () => {
    setOffer('');
    setAudience('');
    setPlatform('LinkedIn');
    setGoal('');
    setTone('Conversational');
    setOutputType('hook-pack');
    setShowReuseBanner(false);
    setGeneratedOutput(null);
    setHasOutput(false);
    setGenError(null);
    navigate('/app/content-os/generate', { replace: true, state: {} });
  };
  
  // Generate a stable id even in environments without crypto.randomUUID
  const generateAssetId = (): string => {
    try {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
    } catch {
      // fall through
    }
    return `asset-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  };

  // Save current output to the Library with a frozen Brand Voice snapshot.
  // Reads the brand profile ONLY at save-time; the asset never re-reads it.
  const handleSaveToLibrary = () => {
    // Guard against duplicate saves — both header and per-card buttons share
    // this state, so a rapid double-click (or one click on each button)
    // only writes a single asset per save cycle.
    if (saveStatus !== 'idle') return;

    // Save only real generated output items.
    if (!generatedOutput) return;
    const items = getDisplayItems(outputType, generatedOutput);
    const mock = OUTPUT_MOCK[outputType];
    if (!items.length) return;

    setSaveStatus('saving');

    const profile = readBrandProfile();
    const nowIso = new Date().toISOString();

    const brandVoiceSnapshot: BrandVoiceSnapshot | null = profile
      ? {
          voiceTone: profile.voiceTone ?? '',
          voiceComplexity: profile.voiceComplexity ?? '',
          voiceFormality: profile.voiceFormality ?? '',
          voiceEnergy: profile.voiceEnergy ?? '',
          voiceLabel: profile.voiceLabel?.trim() || createVoiceLabel(profile),
          updatedAt: profile.updatedAt ?? '',
          capturedAt: nowIso,
        }
      : null;

    const brandVoice = brandVoiceSnapshot?.voiceLabel?.trim() || tone || 'Custom Voice';

    // Build a more useful title: "<Type Label> — <topic/offer>".
    // Falls back to the mock header suffix, then to just the type label.
    const headerParts = (mock?.header ?? '').split(' — ');
    const typeLabel = headerParts[0]?.trim() || outputType;
    const offerSuffix = offer.trim();
    const fallbackSuffix = headerParts.slice(1).join(' — ').trim();
    const titleSuffix = offerSuffix || fallbackSuffix;
    const rawTitle = titleSuffix ? `${typeLabel} — ${titleSuffix}` : typeLabel;
    const title = rawTitle.length > 80 ? `${rawTitle.slice(0, 77).trimEnd()}…` : rawTitle;

    const displayItems = items;

    const asset: SavedContentAsset = {
      id: generateAssetId(),
      type: outputType,
      title,
      preview: displayItems[0] ?? '',
      platform,
      campaign: 'Generated',
      brandVoice,
      date: nowIso.slice(0, 10),
      variants: displayItems.length,
      status: 'ready',
      source: 'generated',
      createdAt: nowIso,
      items: displayItems,
      inputs: { offer, audience, goal, tone, outputType },
      brandVoiceSnapshot,
    };

    saveAsset(asset);
    setSaveStatus('saved');
    if (saveResetTimerRef.current !== null) {
      window.clearTimeout(saveResetTimerRef.current);
    }
    saveResetTimerRef.current = window.setTimeout(() => {
      setSaveStatus('idle');
      saveResetTimerRef.current = null;
    }, 2200);
  };

  // Dismiss banner only
  const handleDismissReuse = () => {
    setShowReuseBanner(false);
    navigate('/app/content-os/generate', { replace: true, state: {} });
  };

  // Mock output data by type
  const OUTPUT_MOCK: Record<string, { header: string; sub: string; items: string[]; itemLabel: string; wordCount: number }> = {
    'hook-pack': {
      header: 'Hook Pack — Brand Positioning',
      sub: '5 hooks · 87 words · Ready to deploy',
      itemLabel: '5 hooks',
      wordCount: 87,
      items: [
        "Most consultants don't have a content problem. They have a positioning problem.",
        "You don't need more content. You need content that knows what it's selling.",
        "Generic content attracts generic clients. Specific offers attract premium buyers.",
        "The best content doesn't chase trends — it reinforces a specific promise.",
        "Your expertise is clear to you. But is your offer clear to your market?",
      ],
    },
    'short-script': {
      header: 'Short Script — The Positioning Problem',
      sub: '1 script · 156 words · 60 seconds',
      itemLabel: '4 beats',
      wordCount: 156,
      items: [
        "Open: Most creators have a content volume problem. Wrong. They have a positioning problem.",
        "Problem: When your content could be written by anyone in your niche, it attracts no one specific.",
        "Solution: Define what only you can say — your offer, your audience, your specific outcome.",
        "Close: Stop generating content. Start generating positioning. That's the system that scales.",
      ],
    },
    'caption-draft': {
      header: 'Caption Draft — Positioning Series',
      sub: '3 captions · 94 words · Multi-platform',
      itemLabel: '3 captions',
      wordCount: 94,
      items: [
        "Most consultants create content about what they know. But that's not what sells. What sells is positioning — making your expertise inseparable from a specific outcome.",
        "Content without positioning is noise. Content with positioning is demand generation. Here's how to tell the difference in your next post.",
        "If your content could be written by anyone in your industry, you don't have a content problem. You have a positioning problem. Fix the foundation first.",
      ],
    },
    'content-brief': {
      header: 'Content Brief — Positioning Authority',
      sub: '1 brief · Structured · Ready to execute',
      itemLabel: '5 sections',
      wordCount: 120,
      items: [
        "Goal: Build authority and generate inbound from LinkedIn with a positioning-first post.",
        "Angle: The real problem isn't content volume — it's the absence of a clear, differentiated position.",
        "Key Points: (1) Generic content attracts no one. (2) Positioning narrows to attract. (3) Your offer is the lens for every piece of content.",
        "Format: Long-form LinkedIn post — hook + story + insight + 3 takeaways + CTA.",
        "Tone: Conversational authority. Direct but not preachy. First-person with proof.",
      ],
    },
    'repurposing-plan': {
      header: 'Repurposing Plan — LinkedIn Post',
      sub: '1 source asset → 4 platform outputs',
      itemLabel: '4 platforms',
      wordCount: 98,
      items: [
        "Source Asset: LinkedIn long-form post — Positioning vs Content Volume.",
        "→ Instagram Carousel: Extract the 3 key points as individual slides. Hook on slide 1, insight per slide, CTA on final.",
        "→ YouTube Short (60s): Record the opening hook + problem + one-line solution as a structured script.",
        "→ X / Twitter Thread: Break the 3 key points into a 5-tweet thread. Add a reframe tweet at the end.",
        "→ Email Newsletter: Expand the insight section into a 200-word newsletter intro with a link back to the full post.",
      ],
    },
  };

  return (
    <div className={`${showTopbar ? 'min-h-screen' : 'h-full'} flex flex-col`} style={{ background: '#0E0F14' }}>
      {showTopbar && <Topbar />}

      {/* Brand Voice handoff indicator — passive, read-only */}
      <div
        className="px-8 py-2.5 flex items-center justify-end"
        style={{
          background: '#0E0F14',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        }}
      >
        <BrandVoiceChip
          voiceLabel={brandVoiceLabel}
          setupRoute="/app/brand-os/setup"
          status={brandReadinessStatus}
        />
      </div>

      {brandReadinessStatus === 'in_progress' && (
        <div className="px-8 py-3">
          <div
            className="px-4 py-3 rounded-[10px] flex items-center justify-between gap-4"
            style={{
              background: 'rgba(255, 191, 222, 0.08)',
              border: '1px solid rgba(255, 191, 222, 0.2)',
            }}
          >
            <p style={{ fontSize: '13px', color: '#F4F3F8', lineHeight: 1.5 }}>
              BrandOS is in progress. You can still generate content, but outputs may be less brand-aligned
              until your profile is complete.
            </p>
            <button
              type="button"
              onClick={() => navigate('/app/brand-os/setup')}
              className="px-3 py-1.5 rounded-[8px] whitespace-nowrap"
              style={{
                background: 'rgba(255, 191, 222, 0.14)',
                border: '1px solid rgba(255, 191, 222, 0.28)',
                color: '#FFBFDE',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Finish BrandOS →
            </button>
          </div>
        </div>
      )}

      {generationBlocked && (
        <div className="px-8 py-3">
          <div
            className="px-4 py-3 rounded-[10px] flex items-center justify-between gap-4"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <p style={{ fontSize: '13px', color: '#B4B8C7', lineHeight: 1.5 }}>
              Generation is locked until BrandOS is started. Set your tone and voice in BrandOS first.
            </p>
            <button
              type="button"
              onClick={() => navigate('/app/brand-os/setup')}
              className="px-3 py-1.5 rounded-[8px] whitespace-nowrap"
              style={{
                background: 'rgba(231, 198, 243, 0.12)',
                border: '1px solid rgba(231, 198, 243, 0.25)',
                color: '#E7C6F3',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Start BrandOS →
            </button>
          </div>
        </div>
      )}

      {/* Reuse Banner (Conditional) */}
      {showReuseBanner && reuseAsset && (
        <ReuseBanner 
          asset={reuseAsset}
          onClearAndStartFresh={handleClearAndStartFresh}
          onDismiss={handleDismissReuse}
        />
      )}

      {/* Generate Main - 2-Column Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1800px] mx-auto p-8">
          <div 
            className="h-full rounded-[20px] overflow-hidden flex relative"
            style={{ 
              background: '#0E0F14',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Premium top edge light */}
            <div 
              className="absolute top-0 left-0 right-0 h-px z-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.2) 30%, rgba(218, 191, 255, 0.2) 70%, transparent)' }}
            ></div>

            {/* Input Panel (Left 36%) */}
            <InputPanel
              offer={offer}
              audience={audience}
              platform={platform}
              goal={goal}
              tone={tone}
              outputType={outputType}
              onOfferChange={setOffer}
              onAudienceChange={setAudience}
              onPlatformChange={setPlatform}
              onGoalChange={setGoal}
              onToneChange={setTone}
              onOutputTypeChange={setOutputType}
              onGenerate={handleGenerate}
              onClearAll={handleClearAndStartFresh}
              generationStatus={genLoading ? 'Generating…' : genStatus}
              brandProfileStatus={brandProfileStatus}
              onOpenBrandOS={() => navigate('/app/brand-os/setup')}
              canGenerate={!generationBlocked && !genLoading}
            />

            {/* Output Workspace (Right 64%) */}
            <div 
              className="flex-1 flex flex-col relative"
              style={{ background: '#0E0F14' }}
            >
              {genLoading ? (
                /* Loading State — shown while AI generation is in flight */
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div
                      className="w-20 h-20 rounded-[16px] flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.15), rgba(218, 191, 255, 0.1))',
                        border: '1px solid rgba(255, 191, 222, 0.2)',
                      }}
                    >
                      <svg
                        className="animate-spin"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle cx="16" cy="16" r="12" stroke="rgba(255,191,222,0.2)" strokeWidth="3" />
                        <path
                          d="M16 4a12 12 0 0 1 12 12"
                          stroke="#FFBFDE"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#F4F3F8', marginBottom: '8px' }}>
                      Generating Content
                    </h3>
                    <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.6 }}>
                      {brandReadinessStatus === 'complete'
                        ? 'Applying your Brand Voice to the AI prompt…'
                        : 'Building your content suite with AI…'}
                    </p>
                  </div>
                </div>
              ) : genError ? (
                /* Error State */
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div
                      className="w-20 h-20 rounded-[16px] flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: 'rgba(255, 100, 100, 0.08)',
                        border: '1px solid rgba(255, 100, 100, 0.2)',
                      }}
                    >
                      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                        <path d="M16 10v8M16 22v2" stroke="#FF8080" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="16" cy="16" r="12" stroke="#FF8080" strokeWidth="2" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginBottom: '8px' }}>
                      Generation Failed
                    </h3>
                    <p style={{ fontSize: '13px', color: '#8B8F9E', lineHeight: 1.6, marginBottom: '20px' }}>
                      {genError}
                    </p>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="px-5 py-2 rounded-[10px] transition-all hover:opacity-90"
                      style={{
                        background: 'rgba(255, 191, 222, 0.12)',
                        border: '1px solid rgba(255, 191, 222, 0.25)',
                        color: '#FFBFDE',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : hasOutput ? (
                <>
                  {/* Output Header */}
                  <OutputWorkspaceHeader
                    sessionId="Local session"
                    timestamp=""
                    title={OUTPUT_MOCK[outputType]?.header ?? 'Generated Output'}
                    subtitle={
                      genStatus
                        ? genStatus
                        : saveStatus === 'saving'
                        ? 'Saving to Library…'
                        : saveStatus === 'saved'
                        ? 'Saved to Library ✓'
                        : OUTPUT_MOCK[outputType]?.sub ?? ''
                    }
                    onSave={handleSaveToLibrary}
                    saveStatus={saveStatus}
                  />

                  {/* Asset Output */}
                  <div className="flex-1 overflow-y-auto p-8">
                    <AssetCard
                      type={outputType}
                      title={OUTPUT_MOCK[outputType]?.header.split(' — ')[0] ?? outputType}
                      subtitle={`${OUTPUT_MOCK[outputType]?.itemLabel ?? ''} · ready to deploy`}
                      accentColor="rgba(255, 191, 222, 1)"
                      icon={
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path d="M3 9l3-3m0 0l3 3M6 6v8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11 3l3 3m0 0l-3 3m3-3H8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                      items={OUTPUT_MOCK[outputType]?.items ?? []}
                      wordCount={OUTPUT_MOCK[outputType]?.wordCount ?? 0}
                      onSave={handleSaveToLibrary}
                      saveStatus={saveStatus}
                    />
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div 
                      className="w-20 h-20 rounded-[16px] flex items-center justify-center mx-auto mb-6"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.15), rgba(218, 191, 255, 0.1))',
                        border: '1px solid rgba(255, 191, 222, 0.2)'
                      }}
                    >
                      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                        <path d="M8 16h16M16 8v16" stroke="#FFBFDE" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#F4F3F8', marginBottom: '12px' }}>
                      Ready to Generate
                    </h3>
                    <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.6, marginBottom: '24px' }}>
                      Fill in your offer, audience, and platform details, then hit Generate to create your content suite.
                    </p>
                    {!isConnectorConfigured() && (
                      <div
                        className="mb-4 px-4 py-3 rounded-[10px] text-left"
                        style={{
                          background: 'rgba(218, 191, 255, 0.06)',
                          border: '1px solid rgba(218, 191, 255, 0.18)',
                        }}
                      >
                        <p style={{ fontSize: '12px', color: '#DABFFF', lineHeight: 1.6 }}>
                          <strong>Configure AI Connector</strong> — Set{' '}
                          <code style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '1px 4px', borderRadius: '4px' }}>
                            VITE_API_KEY
                          </code>{' '}
                          and{' '}
                          <code style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '1px 4px', borderRadius: '4px' }}>
                            VITE_SUPABASE_FUNCTION_URL
                          </code>{' '}
                          to enable live AI generation.
                        </p>
                      </div>
                    )}
                    <div 
                      className="inline-block px-4 py-2 rounded-lg"
                      style={{ 
                        background: 'rgba(255, 191, 222, 0.08)',
                        border: '1px solid rgba(255, 191, 222, 0.15)',
                        fontSize: '12px',
                        color: '#DABFFF'
                      }}
                    >
                      💡 Tip: The more specific your inputs, the better your output
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
