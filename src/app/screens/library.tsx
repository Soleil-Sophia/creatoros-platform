import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { LibraryTopbar } from '../components/library/LibraryTopbar';
import { OrganizationRail } from '../components/library/OrganizationRail';
import { LibraryToolbar } from '../components/library/LibraryToolbar';
import { AssetGrid } from '../components/library/AssetGrid';
import { AssetList } from '../components/library/AssetList';
import { PreviewDrawer } from '../components/library/PreviewDrawer';
import { EmptyState } from '../components/shared';
import { listSavedAssets, deleteSavedAsset } from '../lib/content-library/storage';
import type { CreatorRecommendationSnapshot } from '../lib/content-library/recommendationSnapshot';

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'hook-pack' | 'short-script' | 'caption-draft' | 'content-brief' | 'repurposing-plan';
type SortOption = 'recent' | 'oldest' | 'name' | 'type';

type SavedInputs = {
  offer: string;
  audience: string;
  goal: string;
  tone: string;
  outputType: string;
};

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
  source?: 'generated';
  createdAt?: string;
  inputs?: SavedInputs;
  outputType?: string;
  creatorRecommendationSnapshot?: CreatorRecommendationSnapshot;
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy clipboard path.
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    return false;
  }
};

const mockAssets: Asset[] = [
  { id: 1, type: 'hook-pack', title: 'Positioning Hook Pack', preview: '"You don\'t need more ideas. You need a system that turns the ideas you have into content that actually ships."', platform: 'LinkedIn', campaign: 'Launch Campaign Q1', brandVoice: 'Motivational & Direct', date: '2026-03-25', variants: 5, status: 'ready' },
  { id: 2, type: 'short-script', title: 'ChatGPT vs System (60s)', preview: 'POV: You realize chat isn\'t a content system. You\'ve been treating a tool like a strategy...', platform: 'YouTube', campaign: 'Educational Series', brandVoice: 'Motivational & Direct', date: '2026-03-24', variants: 2, status: 'ready' },
  { id: 3, type: 'caption-draft', title: 'Thought Leadership Caption', preview: 'Here\'s what I learned after building 500+ structured content systems. The output isn\'t the hard part...', platform: 'Instagram', campaign: 'Launch Campaign Q1', brandVoice: 'Motivational & Direct', date: '2026-03-23', variants: 3, status: 'ready' },
  { id: 4, type: 'content-brief', title: 'Positioning Series Brief', preview: 'Goal: Drive authority. Angle: Content without positioning is noise. Format: Long-form post + caption thread.', platform: 'Multi-Platform', campaign: 'Launch Campaign Q1', brandVoice: 'Motivational & Direct', date: '2026-03-22', variants: 1, status: 'ready' },
  { id: 5, type: 'hook-pack', title: 'Authority Hook Pack', preview: '"After working with 1,000+ creators, I\'ve seen the same positioning mistake kill every content strategy."', platform: 'LinkedIn', campaign: 'Batch Content — April', brandVoice: 'Professional & Clear', date: '2026-03-20', variants: 5, status: 'ready' },
  { id: 6, type: 'short-script', title: 'Creator Burnout Script (3min)', preview: 'The difference between creators who scale and those who burn out isn\'t talent. It\'s systems...', platform: 'YouTube', campaign: 'Educational Series', brandVoice: 'Motivational & Direct', date: '2026-03-18', variants: 1, status: 'ready' },
  { id: 7, type: 'repurposing-plan', title: 'LinkedIn → Multi-Platform Plan', preview: 'Source: Long-form LinkedIn post. → Instagram: 3 carousel slides. → YouTube Short: 60s script. → Email: Newsletter section.', platform: 'Multi-Platform', campaign: 'Batch Content — April', brandVoice: 'Professional & Clear', date: '2026-03-17', variants: 1, status: 'ready' },
  { id: 8, type: 'caption-draft', title: 'Conversion Caption', preview: 'Content without positioning is noise. Content with positioning is demand generation. Here\'s the difference...', platform: 'Instagram', campaign: 'Launch Campaign Q1', brandVoice: 'Motivational & Direct', date: '2026-03-15', variants: 2, status: 'ready' },
  { id: 9, type: 'content-brief', title: 'Community Building Brief', preview: 'Goal: Build trust and audience. Angle: What creators get wrong about engagement. Format: Carousel + caption.', platform: 'Instagram', campaign: 'Educational Series', brandVoice: 'Conversational & Warm', date: '2026-03-14', variants: 1, status: 'ready' },
];

