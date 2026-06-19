export function PlatformStatement() {
  return (
    <section className="py-32 lg:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div 
          className="rounded-[20px] p-16 lg:p-20 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          {/* Top light edge */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.3), transparent)' }}></div>
          
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
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
                  Platform
                </span>
                <div className="h-px w-8" style={{ background: 'rgba(218, 191, 255, 0.4)' }}></div>
              </div>
              
              <h2 
                style={{ 
                  fontSize: 'clamp(32px, 4vw, 48px)', 
                  lineHeight: 1.2,
                  fontWeight: 700,
                  color: '#F4F3F8',
                  letterSpacing: '-0.01em'
                }}
              >
                CreatorOS is a modular system for creators who need structure, reuse, and operational clarity.
              </h2>
            </div>

            {/* Three Structured Pillars */}
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ background: 'rgba(255, 191, 222, 0.1)', border: '1px solid rgba(255, 191, 222, 0.2)' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#FFBFDE" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#FFBFDE" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#FFBFDE" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="#FFBFDE" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>
                  Not a tool
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#B4B8C7' }}>
                  Active modules that solve specific workflow challenges
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ background: 'rgba(231, 198, 243, 0.1)', border: '1px solid rgba(231, 198, 243, 0.2)' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#E7C6F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E7C6F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>
                  Modular by design
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#B4B8C7' }}>
                  CreatorOS is built as a modular system — each module solves a specific workflow challenge.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto" 
                  style={{ 
                    background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <div className="w-3 h-3 rounded" style={{ border: '2px solid #DABFFF' }}></div>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8' }}>
                  Content OS first
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#B4B8C7' }}>
                  Start with reusable content systems, then expand over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}