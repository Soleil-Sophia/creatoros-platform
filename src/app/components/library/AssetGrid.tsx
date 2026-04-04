import { AssetCardGrid } from './AssetCardGrid';

type Asset = {
  id: number;
  type: string;
  title: string;
  preview: string;
  platform: string;
  date: string;
  variants: number;
};

type AssetGridProps = {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onAssetCopy: (text: string) => void;
  onAssetReuse: (asset: Asset) => void;
};

export function AssetGrid({ assets, onAssetClick, onAssetCopy, onAssetReuse }: AssetGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {assets.map((asset) => (
        <AssetCardGrid
          key={asset.id}
          asset={asset}
          onClick={() => onAssetClick(asset)}
          onCopy={onAssetCopy}
          onReuse={() => onAssetReuse(asset)}
        />
      ))}
    </div>
  );
}
