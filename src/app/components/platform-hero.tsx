import { Link } from 'react-router';

export function PlatformHero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* BACKGROUND LAYER - Architectural Foundation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        
        <div 
          className="absolute inset-0" 
          style={{ background: 'linear-gradient(180deg, rgba(23, 25, 35, 0.4) 0%, transparent 60%)' }}
        />
        
        <div 
          className="absolute top-0 right-0 bottom-0 left-1/2"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(31, 34, 48, 0.3) 100%)' }}
        />
        
        <div 
          className="absolute inset-0" 
          style={{ background: 'linear-gradient(135deg, rgba(218, 191, 255, 0.04) 0%, transparent 40%)' }}
        />
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left: Platform Story (Foreground) */}
          <div className="space-y-8 lg:space-y-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span 
                className="tracking-[0.15em] uppercase" 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 600,
                  color: '#DABFFF',
                  letterSpacing: '0.15em'
                }}
              >
                Modular Creator Platform
              </span>
            </div>

            {/* Headline */}
            <h1 
              className="max-w-2xl" 
              style={{ 
                fontSize: 'clamp(40px, 5vw, 64px)', 
                lineHeight: 1.1,
                fontWeight: 700,
                color: '#F4F3F8',
                letterSpacing: '-0.02em'
              }}
            >
              A connected system of standalone tools for creator work.
            </h1>

            {/* Subheadline */}
            <p 
              className="max-w-xl" 
              style={{ 
                fontSize: '18px', 
                lineHeight: 1.6,
                color: '#B4B8C7'
              }}
            >
              CreatorOS is a customizable creator platform with a clear core workflow and optional add-on modules. Each tool works independently — but together, they create a real operating system for systematic content production.
            </p>

            {/* CTA Buttons */}
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
                  boxShadow: '0 8px 24px rgba(218, 191, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
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
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 16px rgba(0, 0, 0, 0.3)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }}></div>
                Explore Modules
              </Link>
            </div>
          </div>

          {/* Right: Platform System Visual */}
          <div className="relative lg:h-[700px] flex items-center justify-center">
            
            {/* Background Glow */}
            <div 
              className="absolute inset-0 rounded-[20px] blur-2xl opacity-20"
              style={{ 
                background: 'linear-gradient(135deg, #DABFFF 0%, #FFBFDE 50%, #E7C6F3 100%)',
                transform: 'scale(0.85) translateY(30px)'
              }}
            />

            {/* Platform Dashboard Shell */}
            <div 
              className="relative w-full max-w-[580px] rounded-[20px] overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #171923 0%, #0E0F14 100%)',
                boxShadow: '0 32px 96px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
                transform: 'translateZ(0)'
              }}
            >
              {/* Top Edge Light */}
              <div 
                className="absolute top-0 left-0 right-0 h-px z-10" 
                style={{ background: 'linear-gradient(90deg, transparent, rgba(218, 191, 255, 0.3) 35%, rgba(255, 191, 222, 0.25) 65%, transparent)' }}
              ></div>

              {/* Header Bar */}
              <div 
                className="relative px-6 py-4 border-b"
                style={{ 
                  background: 'linear-gradient(180deg, rgba(31, 34, 48, 0.5) 0%, rgba(23, 25, 35, 0.6) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#DABFFF', boxShadow: '0 0 10px rgba(218, 191, 255, 0.7)' }}></div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', letterSpacing: '-0.01em' }}>CreatorOS</span>
                    <div className="px-2 py-0.5 rounded" style={{ background: 'rgba(218, 191, 255, 0.12)', fontSize: '10px', fontWeight: 600, color: '#DABFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Platform
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054', border: '1px solid rgba(255, 255, 255, 0.04)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054', border: '1px solid rgba(255, 255, 255, 0.04)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054', border: '1px solid rgba(255, 255, 255, 0.04)' }}></div>
                  </div>
                </div>
              </div>

              {/* Main Content - Module Workflow Visual */}
              <div className="relative p-7 space-y-4" style={{ minHeight: '540px' }}>
                
                {/* Section Label */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.06)' }}></div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Core Workflow
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.06)' }}></div>
                </div>

                {/* Module Cards - Core Workflow */}
                <div className="space-y-3">
                  {[
                    { name: 'Brand OS', desc: 'Voice & Identity Foundation', color: '#E7C6F3', status: 'Active' },
                    { name: 'Content OS', desc: 'Content Generation', color: '#FFBFDE', status: 'Active' },
                    { name: 'Launch OS', desc: 'Rollout & Coordination', color: '#DABFFF', status: 'Planned' },
                    { name: 'Management OS', desc: 'Scheduling & Execution', color: '#C4B5FD', status: 'Planned' },
                    { name: 'Analytics OS', desc: 'Performance Intelligence', color: '#B8A3FF', status: 'Planned' }
                  ].map((module, idx) => (
                    <div key={idx}>
                      <div 
                        className="relative rounded-[14px] overflow-hidden transition-all"
                        style={{ 
                          background: module.status === 'Active' 
                            ? 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)'
                            : 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                          border: `1px solid ${module.status === 'Active' ? `rgba(${module.color === '#E7C6F3' ? '231, 198, 243' : '255, 191, 222'}, 0.25)` : 'rgba(255, 255, 255, 0.08)'}`,
                          boxShadow: module.status === 'Active'
                            ? `0 8px 20px rgba(${module.color === '#E7C6F3' ? '231, 198, 243' : '255, 191, 222'}, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)`
                            : 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                          opacity: module.status === 'Active' ? 1 : 0.6
                        }}
                      >
                        {/* Top Light Edge (Active only) */}
                        {module.status === 'Active' && (
                          <div 
                            className="absolute top-0 left-0 right-0 h-px" 
                            style={{ background: `linear-gradient(90deg, transparent, ${module.color} 50%, transparent)`, opacity: 0.5 }}
                          ></div>
                        )}

                        <div className="relative p-4 flex items-center gap-3">
                          {/* Module Icon */}
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" 
                            style={{ 
                              background: module.status === 'Active' 
                                ? `linear-gradient(135deg, ${module.color}, ${module.color}E6)`
                                : '#262A38',
                              border: `1px solid ${module.status === 'Active' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)'}`,
                              boxShadow: module.status === 'Active'
                                ? `0 4px 12px rgba(${module.color === '#E7C6F3' ? '231, 198, 243' : module.color === '#FFBFDE' ? '255, 191, 222' : '218, 191, 255'}, 0.3)`
                                : 'none'
                            }}
                          >
                            <div 
                              className="w-5 h-5 rounded-md" 
                              style={{ 
                                background: module.status === 'Active' ? '#0E0F14' : 'rgba(255, 255, 255, 0.05)',
                                opacity: module.status === 'Active' ? 0.6 : 1
                              }}
                            ></div>
                          </div>

                          {/* Module Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>
                                {module.name}
                              </span>
                              <span 
                                className="px-2 py-0.5 rounded text-xs" 
                                style={{ 
                                  background: module.status === 'Active' 
                                    ? `rgba(${module.color === '#E7C6F3' ? '231, 198, 243' : '255, 191, 222'}, 0.15)`
                                    : 'rgba(255, 255, 255, 0.05)',
                                  color: module.status === 'Active' ? module.color : '#8B8F9E',
                                  fontSize: '10px',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em'
                                }}
                              >
                                {module.status}
                              </span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#B4B8C7', marginTop: '2px' }}>
                              {module.desc}
                            </div>
                          </div>

                          {/* Arrow indicator */}
                          {module.status === 'Active' && (
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="flex-shrink-0">
                              <path d="M6 12l4-4-4-4" stroke={module.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Connector between modules */}
                      {idx < 3 && (
                        <div className="flex justify-center py-1">
                          <svg width="2" height="12" fill="none">
                            <line x1="1" y1="0" x2="1" y2="12" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" strokeDasharray="2 2"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add-ons Section */}
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.06)' }}></div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B8F9E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Add-on Modules
                    </span>
                    <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.06)' }}></div>
                  </div>

                  <div className="flex gap-2">
                    {['Community OS', 'Research OS'].map((name, idx) => (
                      <div 
                        key={idx}
                        className="flex-1 rounded-lg p-3 text-center"
                        style={{ 
                          background: '#171923',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          opacity: 0.5
                        }}
                      >
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#B4B8C7' }}>
                          {name}
                        </div>
                        <div style={{ fontSize: '10px', color: '#8B8F9E', marginTop: '4px' }}>
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
    </section>
  );
}