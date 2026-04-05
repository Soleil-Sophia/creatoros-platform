import { Link } from 'react-router';

export function FeaturedModule() {
  return (
    <section className="py-32 lg:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Module 01 Label - Platform Context */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255, 191, 222, 0.08)', border: '1px solid rgba(255, 191, 222, 0.2)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFBFDE', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Module 01 — Live Now
            </span>
          </div>
        </div>

        {/* This is the HERO MODULE - must stand out above everything else */}
        <div 
          className="relative rounded-[20px] overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
            border: '1px solid rgba(255, 191, 222, 0.18)',
            boxShadow: '0 16px 48px rgba(255, 191, 222, 0.07), 0 0 60px rgba(218, 191, 255, 0.04)'
          }}
        >
          {/* Glowing top edge */}
          <div 
            className="absolute top-0 left-0 right-0 h-px" 
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.6) 20%, rgba(218, 191, 255, 0.5) 50%, rgba(255, 191, 222, 0.6) 80%, transparent)',
              boxShadow: '0 0 8px rgba(255, 191, 222, 0.15)'
            }}
          ></div>

          {/* Background accent glow */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              background: 'radial-gradient(ellipse 55% 40% at 50% 0%, rgba(255, 191, 222, 0.08) 0%, transparent 50%)'
            }}
          ></div>

          <div className="relative grid lg:grid-cols-5 gap-16 p-12 lg:p-20">
            {/* Left: Module Info */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-10">
              {/* Module Header */}
              <div>
                <h2 
                  style={{ 
                    fontSize: 'clamp(40px, 4.5vw, 64px)', 
                    lineHeight: 1.05,
                    fontWeight: 700,
                    color: '#F4F3F8',
                    letterSpacing: '-0.02em',
                    marginBottom: '24px'
                  }}
                >
                  Content OS
                </h2>
                <p 
                  style={{ 
                    fontSize: '17px', 
                    lineHeight: 1.7,
                    color: '#B4B8C7',
                    maxWidth: '440px'
                  }}
                >
                  Turn your offers, ideas, and expertise into structured content workflows. Generate hooks, scripts, captions, and plans — all connected to your unique voice and reusable across everything you create.
                </p>
              </div>

              {/* CTA - Primary Focal Point */}
              <div className="pt-2">
                <Link 
                  to="/modules/content-os"
                  className="inline-block w-full sm:w-auto px-12 py-5 transition-all hover:opacity-90 shadow-xl relative overflow-hidden text-center" 
                  style={{ 
                    background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                    borderRadius: '12px',
                    color: '#0E0F14',
                    fontSize: '17px',
                    fontWeight: 600,
                    boxShadow: '0 6px 18px rgba(255, 191, 222, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    textDecoration: 'none'
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
                  Launch Content OS
                </Link>
              </div>
            </div>

            {/* Right: Module Preview - Focal Point */}
            <div className="lg:col-span-3 flex items-center">
              <div 
                className="rounded-[16px] p-8 w-full"
                style={{ 
                  background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  minHeight: '480px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)'
                }}
              >
                {/* Preview Header */}
                <div className="flex items-center justify-between mb-8 pb-5" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#F4F3F8' }}>Workflow Preview</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#3A4054' }}></div>
                  </div>
                </div>

                {/* Workflow Cards */}
                <div className="space-y-4">
                  {[
                    { label: 'Input Your Offer', color: '#FFBFDE', progress: 100 },
                    { label: 'Generate Content', color: '#E7C6F3', progress: 100 },
                    { label: 'Save to Library', color: '#DABFFF', progress: 75 },
                    { label: 'Reuse & Iterate', color: '#B4B8C7', progress: 40 }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-[12px] relative overflow-hidden"
                      style={{ 
                        background: '#262A38',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: item.color }}>0{idx + 1}</span>
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>{item.label}</span>
                        </div>
                        <span style={{ fontSize: '13px', color: '#B4B8C7' }}>{item.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                        <div 
                          className="h-full rounded-full transition-all" 
                          style={{ 
                            width: `${item.progress}%`,
                            background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`
                          }}
                        ></div>
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
