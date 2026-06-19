export function ProblemSection() {
  const problems = [
    {
      pain: "Ideas without system",
      description: "You have content ideas, but no structured way to turn them into assets."
    },
    {
      pain: "Content without structure",
      description: "You create constantly, but everything lives in scattered docs and chats."
    },
    {
      pain: "Output without library",
      description: "You produce great content, then lose it. No reuse. No efficiency."
    },
    {
      pain: "Brand voice inconsistency",
      description: "Every piece feels different because you're re-prompting from scratch."
    },
    {
      pain: "Chat results, not assets",
      description: "Chat tools give you text. Not structured, reusable content systems."
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
      
      {/* Subtle atmospheric layer */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: 'radial-gradient(ellipse at center top, rgba(255, 191, 222, 0.08) 0%, transparent 60%)'
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div 
            className="inline-block px-4 py-1.5 rounded-full mb-6"
            style={{ 
              background: 'rgba(255, 191, 222, 0.08)',
              border: '1px solid rgba(255, 191, 222, 0.2)'
            }}
          >
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              color: '#FFBFDE',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              The Problem
            </span>
          </div>

          <h2 
            className="mb-6"
            style={{ 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              fontWeight: 700, 
              color: '#F4F3F8',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}
          >
            You're producing constantly, but your system saves nothing.
          </h2>

          <p style={{ 
            fontSize: '18px', 
            lineHeight: 1.6, 
            color: '#B4B8C7',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Every creator faces the same wound: endless output, zero infrastructure.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="relative rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ 
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)'
              }}
            >
              {/* Top edge light */}
              <div 
                className="absolute top-0 left-0 right-0 h-px"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.2) 50%, transparent)'
                }}
              />

              {/* Icon */}
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ 
                  background: 'rgba(255, 191, 222, 0.08)',
                  border: '1px solid rgba(255, 191, 222, 0.2)'
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path 
                    d="M10 6v8M6 10h8" 
                    stroke="#FFBFDE" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <circle 
                    cx="10" 
                    cy="10" 
                    r="8" 
                    stroke="#FFBFDE" 
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Content */}
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#F4F3F8',
                marginBottom: '8px'
              }}>
                {problem.pain}
              </h3>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: 1.6, 
                color: '#B4B8C7'
              }}>
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <div className="text-center mt-16">
          <p style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            color: '#F4F3F8',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            That's not a workflow issue. That's a <span style={{ color: '#FFBFDE' }}>system issue</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
