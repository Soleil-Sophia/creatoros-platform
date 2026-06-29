/**
 * SystemOverview — Chapter 02 · The Architecture
 *
 * Composition uplift only. No copy, token, font, or structural changes.
 * Applies the PlatformHero visual grammar:
 *   1. Asymmetric 5/7 header (chapter intro left, paragraph right)
 *   2. Three-layer depth (deep base → midground aura → foreground panels)
 *   3. Architectural vertical breathing room
 *   4. Vertical accent rail + chapter marker
 *   5. Horizon light-edge top + pedestal glow under the core workflow column
 */
export function SystemOverview() {
  return (
    <section className="relative pt-28 pb-28 md:pt-40 md:pb-36 lg:pt-48 lg:pb-44 overflow-hidden">
      {/* ── LAYER 1 · BACKGROUND FIELD ───────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(23,25,35,0.55) 0%, rgba(14,15,20,0) 50%, rgba(14,15,20,0.5) 100%)',
          }}
        />
        {/* Horizon top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(218,191,255,0.16) 50%, rgba(255,255,255,0.08) 70%, transparent 100%)',
          }}
        />
        {/* Horizon bottom edge */}
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
          className="absolute top-[10%] -left-32 w-[640px] h-[640px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(218,191,255,0.10) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute top-[55%] -right-40 w-[680px] h-[680px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,191,222,0.07) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── LAYER 3 · FOREGROUND ─────────────────────────────────── */}
      <div className="relative max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Asymmetric chapter header (5/7) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20 lg:mb-28">
          <div className="lg:col-span-5 relative">
            {/* Vertical accent rail */}
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
              Platform Architecture
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
              How CreatorOS Works
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex lg:items-end">
            <p style={{ fontSize: '18px', lineHeight: 1.65, color: '#B4B8C7', maxWidth: '520px' }}>
              A modular system with a clear core workflow and optional add-ons. Start small, scale as you grow.
            </p>
          </div>
        </div>

        {/* Asymmetric 7/5 body — core workflow lifted, side rail recessed */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* ── CORE WORKFLOW (7/12, lifted on pedestal) ─────────── */}
          <div className="lg:col-span-7 relative">
            {/* Pedestal glow */}
            <div
              className="absolute inset-x-6 bottom-[-30px] h-[80px] opacity-50 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,191,222,0.14), transparent 70%)',
                filter: 'blur(14px)',
              }}
              aria-hidden="true"
            />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="px-3 py-1.5 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #E7C6F3 0%, #FFBFDE 100%)',
                  boxShadow: '0 4px 12px rgba(231,198,243,0.3)',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>
                  CORE WORKFLOW
                </span>
              </div>
              <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Recommended Path</span>
            </div>

            <div
              className="relative rounded-[20px] p-5 md:p-7"
              style={{
                background: 'linear-gradient(180deg, rgba(31,34,48,0.4) 0%, rgba(14,15,20,0.2) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 40px 90px -30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(218,191,255,0.3) 50%, transparent)',
                }}
              />
              <div className="space-y-4">
                {[
                  { number: '01', name: 'Brand OS', desc: 'Voice & Identity Foundation', color: '#E7C6F3', status: 'Active' },
                  { number: '02', name: 'Content OS', desc: 'Content Generation', color: '#FFBFDE', status: 'Active' },
                  { number: '03', name: 'Launch OS', desc: 'Rollout & Coordination', color: '#DABFFF', status: 'Coming Q2' },
                  { number: '04', name: 'Management OS', desc: 'Scheduling & Execution', color: '#C4B5FD', status: 'Coming Q2' },
                  { number: '05', name: 'Analytics OS', desc: 'Performance Intelligence', color: '#B8A3FF', status: 'Coming Soon' },
                ].map((module, idx) => (
                  <div key={idx}>
                    <div
                      className="relative rounded-[14px] overflow-hidden"
                      style={{
                        background:
                          module.status === 'Active'
                            ? 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)'
                            : 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                        border: `1px solid ${module.status === 'Active' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
                        boxShadow:
                          module.status === 'Active'
                            ? '0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
                            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                        opacity: module.status === 'Active' ? 1 : 0.7,
                      }}
                    >
                      {module.status === 'Active' && (
                        <div
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{ background: `linear-gradient(90deg, transparent, ${module.color} 50%, transparent)`, opacity: 0.4 }}
                        />
                      )}
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{
                              background:
                                module.status === 'Active'
                                  ? `linear-gradient(135deg, ${module.color}, ${module.color}E6)`
                                  : '#262A38',
                              border: `1px solid ${module.status === 'Active' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
                              boxShadow:
                                module.status === 'Active'
                                  ? `0 4px 12px rgba(${module.color === '#E7C6F3' ? '231,198,243' : module.color === '#FFBFDE' ? '255,191,222' : '218,191,255'}, 0.3)`
                                  : 'none',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                color: module.status === 'Active' ? '#0E0F14' : '#8B8F9E',
                              }}
                            >
                              {module.number}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>{module.name}</h3>
                              <span
                                className="px-2 py-0.5 rounded text-xs"
                                style={{
                                  background:
                                    module.status === 'Active'
                                      ? `rgba(${module.color === '#E7C6F3' ? '231,198,243' : '255,191,222'}, 0.15)`
                                      : 'rgba(255,255,255,0.05)',
                                  color: module.status === 'Active' ? module.color : '#8B8F9E',
                                  fontSize: '10px',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                }}
                              >
                                {module.status}
                              </span>
                            </div>
                            <p style={{ fontSize: '14px', color: '#DABFFF', marginBottom: '8px', fontWeight: 500 }}>
                              {module.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="flex items-center gap-2 py-3 pl-6">
                        <svg width="2" height="20" fill="none">
                          <line x1="1" y1="0" x2="1" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                        </svg>
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                          <path d="M8 3v10m0 0l4-4m-4 4L4 9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDE RAIL (5/12, recessed, varied rhythm) ────────── */}
          <div className="lg:col-span-5 space-y-10 lg:pt-12">

            {/* Add-on Modules */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, #DABFFF 0%, #B8A3FF 100%)',
                    boxShadow: '0 4px 12px rgba(218,191,255,0.3)',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>
                    ADD-ON MODULES
                  </span>
                </div>
                <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Optional Extensions</span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    number: '06',
                    name: 'Community OS',
                    tagline: 'Audience Relationship Management',
                    description: 'Manage interactions, track relationships, and build genuine community connections.',
                    status: 'Planned Q3',
                  },
                  {
                    number: '07',
                    name: 'Research OS',
                    tagline: 'Audience & Market Intelligence',
                    description: 'Deep audience analysis, competitor research, and trend monitoring in one place.',
                    status: 'Planned Q3',
                  },
                ].map((module, idx) => (
                  <div
                    key={idx}
                    className="rounded-[16px] overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      opacity: 0.7,
                    }}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ background: '#262A38', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <span style={{ fontSize: '16px', fontWeight: 700, color: '#8B8F9E' }}>{module.number}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>{module.name}</h3>
                            <span
                              className="px-2 py-0.5 rounded text-xs"
                              style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: '#8B8F9E',
                                fontSize: '10px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              {module.status}
                            </span>
                          </div>
                          <p style={{ fontSize: '14px', color: '#DABFFF', marginBottom: '8px', fontWeight: 500 }}>
                            {module.tagline}
                          </p>
                          <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.5 }}>{module.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Props — composition note panel */}
            <div
              className="relative rounded-[16px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                border: '1px solid rgba(218,191,255,0.2)',
                boxShadow: '0 8px 24px rgba(218,191,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #DABFFF 50%, transparent)' }}
              />
              <div className="p-6">
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '16px' }}>
                  Why This Architecture Works
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Standalone Value', desc: 'Each module works independently' },
                    { label: 'System Strength', desc: 'Together they create a real workflow' },
                    { label: 'No Vendor Lock-in', desc: 'Use what you need, when you need it' },
                    { label: 'Clear Workflow', desc: 'Core path guides, add-ons extend' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ background: '#DABFFF' }}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{item.label}</div>
                        <div style={{ fontSize: '13px', color: '#B4B8C7', marginTop: '2px' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
