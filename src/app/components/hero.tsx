export function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* BACKGROUND LAYER - Architectural Tonal Planes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep base layer - solid foundation */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: '#0E0F14',
          }}
        />
        
        {/* Architectural plane 1 - structured tonal layer */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(180deg, rgba(23, 25, 35, 0.4) 0%, transparent 60%)',
          }}
        />
        
        {/* Architectural plane 2 - right side elevation for OS preview context */}
        <div 
          className="absolute top-0 right-0 bottom-0 left-1/2"
          style={{ 
            background: 'linear-gradient(90deg, transparent 0%, rgba(31, 34, 48, 0.3) 100%)',
          }}
        />
        
        {/* Controlled light path - single intentional highlight */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.05) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left: Editorial Text Stack (Foreground) */}
          <div className="space-y-8 lg:space-y-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span 
                className="tracking-[0.15em] uppercase" 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 600,
                  color: '#FFBFDE',
                  letterSpacing: '0.15em'
                }}
              >
                Creator Infrastructure / Module 01
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
              From offer to output — without the content chaos.
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
              Content OS is the first module inside CreatorOS — a structured system for turning ideas, offers and expertise into reusable content workflows.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                className="px-8 py-4 transition-all hover:opacity-90 shadow-lg relative overflow-hidden" 
                style={{ 
                  background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)', 
                  color: '#0E0F14',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                  boxShadow: '0 8px 24px rgba(255, 191, 222, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
                Start Creating
              </button>
              <button 
                className="px-8 py-4 transition-all hover:opacity-90 relative overflow-hidden" 
                style={{ 
                  background: '#1F2230',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#F4F3F8',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 500,
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 16px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }}></div>
                Explore Platform
              </button>
            </div>
          </div>

          {/* Right: Premium OS Surface - Hero-Worthy Iconic Treatment */}
          <div className="relative lg:h-[700px] flex items-center justify-center">
            
            {/* BACKGROUND - Controlled atmospheric foundation (less diffuse) */}
            <div 
              className="absolute inset-0 rounded-[20px] blur-2xl opacity-25"
              style={{ 
                background: 'linear-gradient(135deg, #DABFFF 0%, #FFBFDE 100%)',
                transform: 'scale(0.8) translateY(30px)'
              }}
            />

            {/* MIDGROUND - Iconic OS Shell Container (increased scale and presence) */}
            <div 
              className="relative w-full max-w-[580px] rounded-[20px] overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #171923 0%, #0E0F14 100%)',
                boxShadow: '0 32px 96px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
                transform: 'translateZ(0)' // Create stacking context
              }}
            >
              {/* Premium top light edge - more refined */}
              <div 
                className="absolute top-0 left-0 right-0 h-px z-10" 
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.3) 35%, rgba(218, 191, 255, 0.25) 65%, transparent)' }}
              ></div>

              {/* OS Shell Header Bar - refined premium treatment */}
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
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FFBFDE', boxShadow: '0 0 10px rgba(255, 191, 222, 0.7)' }}></div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', letterSpacing: '-0.01em' }}>Content OS</span>
                    <div className="px-2 py-0.5 rounded" style={{ background: 'rgba(255, 191, 222, 0.12)', fontSize: '10px', fontWeight: 600, color: '#FFBFDE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Live
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054', border: '1px solid rgba(255, 255, 255, 0.04)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054', border: '1px solid rgba(255, 255, 255, 0.04)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054', border: '1px solid rgba(255, 255, 255, 0.04)' }}></div>
                  </div>
                </div>
              </div>

              {/* FOREGROUND - Main Content Area with Enhanced Panel Hierarchy */}
              <div className="relative p-7 space-y-5" style={{ minHeight: '540px' }}>
                
                {/* FOREGROUND PANEL 1 - Input Panel (Highest Elevation - Strengthened) */}
                <div 
                  className="relative rounded-[16px] overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                    border: '1px solid rgba(255, 191, 222, 0.35)',
                    boxShadow: '0 16px 40px rgba(255, 191, 222, 0.25), 0 6px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                    transform: 'translateZ(15px)' // Stronger foreground separation
                  }}
                >
                  {/* Refined top light edge - less decorative */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px" 
                    style={{ 
                      background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.7) 50%, transparent)',
                    }}
                  ></div>

                  <div className="relative p-6">
                    {/* Panel Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center relative overflow-hidden" 
                        style={{ 
                          background: 'linear-gradient(135deg, #FFBFDE, #DABFFF)',
                          boxShadow: '0 8px 20px rgba(255, 191, 222, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                          <path d="M8 2.5v11M2.5 8h11" stroke="#0E0F14" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', letterSpacing: '-0.01em' }}>Input Layer</div>
                        <div style={{ fontSize: '11px', color: '#B4B8C7', marginTop: '2px' }}>Generate Content</div>
                      </div>
                    </div>

                    {/* Input visualization */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FFBFDE' }}></div>
                        <div className="h-2 rounded-full flex-1" style={{ background: 'rgba(255, 191, 222, 0.3)' }}></div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E7C6F3' }}></div>
                        <div className="h-2 rounded-full" style={{ width: '70%', background: 'rgba(231, 198, 243, 0.3)' }}></div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#DABFFF' }}></div>
                        <div className="h-2 rounded-full" style={{ width: '85%', background: 'rgba(218, 191, 255, 0.3)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MIDGROUND PANEL 1 - Output Panel (Enhanced contrast) */}
                <div 
                  className="relative rounded-[14px] overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                    transform: 'translateZ(8px)' // Clearer mid elevation
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
                  
                  <div className="p-5">
                    {/* Panel Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center" 
                        style={{ 
                          background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 3px 8px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                          <path d="M2 8h12M10 3l5 5-5 5" stroke="#B4B8C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>Output Layer</div>
                        <div style={{ fontSize: '11px', color: '#B4B8C7', marginTop: '2px' }}>Structured Results</div>
                      </div>
                    </div>

                    {/* Nested sub-panels for deeper hierarchy */}
                    <div className="space-y-2.5">
                      {[
                        { w: '95%' },
                        { w: '80%' },
                        { w: '90%' },
                        { w: '75%' }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          className="rounded-lg p-2.5"
                          style={{ 
                            background: '#262A38',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.4)'
                          }}
                        >
                          <div className="h-px rounded-full" style={{ width: item.w, background: 'rgba(180, 184, 199, 0.3)' }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BACKGROUND PANEL - Library Panel (Clearer recessed depth) */}
                <div 
                  className="relative rounded-[12px] overflow-hidden"
                  style={{ 
                    background: '#171923',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.6)',
                    transform: 'translateZ(0)' // Background elevation
                  }}
                >
                  <div className="p-5">
                    {/* Panel Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center" 
                        style={{ 
                          background: '#1F2230',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                          <rect x="2" y="2" width="5" height="5" rx="1" stroke="#B4B8C7" strokeWidth="1.5"/>
                          <rect x="9" y="2" width="5" height="5" rx="1" stroke="#B4B8C7" strokeWidth="1.5"/>
                          <rect x="2" y="9" width="5" height="5" rx="1" stroke="#B4B8C7" strokeWidth="1.5"/>
                          <rect x="9" y="9" width="5" height="5" rx="1" stroke="#B4B8C7" strokeWidth="1.5"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#B4B8C7' }}>Library</div>
                        <div style={{ fontSize: '11px', color: '#B4B8C7', opacity: 0.6, marginTop: '2px' }}>Saved Assets</div>
                      </div>
                    </div>

                    {/* Grid of saved items */}
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i}
                          className="aspect-square rounded-md" 
                          style={{ 
                            background: '#1F2230',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                        ></div>
                      ))}
                    </div>
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