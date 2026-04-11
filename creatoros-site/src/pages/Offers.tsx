import { Link } from 'react-router-dom';

const offers = [
  {
    status: 'Available Now',
    statusColor: '#FFBFDE',
    name: 'Creator Clarity Kit',
    tagline: 'Your content foundation.',
    description: 'A structured digital kit to define your positioning, audience, and content system — before you produce a single piece. The starting point for everything CreatorOS is building.',
    price: '€127',
    priceNote: 'One-time · Digital download',
    includes: ['Positioning Workbook (40 pages)', 'Audience Clarity Framework', 'Content System Blueprint', 'Brand Voice Guide', '30-Day Content Roadmap'],
    cta: { label: 'Get the Kit', href: '/product', primary: true },
  },
  {
    status: 'Early Access',
    statusColor: '#DABFFF',
    name: 'ContentOS',
    tagline: 'Your content production system.',
    description: 'Generate structured content assets — hooks, scripts, captions, briefs — built around your positioning. Save, organize, and reuse your best work in a structured library.',
    price: 'Early Access',
    priceNote: 'Join the waitlist · Free to start',
    includes: ['5 output types (Hook Pack, Short Script, Caption Draft, Content Brief, Repurposing Plan)', 'Asset Library with filter and reuse', 'Output-type-aware generate workflow', 'Early pricing for founding members'],
    cta: { label: 'Join Early Access', href: '/early-access', primary: false },
  },
  {
    status: 'In Development',
    statusColor: '#8B8F9E',
    name: 'BrandOS + More',
    tagline: 'The full ecosystem.',
    description: 'BrandOS, LaunchOS, AnalyticsOS, CommunityOS, ManagementOS — the complete operating layer for your creative business. Built module by module, with the people who use it.',
    price: 'Coming Soon',
    priceNote: 'Join early access to influence what gets built',
    includes: ['Brand voice and identity system', 'Offer launch infrastructure', 'Performance analytics', 'Community management tools'],
    cta: { label: 'Stay in the loop', href: '/early-access', primary: false },
  },
];

export default function Offers() {
  return (
    <div>
      {/* Header */}
      <section style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Offers
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '20px', maxWidth: '620px',
          }}>
            Everything CreatorOS offers.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '520px' }}>
            We're building a modular infrastructure for creators. Here's what's available now, what's coming soon, and how to get in early.
          </p>
        </div>
      </section>

      {/* Offers list */}
      <section style={{ padding: '40px 0 120px', background: '#0A0B10' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {offers.map(({ status, statusColor, name, tagline, description, price, priceNote, includes, cta }) => (
              <div key={name} style={{
                padding: '52px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                border: `1px solid ${statusColor}18`,
                display: 'grid', gridTemplateColumns: '1fr 1fr 280px',
                gap: '48px', alignItems: 'start',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: `linear-gradient(90deg, transparent, ${statusColor}35, transparent)`,
                }} />

                {/* Left */}
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '4px 10px', borderRadius: '100px',
                    background: `${statusColor}12`,
                    border: `1px solid ${statusColor}25`,
                    marginBottom: '20px',
                  }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: statusColor }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: statusColor }}>{status}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text)', marginBottom: '6px' }}>{name}</h2>
                  <p style={{ fontSize: '14px', color: statusColor, fontWeight: 500, marginBottom: '16px' }}>{tagline}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.7 }}>{description}</p>
                </div>

                {/* Middle — includes */}
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                    Includes
                  </p>
                  {includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '5px',
                        background: `${statusColor}10`, border: `1px solid ${statusColor}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '2px',
                      }}>
                        <svg width="8" height="8" fill="none" viewBox="0 0 8 8">
                          <path d="M1.5 4l2 2 3-3" stroke={statusColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Right — price + CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                      {price}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>{priceNote}</p>
                  </div>
                  <Link to={cta.href} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '14px 20px', borderRadius: '12px',
                    background: cta.primary ? 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)' : `${statusColor}10`,
                    border: cta.primary ? 'none' : `1px solid ${statusColor}25`,
                    color: cta.primary ? '#0E0F14' : statusColor,
                    fontSize: '15px', fontWeight: 600,
                    boxShadow: cta.primary ? '0 8px 24px rgba(255,191,222,0.3)' : 'none',
                  }}>
                    {cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
