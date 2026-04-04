import { SearchInput } from './SearchInput';
import { ViewToggle } from './ViewToggle';
import { SortControl } from './SortControl';

type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'oldest' | 'name' | 'type';

type LibraryToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
};

export function LibraryToolbar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortOption,
  onSortChange
}: LibraryToolbarProps) {
  return (
    <div 
      className="px-8 py-5 border-b flex items-center justify-between"
      style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search assets..."
        />
      </div>

      {/* View Toggle & Sort */}
      <div className="flex items-center gap-3">
        <SortControl value={sortOption} onChange={onSortChange} />
        <ViewToggle mode={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
}
