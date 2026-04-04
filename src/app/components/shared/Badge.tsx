type BadgeProps = {
  children: React.ReactNode;
  variant?: 'pink' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
};

export function Badge({ children, variant = 'pink', size = 'md' }: BadgeProps) {
  const backgrounds = {
    pink: 'rgba(255, 191, 222, 0.12)',
    purple: 'rgba(218, 191, 255, 0.12)',
    neutral: 'rgba(255, 255, 255, 0.1)'
  };

  const borders = {
    pink: '1px solid rgba(255, 191, 222, 0.2)',
    purple: '1px solid rgba(218, 191, 255, 0.2)',
    neutral: '1px solid rgba(255, 255, 255, 0.15)'
  };

  const colors = {
    pink: '#FFBFDE',
    purple: '#DABFFF',
    neutral: '#B4B8C7'
  };

  const sizes = {
    sm: { fontSize: '9px', padding: '2px 8px' },
    md: { fontSize: '10px', padding: '2px 8px' }
  };

  return (
    <div 
      className="rounded inline-block"
      style={{ 
        background: backgrounds[variant],
        border: borders[variant],
        fontSize: sizes[size].fontSize,
        fontWeight: 600,
        color: colors[variant],
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: sizes[size].padding
      }}
    >
      {children}
    </div>
  );
}
