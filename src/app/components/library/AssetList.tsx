import { AssetRowList } from './AssetRowList';

type Asset = {
  id: number | string;
  type: string;
  title: string;
  preview: string;
  platform: string;
  date: string;
  variants: number;
};

type AssetListProps = {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onAssetCopy: (text: string) => void;
  onAssetReuse: (asset: Asset) => void;
};

export function AssetList({ assets, onAssetClick, onAssetCopy, onAssetReuse }: AssetListProps) {
  return (
    <div className="space-y-3">
      {assets.map((asset) => (
        <AssetRowList
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
