import { Link } from 'react-router';

type ModuleCTAProps = {
  title?: string;
  subtitle?: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  accent?: string;
};

export function ModuleCTA({
  title = 'Ready to build?',
  subtitle,
  primaryAction,
  secondaryAction,
  accent = '#FFBFDE',
}: ModuleCTAProps) {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#0E0F14' }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 100%, ${accent}0A 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <div
          className="max-w-3xl mx-auto rounded-[20px] p-12 lg:p-16 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Top edge glow */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}60 30%, ${accent}80 50%, ${accent}60 70%, transparent)`,
              boxShadow: `0 0 20px ${accent}30`,
            }}
          />
          {/* Inner radial glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent}25 0%, transparent 60%)`,
            }}
          />

          <div className="relative space-y-8">
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: '#F4F3F8',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                style={{
                  fontSize: '17px',
                  color: '#B4B8C7',
                  lineHeight: 1.7,
                  maxWidth: '520px',
                  margin: '0 auto',
                }}
              >
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to={primaryAction.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-[12px] transition-all hover:opacity-90 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`,
                  color: '#0E0F14',
                  fontSize: '16px',
                  fontWeight: 600,
                  boxShadow: `0 12px 32px ${accent}40, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
                  textDecoration: 'none',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'rgba(255, 255, 255, 0.4)' }}
                />
                {primaryAction.label}
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {secondaryAction && (
                <Link
                  to={secondaryAction.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#B4B8C7',
                    fontSize: '16px',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