export function LibraryScreen({ showTopbar = true }: { showTopbar?: boolean } = {}) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleReuse = (asset: Asset) => {
    let reuseAsset: Asset = asset;
    if (asset.source === 'generated' && typeof asset.id === 'string') {
      const saved = listSavedAssets().find((candidate) => candidate.id === asset.id);
      if (saved) {
        reuseAsset = {
          ...asset,
          inputs: saved.inputs,
          outputType: saved.type,
          creatorRecommendationSnapshot: saved.creatorRecommendationSnapshot,
        };
      }
    }
    navigate('/app/content-os/generate', {
      state: { reuseAsset, source: 'library' },
    });
  };

  const [refreshTick, setRefreshTick] = useState(0);

  const allAssets: Asset[] = useMemo(() => {
    const saved = listSavedAssets().map<Asset>((asset) => ({
      id: asset.id,
      type: asset.type,
      title: asset.title,
      preview: asset.preview,
      platform: asset.platform,
      campaign: asset.campaign,
      brandVoice: asset.brandVoice,
      date: asset.date,
      variants: asset.variants,
      status: asset.status,
      source: 'generated',
      createdAt: asset.createdAt,
      creatorRecommendationSnapshot: asset.creatorRecommendationSnapshot,
    }));
    return [...saved, ...mockAssets];
  }, [refreshTick]);

  const handleDeleteSavedAsset = (asset: Asset) => {
    if (asset.source !== 'generated' || typeof asset.id !== 'string') return;
    deleteSavedAsset(asset.id);
    setSelectedAsset(null);
    setRefreshTick((current) => current + 1);
  };

  const assetCounts = {
    all: allAssets.length,
    'hook-pack': allAssets.filter((asset) => asset.type === 'hook-pack').length,
    'short-script': allAssets.filter((asset) => asset.type === 'short-script').length,
    'caption-draft': allAssets.filter((asset) => asset.type === 'caption-draft').length,
    'content-brief': allAssets.filter((asset) => asset.type === 'content-brief').length,
    'repurposing-plan': allAssets.filter((asset) => asset.type === 'repurposing-plan').length,
  };

  const filteredAssets = allAssets
    .filter((asset) => {
      if (filterType !== 'all' && asset.type !== filterType) return false;
      if (searchQuery && !asset.title.toLowerCase().includes(searchQuery.toLowerCase()) && !asset.preview.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const aTime = new Date(a.createdAt ?? a.date).getTime();
      const bTime = new Date(b.createdAt ?? b.date).getTime();
      if (sortOption === 'recent') return bTime - aTime;
      if (sortOption === 'oldest') return aTime - bTime;
      if (sortOption === 'name') return a.title.localeCompare(b.title);
      if (sortOption === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

  return (
    <div className={`${showTopbar ? 'min-h-screen' : 'h-full'} flex flex-col`} style={{ background: '#0E0F14' }}>
      {showTopbar && <LibraryTopbar />}
      <div className="flex-1 flex">
        <OrganizationRail filterType={filterType} onFilterChange={setFilterType} assetCounts={assetCounts} />
        <div className="flex-1 flex flex-col">
          <LibraryToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} viewMode={viewMode} onViewModeChange={setViewMode} sortOption={sortOption} onSortChange={setSortOption} />
          <div className="flex-1 overflow-y-auto p-8">
            {filteredAssets.length === 0 ? (
              <EmptyState />
            ) : viewMode === 'grid' ? (
              <AssetGrid assets={filteredAssets} onAssetClick={setSelectedAsset} onAssetCopy={copyToClipboard} onAssetReuse={handleReuse} />
            ) : (
              <AssetList assets={filteredAssets} onAssetClick={setSelectedAsset} onAssetCopy={copyToClipboard} onAssetReuse={handleReuse} />
            )}
          </div>
        </div>

        {selectedAsset && (
          <PreviewDrawer
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
            onCopy={(text) => copyToClipboard(text)}
            onReuse={() => handleReuse(selectedAsset)}
            onDelete={selectedAsset.source === 'generated' ? () => handleDeleteSavedAsset(selectedAsset) : undefined}
          />
        )}
      </div>
    </div>
  );
}
