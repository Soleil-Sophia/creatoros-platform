type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = "Search assets..." }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}
