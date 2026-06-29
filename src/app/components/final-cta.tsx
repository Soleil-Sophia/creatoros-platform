import { Link } from 'react-router';

/**
 * FinalCTA — Chapter 05 · Start Building
 *
 * Composition uplift only. No copy/token/route/font changes.
 * Applies the PlatformHero grammar:
 *   1. Asymmetric vertical composition (rail + centered stage)
 *   2. Three-layer depth (deep base → ambient aura → lifted stage)
 *   3. Architectural breathing room
 *   4. Vertical accent rail + chapter marker
 *   5. Horizon edges + strong pedestal glow under the CTA stage
 */
export function FinalCTA() {
  return (
    <section className="relative pt-32 pb-32 md:pt-44 md:pb-44 lg:pt-52 lg:pb-52 overflow-hidden">
      {/* ── LAYER 1 · BACKGROUND FIELD ───────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,15,20,0.6) 0%, rgba(23,25,35,0.5) 50%, rgba(14,15,20,0.85) 100%)',
          }}
        />
        {/* Architectural floor grid — mirrors the hero, anchors as final chapter */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(0,0,0,0.6), transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(0,0,0,0.6), transparent 70%)',
          }}
        />
        {/* Horizon edges */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(218,191,255,0.18) 50%, rgba(255,255,255,0.08) 70%, transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,191,222,0.12) 50%, transparent)',
          }}
        />
      </div>

      {/* ── LAYER 2 · MIDGROUND AMBIENT ──────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(218,191,255,0.10) 0%, rgba(255,191,222,0.06) 35%, transparent 70%)',
          }}
        />
      </div>

      {/* ── LAYER 3 · FOREGROUND ─────────────────────────────────── */}
      <div className="relative max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Chapter marker — centered above stage, mirrors hero rail visually */}
        <div className="flex flex-col items-center mb-14 lg:mb-20">
          <div
            className="w-px h-16 md:h-24"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(218,191,255,0.35) 60%, #DABFFF 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="w-[7px] h-[7px] rounded-full mt-2"
            style={{
              background: '#DABFFF',
              boxShadow: '0 0 14px rgba(218,191,255,0.65)',
            }}
            aria-hidden="true"
          />
          <span
            className="tracking-[0.15em] uppercase mt-6"
            style={{ fontSize: '12px', fontWeight: 600, color: '#DABFFF', letterSpacing: '0.15em' }}
          >
            Start Building
          </span>
        </div>

        {/* Lifted CTA stage on pedestal */}
        <div className="relative max-w-4xl mx-auto">
          {/* Pedestal glow */}
          <div
            className="absolute inset-x-12 bottom-[-50px] h-[100px] opacity-70 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,191,222,0.18), transparent 70%)',
              filter: 'blur(18px)',
            }}
            aria-hidden="true"
          />

          <div
            className="relative rounded-[22px] p-12 lg:p-20 text-center overflow-hidden lg:transform lg:-translate-y-2"
            style={{
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                '0 60px 120px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 1px rgba(255,255,255,0.05)',
            }}
          >
            {/* Top edge light */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #FFBFDE 30%, #DABFFF 50%, #FFBFDE 70%, transparent)',
                boxShadow: '0 0 12px rgba(255,191,222,0.18)',
              }}
            />
            {/* Inner radial glow */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255,191,222,0.12) 0%, transparent 55%)',
              }}
            />

            <div className="relative space-y-10">
              <h2
                style={{
                  fontSize: 'clamp(36px, 4.6vw, 60px)',
                  lineHeight: 1.08,
                  fontWeight: 700,
                  color: '#F4F3F8',
                  letterSpacing: '-0.025em',
                }}
              >
                Ready to build your creator workflow?
              </h2>

              <p
                className="max-w-2xl mx-auto"
                style={{ fontSize: '17px', lineHeight: 1.7, color: '#B4B8C7' }}
              >
                Join creators who are building systematic workflows instead of managing fragmented tools. Start with Brand OS and Content OS — both live now.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-12 py-4 transition-all hover:opacity-90 shadow-xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #DABFFF 0%, #E7C6F3 100%)',
                    color: '#0E0F14',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: 600,
                    boxShadow: '0 12px 32px rgba(255,191,222,0.25)',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                  />
                  View Dashboard
                </Link>
                <Link
                  to="/modules"
                  className="w-full sm:w-auto px-12 py-4 transition-all hover:opacity-90 relative overflow-hidden"
                  style={{
                    background: '#1F2230',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#F4F3F8',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: 500,
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.3)',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  />
                  Explore Modules
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" stroke="#DABFFF" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="#DABFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#B4B8C7' }}>2 modules live</span>
                </div>
                <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5l2-5z" fill="#E7C6F3" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Start with core workflow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
