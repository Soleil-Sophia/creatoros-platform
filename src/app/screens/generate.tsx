import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Topbar } from '../components/generate/Topbar';
import { ReuseBanner } from '../components/generate/ReuseBanner';
import { InputPanel } from '../components/generate/InputPanel';
import { OutputWorkspaceHeader } from '../components/generate/OutputWorkspaceHeader';
import { AssetCard } from '../components/generate/AssetCard';

type ReuseAsset = {
  id: number;
  type: string;
  title: string;
  preview: string;
  platform: string;
  campaign: string;
  brandVoice: string;
  date: string;
  variants: number;
  status: string;
};

export function GenerateScreen({ showTopbar = true }: { showTopbar?: boolean } = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract reused asset from location state
  const reuseAsset = location.state?.reuseAsset as ReuseAsset | undefined;
  
  // Smart prefill based on asset type
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
  
  // Form state
  const [offer, setOffer] = useState(getInitialOfferValue());
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState(reuseAsset?.platform || 'LinkedIn');
  const [goal, setGoal] = useState('');
  const [tone, setTone] = useState('Conversational');
  const [outputType, setOutputType] = useState('hook-pack');
  
  // UI state
  const [showReuseBanner, setShowReuseBanner] = useState(!!reuseAsset);
  const [hasOutput, setHasOutput] = useState(true); // TODO: Set based on actual generation state
  
  // Clear & Start Fresh - completely reset all state
  const handleClearAndStartFresh = () => {
    setOffer('');
    setAudience('');
    setPlatform('LinkedIn');
    setGoal('');
    setTone('Conversational');
    setOutputType('hook-pack');
    setShowReuseBanner(false);
    navigate('/app/content-os/generate', { replace: true, state: {} });
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
              onGenerate={() => setHasOutput(true)}
              onClearAll={handleClearAndStartFresh}
            />

            {/* Output Workspace (Right 64%) */}
            <div 
              className="flex-1 flex flex-col relative"
              style={{ background: '#0E0F14' }}
            >
              {hasOutput ? (
                <>
                  {/* Output Header */}
                  <OutputWorkspaceHeader
                    sessionId="Session #347"
                    timestamp="14:32 CET"
                    title={OUTPUT_MOCK[outputType]?.header ?? 'Generated Output'}
                    subtitle={OUTPUT_MOCK[outputType]?.sub ?? ''}
                    onSave={() => console.log('Save to library')}
                  />

                  {/* Asset Output */}
                  <div className="flex-1 overflow-y-auto p-8">
                    <AssetCard
                      type={outputType}
                      title={OUTPUT_MOCK[outputType]?.header.split(' — ')[0] ?? outputType}
                      subtitle={`${OUTPUT_MOCK[outputType]?.itemLabel ?? ''} · ready to deploy`}
                      accentColor="rgba(255, 191, 222"
                      icon={
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path d="M3 9l3-3m0 0l3 3M6 6v8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11 3l3 3m0 0l-3 3m3-3H8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                      items={OUTPUT_MOCK[outputType]?.items ?? []}
                      wordCount={OUTPUT_MOCK[outputType]?.wordCount ?? 0}
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
