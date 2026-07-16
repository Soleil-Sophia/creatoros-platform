import { Link } from 'react-router';

/**
 * PlatformHero — V0.1 composition uplift.
 *
 * Goals (composition only):
 *  • Editorial, asymmetric 7/5 layout (story left, system panel right)
 *  • Three-layer depth: background field → midground ambient → foreground panel
 *  • Architectural vertical breathing room
 *  • Subtle horizon light-edge top + bottom (section as a "chapter")
 *  • Vertical accent rail on the story side
 *  • Stronger lift on the right-hand panel (elevation + offset)
 *
 * Preserved verbatim:
 *  • All copy (eyebrow, headline, subhead, CTA labels)
 *  • All tokens / colors / fonts
 *  • Both CTAs and their destinations
 *  • The internal dashboard mock content
 */
export function PlatformHero() {
  return (
    <section className="relative pt-32 pb-28 md:pt-44 md:pb-36 lg:pt-56 lg:pb-44 overflow-hidden">
      {/* ─── LAYER 1 · BACKGROUND FIELD ───────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep base */}
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />

        {/* Architectural floor gradient (top warmth → deep) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(23, 25, 35, 0.55) 0%, rgba(14, 15, 20, 0) 50%, rgba(14, 15, 20, 0.6) 100%)',
          }}
        />

        {/* Very subtle architectural grid — gives the "spatial" floor a horizon */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 90% 70% at 80% 100%, rgba(0,0,0,0.6), transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 70% at 80% 100%, rgba(0,0,0,0.6), transparent 70%)',
          }}
        />

        {/* Top horizon light-edge — opens the chapter */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 30%, rgba(218,191,255,0.18) 50%, rgba(255,255,255,0.10) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* ─── LAYER 2 · MIDGROUND AMBIENT ──────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large soft lilac aura behind the panel area (right) */}
        <div
          className="absolute -top-32 right-[-10%] w-[760px] h-[760px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(218,191,255,0.16) 0%, rgba(231,198,243,0.08) 35%, transparent 65%)',
          }}
        />
        {/* Faint warm aura behind the headline (left) */}
        <div
          className="absolute top-[18%] -left-32 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,191,222,0.07) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* ─── LAYER 3 · FOREGROUND CONTENT ─────────────────────────────────── */}
      <div className="relative max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid lg:grid-cols-12 gap-14 md:gap-20 lg:gap-16 items-center">

          {/* ── STORY (asymmetric: 7/12 on desktop) ───────────────────────── */}
          <div className="lg:col-span-7 relative">
            {/* Vertical accent rail — pure composition chrome */}
            <div
              className="hidden md:block absolute -left-10 top-2 bottom-2 w-px"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(218,191,255,0.35) 18%, rgba(255,255,255,0.08) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            {/* Rail node */}
            <div
              className="hidden md:block absolute -left-[42px] top-[6px] w-[7px] h-[7px] rounded-full"
              style={{
                background: '#DABFFF',
                boxShadow: '0 0 14px rgba(218, 191, 255, 0.65)',
              }}
              aria-hidden="true"
            />

            <div className="space-y-9 lg:space-y-12">
              {/* Eyebrow — preserved copy */}
              <div className="flex items-center gap-3">
                <span
                  className="tracking-[0.15em] uppercase"
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#DABFFF',
                    letterSpacing: '0.15em',
                  }}
                >
                  Modular Creator Platform
                </span>
              </div>

              {/* Headline — preserved copy, slightly more architectural type setting */}
              <h1
                className="max-w-[820px]"
                style={{
                  fontSize: 'clamp(44px, 5.6vw, 76px)',
                  lineHeight: 1.04,
                  fontWeight: 700,
                  color: '#F4F3F8',
                  letterSpacing: '-0.025em',
                }}
              >
                A connected system of standalone tools for creator work.
              </h1>

              {/* Subheadline — preserved copy */}
              <p
                className="max-w-[560px]"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.65,
                  color: '#B4B8C7',
                }}
              >
                CreatorOS is a customizable creator platform with a clear core workflow and optional add-on modules. Each tool works independently — but together, they create a real operating system for systematic content production.
              </p>

              {/* CTA Buttons — preserved targets + labels */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/dashboard"
                  className="px-8 py-4 transition-all hover:opacity-90 shadow-lg relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #DABFFF 0%, #E7C6F3 100%)',
                    color: '#0E0F14',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow:
                      '0 8px 24px rgba(218, 191, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'rgba(255, 255, 255, 0.5)' }}
                  />
                  View Dashboard
                </Link>
                <Link
                  to="/modules"
                  className="px-8 py-4 transition-all hover:opacity-90 relative overflow-hidden"
                  style={{
                    background: '#1F2230',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#F4F3F8',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 500,
                    boxShadow:
                      'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 16px rgba(0, 0, 0, 0.3)',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                  />
                  Explore Modules
                </Link>
              </div>
            </div>
          </div>

          {/* ── SYSTEM PANEL (asymmetric: 5/12 on desktop) ─────────────────── */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            {/* Pedestal: a faint reflective floor that "carries" the panel */}
            <div
              className="absolute inset-x-0 bottom-[-40px] h-[80px] opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(218,191,255,0.18), transparent 70%)',
                filter: 'blur(12px)',
              }}
              aria-hidden="true"
            />

            {/* The panel itself — lifted slightly, deeper elevation */}
            <div
              className="relative w-full max-w-[540px] rounded-[22px] overflow-hidden lg:transform lg:-translate-y-2"
              style={{
                background:
                  'linear-gradient(135deg, #171923 0%, #0E0F14 100%)',
                boxShadow:
                  '0 60px 120px -30px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.04)',
              }}
            >
              {/* Top edge light */}
              <div
                className="absolute top-0 left-0 right-0 h-px z-10"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(218, 191, 255, 0.35) 35%, rgba(255, 191, 222, 0.28) 65%, transparent)',
                }}
              />

              {/* Header Bar */}
              <div
                className="relative px-6 py-4 border-b"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(31, 34, 48, 0.5) 0%, rgba(23, 25, 35, 0.6) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        background: '#DABFFF',
                        boxShadow: '0 0 10px rgba(218, 191, 255, 0.7)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#F4F3F8',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      CreatorOS
                    </span>
                    <div
                      className="px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(218, 191, 255, 0.12)',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#DABFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Platform
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: '#3A4054',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: '#3A4054',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: '#3A4054',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Main Content - Module Workflow Visual */}
              <div className="relative p-7 space-y-4" style={{ minHeight: '540px' }}>
                {/* Section Label */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="h-px flex-1"
                    style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#8B8F9E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Core Workflow
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                  />
                </div>

                {/* Module Cards - Core Workflow */}
                <div className="space-y-3">
                  {[
                    {
                      name: 'Brand OS',
                      desc: 'Voice & Identity Foundation',
                      color: '#E7C6F3',
                      status: 'Active',
                    },
                    {
                      name: 'Content OS',
                      desc: 'Content Generation',
                      color: '#FFBFDE',
                      status: 'Active',
                    },
                    {
                      name: 'Launch OS',
                      desc: 'Rollout & Coordination',
                      color: '#DABFFF',
                      status: 'Planned',
                    },
                    {
                      name: 'Management OS',
                      desc: 'Scheduling & Execution',
                      color: '#C4B5FD',
                      status: 'Planned',
                    },
                    {
                      name: 'Analytics OS',
                      desc: 'Performance Intelligence',
                      color: '#B8A3FF',
                      status: 'Planned',
                    },
                  ].map((module, idx) => (
                    <div key={idx}>
                      <div
                        className="relative rounded-[14px] overflow-hidden transition-all"
                        style={{
                          background:
                            module.status === 'Active'
                              ? 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)'
                              : 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                          border: `1px solid ${
                            module.status === 'Active'
                              ? `rgba(${
                                  module.color === '#E7C6F3'
                                    ? '231, 198, 243'
                                    : '255, 191, 222'
                                }, 0.25)`
                              : 'rgba(255, 255, 255, 0.08)'
                          }`,
                          boxShadow:
                            module.status === 'Active'
                              ? `0 8px 20px rgba(${
                                  module.color === '#E7C6F3'
                                    ? '231, 198, 243'
                                    : '255, 191, 222'
                                }, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)`
                              : 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                          opacity: module.status === 'Active' ? 1 : 0.6,
                        }}
                      >
                        {module.status === 'Active' && (
                          <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${module.color} 50%, transparent)`,
                              opacity: 0.5,
                            }}
                          />
                        )}

                        <div className="relative p-4 flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background:
                                module.status === 'Active'
                                  ? `linear-gradient(135deg, ${module.color}, ${module.color}E6)`
                                  : '#262A38',
                              border: `1px solid ${
                                module.status === 'Active'
                                  ? 'rgba(255, 255, 255, 0.2)'
                                  : 'rgba(255, 255, 255, 0.06)'
                              }`,
                              boxShadow:
                                module.status === 'Active'
                                  ? `0 4px 12px rgba(${
                                      module.color === '#E7C6F3'
                                        ? '231, 198, 243'
                                        : module.color === '#FFBFDE'
                                        ? '255, 191, 222'
                                        : '218, 191, 255'
                                    }, 0.3)`
                                  : 'none',
                            }}
                          >
                            <div
                              className="w-5 h-5 rounded-md"
                              style={{
                                background:
                                  module.status === 'Active'
                                    ? '#0E0F14'
                                    : 'rgba(255, 255, 255, 0.05)',
                                opacity: module.status === 'Active' ? 0.6 : 1,
                              }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                style={{
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  color: '#F4F3F8',
                                }}
                              >
                                {module.name}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded text-xs"
                                style={{
                                  background:
                                    module.status === 'Active'
                                      ? `rgba(${
                                          module.color === '#E7C6F3'
                                            ? '231, 198, 243'
                                            : '255, 191, 222'
                                        }, 0.15)`
                                      : 'rgba(255, 255, 255, 0.05)',
                                  color:
                                    module.status === 'Active'
                                      ? module.color
                                      : '#8B8F9E',
                                  fontSize: '10px',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                }}
                              >
                                {module.status}
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#B4B8C7',
                                marginTop: '2px',
                              }}
                            >
                              {module.desc}
                            </div>
                          </div>

                          {module.status === 'Active' && (
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 16 16"
                              className="flex-shrink-0"
                            >
                              <path
                                d="M6 12l4-4-4-4"
                                stroke={module.color}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      {idx < 3 && (
                        <div className="flex justify-center py-1">
                          <svg width="2" height="12" fill="none">
                            <line
                              x1="1"
                              y1="0"
                              x2="1"
                              y2="12"
                              stroke="rgba(255, 255, 255, 0.1)"
                              strokeWidth="2"
                              strokeDasharray="2 2"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add-ons Section */}
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="h-px flex-1"
                      style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                    />
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#8B8F9E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Add-on Modules
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                    />
                  </div>

                  <div className="flex gap-2">
                    {['Community OS', 'Research OS'].map((name, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-lg p-3 text-center"
                        style={{
                          background: '#171923',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          opacity: 0.5,
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#B4B8C7',
                          }}
                        >
                          {name}
                        </div>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#8B8F9E',
                            marginTop: '4px',
                          }}
                        >
                          Planned
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM HORIZON · hand-off to the next chapter ──────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)',
        }}
      />
    </section>
  );
}
