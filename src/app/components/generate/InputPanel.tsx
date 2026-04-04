import { SectionLabel } from '../shared';

type InputPanelProps = {
  offer: string;
  audience: string;
  platform: string;
  goal: string;
  tone: string;
  outputType: string;
  onOfferChange: (value: string) => void;
  onAudienceChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onGoalChange: (value: string) => void;
  onToneChange: (value: string) => void;
  onOutputTypeChange: (value: string) => void;
  onGenerate: () => void;
  onClearAll: () => void;
};

export function InputPanel({
  offer,
  audience,
  platform,
  goal,
  tone,
  outputType,
  onOfferChange,
  onAudienceChange,
  onPlatformChange,
  onGoalChange,
  onToneChange,
  onOutputTypeChange,
  onGenerate,
  onClearAll
}: InputPanelProps) {
  return (
    <div 
      className="w-[36%] border-r flex flex-col relative"
      style={{ 
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Vertical accent light */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(180deg, rgba(255, 191, 222, 0.2), transparent 50%, rgba(218, 191, 255, 0.2))' }}
      ></div>

      {/* Header */}
      <div className="p-8 pb-7 border-b relative" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="mb-4">
          <SectionLabel>Input Layer</SectionLabel>
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

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-8 space-y-7">
        {/* Offer/Topic */}
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
            onChange={(e) => onOfferChange(e.target.value)}
          />
        </div>

        {/* Audience */}
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
            onChange={(e) => onAudienceChange(e.target.value)}
          />
        </div>

        {/* Platform */}
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
            onChange={(e) => onPlatformChange(e.target.value)}
          >
            <option>LinkedIn</option>
            <option>Instagram</option>
            <option>Twitter / X</option>
            <option>YouTube</option>
            <option>Email</option>
          </select>
        </div>

        {/* Goal */}
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
            onChange={(e) => onGoalChange(e.target.value)}
          />
        </div>

        {/* Tone */}
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
                onClick={() => onToneChange(toneOption)}
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

        {/* Output Type */}
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
            onChange={(e) => onOutputTypeChange(e.target.value)}
          >
            <option>Full Content Suite</option>
            <option>Hooks Only</option>
            <option>Scripts Only</option>
            <option>Captions Only</option>
            <option>Content Plan Only</option>
          </select>
        </div>
      </div>

      {/* Actions Footer */}
      <div 
        className="p-8 pt-7 border-t"
        style={{ 
          borderColor: 'rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(23, 25, 35, 0.5) 100%)'
        }}
      >
        <button 
          onClick={onGenerate}
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
          onClick={onClearAll}
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
  );
}