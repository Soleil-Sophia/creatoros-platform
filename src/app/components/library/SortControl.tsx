type SortOption = 'recent' | 'oldest' | 'name' | 'type';

type SortControlProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
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
  );
}
