import { Link } from 'react-router-dom';
import { SUPPORT_EMAIL } from '../config/site';

const footerSections = [
  {
    title: 'PLATFORM',
    links: [
      { label: 'Platform Overview', href: '/' },
      { label: 'All Modules', href: '/modules' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'CORE MODULES',
    links: [
      { label: 'BrandOS', href: '/modules#brandos' },
      { label: 'ContentOS', href: '/modules#contentos' },
      { label: 'LaunchOS', href: '/modules#launchos' },
      { label: 'ManagementOS', href: '/modules#managementos' },
      { label: 'AnalyticsOS', href: '/modules#analyticsos' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Support', href: '/contact' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Impressum', href: '/impressum' },
    ],
  },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/impressum', label: 'Impressum' },
];

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#0A0B10',
    }}>
      <div className="container" style={{ padding: '64px 24px 40px' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '56px',
        }}
          className="footer-columns"
        >
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '7px',
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '12px', height: '12px', borderRadius: '3px',
                  background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
                }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
                CreatorOS{' '}
                <span style={{ fontWeight: 400, fontSize: '12px', color: 'var(--text-3)', letterSpacing: '0.04em' }}>by LXST</span>
              </span>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.75, maxWidth: '240px', marginBottom: '16px' }}>
              A modular platform for creators who need clear systems, reusable workflows, and operational clarity.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              style={{ fontSize: '12px', color: 'var(--text-3)', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: '16px',
              }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      style={{ fontSize: '13px', color: 'var(--text-3)', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '28px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} CreatorOS. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                style={{ fontSize: '12px', color: 'var(--text-3)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .footer-columns {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-columns {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
