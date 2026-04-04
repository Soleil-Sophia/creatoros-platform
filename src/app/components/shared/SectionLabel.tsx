type SectionLabelProps = {
  children: React.ReactNode;
  color?: string;
};

export function SectionLabel({ children, color = '#DABFFF' }: SectionLabelProps) {
  return (
    <div style={{ fontSize: '10px', fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {children}
    </div>
  );
}
