import { Link } from 'react-router';
import type { CreatorOSModule } from '../../config/modules';

type ActionButton = {
  label: string;
  href: string;
};

type ModuleHeroProps = {
  module: CreatorOSModule;
  title?: string;
  subtitle?: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  beta: 'Beta',
  'coming-soon': 'Coming Soon',
  planned: 'Planned',
};

export function ModuleHero({
  module,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: ModuleHeroProps) {
  const displayTitle = title ?? module.name;
  const displaySubtitle = subtitle ?? module.description;
  const isActive = module.status === 'active' || module.status === 'beta';

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: '#0E0F14' }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% -10%, ${module.accent}12 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Eyebrow row */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              background: `${module.accent}14`,
              border: `1px solid ${module.accent}30`,
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: module.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Module {module.number}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
            style={{
              background: isActive ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 255, 255, 0.04)',
              border: isActive ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {isActive && (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)' }}
              />
            )}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: isActive ? '#22c55e' : '#8B8F9E',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {STATUS_LABELS[module.status]}
            </span>
          </div>

          <span style={{ fontSize: '14px', color: '#8B8F9E' }}>{module.tagline}</span>
        </div>

        {/* Title */}
        <h1
          className="mb-6"
          style={{
            fontSize: 'clamp(48px, 7vw, 72px)',
            fontWeight: 700,
            color: '#F4F3F8',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          {displayTitle}
        </h1>

        {/* Subtitle */}
        <p
          className="mb-10"
          style={{
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            color: '#B4B8C7',
            maxWidth: '720px',
            lineHeight: 1.6,
          }}
        >
          {displaySubtitle}
        </p>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-4">
            {primaryAction && (
              <Link
                to={primaryAction.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] transition-all hover:opacity-90 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${module.accent} 0%, ${module.accent}CC 100%)`,
                  color: '#0E0F14',
                  fontSize: '16px',
                  fontWeight: 600,
                  boxShadow: `0 12px 32px ${module.accent}40, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
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
            )}

            {secondaryAction && (
              <Link
                to={secondaryAction.href}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-[12px] transition-all hover:opacity-90"
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
        )}
      </div>
    </section>
  );
}
