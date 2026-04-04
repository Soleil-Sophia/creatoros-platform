type ViewMode = 'grid' | 'list';

type ViewToggleProps = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div 
      className="flex items-center gap-1 p-1 rounded-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <button
        onClick={() => onChange('grid')}
        className="px-3 py-1.5 rounded transition-all"
        style={{
          background: mode === 'grid' ? 'rgba(255, 191, 222, 0.15)' : 'transparent',
          color: mode === 'grid' ? '#FFBFDE' : '#8B8F9E',
          fontSize: '13px',
          fontWeight: 600
        }}
      >
        Grid
      </button>
      <button
        onClick={() => onChange('list')}
        className="px-3 py-1.5 rounded transition-all"
        style={{
          background: mode === 'list' ? 'rgba(255, 191, 222, 0.15)' : 'transparent',
          color: mode === 'list' ? '#FFBFDE' : '#8B8F9E',
          fontSize: '13px',
          fontWeight: 600
        }}
      >
        List
      </button>
    </div>
  );
}
