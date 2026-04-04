import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LibraryTopbar } from '../components/library/LibraryTopbar';
import { OrganizationRail } from '../components/library/OrganizationRail';
import { LibraryToolbar } from '../components/library/LibraryToolbar';
import { AssetGrid } from '../components/library/AssetGrid';
import { AssetList } from '../components/library/AssetList';
import { PreviewDrawer } from '../components/library/PreviewDrawer';
import { EmptyState } from '../components/shared';

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'hooks' | 'scripts' | 'captions' | 'plans';
type SortOption = 'recent' | 'oldest' | 'name' | 'type';

type Asset = {
  id: number;
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

// Copy to clipboard helper
const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fall through
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
  } catch (err) {
    console.error('Copy to clipboard failed:', err);
    return false;
  }
};

// Mock data
const mockAssets: Asset[] = [
  {
    id: 1,
    type: 'hook',
    title: 'Problem-Solution Hook',
    preview: '"You don\'t need more ideas. You need a system that turns the ideas you have into content that actually ships."',
    platform: 'Instagram',
    campaign: 'Launch Campaign Q1',
    brandVoice: 'Motivational & Direct',
    date: '2026-03-25',
    variants: 8,
    status: 'ready'
  },
  {
    id: 2,
    type: 'script',
    title: 'Short-Form Script (60s)',
    preview: 'POV: You realize chat isn\'t a content system...',
    platform: 'YouTube',
    campaign: 'Educational Series',
    brandVoice: 'Motivational & Direct',
    date: '2026-03-24',
    variants: 3,
    status: 'ready'
  },
  {
    id: 3,
    type: 'caption',
    title: 'Educational Caption',
    preview: 'Here\'s what I learned after generating 500+ pieces of content with structured systems...',
    platform: 'Instagram',
    campaign: 'Launch Campaign Q1',
    brandVoice: 'Motivational & Direct',
    date: '2026-03-23',
    variants: 12,
    status: 'ready'
  },
  {
    id: 4,
    type: 'plan',
    title: '30-Day Content Plan',
    preview: 'Week 1: Awareness — Problem definition hooks',
    platform: 'Multi-Platform',
    campaign: 'Launch Campaign Q1',
    brandVoice: 'Motivational & Direct',
    date: '2026-03-22',
    variants: 1,
    status: 'ready'
  },
  {
    id: 5,
    type: 'hook',
    title: 'Authority Hook',
    preview: '"After helping 1000+ creators build content systems, I\'ve seen the same mistake kill momentum..."',
    platform: 'LinkedIn',
    campaign: 'Batch Content — Instagram',
    brandVoice: 'Professional & Clear',
    date: '2026-03-20',
    variants: 6,
    status: 'ready'
  },
  {
    id: 6,
    type: 'script',
    title: 'Long-Form Script (3min)',
    preview: 'The difference between content creators who scale and those who burn out...',
    platform: 'YouTube',
    campaign: 'Educational Series',
    brandVoice: 'Motivational & Direct',
    date: '2026-03-18',
    variants: 2,
    status: 'ready'
  }
];

export function LibraryScreen() {
  const navigate = useNavigate();
  
  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Reuse handler
  const handleReuse = (asset: Asset) => {
    navigate('/app/content-os/generate', {
      state: {
        reuseAsset: asset,
        source: 'library'
      }
    });
  };

  // Calculate asset counts
  const assetCounts = {
    all: mockAssets.length,
    hooks: mockAssets.filter(a => a.type === 'hook').length,
    scripts: mockAssets.filter(a => a.type === 'script').length,
    captions: mockAssets.filter(a => a.type === 'caption').length,
    plans: mockAssets.filter(a => a.type === 'plan').length
  };

  // Filter and sort assets
  const filteredAssets = mockAssets
    .filter(asset => {
      if (filterType !== 'all' && asset.type !== filterType) return false;
      if (searchQuery && !asset.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !asset.preview.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOption === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortOption === 'name') return a.title.localeCompare(b.title);
      if (sortOption === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0E0F14' }}>
      {/* Topbar */}
      <LibraryTopbar />

      {/* Library Main - 2-Column Layout */}
      <div className="flex-1 flex">
        {/* Organization Rail (Left 30%) */}
        <OrganizationRail
          filterType={filterType}
          onFilterChange={setFilterType}
          assetCounts={assetCounts}
        />

        {/* Library Workspace (Right 70%) */}
        <div className="flex-1 flex flex-col">
          {/* Library Toolbar */}
          <LibraryToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />

          {/* Asset View */}
          <div className="flex-1 overflow-y-auto p-8">
            {filteredAssets.length === 0 ? (
              <EmptyState />
            ) : viewMode === 'grid' ? (
              <AssetGrid
                assets={filteredAssets}
                onAssetClick={setSelectedAsset}
                onAssetCopy={copyToClipboard}
                onAssetReuse={handleReuse}
              />
            ) : (
              <AssetList
                assets={filteredAssets}
                onAssetClick={setSelectedAsset}
                onAssetCopy={copyToClipboard}
                onAssetReuse={handleReuse}
              />
            )}
          </div>
        </div>

        {/* Preview Drawer (Conditional) */}
        {selectedAsset && (
          <PreviewDrawer
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
            onCopy={(text) => copyToClipboard(text)}
            onReuse={() => handleReuse(selectedAsset)}
          />
        )}
      </div>
    </div>
  );
}