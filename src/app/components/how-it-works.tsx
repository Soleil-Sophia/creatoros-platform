export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Generate',
      description: 'Input your offer, expertise, or ideas. Content OS transforms them into structured outputs — hooks, scripts, captions, and more.',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Save',
      description: 'Everything you create is saved to your Library — organized, searchable, and ready to reuse at any time.',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '03',
      title: 'Reuse',
      description: 'Pull from your Library to iterate, adapt, or build new content. Your past work becomes your foundation.',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: '04',
      title: 'Plan',
      description: 'Build content plans that connect to your workflow. Schedule, organize, and execute with confidence.',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
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
              How It Works
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
            A content system built for reuse
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative rounded-[16px] p-8 group"
              style={{ 
                background: '#1F2230',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {/* Top edge light */}
              <div 
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE, transparent)' }}
              ></div>

              {/* Number Badge */}
              <div className="flex items-center justify-between mb-8">
                <div 
                  className="w-12 h-12 rounded-[8px] flex items-center justify-center"
                  style={{ background: 'rgba(255, 191, 222, 0.1)', border: '1px solid rgba(255, 191, 222, 0.2)' }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFBFDE' }}>{step.number}</span>
                </div>
                <div className="text-[#B4B8C7]">{step.icon}</div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: 600,
                    color: '#F4F3F8'
                  }}
                >
                  {step.title}
                </h3>
                <p 
                  style={{ 
                    fontSize: '15px', 
                    lineHeight: 1.7,
                    color: '#B4B8C7'
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Connector Line (except last item) */}
              {idx < steps.length - 1 && (
                <div 
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px"
                  style={{ background: 'linear-gradient(90deg, rgba(255, 191, 222, 0.3), transparent)' }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}