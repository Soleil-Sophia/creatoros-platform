/**
 * EcosystemPreview — Chapter 04 · The Ecosystem
 *
 * Composition uplift only. No copy/token/route/font changes.
 * Applies the PlatformHero grammar:
 *   1. Asymmetric chapter header (5/7)
 *   2. Three-layer depth + horizon edges
 *   3. Architectural breathing room
 *   4. Vertical accent rail + chapter marker
 *   5. Pedestal glow under the active "LIVE" modules — rhythm via varied
 *      column-spans instead of an equal-height 2x2 SaaS grid
 */
export function EcosystemPreview() {
  const modules = [
    {
      name: 'Brand OS',
      status: 'LIVE',
      description: 'Define voice, identity, and messaging foundation for all content.',
      accent: '#E7C6F3',
      available: true,
      route: '/modules/brand-os',
    },
    {
      name: 'Content OS',
      status: 'LIVE',
      description: 'Transform offers and expertise into structured content workflows.',
      accent: '#FFBFDE',
      available: true,
      route: '/modules/content-os',
    },
    {
      name: 'Launch OS',
      status: 'PLANNED',
      description: 'Structure launches, coordinate rollouts, and orchestrate content phases.',
      accent: '#DABFFF',
      available: false,
      route: '/modules/launch-os',
    },
    {
      name: 'Management OS',
      status: 'PLANNED',
      description: 'Schedule content, manage publishing queue, and execute multi-platform posting.',
      accent: '#C4B5FD',
      available: false,
      route: '/modules/management-os',
    },
    {
      name: 'Analytics OS',
      status: 'PLANNED',
      description: 'Track performance across platforms and content types.',
      accent: '#B8A3FF',
      available: false,
      route: '/modules/analytics-os',
    },
  ];

  const live = modules.filter((m) => m.available);
  const planned = modules.filter((m) => !m.available);

  return (
    <section className="relative pt-28 pb-28 md:pt-40 md:pb-36 lg:pt-48 lg:pb-44 overflow-hidden">
      {/* ── LAYER 1 · BACKGROUND FIELD ───────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(23,25,35,0.5) 0%, rgba(14,15,20,0) 50%, rgba(14,15,20,0.55) 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(218,191,255,0.16) 50%, transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)',
          }}
        />
      </div>

      {/* ── LAYER 2 · MIDGROUND AMBIENT ──────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[15%] -left-40 w-[640px] h-[640px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(218,191,255,0.10) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute bottom-[10%] -right-32 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,191,222,0.07) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── LAYER 3 · FOREGROUND ─────────────────────────────────── */}
      <div className="relative max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Asymmetric chapter header */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20 lg:mb-28">
          <div className="lg:col-span-5 relative">
            <div
              className="hidden md:block absolute -left-10 top-2 bottom-2 w-px"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(218,191,255,0.35) 18%, rgba(255,255,255,0.06) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <div
              className="hidden md:block absolute -left-[42px] top-[6px] w-[7px] h-[7px] rounded-full"
              style={{
                background: '#DABFFF',
                boxShadow: '0 0 14px rgba(218,191,255,0.65)',
              }}
              aria-hidden="true"
            />
            <span
              className="block tracking-[0.15em] uppercase mb-6"
              style={{ fontSize: '12px', fontWeight: 600, color: '#DABFFF', letterSpacing: '0.15em' }}
            >
              Ecosystem
            </span>
            <h2
              style={{
                fontSize: 'clamp(34px, 4.4vw, 56px)',
                lineHeight: 1.08,
                fontWeight: 700,
                color: '#F4F3F8',
                letterSpacing: '-0.025em',
              }}
            >
              The CreatorOS Ecosystem
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex lg:items-end">
            <p style={{ fontSize: '18px', lineHeight: 1.65, color: '#B4B8C7', maxWidth: '520px' }}>
              Brand OS is the first module. More creator infrastructure modules are coming — each designed to solve specific workflow challenges.
            </p>
          </div>
        </div>

        {/* LIVE modules — lifted, side-by-side, larger */}
        <div className="relative mb-14 lg:mb-20">
          <div
            className="absolute inset-x-12 bottom-[-30px] h-[80px] opacity-60 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,191,222,0.16), transparent 70%)',
              filter: 'blur(16px)',
            }}
            aria-hidden="true"
          />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative">
            {live.map((module, idx) => (
              <div
                key={idx}
                className="relative rounded-[20px] p-10 group overflow-hidden"
                style={{
                  background: '#1F2230',
                  border: `1px solid ${module.accent}66`,
                  boxShadow: `0 40px 90px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${module.accent} 50%, transparent)`,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-[20px] opacity-10 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${module.accent}33 0%, transparent 50%)`,
                  }}
                />

                <div className="relative space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#F4F3F8' }}>{module.name}</h3>
                    <div
                      className="px-3 py-1.5 rounded-full flex items-center gap-2"
                      style={{
                        background: `${module.accent}33`,
                        border: `1px solid ${module.accent}66`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: module.accent }}
                      />
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: module.accent,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {module.status}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#B4B8C7' }}>{module.description}</p>

                  <button
                    className="mt-2 px-6 py-2.5 transition-all hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, ${module.accent}33, ${module.accent}1A)`,
                      border: `1px solid ${module.accent}66`,
                      color: '#F4F3F8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    Launch Content OS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLANNED modules — recessed, varied widths for rhythm */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span
              className="tracking-[0.15em] uppercase"
              style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', letterSpacing: '0.15em' }}
            >
              On the Roadmap
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {planned.map((module, idx) => (
              <div
                key={idx}
                className="relative rounded-[16px] p-7 overflow-hidden"
                style={{
                  background: '#171923',
                  border: '1px solid rgba(255,255,255,0.04)',
                  opacity: 0.75,
                }}
              >
                <div className="relative space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#B4B8C7' }}>{module.name}</h3>
                    <div
                      className="px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#B4B8C7',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {module.status}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#8B8F9E' }}>{module.description}</p>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <span style={{ fontSize: '12px', color: '#8B8F9E', fontStyle: 'italic' }}>Coming soon</span>
                    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="text-center mt-14">
          <p style={{ fontSize: '15px', color: '#B4B8C7' }}>
            More modules planned across brand, research, and creator operations.
          </p>
        </div>
      </div>
    </section>
  );
}
