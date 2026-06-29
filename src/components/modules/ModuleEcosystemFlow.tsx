import { Link } from 'react-router';
import { coreModules } from '../../config/modules';
import { getDisplayMeta } from '../../config/moduleDisplay';

type ModuleEcosystemFlowProps = {
  currentModuleId: string;
  accent?: string;
};

/**
 * Horizontal flow showing where the current module sits in the CreatorOS system.
 * BrandOS → ContentOS → LaunchOS → ManagementOS → AnalyticsOS
 * Reinforces: CreatorOS is a system, not a single tool.
 */
export function ModuleEcosystemFlow({
  currentModuleId,
  accent = '#FFBFDE',
}: ModuleEcosystemFlowProps) {
  // Canonical pipeline order (excludes addons like Community/Research)
  const order = ['brandos', 'contentos', 'launchos', 'managementos', 'analyticsos'];
  const pipeline = order
    .map((id) => coreModules.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section className="py-20 lg:py-24" style={{ background: '#0E0F14' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
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
              The System
            </span>
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.4vw, 34px)',
              fontWeight: 700,
              color: '#F4F3F8',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            How this module fits the rest of CreatorOS
          </h2>
          <p style={{ fontSize: '15px', color: '#8B8F9E', lineHeight: 1.6 }}>
            CreatorOS isn't a single tool. It's a connected system — strategy in, performance out.
          </p>
        </div>

        {/* Horizontal flow — scrolls on mobile */}
        <div className="overflow-x-auto -mx-6 lg:mx-0 px-6 lg:px-0">
          <div
            className="flex items-stretch gap-2 min-w-max lg:min-w-0 lg:justify-between"
          >
            {pipeline.map((m, idx) => {
              const meta = getDisplayMeta(m.id);
              const isCurrent = m.id === currentModuleId;
              const isActive = m.status === 'active' || m.status === 'beta';
              const node = (
                <div
                  className="flex flex-col items-center justify-center text-center rounded-[14px] px-4 py-4 transition-all"
                  style={{
                    minWidth: '130px',
                    background: isCurrent
                      ? `linear-gradient(135deg, ${meta.accent}1A 0%, ${meta.accent}08 100%)`
                      : 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: isCurrent
                      ? `1px solid ${meta.accent}55`
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: isCurrent ? `0 8px 24px ${meta.accent}20` : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: meta.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: '6px',
                    }}
                  >
                    Module {meta.number}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: isCurrent ? '#F4F3F8' : '#B4B8C7',
                      marginBottom: '4px',
                    }}
                  >
                    {m.name}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      color: isActive ? '#22c55e' : '#5C606E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {isActive ? 'Active' : 'Planned'}
                  </span>
                </div>
              );

              return (
                <div key={m.id} className="flex items-center gap-2">
                  {isCurrent ? (
                    node
                  ) : (
                    <Link to={m.routes.overview} className="block">
                      {node}
                    </Link>
                  )}
                  {idx < pipeline.length - 1 && (
                    <svg
                      width="20"
                      height="14"
                      viewBox="0 0 20 14"
                      fill="none"
                      className="flex-shrink-0"
                      style={{ color: '#3A3D4A' }}
                    >
                      <path
                        d="M2 7h14m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
