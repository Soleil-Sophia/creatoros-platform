export function WhatYouCanCreate() {
  const createOutputs = [
    {
      title: 'Hooks',
      description: 'Attention-grabbing opening lines tailored to your content and audience.',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M20 7h-5V2l-8 11h5v9l8-15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#FFBFDE'
    },
    {
      title: 'Scripts',
      description: 'Full video scripts structured with your voice, tone, and key talking points.',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#E7C6F3'
    },
    {
      title: 'Captions',
      description: 'Platform-optimized captions that extend your content and drive engagement.',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 10h.01M7 14h.01M11 10h6M11 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      accent: '#DABFFF'
    }
  ];

  const systemizeOutputs = [
    {
      title: 'Content Plans',
      description: 'Strategic content calendars built around your offers, themes, and goals.',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 2v4M16 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      accent: '#CFFFF9'
    },
    {
      title: 'Brand Voice',
      description: 'Define and maintain consistency across all your content with saved voice profiles.',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2"/>
          <path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      accent: '#CDF7E6'
    }
  ];

  return (
    <section className="py-32 lg:py-40" style={{ background: '#0E0F14' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: 'rgba(218, 191, 255, 0.4)' }}></div>
            <span 
              className="tracking-[0.15em] uppercase" 
              style={{ 
                fontSize: '12px', 
                fontWeight: 600,
                color: '#DABFFF'
              }}
            >
              Outputs
            </span>
            <div className="h-px w-8" style={{ background: 'rgba(218, 191, 255, 0.4)' }}></div>
          </div>
          <h2 
            className="mb-6"
            style={{ 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              lineHeight: 1.2,
              fontWeight: 700,
              color: '#F4F3F8',
              letterSpacing: '-0.01em'
            }}
          >
            Reusable outputs, not one-off text
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: '17px', 
              lineHeight: 1.7,
              color: '#B4B8C7'
            }}
          >
            Content OS produces structured, reusable outputs that fit directly into your creative workflow.
          </p>
          
          {/* Proof Layer */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FFBFDE' }}></div>
              <span style={{ fontSize: '14px', color: '#B4B8C7' }}>1 input → multiple asset types</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E7C6F3' }}></div>
              <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Saved to your library</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#DABFFF' }}></div>
              <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Searchable by campaign, platform, or voice</span>
            </div>
          </div>
        </div>

        {/* CREATE Group */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: 'rgba(255, 191, 222, 0.15)' }}></div>
            <span 
              className="tracking-[0.12em] uppercase px-4 py-1.5 rounded-[6px]" 
              style={{ 
                fontSize: '11px', 
                fontWeight: 600,
                color: '#FFBFDE',
                background: 'rgba(255, 191, 222, 0.1)',
                border: '1px solid rgba(255, 191, 222, 0.2)'
              }}
            >
              Create
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(255, 191, 222, 0.15)' }}></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {createOutputs.map((output, idx) => (
              <div 
                key={idx}
                className="relative rounded-[16px] p-8 group hover:scale-[1.02] transition-transform"
                style={{ 
                  background: '#1F2230',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${output.accent}1A 0%, transparent 60%)`,
                  }}
                ></div>

                <div className="relative space-y-5">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-[12px] flex items-center justify-center"
                    style={{ 
                      background: `${output.accent}26`,
                      border: `1px solid ${output.accent}4D`,
                      color: output.accent
                    }}
                  >
                    {output.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 
                      style={{ 
                        fontSize: '22px', 
                        fontWeight: 600,
                        color: '#F4F3F8'
                      }}
                    >
                      {output.title}
                    </h3>
                    <p 
                      style={{ 
                        fontSize: '15px', 
                        lineHeight: 1.7,
                        color: '#B4B8C7'
                      }}
                    >
                      {output.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SYSTEMIZE Group */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: 'rgba(218, 191, 255, 0.15)' }}></div>
            <span 
              className="tracking-[0.12em] uppercase px-4 py-1.5 rounded-[6px]" 
              style={{ 
                fontSize: '11px', 
                fontWeight: 600,
                color: '#DABFFF',
                background: 'rgba(218, 191, 255, 0.1)',
                border: '1px solid rgba(218, 191, 255, 0.2)'
              }}
            >
              Systemize
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(218, 191, 255, 0.15)' }}></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {systemizeOutputs.map((output, idx) => (
              <div 
                key={idx}
                className="relative rounded-[16px] p-8 group hover:scale-[1.02] transition-transform"
                style={{ 
                  background: '#1F2230',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${output.accent}1A 0%, transparent 60%)`,
                  }}
                ></div>

                <div className="relative space-y-5">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-[12px] flex items-center justify-center"
                    style={{ 
                      background: `${output.accent}26`,
                      border: `1px solid ${output.accent}4D`,
                      color: output.accent
                    }}
                  >
                    {output.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 
                      style={{ 
                        fontSize: '22px', 
                        fontWeight: 600,
                        color: '#F4F3F8'
                      }}
                    >
                      {output.title}
                    </h3>
                    <p 
                      style={{ 
                        fontSize: '15px', 
                        lineHeight: 1.7,
                        color: '#B4B8C7'
                      }}
                    >
                      {output.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}