import { FilterItem } from './FilterItem';

type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

type FilterGroupProps = {
  title: string;
  options: FilterOption[];
  activeValue?: string;
  onFilterChange?: (value: string) => void;
};

export function FilterGroup({ title, options, activeValue, onFilterChange }: FilterGroupProps) {
  return (
    <div className="mb-6">
      <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <FilterItem
            key={option.value}
            label={option.label}
            count={option.count}
            active={activeValue === option.value}
            onClick={() => onFilterChange?.(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
