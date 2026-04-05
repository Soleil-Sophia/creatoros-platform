export function Footer() {
  const sections = [
    {
      title: 'Platform',
      links: ['Overview', 'Modules', 'Pricing', 'Roadmap']
    },
    {
      title: 'Modules',
      links: ['Content OS', 'Brand OS', 'Strategy OS', 'Campaign OS']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Guides', 'Support', 'API']
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Contact']
    }
  ];

  return (
    <footer className="border-t" style={{ background: '#0E0F14', borderColor: 'rgba(255, 255, 255, 0.06)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-16">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center" 
                  style={{ 
                    background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <div className="w-5 h-5 rounded" style={{ background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)' }}></div>
                </div>
                <span className="tracking-tight" style={{ fontSize: '20px', fontWeight: 700, color: '#F4F3F8' }}>CreatorOS</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#C4C8D7', maxWidth: '280px' }}>
                Modular infrastructure for professional creators. Built to solve real workflow challenges.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {['Twitter', 'LinkedIn', 'GitHub'].map((platform) => (
                  <a 
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:border-opacity-20"
                    style={{ background: '#1F2230', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                    aria-label={platform}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ background: '#B4B8C7' }}></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-5">
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#F4F3F8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {section.title}
                </h4>
                <ul className="space-y-3.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#"
                        className="transition-colors hover:text-white"
                        style={{ fontSize: '15px', color: '#B4B8C7' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="py-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}
        >
          <p style={{ fontSize: '14px', color: '#B4B8C7' }}>
            © 2026 CreatorOS. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="transition-colors hover:text-white" style={{ fontSize: '14px', color: '#B4B8C7' }}>
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white" style={{ fontSize: '14px', color: '#B4B8C7' }}>
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-white" style={{ fontSize: '14px', color: '#B4B8C7' }}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
