import { SectionLabel } from '../shared';

type OutputWorkspaceHeaderProps = {
  sessionId: string;
  timestamp: string;
  title: string;
  subtitle: string;
  onSave: () => void;
  saveStatus?: 'idle' | 'saving' | 'saved';
};

export function OutputWorkspaceHeader({
  sessionId,
  timestamp,
  title,
  subtitle,
  onSave,
  saveStatus = 'idle',
}: OutputWorkspaceHeaderProps) {
  const saveDisabled = saveStatus !== 'idle';
  return (
    <div 
      className="p-8 pb-6 border-b flex items-center justify-between relative"
      style={{ 
        background: 'linear-gradient(135deg, #171923 0%, #0E0F14 100%)',
        borderColor: 'rgba(255, 255, 255, 0.08)'
      }}
    >
      <div>
        <div className="mb-3 flex items-center gap-3">
          <SectionLabel>Output Workspace</SectionLabel>
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
            {timestamp ? `${sessionId} · ${timestamp}` : sessionId}
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
          {title}
        </h2>
        <p style={{ fontSize: '13px', color: '#B4B8C7', marginTop: '6px' }}>
          {subtitle}
        </p>
      </div>
      <button
        type="button"
        onClick={onSave}
        disabled={saveDisabled}
        aria-disabled={saveDisabled}
        className="px-6 py-3 rounded-[12px] transition-all hover:opacity-90"
        style={{
          background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#F4F3F8',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          cursor: saveDisabled ? 'not-allowed' : 'pointer',
          opacity: saveDisabled ? 0.65 : 1,
        }}
      >
        {saveStatus === 'saving'
          ? 'Saving…'
          : saveStatus === 'saved'
          ? 'Saved ✓'
          : 'Save Suite to Library'}
      </button>
    </div>
  );
}