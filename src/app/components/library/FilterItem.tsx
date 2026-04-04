type FilterItemProps = {
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
};

export function FilterItem({ label, count, active = false, onClick }: FilterItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 rounded-lg text-left flex items-center justify-between transition-all"
      style={{
        background: active ? 'rgba(255, 191, 222, 0.12)' : 'transparent',
        border: active ? '1px solid rgba(255, 191, 222, 0.2)' : '1px solid transparent',
        color: active ? '#FFBFDE' : '#B4B8C7',
        fontSize: '14px',
        fontWeight: active ? 600 : 500
      }}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span style={{ fontSize: '12px', opacity: 0.7 }}>{count}</span>
      )}
    </button>
  );
}
