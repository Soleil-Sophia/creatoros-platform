export function SystemOverview() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: '#0E0F14' }} />
        <div 
          className="absolute inset-0" 
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(23, 25, 35, 0.4) 50%, transparent 100%)' }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #DABFFF)' }}></div>
            <span 
              style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: '#DABFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
              }}
            >
              Platform Architecture
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #DABFFF, transparent)' }}></div>
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
            How CreatorOS Works
          </h2>

          <p 
            style={{ 
              fontSize: '18px', 
              lineHeight: 1.6,
              color: '#B4B8C7'
            }}
          >
            A modular system with a clear core workflow and optional add-ons. Start small, scale as you grow.
          </p>
        </div>

        {/* Visual System Flow */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Core Workflow */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="px-3 py-1.5 rounded-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #E7C6F3 0%, #FFBFDE 100%)',
                  boxShadow: '0 4px 12px rgba(231, 198, 243, 0.3)'
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>
                  CORE WORKFLOW
                </span>
              </div>
              <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Recommended Path</span>
            </div>

            <div className="space-y-4">
              {[
                { number: '01', name: 'Brand OS', desc: 'Voice & Identity Foundation', color: '#E7C6F3', status: 'Active' },
                { number: '02', name: 'Content OS', desc: 'Content Generation', color: '#FFBFDE', status: 'Active' },
                { number: '03', name: 'Launch OS', desc: 'Rollout & Coordination', color: '#DABFFF', status: 'Coming Q2' },
                { number: '04', name: 'Management OS', desc: 'Scheduling & Execution', color: '#C4B5FD', status: 'Coming Q2' },
                { number: '05', name: 'Analytics OS', desc: 'Performance Intelligence', color: '#B8A3FF', status: 'Coming Soon' }
              ].map((module, idx) => (
                <div key={idx}>
                  <div 
                    className="relative rounded-[16px] overflow-hidden"
                    style={{ 
                      background: module.status === 'Active'
                        ? 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)'
                        : 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                      border: `1px solid ${module.status === 'Active' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)'}`,
                      boxShadow: module.status === 'Active'
                        ? '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                        : 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                      opacity: module.status === 'Active' ? 1 : 0.7
                    }}
                  >
                    {/* Top edge highlight for active */}
                    {module.status === 'Active' && (
                      <div 
                        className="absolute top-0 left-0 right-0 h-px" 
                        style={{ background: `linear-gradient(90deg, transparent, ${module.color} 50%, transparent)`, opacity: 0.4 }}
                      ></div>
                    )}

                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Number Badge */}
                        <div 
                          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
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
                          <span style={{ 
                            fontSize: '16px', 
                            fontWeight: 700, 
                            color: module.status === 'Active' ? '#0E0F14' : '#8B8F9E'
                          }}>
                            {module.number}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>
                              {module.name}
                            </h3>
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
                          
                          <p style={{ fontSize: '14px', color: '#DABFFF', marginBottom: '8px', fontWeight: 500 }}>
                            {module.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {idx < 4 && (
                    <div className="flex items-center gap-2 py-3 pl-6">
                      <svg width="2" height="20" fill="none">
                        <line x1="1" y1="0" x2="1" y2="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2"/>
                      </svg>
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path d="M8 3v10m0 0l4-4m-4 4L4 9" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Add-on Modules + Value Props */}
          <div className="space-y-8">
            {/* Add-on Modules */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="px-3 py-1.5 rounded-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #DABFFF 0%, #B8A3FF 100%)',
                    boxShadow: '0 4px 12px rgba(218, 191, 255, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>
                    ADD-ON MODULES
                  </span>
                </div>
                <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Optional Extensions</span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    number: '06',
                    name: 'Community OS',
                    tagline: 'Audience Relationship Management',
                    description: 'Manage interactions, track relationships, and build genuine community connections.',
                    status: 'Planned Q3'
                  },
                  {
                    number: '07',
                    name: 'Research OS',
                    tagline: 'Audience & Market Intelligence',
                    description: 'Deep audience analysis, competitor research, and trend monitoring in one place.',
                    status: 'Planned Q3'
                  }
                ].map((module, idx) => (
                  <div 
                    key={idx}
                    className="rounded-[16px] overflow-hidden"
                    style={{ 
                      background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      opacity: 0.6
                    }}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div 
                          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: '#262A38',
                            border: '1px solid rgba(255, 255, 255, 0.06)'
                          }}
                        >
                          <span style={{ fontSize: '16px', fontWeight: 700, color: '#8B8F9E' }}>
                            {module.number}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>
                              {module.name}
                            </h3>
                            <span 
                              className="px-2 py-0.5 rounded text-xs"
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#8B8F9E',
                                fontSize: '10px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}
                            >
                              {module.status}
                            </span>
                          </div>
                          
                          <p style={{ fontSize: '14px', color: '#DABFFF', marginBottom: '8px', fontWeight: 500 }}>
                            {module.tagline}
                          </p>
                          
                          <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.5 }}>
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Props Card */}
            <div 
              className="rounded-[16px] overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                border: '1px solid rgba(218, 191, 255, 0.2)',
                boxShadow: '0 8px 24px rgba(218, 191, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DABFFF 50%, transparent)' }}></div>
              
              <div className="p-6">
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '16px' }}>
                  Why This Architecture Works
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      label: 'Standalone Value',
                      desc: 'Each module works independently'
                    },
                    {
                      label: 'System Strength',
                      desc: 'Together they create a real workflow'
                    },
                    {
                      label: 'No Vendor Lock-in',
                      desc: 'Use what you need, when you need it'
                    },
                    {
                      label: 'Clear Workflow',
                      desc: 'Core path guides, add-ons extend'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ background: '#DABFFF' }}
                      ></div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '13px', color: '#B4B8C7', marginTop: '2px' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}