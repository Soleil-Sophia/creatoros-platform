import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';
import { useAuth } from '../contexts/AuthContext';
import { getPlatformUrl, MODULE_APP_PATHS } from '../config/site';

const modules = [
  {
    number: '01',
    name: 'BrandOS',
    tagline: 'Brand Foundations & Positioning',
    description:
      'Define positioning, messaging, and brand foundations before execution begins. BrandOS is the layer every other module builds on — the clearest version of who you are and what you stand for.',
    status: 'active',
    accent: '#E7C6F3',
    capabilities: ['Brand voice definition', 'Positioning framework', 'Messaging clarity', 'Identity foundations'],
  },
  {
    number: '02',
    name: 'ContentOS',
    tagline: 'Content Workflows & Reusable Outputs',
    description:
      'Turn strategy into structured content outputs, reusable workflows, and content systems. ContentOS connects brand foundations to what actually gets published.',
    status: 'active',
    accent: '#FFBFDE',
    capabilities: ['Content workflow builder', 'Output templates', 'Reusable content library', 'Cross-platform structure'],
  },
  {
    number: '03',
    name: 'LaunchOS',
    tagline: 'Launch Planning & Campaign Execution',
    description:
      'Organize campaigns, launch flows, and go-to-market execution with more clarity and less friction. LaunchOS makes launch planning a repeatable system, not a fire drill.',
    status: 'planned',
    accent: '#DABFFF',
    capabilities: ['Launch planning workflows', 'Campaign structure', 'Go-to-market checklists', 'Offer rollout systems'],
  },
  {
    number: '04',
    name: 'ManagementOS',
    tagline: 'Operational Structure & Coordination',
    description:
      'Keep internal operations, tasks, systems, and decision-making structured as the business grows. ManagementOS turns operational chaos into coordinated, repeatable processes.',
    status: 'planned',
    accent: '#C4B5FD',
    capabilities: ['Task & project structure', 'Internal coordination', 'Decision frameworks', 'System documentation'],
  },
  {
    number: '05',
    name: 'AnalyticsOS',
    tagline: 'Performance Visibility & Decision Support',
    description:
      'Track what performs, what compounds, and where to improve across the platform. AnalyticsOS closes the loop — from brand and content to results and next decisions.',
    status: 'planned',
    accent: '#B8A3FF',
    capabilities: ['Performance tracking', 'Content analytics', 'Growth feedback loops', 'Decision-support reports'],
  },
];

const statusMeta: Record<string, { label: string; dot: string }> = {
  active: { label: 'Active', dot: '#4ADE80' },
  planned: { label: 'In Development', dot: '#6B7280' },
};

