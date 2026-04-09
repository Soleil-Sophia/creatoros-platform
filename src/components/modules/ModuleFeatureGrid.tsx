const ICONS: Record<string, React.ReactNode> = {
  generate: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  voice: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <path d="M10 2a3 3 0 013 3v5a3 3 0 01-6 0V5a3 3 0 013-3z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 10a5 5 0 0010 0M10 15v3M7 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  library: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  platforms: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h14M10 3c-2 2-3 4.5-3 7s1 5 3 7M10 3c2 2 3 4.5 3 7s-1 5-3 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  workflow: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <path d="M4 6h12M4 10h8M4 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  plan: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7h14M7 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  default: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

type FeatureItem = {
  title: string;
  description: string;
  icon?: string;
};

type ModuleFeatureGridProps = {
  sectionTitle?: string;
  sectionSubtitle?: string;
  items: FeatureItem[];
  accent?: string;
};

export function ModuleFeatureGrid({
  sectionTitle = 'What it does',
  sectionSubtitle,
  items,
  accent = '#FFBFDE',
}: ModuleFeatureGridProps) {
  return (
    <section className="py-20 lg:py-28" style={{ background: '#0E0F14' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${accent})` }} />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: accent,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Features
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#F4F3F8',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: sectionSubtitle ? '12px' : 0,
            }}
          >
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p style={{ fontSize: '17px', color: '#B4B8C7', lineHeight: 1.6 }}>{sectionSubtitle}</p>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[16px] p-6 group"
              style={{
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${accent}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${accent}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.06)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: `${accent}14`,
                  border: `1px solid ${accent}20`,
                  color: accent,
                }}
              >
                {ICONS[item.icon ?? 'default'] ?? ICONS.default}
              </div>

              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#F4F3F8',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
