import { Link } from 'react-router';
import { PageHeader } from './PageHeader';
import { FilterGroup } from './FilterGroup';

type FilterType = 'all' | 'hook-pack' | 'short-script' | 'caption-draft' | 'content-brief' | 'repurposing-plan';

type OrganizationRailProps = {
  filterType: FilterType;
  onFilterChange: (filter: FilterType) => void;
  assetCounts: {
    all: number;
    'hook-pack': number;
    'short-script': number;
    'caption-draft': number;
    'content-brief': number;
    'repurposing-plan': number;
  };
};

export function OrganizationRail({ filterType, onFilterChange, assetCounts }: OrganizationRailProps) {
  return (
    <div 
      className="w-[30%] border-r p-6 flex flex-col"
      style={{ 
        borderColor: 'rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(180deg, rgba(31, 34, 48, 0.4) 0%, rgba(23, 25, 35, 0.2) 100%)'
      }}
    >
      {/* Library Title */}
      <PageHeader
        title="Library"
        description="Your saved content assets, ready to reuse and deploy."
      />

      {/* Filters */}
      <div className="flex-1 overflow-y-auto">
        {/* Content Type Filter */}
        <FilterGroup
          title="Content Type"
          options={[
            { value: 'all', label: 'All Outputs', count: assetCounts.all },
            { value: 'hook-pack', label: 'Hook Pack', count: assetCounts['hook-pack'] },
            { value: 'short-script', label: 'Short Script', count: assetCounts['short-script'] },
            { value: 'caption-draft', label: 'Caption Draft', count: assetCounts['caption-draft'] },
            { value: 'content-brief', label: 'Content Brief', count: assetCounts['content-brief'] },
            { value: 'repurposing-plan', label: 'Repurposing Plan', count: assetCounts['repurposing-plan'] },
          ]}
          activeValue={filterType}
          onFilterChange={(value) => onFilterChange(value as FilterType)}
        />

        {/* Campaigns */}
        <FilterGroup
          title="Campaigns"
          options={[
            { value: 'launch-q1', label: 'Launch Campaign Q1' },
            { value: 'educational', label: 'Educational Series' },
            { value: 'batch-ig', label: 'Batch Content — Instagram' }
          ]}
        />

        {/* Platform */}
        <FilterGroup
          title="Platform"
          options={[
            { value: 'instagram', label: 'Instagram' },
            { value: 'youtube', label: 'YouTube' },
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'multi', label: 'Multi-Platform' }
          ]}
        />
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
        <Link
          to="/app/content-os/generate"
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
        </Link>
      </div>
    </div>
  );
}