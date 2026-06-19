import { Link } from 'react-router';

export function FinalCTA() {
  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" style={{ background: '#171923' }}>
      {/* Spotlight effect - subtle */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse 50% 35% at 50% 50%, rgba(255, 191, 222, 0.04) 0%, transparent 60%)'
        }}
      ></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div 
          className="max-w-4xl mx-auto rounded-[20px] p-16 lg:p-20 text-center relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Top glow edge - refined */}
          <div 
            className="absolute top-0 left-0 right-0 h-px" 
            style={{ 
              background: 'linear-gradient(90deg, transparent, #FFBFDE 30%, #DABFFF 50%, #FFBFDE 70%, transparent)',
              boxShadow: '0 0 12px rgba(255, 191, 222, 0.15)'
            }}
          ></div>

          {/* Radial glow - subtle */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{ 
              background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255, 191, 222, 0.1) 0%, transparent 50%)'
            }}
          ></div>

          <div className="relative space-y-10">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8" style={{ background: 'rgba(218, 191, 255, 0.4)' }}></div>
              <span 
                className="tracking-[0.15em] uppercase" 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 600,
                  color: '#DABFFF'
                }}
              >
                Start Building
              </span>
              <div className="h-px w-8" style={{ background: 'rgba(218, 191, 255, 0.4)' }}></div>
            </div>

            {/* Headline */}
            <h2 
              style={{ 
                fontSize: 'clamp(36px, 4vw, 56px)', 
                lineHeight: 1.1,
                fontWeight: 700,
                color: '#F4F3F8',
                letterSpacing: '-0.02em'
              }}
            >
              Ready to build your creator workflow?
            </h2>

            {/* Subheadline */}
            <p 
              className="max-w-2xl mx-auto"
              style={{ 
                fontSize: '17px', 
                lineHeight: 1.7,
                color: '#B4B8C7'
              }}
            >
              Join creators who are building systematic workflows instead of managing fragmented tools. Start with Brand OS and Content OS — both live now.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-12 py-4 transition-all hover:opacity-90 shadow-xl relative overflow-hidden" 
                style={{ 
                  background: 'linear-gradient(135deg, #DABFFF 0%, #E7C6F3 100%)', 
                  color: '#0E0F14',
                  borderRadius: '12px',
                  fontSize: '17px',
                  fontWeight: 600,
                  boxShadow: '0 12px 32px rgba(255, 191, 222, 0.25)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
                View Dashboard
              </Link>
              <Link
                to="/modules"
                className="w-full sm:w-auto px-12 py-4 transition-all hover:opacity-90 relative overflow-hidden" 
                style={{ 
                  background: '#1F2230',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#F4F3F8',
                  borderRadius: '12px',
                  fontSize: '17px',
                  fontWeight: 500,
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 16px rgba(0, 0, 0, 0.3)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }}></div>
                Explore Modules
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center justify-center gap-6 pt-10">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" stroke="#DABFFF" strokeWidth="1.5"/>
                  <path d="M5 8l2 2 4-4" stroke="#DABFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '14px', color: '#B4B8C7' }}>2 modules live</span>
              </div>
              <div className="w-px h-4" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5l2-5z" fill="#E7C6F3"/>
                </svg>
                <span style={{ fontSize: '14px', color: '#B4B8C7' }}>Start with core workflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
