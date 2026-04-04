type Asset = {
  id: number;
  type: string;
  title: string;
  preview: string;
  platform: string;
  date: string;
  variants: number;
};

type AssetCardGridProps = {
  asset: Asset;
  onClick: () => void;
  onCopy: (text: string) => void;
  onReuse: () => void;
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

export function AssetCardGrid({ asset, onClick, onCopy, onReuse }: AssetCardGridProps) {
  return (
    <div
      onClick={onClick}
      className="p-6 rounded-[16px] cursor-pointer transition-all hover:border-opacity-100"
      style={{
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header */}
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
        {asset.variants > 1 && (
          <div style={{ fontSize: '11px', color: '#8B8F9E', fontWeight: 500 }}>
            {asset.variants} variants
          </div>
        )}
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginBottom: '12px' }}>
        {asset.title}
      </h3>

      {/* Preview */}
      <p 
        className="mb-4 line-clamp-3"
        style={{ 
          fontSize: '14px', 
          color: '#B4B8C7', 
          lineHeight: 1.5,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}
      >
        {asset.preview}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
          {asset.platform}
        </div>
        <div style={{ fontSize: '12px', color: '#6B6F7E' }}>•</div>
        <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
          {new Date(asset.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopy(asset.preview);
          }}
          className="flex-1 px-3 py-2 rounded-lg transition-all hover:opacity-80"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.15), rgba(255, 191, 222, 0.1))',
            border: '1px solid rgba(255, 191, 222, 0.25)',
            color: '#FFBFDE',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          Copy
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReuse();
          }}
          className="flex-1 px-3 py-2 rounded-lg transition-all hover:opacity-80 flex items-center justify-center gap-1.5"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#F4F3F8',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 7L7 4M10 7L7 10M10 7H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Use
        </button>
      </div>
    </div>
  );
}
