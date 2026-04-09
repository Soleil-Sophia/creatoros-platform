import './_group.css';

// Stub router Link as a plain anchor
function Link({ to, children, className, style }: { to: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <a href={to} className={className} style={style}>{children}</a>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(14, 15, 20, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <div className="flex items-center gap-3">
              <div
                className="relative w-9 h-9 rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
                      boxShadow: '0 0 10px rgba(255, 191, 222, 0.25)'
                    }}
                  ></div>
                </div>
              </div>
              <span
                className="tracking-tight"
                style={{ fontSize: '18px', fontWeight: 700, color: '#F4F3F8', textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
              >
                CreatorOS
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Dashboard', 'Modules', 'Pricing'].map((label) => (
              <a
                key={label}
                href="#"
                className="relative group"
                style={{ color: '#B4B8C7', fontSize: '15px', opacity: 0.85, fontWeight: 500, textDecoration: 'none' }}
              >
                {label}
                <div
                  className="absolute -bottom-1 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE, transparent)' }}
                ></div>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="hidden sm:block px-5 py-2 rounded-lg transition-all hover:opacity-90"
              style={{
                color: '#F4F3F8', fontSize: '15px', fontWeight: 500,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)'
              }}
            >
              Sign In
            </button>
            <a
              href="#"
              className="px-6 py-2.5 rounded-lg transition-all hover:opacity-90 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14', fontSize: '15px', fontWeight: 600,
                boxShadow: '0 2px 12px rgba(255, 191, 222, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                textDecoration: 'none', display: 'inline-block'
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
              Start Creating
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Platform Hero ─────────────────────────────────────────────────────────────
function PlatformHero() {
  const coreModules = [
    { number: '01', name: 'Brand OS', badge: 'ACTIVE', desc: 'Voice & Identity Foundation', color: '#E7C6F3' },
    { number: '02', name: 'Content OS', badge: 'ACTIVE', desc: 'Content Generation', color: '#FFBFDE' },
    { number: '03', name: 'Launch OS', badge: 'PLANNED', desc: 'Rollout & Coordination', color: '#DABFFF' },
    { number: '04', name: 'Management OS', badge: 'PLANNED', desc: 'Scheduling & Execution', color: '#C4B5FD' },
  ];

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(23, 25, 35, 0.4) 0%, transparent 60%)' }} />
        <div className="absolute top-0 right-0 bottom-0 left-1/2" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(31, 34, 48, 0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(218, 191, 255, 0.04) 0%, transparent 40%)' }} />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left */}
          <div className="space-y-8 lg:space-y-10">
            <div className="flex items-center gap-3">
              <span className="tracking-[0.15em] uppercase" style={{ fontSize: '12px', fontWeight: 600, color: '#DABFFF', letterSpacing: '0.15em' }}>
                Modular Creator Platform
              </span>
            </div>
            <h1 className="max-w-2xl" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.1, fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.02em' }}>
              A connected system of standalone tools for creator work.
            </h1>
            <p className="max-w-xl" style={{ fontSize: '18px', lineHeight: 1.6, color: '#B4B8C7' }}>
              CreatorOS is a customizable creator platform with a clear core workflow and optional add-on modules. Each tool works independently — but together, they create a real operating system for systematic content production.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#" className="px-8 py-4 transition-all hover:opacity-90 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #DABFFF 0%, #E7C6F3 100%)', color: '#0E0F14', borderRadius: '12px', fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 24px rgba(218, 191, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)', textDecoration: 'none', display: 'inline-block' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
                View Dashboard
              </a>
              <a href="#" className="px-8 py-4 transition-all hover:opacity-90 relative overflow-hidden" style={{ background: '#1F2230', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#F4F3F8', borderRadius: '12px', fontSize: '16px', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }}></div>
                Explore Modules
              </a>
            </div>
          </div>

          {/* Right — Platform UI preview */}
          <div className="relative">
            <div className="relative rounded-[20px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#DABFFF' }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8' }}>CreatorOS</span>
                    <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(218,191,255,0.15)', color: '#DABFFF', fontSize: '10px', fontWeight: 600 }}>PLATFORM</span>
                  </div>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {['#3A4054', '#3A4054', '#3A4054'].map((c, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }}></div>)}
                </div>
              </div>
              <div className="p-5">
                <div className="text-center mb-4">
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CORE WORKFLOW</span>
                </div>
                <div className="space-y-2">
                  {coreModules.map((m, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: m.badge === 'ACTIVE' ? 'linear-gradient(135deg, #262A38, #1F2230)' : 'rgba(23,25,35,0.6)', border: `1px solid ${m.badge === 'ACTIVE' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`, opacity: m.badge === 'ACTIVE' ? 1 : 0.6 }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: m.badge === 'ACTIVE' ? `${m.color}20` : '#171923', border: `1px solid ${m.badge === 'ACTIVE' ? `${m.color}40` : 'rgba(255,255,255,0.06)'}` }}>
                          <div className="w-3 h-3 rounded-sm" style={{ background: m.badge === 'ACTIVE' ? m.color : '#3A4054' }}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{m.name}</span>
                            <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: m.badge === 'ACTIVE' ? 'rgba(231,198,243,0.2)' : 'rgba(255,255,255,0.06)', color: m.badge === 'ACTIVE' ? '#E7C6F3' : '#8B8F9E', fontSize: '10px', fontWeight: 600 }}>{m.badge}</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#8B8F9E', marginTop: '1px' }}>{m.desc}</div>
                        </div>
                        <div style={{ color: '#8B8F9E', fontSize: '16px' }}>›</div>
                      </div>
                      {idx < coreModules.length - 1 && (
                        <div className="flex justify-center py-1">
                          <svg width="2" height="12" fill="none"><line x1="1" y1="0" x2="1" y2="12" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="2 2"/></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Add-on Modules</span>
                    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
                  </div>
                  <div className="flex gap-2">
                    {['Community OS', 'Research OS'].map((name, idx) => (
                      <div key={idx} className="flex-1 rounded-lg p-3 text-center" style={{ background: '#171923', border: '1px solid rgba(255,255,255,0.06)', opacity: 0.5 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#B4B8C7' }}>{name}</div>
                        <div style={{ fontSize: '10px', color: '#8B8F9E', marginTop: '4px' }}>Planned</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── System Overview ───────────────────────────────────────────────────────────
function SystemOverview() {
  const coreModules = [
    { number: '01', name: 'Brand OS', desc: 'Voice & Identity Foundation', color: '#E7C6F3', status: 'Active' },
    { number: '02', name: 'Content OS', desc: 'Content Generation', color: '#FFBFDE', status: 'Active' },
    { number: '03', name: 'Launch OS', desc: 'Rollout & Coordination', color: '#DABFFF', status: 'Coming Q2' },
    { number: '04', name: 'Management OS', desc: 'Scheduling & Execution', color: '#C4B5FD', status: 'Coming Q2' },
    { number: '05', name: 'Analytics OS', desc: 'Performance Intelligence', color: '#B8A3FF', status: 'Coming Soon' },
  ];

  const addons = [
    { number: '06', name: 'Community OS', tagline: 'Audience Relationship Management', description: 'Manage interactions, track relationships, and build genuine community connections.', status: 'Planned Q3' },
    { number: '07', name: 'Research OS', tagline: 'Audience & Market Intelligence', description: 'Deep audience analysis, competitor research, and trend monitoring in one place.', status: 'Planned Q3' },
  ];

  const valueProps = [
    { label: 'Standalone Value', desc: 'Each module works independently' },
    { label: 'System Strength', desc: 'Together they create a real workflow' },
    { label: 'Modular Growth', desc: 'Add capabilities as your needs grow' },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(23, 25, 35, 0.4) 50%, transparent 100%)' }} />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #DABFFF)' }}></div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#DABFFF', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Platform Architecture</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #DABFFF, transparent)' }}></div>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2, fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.02em', marginBottom: '16px' }}>How CreatorOS Works</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#B4B8C7' }}>A modular system with a clear core workflow and optional add-ons. Start small, scale as you grow.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Core Workflow */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #E7C6F3 0%, #FFBFDE 100%)', boxShadow: '0 4px 12px rgba(231, 198, 243, 0.3)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>CORE WORKFLOW</span>
              </div>
              <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Recommended Path</span>
            </div>
            <div className="space-y-4">
              {coreModules.map((module, idx) => (
                <div key={idx}>
                  <div className="relative rounded-[16px] overflow-hidden" style={{ background: module.status === 'Active' ? 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)' : 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', border: `1px solid ${module.status === 'Active' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: module.status === 'Active' ? `${module.color}20` : '#171923', border: `1px solid ${module.status === 'Active' ? `${module.color}40` : 'rgba(255,255,255,0.06)'}` }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: module.status === 'Active' ? module.color : '#8B8F9E' }}>{module.number}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>{module.name}</h3>
                          <span className="px-2 py-0.5 rounded text-xs" style={{ background: module.status === 'Active' ? 'rgba(231,198,243,0.2)' : 'rgba(255,255,255,0.06)', color: module.status === 'Active' ? '#E7C6F3' : '#8B8F9E', fontSize: '10px', fontWeight: 600 }}>{module.status.toUpperCase()}</span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#B4B8C7' }}>{module.desc}</p>
                      </div>
                      <div style={{ color: '#8B8F9E' }}>›</div>
                    </div>
                  </div>
                  {idx < coreModules.length - 1 && (
                    <div className="flex justify-center py-1">
                      <svg width="2" height="12" fill="none"><line x1="1" y1="0" x2="1" y2="12" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="2 2"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Add-ons + Value Props */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #DABFFF 0%, #B8A3FF 100%)', boxShadow: '0 4px 12px rgba(218,191,255,0.3)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>ADD-ON MODULES</span>
                </div>
                <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Optional Extensions</span>
              </div>
              <div className="space-y-4">
                {addons.map((m, idx) => (
                  <div key={idx} className="rounded-[16px]" style={{ background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', border: '1px solid rgba(255,255,255,0.06)', opacity: 0.6 }}>
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: '#262A38', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '16px', fontWeight: 700, color: '#8B8F9E' }}>{m.number}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>{m.name}</h3>
                            <span className="px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#8B8F9E', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.status}</span>
                          </div>
                          <p style={{ fontSize: '14px', color: '#DABFFF', marginBottom: '8px', fontWeight: 500 }}>{m.tagline}</p>
                          <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.5 }}>{m.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[16px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)', border: '1px solid rgba(218,191,255,0.2)', boxShadow: '0 8px 24px rgba(218,191,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DABFFF 50%, transparent)' }}></div>
              <div className="p-6">
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '16px' }}>Why This Architecture Works</h3>
                <div className="space-y-4">
                  {valueProps.map((vp, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #E7C6F3, #FFBFDE)', boxShadow: '0 2px 8px rgba(231,198,243,0.3)' }}>
                        <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#0E0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '2px' }}>{vp.label}</div>
                        <div style={{ fontSize: '13px', color: '#B4B8C7' }}>{vp.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-[12px]" style={{ background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 4v12m0 0l4-4m-4 4L6 12" stroke="#DABFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>Not another tool. <span style={{ color: '#E7C6F3' }}>A real operating system for creator work.</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why CreatorOS ─────────────────────────────────────────────────────────────
function WhyCreatorOS() {
  const problems = [
    { problem: 'Tool Chaos', detail: "5-10 different tools that don't connect" },
    { problem: 'No Context Memory', detail: 'Restart from scratch every time' },
    { problem: 'Generic AI Outputs', detail: 'No brand voice, no consistency' },
    { problem: 'Disconnected Workflows', detail: 'Copy-paste between tools manually' },
    { problem: 'Lost Brand Knowledge', detail: 'Your brand rules live in your head' },
    { problem: 'Subscription Bloat', detail: "Paying for tools you barely use" },
  ];

  const solutions = [
    { solution: 'Connected System', detail: 'All modules work together seamlessly' },
    { solution: 'Reusable Context', detail: 'Brand profile used across all modules' },
    { solution: 'Brand-Consistent AI', detail: 'Your voice, automatically applied' },
    { solution: 'Workflow Integration', detail: 'Data flows between modules automatically' },
    { solution: 'System Memory', detail: 'Brand rules saved and reused' },
    { solution: 'Modular Pricing', detail: 'Pay only for what you actually use' },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(218,191,255,0.05) 0%, transparent 60%)' }} />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE)' }}></div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFBFDE', textTransform: 'uppercase', letterSpacing: '0.15em' }}>The Difference</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #FFBFDE, transparent)' }}></div>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2, fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.02em', marginBottom: '16px' }}>Why CreatorOS, Not Fragmented Tools?</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#B4B8C7' }}>Most creators use disconnected tools that don't talk to each other. CreatorOS is different.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem column */}
          <div className="rounded-[20px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #171923 0%, #0E0F14 100%)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)' }}>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: '#1F2230', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#8B8F9E" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>Fragmented Tools</h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', marginTop: '2px' }}>What most creators use</p>
                </div>
              </div>
              <div className="space-y-4">
                {problems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M8 2L2 8M2 2l6 6" stroke="#8B8F9E" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '2px' }}>{item.problem}</div>
                      <div style={{ fontSize: '13px', color: '#B4B8C7' }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution column */}
          <div className="rounded-[20px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', border: '1px solid rgba(231,198,243,0.2)', boxShadow: '0 8px 32px rgba(218,191,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(231,198,243,0.2), rgba(255,191,222,0.2))', border: '1px solid rgba(231,198,243,0.3)' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#E7C6F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>CreatorOS</h3>
                  <p style={{ fontSize: '14px', color: '#E7C6F3', marginTop: '2px' }}>A connected system</p>
                </div>
              </div>
              <div className="space-y-4">
                {solutions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(231,198,243,0.04)' }}>
                    <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #E7C6F3, #FFBFDE)', boxShadow: '0 2px 8px rgba(231,198,243,0.3)' }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M3 6l2 2 4-4" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>{item.solution}</div>
                      <div style={{ fontSize: '13px', color: '#B4B8C7', lineHeight: 1.4 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-[12px]" style={{ background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 4v12m0 0l4-4m-4 4L6 12" stroke="#DABFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>Not another tool. <span style={{ color: '#E7C6F3' }}>A real operating system for creator work.</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ecosystem Preview ─────────────────────────────────────────────────────────
function EcosystemPreview() {
  const modules = [
    { name: 'Brand OS', status: 'LIVE', description: 'Define voice, identity, and messaging foundation for all content.', accent: '#E7C6F3', available: true },
    { name: 'Content OS', status: 'LIVE', description: 'Transform offers and expertise into structured content workflows.', accent: '#FFBFDE', available: true },
    { name: 'Launch OS', status: 'PLANNED', description: 'Structure launches, coordinate rollouts, and orchestrate content phases.', accent: '#DABFFF', available: false },
    { name: 'Management OS', status: 'PLANNED', description: 'Schedule content, manage publishing queue, and execute multi-platform posting.', accent: '#C4B5FD', available: false },
    { name: 'Analytics OS', status: 'PLANNED', description: 'Track performance across platforms and content types.', accent: '#B8A3FF', available: false },
  ];

  return (
    <section className="py-32 lg:py-40" style={{ background: '#0E0F14' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: 'rgba(218,191,255,0.4)' }}></div>
            <span className="tracking-[0.15em] uppercase" style={{ fontSize: '12px', fontWeight: 600, color: '#DABFFF' }}>Ecosystem</span>
            <div className="h-px w-8" style={{ background: 'rgba(218,191,255,0.4)' }}></div>
          </div>
          <h2 className="mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2, fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.01em' }}>The CreatorOS Ecosystem</h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', maxWidth: '48rem', margin: '0 auto 3rem', color: '#B4B8C7' }}>
            Brand OS is the first module. More creator infrastructure modules are coming — each designed to solve specific workflow challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {modules.map((module, idx) => (
            <div
              key={idx}
              className="relative rounded-[16px] p-10"
              style={{ background: module.available ? '#1F2230' : '#171923', border: module.available ? `2px solid ${module.accent}66` : '1px solid rgba(255,255,255,0.04)', opacity: module.available ? 1 : 0.7 }}
            >
              {module.available && (
                <div className="absolute inset-0 rounded-[16px] opacity-20" style={{ background: `radial-gradient(circle at 50% 0%, ${module.accent}4D 0%, transparent 60%)` }}></div>
              )}
              <div className="relative space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#F4F3F8' }}>{module.name}</h3>
                  <span className="px-3 py-1 rounded-full text-xs flex-shrink-0" style={{ background: module.available ? `${module.accent}20` : 'rgba(255,255,255,0.06)', color: module.available ? module.accent : '#8B8F9E', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>{module.status}</span>
                </div>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#B4B8C7' }}>{module.description}</p>
                {module.available && (
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: module.accent, textDecoration: 'none' }}>
                    Learn more <span>→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{ background: '#171923' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(218,191,255,0.08) 0%, transparent 60%)' }}></div>
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto rounded-[20px] p-16 lg:p-20 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DABFFF 30%, #E7C6F3 50%, #DABFFF 70%, transparent)', boxShadow: '0 0 20px rgba(218,191,255,0.3)' }}></div>
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(218,191,255,0.15) 0%, transparent 50%)' }}></div>
          <div className="relative space-y-10">
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8" style={{ background: 'rgba(218,191,255,0.4)' }}></div>
              <span className="tracking-[0.15em] uppercase" style={{ fontSize: '12px', fontWeight: 600, color: '#DABFFF' }}>Start Building</span>
              <div className="h-px w-8" style={{ background: 'rgba(218,191,255,0.4)' }}></div>
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.1, fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.02em' }}>Ready to build your creator workflow?</h2>
            <p className="max-w-2xl mx-auto" style={{ fontSize: '17px', lineHeight: 1.7, color: '#B4B8C7' }}>
              Join creators who are building systematic workflows instead of managing fragmented tools. Start with Brand OS and Content OS — both live now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <a href="#" className="w-full sm:w-auto px-12 py-4 transition-all hover:opacity-90 shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #DABFFF 0%, #E7C6F3 100%)', color: '#0E0F14', borderRadius: '12px', fontSize: '17px', fontWeight: 600, boxShadow: '0 16px 40px rgba(218,191,255,0.4)', textDecoration: 'none', display: 'inline-block' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.5)' }}></div>
                View Dashboard
              </a>
              <a href="#" className="w-full sm:w-auto px-12 py-4 transition-all hover:opacity-90 relative overflow-hidden" style={{ background: '#1F2230', border: '1px solid rgba(255,255,255,0.1)', color: '#F4F3F8', borderRadius: '12px', fontSize: '17px', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}></div>
                Explore Modules
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 pt-10">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" stroke="#DABFFF" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="#DABFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: '14px', color: '#B4B8C7' }}>2 modules live</span>
              </div>
              <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5l2-5z" fill="#E7C6F3"/></svg>
                <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Start with core workflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const sections = [
    { title: 'Platform', links: ['Brand OS', 'Content OS', 'Launch OS', 'Management OS', 'Analytics OS'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Support', links: ['Documentation', 'Community', 'Status', 'Contact'] },
  ];

  return (
    <footer style={{ background: '#0E0F14', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded" style={{ background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)' }}></div>
                </div>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#F4F3F8' }}>CreatorOS</span>
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#B4B8C7', maxWidth: '280px' }}>
              A connected system of standalone tools for systematic creator work.
            </p>
          </div>
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-5">
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{section.title}</h4>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-white" style={{ fontSize: '15px', color: '#B4B8C7' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '14px', color: '#B4B8C7' }}>© 2026 CreatorOS. All rights reserved.</p>
          <div className="flex items-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-white" style={{ fontSize: '14px', color: '#B4B8C7' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Full Landing Page ─────────────────────────────────────────────────────────
export function Current() {
  return (
    <div style={{ background: '#0E0F14', minHeight: '100vh' }}>
      <Navbar />
      <PlatformHero />
      <SystemOverview />
      <WhyCreatorOS />
      <EcosystemPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}
