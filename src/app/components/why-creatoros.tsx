export function WhyCreatorOS() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div 
          className="absolute inset-0" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(218, 191, 255, 0.05) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE)' }}></div>
            <span 
              style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: '#FFBFDE',
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
              }}
            >
              The Difference
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #FFBFDE, transparent)' }}></div>
          </div>

          <h2 
            style={{ 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              lineHeight: 1.2,
              fontWeight: 700,
              color: '#F4F3F8',
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}
          >
            Why CreatorOS, Not Fragmented Tools?
          </h2>

          <p 
            style={{ 
              fontSize: '18px', 
              lineHeight: 1.6,
              color: '#B4B8C7'
            }}
          >
            Most creators use disconnected tools that don't talk to each other. CreatorOS is different.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: The Problem (Fragmented Tools) */}
          <div 
            className="rounded-[20px] overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #171923 0%, #0E0F14 100%)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: '#1F2230',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#8B8F9E" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>
                    Fragmented Tools
                  </h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', marginTop: '2px' }}>
                    What most creators use
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    problem: 'Tool Chaos',
                    detail: '5-10 different tools that don\'t connect'
                  },
                  {
                    problem: 'No Context Memory',
                    detail: 'Restart from scratch every time'
                  },
                  {
                    problem: 'Generic AI Outputs',
                    detail: 'No brand voice, no consistency'
                  },
                  {
                    problem: 'Disconnected Workflows',
                    detail: 'Copy-paste between tools manually'
                  },
                  {
                    problem: 'Lost Brand Knowledge',
                    detail: 'Your brand rules live in your head'
                  },
                  {
                    problem: 'Subscription Bloat',
                    detail: 'Paying for tools you barely use'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg"
                    style={{ 
                      background: '#171923',
                      border: '1px solid rgba(255, 255, 255, 0.04)'
                    }}
                  >
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B8F9E' }}></div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
                        {item.problem}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8B8F9E', lineHeight: 1.4 }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: The Solution (CreatorOS) */}
          <div 
            className="rounded-[20px] overflow-hidden relative"
            style={{ 
              background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
              border: '1px solid rgba(231, 198, 243, 0.25)',
              boxShadow: '0 16px 48px rgba(231, 198, 243, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Top edge highlight */}
            <div 
              className="absolute top-0 left-0 right-0 h-px" 
              style={{ background: 'linear-gradient(90deg, transparent, #E7C6F3 50%, transparent)' }}
            ></div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #E7C6F3, #FFBFDE)',
                    boxShadow: '0 8px 20px rgba(231, 198, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4" stroke="#0E0F14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="#0E0F14" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>
                    CreatorOS
                  </h3>
                  <p style={{ fontSize: '14px', color: '#E7C6F3', marginTop: '2px' }}>
                    The connected alternative
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    solution: 'Connected System',
                    detail: 'All modules work together seamlessly'
                  },
                  {
                    solution: 'Reusable Context',
                    detail: 'Brand profile used across all modules'
                  },
                  {
                    solution: 'Brand-Consistent AI',
                    detail: 'Your voice, automatically applied'
                  },
                  {
                    solution: 'Workflow Integration',
                    detail: 'Data flows between modules automatically'
                  },
                  {
                    solution: 'System Memory',
                    detail: 'Brand rules saved and reused'
                  },
                  {
                    solution: 'Modular Pricing',
                    detail: 'Pay only for what you actually use'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg relative overflow-hidden"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.08) 0%, rgba(255, 191, 222, 0.05) 100%)',
                      border: '1px solid rgba(231, 198, 243, 0.15)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ 
                        background: 'linear-gradient(135deg, #E7C6F3, #FFBFDE)',
                        boxShadow: '0 2px 8px rgba(231, 198, 243, 0.3)'
                      }}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                        <path d="M3 6l2 2 4-4" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
                        {item.solution}
                      </div>
                      <div style={{ fontSize: '13px', color: '#B4B8C7', lineHeight: 1.4 }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-12 text-center">
          <div 
            className="inline-flex items-center gap-3 px-6 py-4 rounded-[12px]"
            style={{ 
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M10 4v12m0 0l4-4m-4 4L6 12" stroke="#DABFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
