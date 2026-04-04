import { Link } from 'react-router';
import { Badge } from '../shared';

type ReuseAsset = {
  type: string;
  title: string;
  platform: string;
  campaign?: string;
};

type ReuseBannerProps = {
  asset: ReuseAsset;
  onClearAndStartFresh: () => void;
  onDismiss: () => void;
};

export function ReuseBanner({ asset, onClearAndStartFresh, onDismiss }: ReuseBannerProps) {
  return (
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
                <Badge variant="pink" size="sm">{asset.type.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>
                  {asset.title}
                </h3>
                <span style={{ fontSize: '12px', color: '#8B8F9E' }}>·</span>
                <span style={{ fontSize: '12px', color: '#8B8F9E' }}>
                  {asset.platform}
                </span>
                {asset.campaign && (
                  <>
                    <span style={{ fontSize: '12px', color: '#6B6E7D' }}>·</span>
                    <span style={{ fontSize: '12px', color: '#6B6E7D' }}>
                      {asset.campaign}
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
              onClick={onClearAndStartFresh}
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
              onClick={onDismiss}
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
  );
}