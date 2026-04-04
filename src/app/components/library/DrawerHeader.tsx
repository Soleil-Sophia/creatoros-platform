type Asset = {
  type: string;
  title: string;
  platform: string;
  campaign: string;
  date: string;
};

type DrawerHeaderProps = {
  asset: Asset;
  onClose: () => void;
};

const typeColors: Record<string, string> = {
  hook: '#FFBFDE',
  script: '#E7C6F3',
  caption: '#DABFFF',
  plan: '#FFBFDE'
};

const typeLabels: Record<string, string> = {
  hook: 'Hook',
  script: 'Script',
  caption: 'Caption',
  plan: 'Content Plan'
};

export function DrawerHeader({ asset, onClose }: DrawerHeaderProps) {
  return (
    <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
      <div className="flex items-start justify-between mb-4">
        <div 
          className="px-2 py-1 rounded-lg"
          style={{
            background: `${typeColors[asset.type]}20`,
            border: `1px solid ${typeColors[asset.type]}40`,
            fontSize: '11px',
            color: typeColors[asset.type],
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}
        >
          {typeLabels[asset.type]}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#B4B8C7'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#F4F3F8', marginBottom: '12px' }}>
        {asset.title}
      </h2>

      <div className="flex items-center gap-3 text-sm" style={{ color: '#8B8F9E' }}>
        <span>{asset.platform}</span>
        <span>•</span>
        <span>{asset.campaign}</span>
        <span>•</span>
        <span>{new Date(asset.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </div>
  );
}
