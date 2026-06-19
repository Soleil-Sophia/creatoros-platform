import { INPUT_META, OUTPUT_TYPES } from '../../../data/contentos';
import { HelperNote, SectionLabel } from '../shared';
import type { BrandProfileStatus } from '../../lib/brand-profile/storage';

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
  generationStatus?: string | null;
  brandProfileStatus: BrandProfileStatus;
  onOpenBrandOS: () => void;
};

const fieldStyle = {
  background: '#262A38',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#F4F3F8',
  fontSize: '14px',
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
} as const;

const primaryFieldStyle = {
  background: '#262A38',
  border: '1px solid rgba(255, 191, 222, 0.22)',
  color: '#F4F3F8',
  fontSize: '14px',
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
} as const;

function FieldLabel({ label, primary }: { label: string; primary: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {primary && (
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: '#FFBFDE', boxShadow: '0 0 4px rgba(255, 191, 222, 0.6)' }}
        />
      )}
      <label
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: primary ? '#F4F3F8' : '#A0A5B8',
          display: 'block',
        }}
      >
        {label}
      </label>
    </div>
  );
}

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
  onClearAll,
  generationStatus,
  brandProfileStatus,
  onOpenBrandOS,
}: InputPanelProps) {
  const meta = INPUT_META[outputType] ?? INPUT_META['hook-pack'];
  const currentType = OUTPUT_TYPES.find((t) => t.id === outputType);
  const helperId = `brand-profile-helper-${brandProfileStatus}`;
  const canGenerate = brandProfileStatus !== 'not_started';

  return (
    <div
      className="w-[36%] border-r flex flex-col relative"
      style={{
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Vertical accent light */}
      <div
        className="absolute top-0 right-0 bottom-0 w-px"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 191, 222, 0.2), transparent 50%, rgba(218, 191, 255, 0.2))',
        }}
      />

      {/* Header */}
      <div
        className="p-8 pb-6 border-b relative"
        style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
      >
        <div className="mb-4">
          <SectionLabel>Input Layer</SectionLabel>
        </div>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#F4F3F8',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          Generate Content
        </h1>
        <p
          key={outputType}
          style={{ fontSize: '13px', color: '#8B8F9E', lineHeight: 1.6, transition: 'opacity 0.2s' }}
        >
          {meta.helperDescription}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        {/* Output Type — top of form, drives everything */}
        <div className="space-y-3">
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', display: 'block' }}>
            Output Type
          </label>
          <div className="grid grid-cols-1 gap-2">
            {OUTPUT_TYPES.map((type) => {
              const active = outputType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => onOutputTypeChange(type.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-left transition-all w-full"
                  style={{
                    background: active
                      ? 'linear-gradient(135deg, rgba(255, 191, 222, 0.12) 0%, rgba(218, 191, 255, 0.08) 100%)'
                      : '#1A1D28',
                    border: active
                      ? '1px solid rgba(255, 191, 222, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.07)',
                    boxShadow: active ? '0 0 0 1px rgba(255, 191, 222, 0.08)' : 'none',
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: active ? '#FFBFDE' : 'rgba(255,255,255,0.2)',
                      boxShadow: active ? '0 0 6px rgba(255, 191, 222, 0.5)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: active ? 600 : 500,
                        color: active ? '#F4F3F8' : '#8B8F9E',
                      }}
                    >
                      {type.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {/* Offer / Topic — field 1 */}
        <div className="space-y-2.5">
          <FieldLabel label={meta.fields.offer.label} primary={meta.fields.offer.primary} />
          <textarea
            placeholder={meta.fields.offer.placeholder}
            rows={3}
            className="w-full px-4 py-3.5 rounded-[12px] resize-none transition-all focus:outline-none"
            style={meta.fields.offer.primary ? primaryFieldStyle : fieldStyle}
            value={offer}
            onChange={(e) => onOfferChange(e.target.value)}
          />
        </div>

        {/* Audience — field 2 */}
        <div className="space-y-2.5">
          <FieldLabel label={meta.fields.audience.label} primary={meta.fields.audience.primary} />
          <input
            type="text"
            placeholder={meta.fields.audience.placeholder}
            className="w-full px-4 py-3.5 rounded-[12px] transition-all focus:outline-none"
            style={meta.fields.audience.primary ? primaryFieldStyle : fieldStyle}
            value={audience}
            onChange={(e) => onAudienceChange(e.target.value)}
          />
        </div>

        {/* Platform — field 3 */}
        <div className="space-y-2.5">
          <FieldLabel label={meta.fields.platform.label} primary={meta.fields.platform.primary} />
          <input
            type="text"
            placeholder={meta.fields.platform.placeholder}
            className="w-full px-4 py-3.5 rounded-[12px] transition-all focus:outline-none"
            style={meta.fields.platform.primary ? primaryFieldStyle : fieldStyle}
            value={platform}
            onChange={(e) => onPlatformChange(e.target.value)}
          />
        </div>

        {/* Goal — field 4 */}
        <div className="space-y-2.5">
          <FieldLabel label={meta.fields.goal.label} primary={meta.fields.goal.primary} />
          <input
            type="text"
            placeholder={meta.fields.goal.placeholder}
            className="w-full px-4 py-3.5 rounded-[12px] transition-all focus:outline-none"
            style={meta.fields.goal.primary ? primaryFieldStyle : fieldStyle}
            value={goal}
            onChange={(e) => onGoalChange(e.target.value)}
          />
        </div>

        {/* Tone — conditional per output type */}
        {meta.showTone && (
          <div className="space-y-2.5">
            <FieldLabel label="Tone" primary={false} />
            <div
              className="flex rounded-[8px] p-1.5"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
              }}
            >
              {(() => {
                const tonePresets = ['Professional', 'Conversational', 'Bold'];
                const hasCustomTone =
                  !!tone && tone.trim() !== '' && !tonePresets.includes(tone);
                const toneOptions = hasCustomTone ? [tone, ...tonePresets] : tonePresets;
                return toneOptions.map((toneOption) => {
                  const isCustom = hasCustomTone && toneOption === tone;
                  const isSelected = tone === toneOption;
                  return (
                    <button
                      key={toneOption}
                      onClick={() => onToneChange(toneOption)}
                      title={isCustom ? `From BrandOS: ${toneOption}` : toneOption}
                      className={`${
                        isCustom ? 'shrink-0' : 'flex-1'
                      } py-2.5 px-3 rounded-[6px] transition-all inline-flex items-center justify-center gap-1.5 min-w-0`}
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)'
                          : 'transparent',
                        border: isSelected
                          ? '1px solid rgba(255, 255, 255, 0.1)'
                          : '1px solid transparent',
                        color: isSelected ? '#F4F3F8' : '#B4B8C7',
                        fontSize: '13px',
                        fontWeight: isSelected ? 600 : 500,
                        boxShadow: isSelected ? '0 2px 6px rgba(0, 0, 0, 0.3)' : 'none',
                        maxWidth: isCustom ? '180px' : undefined,
                      }}
                    >
                      {isCustom && (
                        <span
                          className="shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{
                            background: '#E7C6F3',
                            boxShadow: '0 0 6px rgba(231, 198, 243, 0.5)',
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="truncate"
                        style={{ minWidth: 0 }}
                      >
                        {toneOption}
                      </span>
                    </button>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div
        className="p-8 pt-6 border-t"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(23, 25, 35, 0.5) 100%)',
        }}
      >
        {/* Visible generation feedback — appears directly above the Generate
            button after a click and auto-clears via parent state. */}
        <div
          aria-live="polite"
          role="status"
          className="mb-2 min-h-[20px] text-center transition-opacity"
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#E7C6F3',
            opacity: generationStatus ? 1 : 0,
          }}
        >
          {generationStatus ?? '\u00A0'}
        </div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={brandProfileStatus === 'not_started'}
          aria-describedby={helperId}
          aria-disabled={brandProfileStatus === 'not_started'}
          aria-label={
            brandProfileStatus === 'not_started'
              ? 'Generate Content is disabled until BrandOS is complete'
              : undefined
          }
          className="w-full py-4 rounded-[12px] transition-all relative overflow-hidden mb-3"
          style={{
            background: canGenerate
              ? 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)'
              : 'rgba(255, 255, 255, 0.08)',
            color: canGenerate ? '#0E0F14' : '#8B8F9E',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow:
              '0 12px 32px rgba(255, 191, 222, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            opacity: brandProfileStatus === 'not_started' ? 0.55 : 1,
            cursor: brandProfileStatus === 'not_started' ? 'not-allowed' : 'pointer',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'rgba(255, 255, 255, 0.5)' }}
          />
          Generate {currentType?.label ?? 'Content'}
        </button>
        <div id={helperId} className="mb-3">
          {brandProfileStatus === 'complete' ? (
            <HelperNote variant="success">Brand Profile Connected ✓</HelperNote>
          ) : brandProfileStatus === 'in_progress' ? (
            <HelperNote variant="warning">
              <div className="space-y-2">
                <div>Your Brand Profile is incomplete.</div>
                <div className="flex items-center gap-2">
                  <span>Generated content may not fully reflect your brand voice.</span>
                  <button
                    type="button"
                    onClick={onOpenBrandOS}
                    className="shrink-0"
                    style={{
                      color: '#FFBFDE',
                      textDecoration: 'none',
                      fontWeight: 600,
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    Open BrandOS →
                  </button>
                </div>
              </div>
            </HelperNote>
          ) : (
            <HelperNote variant="info">
              <div className="space-y-2">
                <div>Complete BrandOS to unlock brand-aware content generation.</div>
                <button
                  type="button"
                  onClick={onOpenBrandOS}
                  style={{
                    color: '#FFBFDE',
                    textDecoration: 'none',
                    fontWeight: 600,
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  Open BrandOS →
                </button>
              </div>
            </HelperNote>
          )}
        </div>
        <button
          type="button"
          onClick={onClearAll}
          className="w-full py-3 rounded-[8px] transition-colors hover:bg-opacity-80"
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#B4B8C7',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
