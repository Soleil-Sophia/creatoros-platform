import { DrawerHeader } from './DrawerHeader';
import { DrawerMetadata } from './DrawerMetadata';
import { DrawerActions } from './DrawerActions';

type Asset = {
  id: number | string;
  type: string;
  title: string;
  preview: string;
  platform: string;
  campaign: string;
  brandVoice: string;
  date: string;
  variants: number;
  status: string;
};

type PreviewDrawerProps = {
  asset: Asset;
  onClose: () => void;
  onCopy: (text: string) => void;
  onReuse: () => void;
  onDelete?: () => void;
};

export function PreviewDrawer({ asset, onClose, onCopy, onReuse, onDelete }: PreviewDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer — right sheet on small screens, centered panel on lg+ */}
      <div
        className="
          fixed z-50 overflow-y-auto
          right-0 top-0 bottom-0 w-[480px] max-w-full
          lg:right-auto lg:left-1/2 lg:-translate-x-1/2
          lg:top-8 lg:bottom-8
          lg:w-[min(860px,calc(100vw-96px))]
          lg:rounded-[16px] lg:border lg:border-white/10
        "
        style={{
          background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Drawer Header */}
        <DrawerHeader asset={asset} onClose={onClose} />

        {/* Drawer Content */}
        <div className="p-6">
          <div className="mb-6">
            <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Content
            </div>
            <div 
              className="p-4 rounded-[12px]"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '15px',
                color: '#F4F3F8',
                lineHeight: 1.7
              }}
            >
              {asset.preview}
            </div>
          </div>

          {/* Drawer Variants */}
          {asset.variants > 1 && (
            <div className="mb-6">
              <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Variants ({asset.variants})
              </div>
              <div className="space-y-2">
                {Array.from({ length: Math.min(asset.variants, 3) }).map((_, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg flex items-center justify-between"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '13px',
                      color: '#B4B8C7'
                    }}
                  >
                    <span>Variant {idx + 1}</span>
                    <button style={{ color: '#FFBFDE', fontWeight: 600 }}>View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drawer Metadata */}
          <DrawerMetadata asset={asset} />
        </div>

        {/* Drawer Actions */}
        <DrawerActions 
          onCopy={() => onCopy(asset.preview)}
          onReuse={onReuse}
        />

        {/* Delete saved asset — only rendered when wired (saved assets only). */}
        {onDelete && (
          <div
            className="px-6 py-4 flex justify-end"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
              style={{
                background: 'rgba(255, 99, 132, 0.08)',
                border: '1px solid rgba(255, 99, 132, 0.3)',
                color: '#FF8FA3',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              Delete saved asset
            </button>
          </div>
        )}
      </div>
    </>
  );
}