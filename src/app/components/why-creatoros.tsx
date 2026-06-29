/**
 * WhyCreatorOS — Chapter 03 · The Difference
 *
 * Composition uplift only. No copy/token/font changes.
 * Applies the PlatformHero grammar:
 *   1. Asymmetric chapter header (5/7)
 *   2. Three-layer depth (deep base → soft aura → foreground)
 *   3. Architectural breathing room
 *   4. Vertical accent rail + chapter marker
 *   5. Horizon edges + raised "Solution" card on a pedestal (real hierarchy
 *      instead of equal-height side-by-side)
 */
export function WhyCreatorOS() {
  return (
    <section className="relative pt-28 pb-28 md:pt-40 md:pb-36 lg:pt-48 lg:pb-44 overflow-hidden">
      {/* ── LAYER 1 · BACKGROUND FIELD ───────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,15,20,0.6) 0%, rgba(23,25,35,0.4) 50%, rgba(14,15,20,0.6) 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,191,222,0.18) 50%, transparent)',
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
          className="absolute top-[20%] right-[-12%] w-[720px] h-[720px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(231,198,243,0.12) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute bottom-[5%] -left-32 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,191,222,0.06) 0%, transparent 60%)',
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
                  'linear-gradient(180deg, transparent 0%, rgba(255,191,222,0.4) 18%, rgba(255,255,255,0.06) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <div
              className="hidden md:block absolute -left-[42px] top-[6px] w-[7px] h-[7px] rounded-full"
              style={{
                background: '#FFBFDE',
                boxShadow: '0 0 14px rgba(255,191,222,0.65)',
              }}
              aria-hidden="true"
            />
            <span
              className="block tracking-[0.15em] uppercase mb-6"
              style={{ fontSize: '12px', fontWeight: 600, color: '#FFBFDE', letterSpacing: '0.15em' }}
            >
              The Difference
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
              Why CreatorOS, Not Fragmented Tools?
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex lg:items-end">
            <p style={{ fontSize: '18px', lineHeight: 1.65, color: '#B4B8C7', maxWidth: '520px' }}>
              Most creators use disconnected tools that don't talk to each other. CreatorOS is different.
            </p>
          </div>
        </div>

        {/* Comparison — recessed problem (left) vs lifted solution (right) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Problem — recessed */}
          <div
            className="lg:col-span-5 lg:pt-16 rounded-[20px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #171923 0%, #0E0F14 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.5)',
              opacity: 0.92,
            }}
          >
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: '#1F2230', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#8B8F9E" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>Fragmented Tools</h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', marginTop: '2px' }}>What most creators use</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { problem: 'Tool Chaos', detail: "5-10 different tools that don't connect" },
                  { problem: 'No Context Memory', detail: 'Restart from scratch every time' },
                  { problem: 'Generic AI Outputs', detail: 'No brand voice, no consistency' },
                  { problem: 'Disconnected Workflows', detail: 'Copy-paste between tools manually' },
                  { problem: 'Lost Brand Knowledge', detail: 'Your brand rules live in your head' },
                  { problem: 'Subscription Bloat', detail: 'Paying for tools you barely use' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg"
                    style={{ background: '#171923', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B8F9E' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
                        {item.problem}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8B8F9E', lineHeight: 1.4 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution — lifted on pedestal */}
          <div className="lg:col-span-7 relative">
            <div
              className="absolute inset-x-8 bottom-[-40px] h-[90px] opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 65% 100% at 50% 0%, rgba(231,198,243,0.20), transparent 70%)',
                filter: 'blur(16px)',
              }}
              aria-hidden="true"
            />
            <div
              className="relative rounded-[22px] overflow-hidden lg:transform lg:-translate-y-2"
              style={{
                background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                border: '1px solid rgba(231,198,243,0.25)',
                boxShadow:
                  '0 60px 120px -30px rgba(0,0,0,0.7), 0 16px 48px rgba(231,198,243,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #E7C6F3 50%, transparent)' }}
              />

              <div className="p-7 md:p-10">
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #E7C6F3, #FFBFDE)',
                      boxShadow: '0 8px 20px rgba(231,198,243,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
                    }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4" stroke="#0E0F14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="9" stroke="#0E0F14" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>CreatorOS</h3>
                    <p style={{ fontSize: '14px', color: '#E7C6F3', marginTop: '2px' }}>The connected alternative</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { solution: 'Connected System', detail: 'All modules work together seamlessly' },
                    { solution: 'Reusable Context', detail: 'Brand profile used across all modules' },
                    { solution: 'Brand-Consistent AI', detail: 'Your voice, automatically applied' },
                    { solution: 'Workflow Integration', detail: 'Data flows between modules automatically' },
                    { solution: 'System Memory', detail: 'Brand rules saved and reused' },
                    { solution: 'Modular Pricing', detail: 'Pay only for what you actually use' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-lg relative overflow-hidden"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(231,198,243,0.08) 0%, rgba(255,191,222,0.05) 100%)',
                        border: '1px solid rgba(231,198,243,0.15)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: 'linear-gradient(135deg, #E7C6F3, #FFBFDE)',
                          boxShadow: '0 2px 8px rgba(231,198,243,0.3)',
                        }}
                      >
                        <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                          <path d="M3 6l2 2 4-4" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
                          {item.solution}
                        </div>
                        <div style={{ fontSize: '13px', color: '#B4B8C7', lineHeight: 1.4 }}>{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom summary chip */}
        <div className="mt-20 lg:mt-24 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-[12px]"
            style={{
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M10 4v12m0 0l4-4m-4 4L6 12" stroke="#DABFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>
              Not another tool.{' '}
              <span style={{ color: '#E7C6F3' }}>A real operating system for creator work.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
