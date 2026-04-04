type PanelShellProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function PanelShell({ children, className = '', onClick }: PanelShellProps) {
  return (
    <div 
      className={`rounded-[16px] p-6 ${className}`}
      onClick={onClick}
      style={{ 
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {children}
    </div>
  );
}
