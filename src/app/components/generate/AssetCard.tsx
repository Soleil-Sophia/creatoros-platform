import { Badge } from '../shared';

type AssetCardProps = {
  type: 'hooks' | 'script' | 'captions';
  title: string;
  subtitle: string;
  accentColor: string;
  icon: React.ReactNode;
  items: string[];
  wordCount: number;
  children?: React.ReactNode;
  onSave?: () => void;
  saveStatus?: 'idle' | 'saving' | 'saved';
};

export function AssetCard({
  type,
  title,
  subtitle,
  accentColor,
  icon,
  items,
  wordCount,
  children,
  onSave,
  saveStatus = 'idle'
}: AssetCardProps) {
  return (
    <div 
      className="rounded-[16px] overflow-hidden relative"
      style={{ 
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)'
      }}
    >
      {/* Top accent light */}
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}66 30%, ${accentColor}66 70%, transparent)` }}
      ></div>
      
      {/* Header */}
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
              background: accentColor === 'rgba(255, 191, 222' ? 'linear-gradient(135deg, #FFBFDE, #E7C6F3)' : 'linear-gradient(135deg, #E7C6F3, #DABFFF)',
              boxShadow: `0 6px 20px ${accentColor}66, inset 0 1px 0 rgba(255, 255, 255, 0.5)`
            }}
          >
            {icon}
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '3px' }}>{title}</h3>
            <span style={{ fontSize: '12px', color: '#B4B8C7' }}>{subtitle}</span>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            disabled
            title="Soon"
            aria-label="Regenerate — coming soon"
            className="px-4 py-2 rounded-[8px] flex items-center gap-1.5"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed rgba(255, 255, 255, 0.12)',
              color: '#8B8F9E',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'not-allowed',
              opacity: 0.6,
            }}
          >
            Regenerate
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', color: '#8B8F9E' }}>
              SOON
            </span>
          </button>
          <button
            type="button"
            disabled
            title="Soon"
            aria-label="Copy all — coming soon"
            className="px-4 py-2 rounded-[8px] flex items-center gap-1.5"
            style={{
              background: 'rgba(255, 191, 222, 0.06)',
              border: '1px dashed rgba(255, 191, 222, 0.2)',
              color: '#B4B8C7',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'not-allowed',
              opacity: 0.7,
            }}
          >
            Copy All
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', color: '#8B8F9E' }}>
              SOON
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-3.5">
        {items.map((item, idx) => (
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
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {children}

      {/* Footer */}
      <div 
        className="px-7 py-4 border-t flex items-center justify-between"
        style={{ 
          background: 'rgba(23, 25, 35, 0.4)',
          borderColor: 'rgba(255, 255, 255, 0.06)'
        }}
      >
        <div className="flex items-center gap-4">
          <span style={{ fontSize: '12px', color: '#B4B8C7' }}>
            {items.length} assets · {wordCount} words
          </span>
          <div className="w-px h-4" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
          <Badge variant="pink" size="sm">{type}</Badge>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === 'saving' && (
            <span
              aria-live="polite"
              style={{ fontSize: '12px', fontWeight: 600, color: '#B4B8C7' }}
            >
              Saving…
            </span>
          )}
          {saveStatus === 'saved' && (
            <span
              aria-live="polite"
              style={{ fontSize: '12px', fontWeight: 600, color: '#FFBFDE' }}
            >
              Saved to Library ✓
            </span>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={!onSave || saveStatus !== 'idle'}
            aria-disabled={!onSave || saveStatus !== 'idle'}
            className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#F4F3F8',
              fontSize: '12px',
              fontWeight: 600,
              cursor: onSave && saveStatus === 'idle' ? 'pointer' : 'not-allowed',
              opacity: saveStatus === 'idle' ? 1 : 0.6,
            }}
          >
            {saveStatus === 'saving'
              ? 'Saving…'
              : saveStatus === 'saved'
              ? 'Saved ✓'
              : 'Save to Library'}
          </button>
        </div>
      </div>
    </div>
  );
}