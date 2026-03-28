import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';

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
  const source = location.state?.source as string | undefined;
  
  // Smart prefill based on asset type
  const getInitialOfferValue = () => {
    if (!reuseAsset) return '';
    
    // Hook → use preview as starting point/context
    if (reuseAsset.type === 'hook') {
      return reuseAsset.preview;
    }
    
    // Script → use preview as full draft/template
    if (reuseAsset.type === 'script') {
      return reuseAsset.preview;
    }
    
    // Caption → shorter, use as reference
    if (reuseAsset.type === 'caption') {
      return reuseAsset.preview;
    }
    
    // Plan → extract core concept (first sentence or main idea)
    if (reuseAsset.type === 'plan') {
      // For plans, we might want to extract just the main concept
      const firstSentence = reuseAsset.preview.split('.')[0];
      return firstSentence ? firstSentence + '.' : reuseAsset.preview;
    }
    
    return reuseAsset.preview;
  };
  
  // State for form inputs - prefilled if reusing
  const [offer, setOffer] = useState(getInitialOfferValue());
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState(reuseAsset?.platform || 'LinkedIn');
  const [goal, setGoal] = useState('');
  const [tone, setTone] = useState('Conversational');
  const [outputType, setOutputType] = useState('Full Content Suite');
  
  // State for reuse banner
  const [showReuseBanner, setShowReuseBanner] = useState(!!reuseAsset);
  
  // Clear & Start Fresh - completely reset all state
  const handleClearAndStartFresh = () => {
    // Clear all form inputs
    setOffer('');
    setAudience('');
    setPlatform('LinkedIn');
    setGoal('');
    setTone('Conversational');
    setOutputType('Full Content Suite');
    
    // Clear banner
    setShowReuseBanner(false);
    
    // Clear location state by replacing history entry
    navigate('/app/content-os/generate', { replace: true, state: {} });
  };
  
  // Dismiss banner only (keep prefilled values for now)
  const handleDismissReuse = () => {
    setShowReuseBanner(false);
    // Clear location state by replacing history entry
    navigate('/app/content-os/generate', { replace: true, state: {} });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0E0F14' }}>
      {/* Top Bar */}
      <div 
        className="border-b"
        style={{ 
          background: '#171923',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="max-w-[1800px] mx-auto px-8 py-5 flex items-center justify-between">
          {/* Left: Module Identity */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center" 
                style={{ 
                  background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="w-4 h-4 rounded" style={{ background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)' }}></div>
              </div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#F4F3F8' }}>CreatorOS</span>
            </div>
            <div className="w-px h-5" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>Content OS</span>
              <div 
                className="px-2 py-0.5 rounded" 
                style={{ 
                  background: 'rgba(255, 191, 222, 0.12)', 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  color: '#FFBFDE', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}
              >
                Module 01
              </div>
            </div>
          </div>

          {/* Right: Navigation hint */}
          <div className="flex items-center gap-3">
            <Link 
              to="/app/content-os/library"
              className="px-4 py-2 rounded-lg transition-colors"
              style={{ 
                background: '#1F2230',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#B4B8C7',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              Library
            </Link>
            <button 
              className="px-4 py-2 rounded-lg transition-colors"
              style={{ 
                background: '#262A38',
                border: '1px solid rgba(255, 191, 222, 0.2)',
                color: '#F4F3F8',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Reuse Banner - Only shown when reusing from Library */}
      {showReuseBanner && reuseAsset && (
        <div 
          className="border-b"
          style={{ 
            background: '#171923',
            borderColor: 'rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="max-w-[1800px] mx-auto px-8 py-3.5">
            <div 
              className="rounded-[10px] p-4 flex items-center justify-between relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 191, 222, 0.06)',
                border: '1px solid rgba(255, 191, 222, 0.15)'
              }}
            >
              {/* Subtle accent light */}
              <div 
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.3) 50%, transparent)' }}
              ></div>

              {/* Left: Reuse Context */}
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div 
                  className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.2), rgba(231, 198, 243, 0.15))',
                    border: '1px solid rgba(255, 191, 222, 0.25)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 7L7 4M10 7L7 10M10 7H4" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span 
                      style={{ 
                        fontSize: '10px', 
                        fontWeight: 600, 
                        color: '#DABFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Reusing from Library
                    </span>
                    <div 
                      className="px-2 py-0.5 rounded"
                      style={{ 
                        background: 'rgba(255, 191, 222, 0.12)',
                        border: '1px solid rgba(255, 191, 222, 0.2)',
                        fontSize: '9px',
                        fontWeight: 600,
                        color: '#FFBFDE',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {reuseAsset.type.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>
                      {reuseAsset.title}
                    </h3>
                    <span style={{ fontSize: '12px', color: '#8B8F9E' }}>·</span>
                    <span style={{ fontSize: '12px', color: '#8B8F9E' }}>
                      {reuseAsset.platform}
                    </span>
                    {reuseAsset.campaign && (
                      <>
                        <span style={{ fontSize: '12px', color: '#6B6E7D' }}>·</span>
                        <span style={{ fontSize: '12px', color: '#6B6E7D' }}>
                          {reuseAsset.campaign}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2.5">
                <Link
                  to="/app/content-os/library"
                  className="px-3 py-1.5 rounded-[8px] transition-all hover:opacity-80"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#B4B8C7',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Back to Library
                </Link>
                <button
                  onClick={handleClearAndStartFresh}
                  className="px-3 py-1.5 rounded-[8px] transition-all hover:opacity-80"
                  style={{ 
                    background: 'rgba(255, 191, 222, 0.12)',
                    border: '1px solid rgba(255, 191, 222, 0.2)',
                    color: '#FFBFDE',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Clear & Start Fresh
                </button>
                <button
                  onClick={handleDismissReuse}
                  className="px-2 py-1.5 rounded-[8px] transition-all hover:opacity-80"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    color: '#8B8F9E'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3L9 9M3 9L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Generate Workspace */}
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

            {/* LEFT PANEL - Input Surface (36%) - ELEVATED FOREGROUND */}
            <div 
              className="w-[36%] border-r flex flex-col relative"
              style={{ 
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Vertical accent light on right edge */}
              <div 
                className="absolute top-0 right-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, rgba(255, 191, 222, 0.2), transparent 50%, rgba(218, 191, 255, 0.2))' }}
              ></div>

              {/* Input Header */}
              <div className="p-8 pb-7 border-b relative" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="mb-4">
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      color: '#DABFFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em'
                    }}
                  >
                    Input Layer
                  </span>
                </div>
                <h1 
                  style={{ 
                    fontSize: '32px', 
                    fontWeight: 700, 
                    color: '#F4F3F8',
                    letterSpacing: '-0.02em',
                    marginBottom: '10px'
                  }}
                >
                  Generate Content
                </h1>
                <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                  Define your offer and audience to create structured content assets
                </p>
              </div>

              {/* Input Form */}
              <div className="flex-1 overflow-y-auto p-8 space-y-7">
                {/* Offer/Topic Field */}
                <div className="space-y-3">
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', display: 'block' }}>
                    Offer / Topic
                  </label>
                  <textarea
                    placeholder="e.g. 6-week brand positioning intensive for service providers"
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-[12px] resize-none transition-all focus:outline-none focus:border-opacity-40"
                    style={{ 
                      background: '#262A38',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F4F3F8',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                  />
                </div>

                {/* Audience Field */}
                <div className="space-y-3">
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', display: 'block' }}>
                    Audience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Established consultants, coaches, agencies"
                    className="w-full px-4 py-3.5 rounded-[12px] transition-all focus:outline-none focus:border-opacity-40"
                    style={{ 
                      background: '#262A38',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F4F3F8',
                      fontSize: '14px',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>

                {/* Platform Select */}
                <div className="space-y-3">
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', display: 'block' }}>
                    Platform
                  </label>
                  <select
                    className="w-full px-4 py-3.5 rounded-[12px] transition-all focus:outline-none focus:border-opacity-40 appearance-none"
                    style={{ 
                      background: '#262A38',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F4F3F8',
                      fontSize: '14px',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>Twitter / X</option>
                    <option>YouTube</option>
                    <option>Email</option>
                  </select>
                </div>

                {/* Goal Field */}
                <div className="space-y-3">
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', display: 'block' }}>
                    Goal
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Drive discovery call bookings"
                    className="w-full px-4 py-3.5 rounded-[12px] transition-all focus:outline-none focus:border-opacity-40"
                    style={{ 
                      background: '#262A38',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F4F3F8',
                      fontSize: '14px',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>

                {/* Tone Segmented Control */}
                <div className="space-y-3">
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', display: 'block' }}>
                    Tone
                  </label>
                  <div 
                    className="flex rounded-[8px] p-1.5"
                    style={{ 
                      background: '#171923',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {['Professional', 'Conversational', 'Bold'].map((toneOption) => (
                      <button
                        key={toneOption}
                        onClick={() => setTone(toneOption)}
                        className="flex-1 py-2.5 rounded-[6px] transition-all"
                        style={{ 
                          background: tone === toneOption ? 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)' : 'transparent',
                          border: tone === toneOption ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
                          color: tone === toneOption ? '#F4F3F8' : '#B4B8C7',
                          fontSize: '13px',
                          fontWeight: tone === toneOption ? 600 : 500,
                          boxShadow: tone === toneOption ? '0 2px 6px rgba(0, 0, 0, 0.3)' : 'none'
                        }}
                      >
                        {toneOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Type Select */}
                <div className="space-y-3">
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', display: 'block' }}>
                    Output Type
                  </label>
                  <select
                    className="w-full px-4 py-3.5 rounded-[12px] transition-all focus:outline-none focus:border-opacity-40 appearance-none"
                    style={{ 
                      background: '#262A38',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#F4F3F8',
                      fontSize: '14px',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}
                    value={outputType}
                    onChange={(e) => setOutputType(e.target.value)}
                  >
                    <option>Full Content Suite</option>
                    <option>Hooks Only</option>
                    <option>Scripts Only</option>
                    <option>Captions Only</option>
                    <option>Content Plan Only</option>
                  </select>
                </div>
              </div>

              {/* Action Footer */}
              <div 
                className="p-8 pt-7 border-t"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(23, 25, 35, 0.5) 100%)'
                }}
              >
                <button 
                  className="w-full py-4 rounded-[12px] transition-all hover:opacity-90 relative overflow-hidden mb-3"
                  style={{ 
                    background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                    color: '#0E0F14',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: '0 12px 32px rgba(255, 191, 222, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
                  Generate Content
                </button>
                <button 
                  className="w-full py-3 rounded-[8px] transition-colors hover:bg-opacity-80"
                  style={{ 
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#B4B8C7',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* RIGHT PANEL - Output Workspace (62%) - PREMIUM PRODUCT CORE */}
            <div 
              className="flex-1 flex flex-col relative"
              style={{ 
                background: '#0E0F14'
              }}
            >
              {/* Output Header - Product Command Surface */}
              <div 
                className="p-8 pb-6 border-b flex items-center justify-between relative"
                style={{ 
                  background: 'linear-gradient(135deg, #171923 0%, #0E0F14 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        color: '#DABFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em'
                      }}
                    >
                      Output Workspace
                    </span>
                    <div 
                      className="px-3 py-1 rounded-full flex items-center gap-2"
                      style={{ 
                        background: 'rgba(255, 191, 222, 0.15)',
                        border: '1px solid rgba(255, 191, 222, 0.3)'
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FFBFDE', boxShadow: '0 0 8px #FFBFDE' }}></div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFBFDE' }}>Generated</span>
                    </div>
                    <div className="h-px w-16" style={{ background: 'rgba(255, 255, 255, 0.08)' }}></div>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#B4B8C7' }}>
                      Session #347 · 14:32 CET
                    </span>
                  </div>
                  <h2 
                    style={{ 
                      fontSize: '24px', 
                      fontWeight: 600, 
                      color: '#F4F3F8',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Content Suite — Brand Positioning Intensive
                  </h2>
                  <p style={{ fontSize: '13px', color: '#B4B8C7', marginTop: '6px' }}>
                    9 assets · 2,847 words · Ready to deploy
                  </p>
                </div>
                <button 
                  className="px-6 py-3 rounded-[12px] transition-all hover:opacity-90"
                  style={{ 
                    background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#F4F3F8',
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
                  }}
                >
                  Save Suite to Library
                </button>
              </div>

              {/* Output Content - Premium Asset Grid */}
              <div className="flex-1 overflow-y-auto p-8 space-y-7">
                
                {/* HOOKS ASSET BLOCK */}
                <div 
                  className="rounded-[16px] overflow-hidden relative"
                  style={{ 
                    background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {/* Premium top light */}
                  <div 
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.4) 30%, rgba(255, 191, 222, 0.4) 70%, transparent)' }}
                  ></div>
                  
                  {/* Asset Header */}
                  <div 
                    className="px-7 py-5 border-b flex items-center justify-between relative"
                    style={{ 
                      background: 'linear-gradient(180deg, rgba(38, 42, 56, 0.6) 0%, rgba(31, 34, 48, 0.4) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center relative"
                        style={{ 
                          background: 'linear-gradient(135deg, #FFBFDE, #E7C6F3)',
                          boxShadow: '0 6px 20px rgba(255, 191, 222, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path d="M3 9l3-3m0 0l3 3M6 6v8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11 3l3 3m0 0l-3 3m3-3H8" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '3px' }}>Hooks</h3>
                        <span style={{ fontSize: '12px', color: '#B4B8C7' }}>5 variations ready to deploy</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5">
                      <button 
                        className="px-4 py-2 rounded-[8px] transition-all hover:opacity-80"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#B4B8C7',
                          fontSize: '13px',
                          fontWeight: 500
                        }}
                      >
                        Regenerate
                      </button>
                      <button 
                        className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.2), rgba(255, 191, 222, 0.1))',
                          border: '1px solid rgba(255, 191, 222, 0.3)',
                          color: '#FFBFDE',
                          fontSize: '13px',
                          fontWeight: 600,
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        Copy All
                      </button>
                    </div>
                  </div>

                  {/* Hook Items - Structured Asset Rows */}
                  <div className="p-7 space-y-3.5">
                    {[
                      "Most consultants don't have a content problem. They have a positioning problem.",
                      "You don't need more content. You need content that knows what it's selling.",
                      "Generic content attracts generic clients. Specific offers attract premium buyers.",
                      "The best content doesn't chase trends—it reinforces a specific promise.",
                      "Your expertise is clear to you. But is your offer clear to your market?"
                    ].map((hook, idx) => (
                      <div 
                        key={idx}
                        className="group p-5 rounded-[12px] relative hover:border-opacity-20 transition-all"
                        style={{ 
                          background: '#262A38',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div 
                            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ 
                              background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.2), rgba(255, 191, 222, 0.1))',
                              border: '1px solid rgba(255, 191, 222, 0.25)',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#FFBFDE'
                            }}
                          >
                            {idx + 1}
                          </div>
                          <p 
                            className="flex-1"
                            style={{ 
                              fontSize: '15px', 
                              lineHeight: 1.65,
                              color: '#F4F3F8',
                              fontWeight: 500
                            }}
                          >
                            {hook}
                          </p>
                          <button 
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                              <rect x="2" y="4" width="7" height="8" rx="1" stroke="#B4B8C7" strokeWidth="1.3"/>
                              <path d="M5 4V3a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-1" stroke="#B4B8C7" strokeWidth="1.3"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Asset Footer - Metadata & Actions */}
                  <div 
                    className="px-7 py-4 border-t flex items-center justify-between"
                    style={{ 
                      background: 'rgba(23, 25, 35, 0.4)',
                      borderColor: 'rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '12px', color: '#B4B8C7' }}>
                        5 assets · 87 words
                      </span>
                      <div className="w-px h-4" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
                      <div 
                        className="px-2 py-0.5 rounded" 
                        style={{ 
                          background: 'rgba(255, 191, 222, 0.1)',
                          border: '1px solid rgba(255, 191, 222, 0.2)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#FFBFDE',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        Hooks
                      </div>
                    </div>
                    <button 
                      className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F4F3F8',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Save to Library
                    </button>
                  </div>
                </div>

                {/* SCRIPT ASSET BLOCK */}
                <div 
                  className="rounded-[16px] overflow-hidden relative"
                  style={{ 
                    background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {/* Premium top light */}
                  <div 
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(231, 198, 243, 0.4) 30%, rgba(231, 198, 243, 0.4) 70%, transparent)' }}
                  ></div>
                  
                  {/* Asset Header */}
                  <div 
                    className="px-7 py-5 border-b flex items-center justify-between relative"
                    style={{ 
                      background: 'linear-gradient(180deg, rgba(38, 42, 56, 0.6) 0%, rgba(31, 34, 48, 0.4) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center relative"
                        style={{ 
                          background: 'linear-gradient(135deg, #E7C6F3, #DABFFF)',
                          boxShadow: '0 6px 20px rgba(231, 198, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path d="M3 4h12M3 9h12M3 14h9" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '3px' }}>LinkedIn Script</h3>
                        <span style={{ fontSize: '12px', color: '#B4B8C7' }}>60-second structured format</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5">
                      <button 
                        className="px-4 py-2 rounded-[8px] transition-all hover:opacity-80"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#B4B8C7',
                          fontSize: '13px',
                          fontWeight: 500
                        }}
                      >
                        Expand
                      </button>
                      <button 
                        className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.2), rgba(231, 198, 243, 0.1))',
                          border: '1px solid rgba(231, 198, 243, 0.3)',
                          color: '#E7C6F3',
                          fontSize: '13px',
                          fontWeight: 600,
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Script Content - Structured Sections */}
                  <div className="p-7">
                    <div 
                      className="rounded-[12px] overflow-hidden"
                      style={{ 
                        background: '#262A38',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {/* Opening Section */}
                      <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                        <div className="flex items-center gap-2.5 mb-4">
                          <div 
                            className="px-2.5 py-1 rounded-lg" 
                            style={{ 
                              background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.25), rgba(231, 198, 243, 0.15))',
                              border: '1px solid rgba(231, 198, 243, 0.3)',
                              fontSize: '10px', 
                              fontWeight: 700, 
                              color: '#E7C6F3', 
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Opening
                          </div>
                          <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.06)' }}></div>
                        </div>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#F4F3F8', fontWeight: 500 }}>
                          Here's what I learned after working with 40+ consultants on their positioning: most don't have a content problem—they have a clarity problem.
                        </p>
                      </div>

                      {/* Body Section */}
                      <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                        <div className="flex items-center gap-2.5 mb-4">
                          <div 
                            className="px-2.5 py-1 rounded-lg" 
                            style={{ 
                              background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.25), rgba(231, 198, 243, 0.15))',
                              border: '1px solid rgba(231, 198, 243, 0.3)',
                              fontSize: '10px', 
                              fontWeight: 700, 
                              color: '#E7C6F3', 
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Body
                          </div>
                          <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.06)' }}></div>
                        </div>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#F4F3F8', fontWeight: 500 }}>
                          They're posting consistently. They're getting engagement. But the inquiries? Either generic or completely misaligned. That's because their content doesn't reflect a clear offer—it reflects scattered expertise.
                        </p>
                      </div>

                      {/* Close Section */}
                      <div className="p-6">
                        <div className="flex items-center gap-2.5 mb-4">
                          <div 
                            className="px-2.5 py-1 rounded-lg" 
                            style={{ 
                              background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.25), rgba(231, 198, 243, 0.15))',
                              border: '1px solid rgba(231, 198, 243, 0.3)',
                              fontSize: '10px', 
                              fontWeight: 700, 
                              color: '#E7C6F3', 
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Close
                          </div>
                          <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.06)' }}></div>
                        </div>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#F4F3F8', fontWeight: 500 }}>
                          My 6-week Brand Positioning Intensive helps established consultants turn scattered expertise into a clear, repeatable offer—so their content actually moves the right people toward a decision.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Asset Footer - Metadata & Actions */}
                  <div 
                    className="px-7 py-4 border-t flex items-center justify-between"
                    style={{ 
                      background: 'rgba(23, 25, 35, 0.4)',
                      borderColor: 'rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '12px', color: '#B4B8C7' }}>
                        1 asset · 143 words
                      </span>
                      <div className="w-px h-4" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
                      <div 
                        className="px-2 py-0.5 rounded" 
                        style={{ 
                          background: 'rgba(231, 198, 243, 0.1)',
                          border: '1px solid rgba(231, 198, 243, 0.2)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#E7C6F3',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        Script
                      </div>
                    </div>
                    <button 
                      className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F4F3F8',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Save to Library
                    </button>
                  </div>
                </div>

                {/* CAPTIONS ASSET BLOCK */}
                <div 
                  className="rounded-[16px] overflow-hidden relative"
                  style={{ 
                    background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {/* Premium top light */}
                  <div 
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(218, 191, 255, 0.4) 30%, rgba(218, 191, 255, 0.4) 70%, transparent)' }}
                  ></div>
                  
                  {/* Asset Header */}
                  <div 
                    className="px-7 py-5 border-b flex items-center justify-between relative"
                    style={{ 
                      background: 'linear-gradient(180deg, rgba(38, 42, 56, 0.6) 0%, rgba(31, 34, 48, 0.4) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center relative"
                        style={{ 
                          background: 'linear-gradient(135deg, #DABFFF, #FFBFDE)',
                          boxShadow: '0 6px 20px rgba(218, 191, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <rect x="3" y="4" width="12" height="10" rx="1.5" stroke="#0E0F14" strokeWidth="1.8"/>
                          <path d="M6 8h6M6 11h5" stroke="#0E0F14" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '3px' }}>Social Captions</h3>
                        <span style={{ fontSize: '12px', color: '#B4B8C7' }}>3 platform-optimized variations</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5">
                      <button 
                        className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(218, 191, 255, 0.2), rgba(218, 191, 255, 0.1))',
                          border: '1px solid rgba(218, 191, 255, 0.3)',
                          color: '#DABFFF',
                          fontSize: '13px',
                          fontWeight: 600,
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Caption Variants - Structured Asset Rows */}
                  <div className="p-7 space-y-3.5">
                    {[
                      "Generic content attracts generic clients. Your positioning intensive helps consultants turn scattered expertise into content that moves the right people toward a decision. 6 weeks. Clear offer. Real results.",
                      "Most consultants don't have a content problem—they have a clarity problem. Your Brand Positioning Intensive gives them the structure to turn expertise into offers that convert.",
                      "Consistent posting. Good engagement. But the wrong inquiries. That's what happens when content doesn't reflect a clear offer. Let's fix that."
                    ].map((caption, idx) => (
                      <div 
                        key={idx}
                        className="group p-5 rounded-[12px] relative hover:border-opacity-20 transition-all"
                        style={{ 
                          background: '#262A38',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div 
                            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ 
                              background: 'linear-gradient(135deg, rgba(218, 191, 255, 0.2), rgba(218, 191, 255, 0.1))',
                              border: '1px solid rgba(218, 191, 255, 0.25)',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#DABFFF'
                            }}
                          >
                            {idx + 1}
                          </div>
                          <p 
                            className="flex-1"
                            style={{ 
                              fontSize: '15px', 
                              lineHeight: 1.65,
                              color: '#F4F3F8',
                              fontWeight: 500
                            }}
                          >
                            {caption}
                          </p>
                          <button 
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                              <rect x="2" y="4" width="7" height="8" rx="1" stroke="#B4B8C7" strokeWidth="1.3"/>
                              <path d="M5 4V3a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-1" stroke="#B4B8C7" strokeWidth="1.3"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Asset Footer - Metadata & Actions */}
                  <div 
                    className="px-7 py-4 border-t flex items-center justify-between"
                    style={{ 
                      background: 'rgba(23, 25, 35, 0.4)',
                      borderColor: 'rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '12px', color: '#B4B8C7' }}>
                        3 assets · 156 words
                      </span>
                      <div className="w-px h-4" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
                      <div 
                        className="px-2 py-0.5 rounded" 
                        style={{ 
                          background: 'rgba(218, 191, 255, 0.1)',
                          border: '1px solid rgba(218, 191, 255, 0.2)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#DABFFF',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        Captions
                      </div>
                    </div>
                    <button 
                      className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F4F3F8',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Save to Library
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}