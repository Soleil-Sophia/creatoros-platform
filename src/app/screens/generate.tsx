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

export function GenerateScreen() {
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
  const [outputType, setOutputType] = useState('Full Content Suite');
  
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
    setOutputType('Full Content Suite');
    setShowReuseBanner(false);
    navigate('/app/content-os/generate', { replace: true, state: {} });
  };
  
  // Dismiss banner only
  const handleDismissReuse = () => {
    setShowReuseBanner(false);
    navigate('/app/content-os/generate', { replace: true, state: {} });
  };

  // Mock data for output
  const hooks = [
    "Most consultants don't have a content problem. They have a positioning problem.",
    "You don't need more content. You need content that knows what it's selling.",
    "Generic content attracts generic clients. Specific offers attract premium buyers.",
    "The best content doesn't chase trends—it reinforces a specific promise.",
    "Your expertise is clear to you. But is your offer clear to your market?"
  ];

  const scripts = [
    "Open: Why every consultant struggles to get noticed...",
    "Problem: Generic content = generic results",
    "Solution: Position first, then create content around that position",
    "Close: Ready to transform your content strategy?"
  ];

  const captions = [
    "Most consultants create content about what they know. But that's not what sells. What sells is positioning—making your expertise inseparable from a specific outcome.",
    "Content without positioning is noise. Content with positioning is demand generation.",
    "If your content could be written by anyone in your industry, you don't have a content problem. You have a positioning problem."
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0E0F14' }}>
      {/* Topbar */}
      <Topbar />

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
                    title="Content Suite — Brand Positioning Intensive"
                    subtitle="9 assets · 2,847 words · Ready to deploy"
                    onSave={() => console.log('Save to library')}
                  />

                  {/* Asset Grid */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-7">
                    {/* Hooks Asset Card */}
                    <AssetCard
                      type="hooks"
                      title="Hooks"
                      subtitle="5 variations ready to deploy"
                      accentColor="rgba(255, 191, 222"
                      icon={
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path d="M3 9l3-3m0 0l3 3M6 6v8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11 3l3 3m0 0l-3 3m3-3H8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                      items={hooks}
                      wordCount={87}
                    />

                    {/* Scripts Asset Card */}
                    <AssetCard
                      type="script"
                      title="LinkedIn Script"
                      subtitle="60-second structured script"
                      accentColor="rgba(231, 198, 243"
                      icon={
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path d="M2 4.5A1.5 1.5 0 013.5 3h11A1.5 1.5 0 0116 4.5v9a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 012 13.5v-9z" stroke="#0E0F14" strokeWidth="2"/>
                          <path d="M5.5 7h7M5.5 10.5h5" stroke="#0E0F14" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      }
                      items={scripts}
                      wordCount={156}
                    />

                    {/* Captions Asset Card */}
                    <AssetCard
                      type="captions"
                      title="Social Captions"
                      subtitle="3 platform-ready captions"
                      accentColor="rgba(218, 191, 255"
                      icon={
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <rect x="3" y="3" width="12" height="12" rx="2" stroke="#0E0F14" strokeWidth="2"/>
                          <path d="M6 7.5h6M6 10.5h4" stroke="#0E0F14" strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                      }
                      items={captions}
                      wordCount={94}
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
