type Asset = {
  id: number;
  type: string;
  title: string;
  preview: string;
  platform: string;
  date: string;
  variants: number;
};

type AssetRowListProps = {
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

export function AssetRowList({ asset, onClick, onCopy, onReuse }: AssetRowListProps) {
  return (
    <div
      className="p-5 rounded-[12px] transition-all hover:border-opacity-100 flex items-center gap-5"
      style={{
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Type Badge */}
      <div 
        className="px-3 py-1.5 rounded-lg flex-shrink-0"
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

      {/* Content - clickable area */}
      <div 
        onClick={onClick}
        className="flex-1 min-w-0 cursor-pointer"
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
          {asset.title}
        </h3>
        <p 
          className="truncate"
          style={{ fontSize: '13px', color: '#8B8F9E' }}
        >
          {asset.preview}
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <div style={{ fontSize: '13px', color: '#8B8F9E' }}>
          {asset.platform}
        </div>
        <div style={{ fontSize: '13px', color: '#8B8F9E' }}>
          {new Date(asset.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        {asset.variants > 1 && (
          <div style={{ fontSize: '12px', color: '#6B6F7E' }}>
            {asset.variants} variants
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopy(asset.preview);
          }}
          className="px-4 py-2 rounded-lg transition-all hover:opacity-80"
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
          className="px-4 py-2 rounded-lg transition-all hover:opacity-80 flex items-center gap-1.5"
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
