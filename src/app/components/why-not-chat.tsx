export function WhyNotChat() {
  const comparisons = [
    {
      feature: 'Structured Workflows',
      generic: 'Random prompts',
      contentOS: 'Reusable systems',
      highlight: true
    },
    {
      feature: 'Content Library',
      generic: 'Lost in chat history',
      contentOS: 'Organized & searchable',
      highlight: true
    },
    {
      feature: 'Brand Voice',
      generic: 'Inconsistent output',
      contentOS: 'Saved & consistent',
      highlight: false
    },
    {
      feature: 'Planning',
      generic: 'One-off requests',
      contentOS: 'Strategic calendars',
      highlight: false
    },
    {
      feature: 'Iteration',
      generic: 'Start from scratch',
      contentOS: 'Build on past work',
      highlight: true
    }
  ];

  return (
    <section className="py-32 lg:py-40" style={{ background: '#171923' }}>
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
              Why Content OS
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
            Why not just use generic chat?
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: '17px', 
              lineHeight: 1.7,
              color: '#C4C8D7'
            }}
          >
            Generic AI chat is a starting point. Content OS is infrastructure built for creators who need systems, not suggestions.
          </p>
        </div>

        {/* Comparison Table */}
        <div 
          className="max-w-4xl mx-auto rounded-[20px] overflow-hidden"
          style={{ 
            background: '#1F2230',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          {/* Table Header */}
          <div 
            className="grid grid-cols-3 gap-8 px-8 py-6 border-b"
            style={{ 
              background: '#262A38',
              borderColor: 'rgba(255, 255, 255, 0.06)'
            }}
          >
            <div style={{ color: '#B4B8C7', fontSize: '14px', fontWeight: 600 }}>Feature</div>
            <div className="text-center" style={{ color: '#B4B8C7', fontSize: '14px', fontWeight: 600 }}>Generic Chat</div>
            <div className="text-center" style={{ color: '#FFBFDE', fontSize: '14px', fontWeight: 600 }}>Content OS</div>
          </div>

          {/* Comparison Rows */}
          {comparisons.map((item, idx) => (
            <div 
              key={idx}
              className="grid grid-cols-3 gap-8 px-8 py-6 border-b last:border-b-0"
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.04)',
                background: item.highlight ? 'rgba(255, 191, 222, 0.02)' : 'transparent'
              }}
            >
              <div className="flex items-center">
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>
                  {item.feature}
                </span>
              </div>
              
              <div className="flex items-center justify-center text-center">
                <span style={{ fontSize: '15px', color: '#B4B8C7' }}>
                  {item.generic}
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-2.5">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255, 191, 222, 0.15)' }}
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-6" stroke="#FFBFDE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#F4F3F8' }}>
                  {item.contentOS}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p 
            className="mb-8"
            style={{ 
              fontSize: '16px', 
              color: '#B4B8C7'
            }}
          >
            Content OS is purpose-built for professional content creation.
          </p>
          <button 
            className="px-8 py-4 transition-all hover:opacity-90" 
            style={{ 
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)', 
              color: '#0E0F14',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            See the Difference
          </button>
        </div>
      </div>
    </section>
  );
}
