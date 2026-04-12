export function SystemOverview() {
  const coreModules = [
    { number: '01', name: 'BrandOS', desc: 'Define positioning, messaging, and brand foundations before execution begins.', accent: '#E7C6F3', status: 'active' },
    { number: '02', name: 'ContentOS', desc: 'Turn strategy into structured content outputs, reusable workflows, and content systems.', accent: '#FFBFDE', status: 'active' },
    { number: '03', name: 'LaunchOS', desc: 'Organize campaigns, launch flows, and go-to-market execution with more clarity and less friction.', accent: '#DABFFF', status: 'planned' },
    { number: '04', name: 'ManagementOS', desc: 'Keep internal operations, tasks, systems, and decision-making structured as the business grows.', accent: '#C4B5FD', status: 'planned' },
    { number: '05', name: 'AnalyticsOS', desc: 'Track what performs, what compounds, and where to improve across the platform.', accent: '#B8A3FF', status: 'planned' },
  ];

  const valueProps = [
    { label: 'Start with one module', desc: 'Each module delivers standalone value without requiring the rest.' },
    { label: 'Expand without rebuilding', desc: 'Add modules as your needs grow — the system stays connected.' },
    { label: 'Keep workflows connected', desc: 'Together, the modules form a stronger operating system.' },
  ];

  return (
    <section className="section" style={{ background: '#0E0F14' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Platform Architecture
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            maxWidth: '640px',
            margin: '0 auto 16px',
          }}>
            CreatorOS is the platform.<br />The modules are how the system works.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Instead of forcing creators into one oversized tool, CreatorOS is built as a modular platform. Each module solves a distinct stage of the workflow — and becomes more powerful when used together.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start', maxWidth: '900px', margin: '0 auto' }}>

          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '8px', marginBottom: '24px',
              background: 'linear-gradient(135deg, rgba(231,198,243,0.15) 0%, rgba(255,191,222,0.15) 100%)',
              border: '1px solid rgba(231,198,243,0.25)',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#E7C6F3', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Core Workflow
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {coreModules.map((m, idx) => {
                const isActive = m.status === 'active';
                return (
                  <div key={m.name}>
                    <div style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: isActive
                        ? 'linear-gradient(135deg, #1F2230 0%, #171923 100%)'
                        : 'rgba(23, 25, 35, 0.4)',
                      border: `1px solid ${isActive ? `${m.accent}35` : 'rgba(255,255,255,0.05)'}`,
                      opacity: isActive ? 1 : 0.6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {isActive && (
                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                          background: `linear-gradient(90deg, transparent, ${m.accent}50, transparent)`,
                        }} />
                      )}
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isActive ? `${m.accent}18` : '#1A1D2A',
                        border: `1px solid ${isActive ? `${m.accent}35` : 'rgba(255,255,255,0.06)'}`,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '13px', fontWeight: 700,
                          color: isActive ? m.accent : 'var(--text-3)',
                        }}>
                          {m.number}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
                            {m.name}
                          </span>
                          <span style={{
                            fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '100px',
                            background: isActive ? `${m.accent}14` : 'rgba(255,255,255,0.05)',
                            color: isActive ? m.accent : 'var(--text-3)',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                          }}>
                            {isActive ? 'Active' : 'Planned'}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>{m.desc}</span>
                      </div>
                    </div>
                    {idx < coreModules.length - 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                        <svg width="2" height="10" fill="none">
                          <line x1="1" y1="0" x2="1" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="2 2" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div style={{
              padding: '28px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(218,191,255,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.4) 50%, transparent)',
              }} />
              <p style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.6, marginBottom: '16px' }}>
                Each module has standalone value. Together, they form a stronger operating system.
              </p>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px', fontWeight: 700, color: 'var(--text)',
                marginBottom: '20px',
              }}>
                Why this architecture works
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {valueProps.map((vp) => (
                  <div key={vp.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg, #E7C6F3, #FFBFDE)',
                    }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2 2 4-4" stroke="#0E0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{vp.label}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>{vp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '20px 24px',
              borderRadius: '14px',
              background: 'rgba(23, 25, 35, 0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                Not another tool.
              </p>
              <p style={{ fontSize: '13px', color: 'var(--lilac)' }}>
                A real operating system for creator work.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