export default function Modules() {
  const { isOwner } = useAuth();
  useMeta(
    'Module System — CreatorOS',
    'Five core modules inside the CreatorOS platform: BrandOS, ContentOS, LaunchOS, ManagementOS, and AnalyticsOS — a connected system for creators who build with structure.'
  );

  return (
    <div>

      <section style={{ padding: '100px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(218,191,255,0.07) 0%, rgba(255,191,222,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Module System
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            maxWidth: '720px', marginBottom: '24px',
          }}>
            Five core modules.<br />One connected platform.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '40px' }}>
            Each module handles a different layer of creator work — from brand foundations to analytics. Use them individually, or as a connected operating system.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/early-access" style={{
              padding: '14px 28px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
              color: '#0E0F14', fontSize: '15px', fontWeight: 700,
              boxShadow: '0 8px 32px rgba(255,191,222,0.3)',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              Join Early Access
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d="M2.5 7h9M8 3l4 4-4 4" stroke="#0E0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/product" style={{
              fontSize: '14px', color: 'var(--text-3)',
              textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.15)',
              textUnderlineOffset: '3px', transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
            >
              See current product
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {modules.map(({ number, name, tagline, description, status, accent, capabilities }) => {
              const isActive = status === 'active';
              const meta = statusMeta[status];
              return (
                <div key={name} id={name.toLowerCase()} style={{
                  scrollMarginTop: '88px',
                  padding: '36px 40px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                  border: `1px solid ${isActive ? `${accent}28` : 'rgba(255,255,255,0.06)'}`,
                  position: 'relative', overflow: 'hidden',
                  opacity: isActive ? 1 : 0.75,
                }}>
                  {isActive && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                      background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
                    }} />
                  )}

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '32px',
                    alignItems: 'start',
                  }}
                    className="module-row"
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '11px', fontWeight: 700,
                          color: isActive ? accent : 'var(--text-3)',
                          letterSpacing: '0.08em',
                        }}>
                          {number}
                        </span>
                        <h2 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(20px, 2.5vw, 26px)',
                          fontWeight: 800, color: 'var(--text)',
                          letterSpacing: '-0.01em',
                        }}>
                          {name}
                        </h2>
                        <span style={{
                          fontSize: '11px', fontWeight: 600,
                          padding: '3px 10px', borderRadius: '100px',
                          background: isActive ? `${accent}14` : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isActive ? `${accent}25` : 'rgba(255,255,255,0.08)'}`,
                          color: isActive ? accent : 'var(--text-3)',
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                        }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: meta.dot }} />
                          {meta.label}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: accent, fontWeight: 500, marginBottom: '12px' }}>
                        {tagline}
                      </p>
                      <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.75, maxWidth: '640px' }}>
                        {description}
                      </p>
                    </div>

                    <div style={{
                      minWidth: '200px',
                      padding: '20px 24px',
                      borderRadius: '14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', flexDirection: 'column', gap: '16px',
                    }}
                      className="module-capabilities"
                    >
                      <div>
                        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                          Capabilities
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {capabilities.map(cap => (
                            <div key={cap} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
                                background: isActive ? accent : 'rgba(255,255,255,0.2)',
                              }} />
                              <span style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.4 }}>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {isOwner ? (
                        MODULE_APP_PATHS[name] ? (
                          <a
                            href={`${getPlatformUrl()}${MODULE_APP_PATHS[name]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                              padding: '10px 14px', borderRadius: '10px',
                              background: `linear-gradient(135deg, ${accent} 0%, #E7C6F3 100%)`,
                              color: '#0E0F14',
                              fontSize: '13px', fontWeight: 700,
                              textDecoration: 'none',
                            }}
                          >
                            Open {name}
                            <svg width="12" height="12" fill="none" viewBox="0 0 14 14">
                              <path d="M2.5 7h9M8 3l4 4-4 4" stroke="#0E0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        ) : (
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            padding: '10px 14px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px dashed rgba(255,255,255,0.12)',
                            color: 'var(--text-3)', fontSize: '12px', fontWeight: 600,
                          }}>
                            In Development
                          </div>
                        )
                      ) : (
                        <Link
                          to="/early-access"
                          style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            padding: '10px 14px', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'var(--text-2)', fontSize: '13px', fontWeight: 600,
                            textDecoration: 'none',
                          }}
                        >
                          Join Waitlist
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{
        padding: '64px 0',
        background: '#0A0B10',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.02em', marginBottom: '12px',
          }}>
            Start with BrandOS and ContentOS — active now.
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '460px', margin: '0 auto 32px' }}>
            Join early access to get notified as each new module launches and help shape the roadmap.
          </p>
          <Link to="/early-access" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
            color: '#0E0F14', fontSize: '15px', fontWeight: 700,
            boxShadow: '0 8px 32px rgba(255,191,222,0.3)',
          }}>
            Join Early Access
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M2.5 7h9M8 3l4 4-4 4" stroke="#0E0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .module-row {
            grid-template-columns: 1fr !important;
          }
          .module-capabilities {
            min-width: unset !important;
          }
        }
      `}</style>

    </div>
  );
}
