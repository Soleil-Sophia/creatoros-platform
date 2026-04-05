import { Link } from 'react-router';

export function Navbar() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50" 
      style={{ 
        background: 'rgba(14, 15, 20, 0.95)', 
        backdropFilter: 'blur(4px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Grounded Premium Treatment */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              {/* Logo mark - more integrated depth */}
              <div 
                className="relative w-9 h-9 rounded-lg overflow-hidden"
                style={{ 
                  background: '#1A1D27',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Refined top light edge on logo container */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px" 
                  style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                ></div>
                
                {/* Inner mark - crisp, no glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ 
                      background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)'
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
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/"
              className="relative transition-colors hover:opacity-100 group" 
              style={{ 
                color: '#B4B8C7', 
                fontSize: '15px', 
                opacity: 0.85,
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Home
              {/* Hover underline */}
              <div 
                className="absolute -bottom-1 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE, transparent)' }}
              ></div>
            </Link>
            
            <Link 
              to="/modules"
              className="relative transition-colors hover:opacity-100 group" 
              style={{ 
                color: '#B4B8C7', 
                fontSize: '15px', 
                opacity: 0.85,
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Modules
              {/* Hover underline */}
              <div 
                className="absolute -bottom-1 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE, transparent)' }}
              ></div>
            </Link>

            <a 
              href="#pricing"
              className="relative transition-colors hover:opacity-100 group" 
              style={{ 
                color: '#B4B8C7', 
                fontSize: '15px', 
                opacity: 0.85,
                fontWeight: 500
              }}
            >
              Pricing
              {/* Hover underline */}
              <div 
                className="absolute -bottom-1 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE, transparent)' }}
              ></div>
            </a>

            <a 
              href="#about"
              className="relative transition-colors hover:opacity-100 group" 
              style={{ 
                color: '#B4B8C7', 
                fontSize: '15px', 
                opacity: 0.85,
                fontWeight: 500
              }}
            >
              About
              {/* Hover underline */}
              <div 
                className="absolute -bottom-1 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(90deg, transparent, #FFBFDE, transparent)' }}
              ></div>
            </a>
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
            <Link 
              to="/modules"
              className="px-6 py-2.5 rounded-lg transition-all hover:opacity-90" 
              style={{ 
                background: 'linear-gradient(135deg, #FFBFDE 0%, #F0D4E8 100%)', 
                color: '#0E0F14',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Start Creating
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
