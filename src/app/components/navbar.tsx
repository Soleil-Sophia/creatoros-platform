export function Navbar() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50" 
      style={{ 
        background: 'linear-gradient(180deg, #0E0F14 0%, rgba(14, 15, 20, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 1px 0 rgba(255, 255, 255, 0.04), 0 20px 40px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Refined top light edge - more premium */}
      <div 
        className="absolute top-0 left-0 right-0 h-px" 
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.12) 50%, transparent)' }}
      ></div>
      
      {/* Bottom structural separation */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px" 
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, 0.08) 50%, transparent 90%)' }}
      ></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Grounded Premium Treatment */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              {/* Logo mark - more integrated depth */}
              <div 
                className="relative w-9 h-9 rounded-lg overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)'
                }}
              >
                {/* Refined top light edge on logo container */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px" 
                  style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                ></div>
                
                {/* Inner mark with controlled glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ 
                      background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
                      boxShadow: '0 0 10px rgba(255, 191, 222, 0.25)'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Wordmark */}
              <span 
                className="tracking-tight" 
                style={{ 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  color: '#F4F3F8',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}
              >
                CreatorOS
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Platform', 'Modules', 'Pricing', 'About'].map((link) => (
              <a 
                key={link}
                href={`#${link.toLowerCase()}`} 
                className="relative transition-colors hover:opacity-100 group" 
                style={{ 
                  color: '#B4B8C7', 
                  fontSize: '15px', 
                  opacity: 0.85,
                  fontWeight: 500
                }}
              >
                {link}
                {/* Hover underline */}
                <div 
                  className="absolute -bottom-1 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE, transparent)' }}
                ></div>
              </a>
            ))}
          </div>

          {/* CTA Group */}
          <div className="flex items-center gap-3">
            <button 
              className="hidden sm:block px-5 py-2 rounded-lg transition-all hover:opacity-90" 
              style={{ 
                color: '#F4F3F8', 
                fontSize: '15px',
                fontWeight: 500,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)'
              }}
            >
              Sign In
            </button>
            <button 
              className="px-6 py-2.5 rounded-lg transition-all hover:opacity-90 relative overflow-hidden" 
              style={{ 
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)', 
                color: '#0E0F14',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 2px 12px rgba(255, 191, 222, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Top highlight */}
              <div 
                className="absolute top-0 left-0 right-0 h-px" 
                style={{ background: 'rgba(255, 255, 255, 0.5)' }}
              ></div>
              Start Creating
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}