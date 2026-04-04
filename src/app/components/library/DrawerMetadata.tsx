import { Badge } from '../shared';

type Asset = {
  brandVoice: string;
  status: string;
};

type DrawerMetadataProps = {
  asset: Asset;
};

export function DrawerMetadata({ asset }: DrawerMetadataProps) {
  return (
    <div className="mb-6">
      <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Metadata
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between" style={{ fontSize: '14px' }}>
          <span style={{ color: '#8B8F9E' }}>Brand Voice</span>
          <span style={{ color: '#F4F3F8', fontWeight: 500 }}>{asset.brandVoice}</span>
        </div>
        <div className="flex items-center justify-between" style={{ fontSize: '14px' }}>
          <span style={{ color: '#8B8F9E' }}>Status</span>
          <Badge variant="pink" size="sm">{asset.status}</Badge>
        </div>
      </div>
    </div>
  );
}