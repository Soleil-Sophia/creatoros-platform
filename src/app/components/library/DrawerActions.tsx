type DrawerActionsProps = {
  onCopy: () => void;
  onReuse: () => void;
};

export function DrawerActions({ onCopy, onReuse }: DrawerActionsProps) {
  return (
    <div className="p-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
      <div className="space-y-3">
        <button
          onClick={onCopy}
          className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-90 flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
            color: '#0E0F14',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(255, 191, 222, 0.3)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Copy Content
        </button>
        <button
          onClick={onReuse}
          className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-80 flex items-center justify-center gap-2"
          style={{
            background: 'rgba(255, 191, 222, 0.12)',
            border: '1px solid rgba(255, 191, 222, 0.2)',
            color: '#FFBFDE',
            fontSize: '15px',
            fontWeight: 600
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8L8 4M12 8L8 12M12 8H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Use in Generate
        </button>
        
        {/* Coming Soon */}
        <div className="relative">
          <button
            disabled
            className="w-full px-4 py-3 rounded-[12px] transition-all cursor-not-allowed"
            style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid rgba(255, 255, 255, 0.04)', 
              color: '#6B6F7E', 
              fontSize: '15px', 
              fontWeight: 600, 
              opacity: 0.5
            }}
          >
            Add to Planner
          </button>
          <div 
            className="absolute top-1/2 right-3 -translate-y-1/2 px-2 py-0.5 rounded"
            style={{ 
              background: 'rgba(255, 191, 222, 0.15)', 
              fontSize: '9px', 
              color: '#FFBFDE', 
              fontWeight: 600, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em'
            }}
          >
            Coming Soon
          </div>
        </div>
        <button
          className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-80"
          style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            color: '#F4F3F8', 
            fontSize: '15px', 
            fontWeight: 600
          }}
        >
          Export
        </button>
      </div>

      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
        <button
          className="w-full px-4 py-2 rounded-lg transition-all hover:opacity-80"
          style={{ 
            background: 'transparent', 
            border: '1px solid rgba(255, 255, 255, 0.06)', 
            color: '#8B8F9E', 
            fontSize: '13px', 
            fontWeight: 500
          }}
        >
          Archive Asset
        </button>
      </div>
    </div>
  );
}
