export function EcosystemPreview() {
  const modules = [
    {
      name: 'Content OS',
      status: 'LIVE',
      description: 'Transform offers and expertise into structured content workflows.',
      accent: '#FFBFDE',
      available: true
    },
    {
      name: 'Brand OS',
      status: 'PLANNED',
      description: 'Build and manage your visual and verbal brand identity system.',
      accent: '#DABFFF',
      available: false
    },
    {
      name: 'Strategy OS',
      status: 'PLANNED',
      description: 'Map your creator business model, offerings, and growth strategy.',
      accent: '#E7C6F3',
      available: false
    },
    {
      name: 'Campaign OS',
      status: 'PLANNED',
      description: 'Plan, execute, and track multi-platform creator campaigns.',
      accent: '#CFFFF9',
      available: false
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
              Ecosystem
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
            The CreatorOS Ecosystem
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: '17px', 
              lineHeight: 1.7,
              color: '#C4C8D7'
            }}
          >
            Content OS is the first module. More creator infrastructure modules are coming — each designed to solve specific workflow challenges.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {modules.map((module, idx) => (
            <div 
              key={idx}
              className="relative rounded-[16px] p-10 group"
              style={{ 
                background: module.available ? '#1C1F2A' : '#16181F',
                border: module.available 
                  ? `1px solid ${module.accent}40` 
                  : '1px solid rgba(255, 255, 255, 0.06)',
                opacity: module.available ? 1 : 0.7
              }}
            >

              <div className="relative space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <h3 
                    style={{ 
                      fontSize: '24px', 
                      fontWeight: 600,
                      color: module.available ? '#F4F3F8' : '#B4B8C7'
                    }}
                  >
                    {module.name}
                  </h3>
                  
                  {/* Status Badge */}
                  <div 
                    className="px-3 py-1.5 rounded-full flex items-center gap-2"
                    style={{ 
                      background: module.available 
                        ? `${module.accent}33` 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: module.available 
                        ? `1px solid ${module.accent}66` 
                        : '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {module.available && (
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: module.accent }}></div>
                    )}
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 600,
                        color: module.available ? module.accent : '#B4B8C7',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {module.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p 
                  style={{ 
                    fontSize: '15px', 
                    lineHeight: 1.7,
                    color: '#C4C8D7'
                  }}
                >
                  {module.description}
                </p>

                {/* Action */}
                {module.available ? (
                  <button 
                    className="mt-2 px-6 py-2.5 transition-all hover:opacity-90"
                    style={{ 
                      background: `${module.accent}1A`,
                      border: `1px solid ${module.accent}40`,
                      color: '#F4F3F8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    Launch Module
                  </button>
                ) : (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.05)' }}></div>
                    <span style={{ fontSize: '13px', color: '#B4B8C7', fontStyle: 'italic' }}>
                      Coming soon
                    </span>
                    <div className="h-px flex-1" style={{ background: 'rgba(255, 255, 255, 0.05)' }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
