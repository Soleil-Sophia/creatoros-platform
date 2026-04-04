type HelperNoteProps = {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success';
};

export function HelperNote({ children, variant = 'info' }: HelperNoteProps) {
  const styles = {
    info: {
      background: 'rgba(218, 191, 255, 0.08)',
      border: '1px solid rgba(218, 191, 255, 0.15)',
      color: '#B4B8C7'
    },
    warning: {
      background: 'rgba(255, 191, 222, 0.08)',
      border: '1px solid rgba(255, 191, 222, 0.15)',
      color: '#B4B8C7'
    },
    success: {
      background: 'rgba(191, 255, 222, 0.08)',
      border: '1px solid rgba(191, 255, 222, 0.15)',
      color: '#B4B8C7'
    }
  };

  return (
    <div 
      className="px-3 py-2.5 rounded-lg"
      style={{
        ...styles[variant],
        fontSize: '12px',
        lineHeight: 1.5
      }}
    >
      {children}
    </div>
  );
}
