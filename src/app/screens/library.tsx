import { useState } from 'react';

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'hooks' | 'scripts' | 'captions' | 'plans';
type SortOption = 'recent' | 'oldest' | 'name' | 'type';

// Mock data - in real app this would come from backend/state
const mockAssets = [
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

const typeLabels: Record<string, string> = {
  hook: 'Hook',
  script: 'Script',
  caption: 'Caption',
  plan: 'Content Plan'
};

const typeColors: Record<string, string> = {
  hook: '#FFBFDE',
  script: '#E7C6F3',
  caption: '#DABFFF',
  plan: '#FFBFDE'
};

export function LibraryScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<typeof mockAssets[0] | null>(null);

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
      {/* Top Bar - Consistent with Generate Screen */}
      <div 
        className="border-b"
        style={{ 
          background: '#171923',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="max-w-[1800px] mx-auto px-8 py-5 flex items-center justify-between">
          {/* Left: Module Identity */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center" 
                style={{ 
                  background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="w-4 h-4 rounded" style={{ background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)' }}></div>
              </div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#F4F3F8' }}>CreatorOS</span>
            </div>
            <div className="w-px h-5" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>Content OS</span>
              <div 
                className="px-2 py-0.5 rounded" 
                style={{ 
                  background: 'rgba(255, 191, 222, 0.12)', 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  color: '#FFBFDE', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}
              >
                Module 01
              </div>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="flex items-center gap-3">
            <button 
              className="px-4 py-2 rounded-lg transition-colors"
              style={{ 
                background: '#262A38',
                border: '1px solid rgba(255, 191, 222, 0.2)',
                color: '#F4F3F8',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Library
            </button>
            <a 
              href="/app/content-os/generate"
              className="px-4 py-2 rounded-lg transition-colors"
              style={{ 
                background: '#1F2230',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#B4B8C7',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              Generate
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Organization Rail - Left 30% */}
        <div 
          className="w-[30%] border-r p-6 flex flex-col"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(180deg, rgba(31, 34, 48, 0.4) 0%, rgba(23, 25, 35, 0.2) 100%)'
          }}
        >
          {/* Library Title */}
          <div className="mb-8">
            <div 
              className="px-3 py-1 rounded-lg inline-block mb-3" 
              style={{ 
                background: 'rgba(255, 191, 222, 0.12)', 
                border: '1px solid rgba(255, 191, 222, 0.2)',
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#FFBFDE', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}
            >
              Content OS
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F4F3F8', marginBottom: '8px' }}>
              Library
            </h1>
            <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.5 }}>
              Your saved content assets, ready to reuse and deploy.
            </p>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto">
            {/* Content Type Filter */}
            <div className="mb-6">
              <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Content Type
              </div>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Assets', count: mockAssets.length },
                  { value: 'hooks', label: 'Hooks', count: mockAssets.filter(a => a.type === 'hook').length },
                  { value: 'scripts', label: 'Scripts', count: mockAssets.filter(a => a.type === 'script').length },
                  { value: 'captions', label: 'Captions', count: mockAssets.filter(a => a.type === 'caption').length },
                  { value: 'plans', label: 'Content Plans', count: mockAssets.filter(a => a.type === 'plan').length }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterType(filter.value as FilterType)}
                    className="w-full px-3 py-2 rounded-lg text-left flex items-center justify-between transition-all"
                    style={{
                      background: filterType === filter.value ? 'rgba(255, 191, 222, 0.12)' : 'transparent',
                      border: filterType === filter.value ? '1px solid rgba(255, 191, 222, 0.2)' : '1px solid transparent',
                      color: filterType === filter.value ? '#FFBFDE' : '#B4B8C7',
                      fontSize: '14px',
                      fontWeight: filterType === filter.value ? 600 : 500
                    }}
                  >
                    <span>{filter.label}</span>
                    <span style={{ fontSize: '12px', opacity: 0.7 }}>{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Campaigns */}
            <div className="mb-6">
              <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Campaigns
              </div>
              <div className="space-y-2">
                {['Launch Campaign Q1', 'Educational Series', 'Batch Content — Instagram'].map((campaign) => (
                  <button
                    key={campaign}
                    className="w-full px-3 py-2 rounded-lg text-left transition-all"
                    style={{
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: '#B4B8C7',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    {campaign}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div className="mb-6">
              <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Platform
              </div>
              <div className="space-y-2">
                {['Instagram', 'YouTube', 'LinkedIn', 'Multi-Platform'].map((platform) => (
                  <button
                    key={platform}
                    className="w-full px-3 py-2 rounded-lg text-left transition-all"
                    style={{
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: '#B4B8C7',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
            <a
              href="/app/content-os/generate"
              className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(255, 191, 222, 0.3)',
                textDecoration: 'none'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              New Generation
            </a>
          </div>
        </div>

        {/* Library Workspace - Right 70% */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div 
            className="px-8 py-5 border-b flex items-center justify-between"
            style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-[12px] transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#F4F3F8',
                    fontSize: '14px'
                  }}
                />
                <svg 
                  className="absolute left-3 top-1/2 -translate-y-1/2" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7" cy="7" r="4" stroke="#8B8F9E" strokeWidth="1.5"/>
                  <path d="M10 10L13 13" stroke="#8B8F9E" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* View Toggle & Sort */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="px-3 py-2 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#B4B8C7',
                  fontSize: '14px'
                }}
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
              </select>

              {/* View Toggle */}
              <div 
                className="flex items-center gap-1 p-1 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className="px-3 py-1.5 rounded transition-all"
                  style={{
                    background: viewMode === 'grid' ? 'rgba(255, 191, 222, 0.15)' : 'transparent',
                    color: viewMode === 'grid' ? '#FFBFDE' : '#8B8F9E',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="px-3 py-1.5 rounded transition-all"
                  style={{
                    background: viewMode === 'list' ? 'rgba(255, 191, 222, 0.15)' : 'transparent',
                    color: viewMode === 'list' ? '#FFBFDE' : '#8B8F9E',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Asset Grid/List */}
          <div className="flex-1 overflow-y-auto p-8">
            {filteredAssets.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div style={{ fontSize: '18px', color: '#8B8F9E', marginBottom: '8px' }}>
                    No assets found
                  </div>
                  <div style={{ fontSize: '14px', color: '#6B6F7E' }}>
                    Try adjusting your filters or create new content
                  </div>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-6">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
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
                          navigator.clipboard.writeText(asset.preview);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg transition-all hover:opacity-80"
                        style={{
                          background: 'rgba(255, 191, 222, 0.12)',
                          border: '1px solid rgba(255, 191, 222, 0.2)',
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
                        }}
                        className="flex-1 px-3 py-2 rounded-lg transition-all hover:opacity-80"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: '#B4B8C7',
                          fontSize: '13px',
                          fontWeight: 600
                        }}
                      >
                        Reuse
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className="p-5 rounded-[12px] cursor-pointer transition-all hover:border-opacity-100 flex items-center gap-5"
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

                    {/* Content */}
                    <div className="flex-1 min-w-0">
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
                          navigator.clipboard.writeText(asset.preview);
                        }}
                        className="px-4 py-2 rounded-lg transition-all hover:opacity-80"
                        style={{
                          background: 'rgba(255, 191, 222, 0.12)',
                          border: '1px solid rgba(255, 191, 222, 0.2)',
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
                        }}
                        className="px-4 py-2 rounded-lg transition-all hover:opacity-80"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: '#B4B8C7',
                          fontSize: '13px',
                          fontWeight: 600
                        }}
                      >
                        Reuse
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview Drawer - Conditionally rendered */}
        {selectedAsset && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSelectedAsset(null)}
            />
            
            {/* Drawer */}
            <div 
              className="fixed right-0 top-0 bottom-0 w-[480px] z-50 overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '-16px 0 48px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Header */}
              <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="px-2 py-1 rounded-lg"
                    style={{
                      background: `${typeColors[selectedAsset.type]}20`,
                      border: `1px solid ${typeColors[selectedAsset.type]}40`,
                      fontSize: '11px',
                      color: typeColors[selectedAsset.type],
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {typeLabels[selectedAsset.type]}
                  </div>
                  <button
                    onClick={() => setSelectedAsset(null)}
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
                  {selectedAsset.title}
                </h2>

                <div className="flex items-center gap-3 text-sm" style={{ color: '#8B8F9E' }}>
                  <span>{selectedAsset.platform}</span>
                  <span>•</span>
                  <span>{selectedAsset.campaign}</span>
                  <span>•</span>
                  <span>{new Date(selectedAsset.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Content */}
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
                    {selectedAsset.preview}
                  </div>
                </div>

                {selectedAsset.variants > 1 && (
                  <div className="mb-6">
                    <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Variants ({selectedAsset.variants})
                    </div>
                    <div className="space-y-2">
                      {Array.from({ length: Math.min(selectedAsset.variants, 3) }).map((_, idx) => (
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

                <div className="mb-6">
                  <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Metadata
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between" style={{ fontSize: '14px' }}>
                      <span style={{ color: '#8B8F9E' }}>Brand Voice</span>
                      <span style={{ color: '#F4F3F8', fontWeight: 500 }}>{selectedAsset.brandVoice}</span>
                    </div>
                    <div className="flex items-center justify-between" style={{ fontSize: '14px' }}>
                      <span style={{ color: '#8B8F9E' }}>Status</span>
                      <span 
                        className="px-2 py-1 rounded"
                        style={{ 
                          background: 'rgba(255, 191, 222, 0.15)',
                          color: '#FFBFDE',
                          fontSize: '12px',
                          fontWeight: 600,
                          textTransform: 'uppercase'
                        }}
                      >
                        {selectedAsset.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="space-y-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(selectedAsset.preview)}
                    className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-90 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                      color: '#0E0F14',
                      fontSize: '15px',
                      fontWeight: 600,
                      boxShadow: '0 8px 24px rgba(255, 191, 222, 0.3)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Copy Content
                  </button>
                  <button
                    className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-80"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#F4F3F8',
                      fontSize: '15px',
                      fontWeight: 600
                    }}
                  >
                    Reuse in Generate
                  </button>
                  <button
                    className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-80"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#F4F3F8',
                      fontSize: '15px',
                      fontWeight: 600
                    }}
                  >
                    Add to Planner
                  </button>
                  <button
                    className="w-full px-4 py-3 rounded-[12px] transition-all hover:opacity-80"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#F4F3F8',
                      fontSize: '15px',
                      fontWeight: 600
                    }}
                  >
                    Export
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                  <button
                    className="w-full px-4 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      color: '#8B8F9E',
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    Archive Asset
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}