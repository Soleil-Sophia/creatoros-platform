import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Link } from 'react-router';

export function BrandOSProductPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div 
              className="px-3 py-1 rounded-lg" 
              style={{ 
                background: 'rgba(231, 198, 243, 0.12)', 
                border: '1px solid rgba(231, 198, 243, 0.2)',
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#E7C6F3', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}
            >
              Module 01
            </div>
          </div>
          
          <h1 
            className="mb-6"
            style={{ 
              fontSize: 'clamp(48px, 8vw, 72px)', 
              fontWeight: 700, 
              color: '#F4F3F8',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}
          >
            Brand OS
          </h1>
          
          <p 
            className="mb-10 mx-auto"
            style={{ 
              fontSize: 'clamp(18px, 2.5vw, 24px)', 
              color: '#B4B8C7', 
              maxWidth: '800px',
              lineHeight: 1.6
            }}
          >
            Define your voice, tone, and messaging framework once. Lock your brand identity and apply it consistently across every piece of content you create.
          </p>
          
          <Link 
            to="/app/brand-os/setup"
            className="inline-block px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
            style={{ 
              background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
              color: '#0E0F14',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 12px 32px rgba(231, 198, 243, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              textDecoration: 'none'
            }}
          >
            Set Up Your Brand
          </Link>
        </div>
      </section>

      {/* Define Once, Apply Everywhere */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-center">
            <h2 
              style={{ 
                fontSize: 'clamp(32px, 5vw, 42px)', 
                fontWeight: 700, 
                color: '#F4F3F8',
                marginBottom: '12px',
                letterSpacing: '-0.02em'
              }}
            >
              Define Once, Apply Everywhere
            </h2>
            <p style={{ fontSize: '18px', color: '#B4B8C7' }}>
              Set your brand parameters once—every module inherits them automatically.
            </p>
          </div>

          {/* Voice Parameters Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: 'Tone',
                description: 'How you sound—professional, casual, motivational, technical',
                example: 'Motivational & Direct',
                accent: '#E7C6F3'
              },
              {
                label: 'Complexity',
                description: 'Language level—simple, accessible, technical, expert',
                example: 'Clear & Accessible',
                accent: '#DABFFF'
              },
              {
                label: 'Formality',
                description: 'How formal or casual—corporate, professional, friendly',
                example: 'Casual Professional',
                accent: '#E7C6F3'
              }
            ].map((param, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-[16px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.08) 0%, rgba(218, 191, 255, 0.06) 100%)',
                  border: '1px solid rgba(231, 198, 243, 0.2)'
                }}
              >
                <div className="mb-4">
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                    {param.label}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                    {param.description}
                  </p>
                </div>
                <div 
                  className="px-4 py-3 rounded-lg"
                  style={{
                    background: `rgba(231, 198, 243, 0.12)`,
                    border: `1px solid rgba(231, 198, 243, 0.2)`,
                    fontSize: '14px',
                    color: param.accent,
                    fontWeight: 600,
                    fontStyle: 'italic'
                  }}
                >
                  "{param.example}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lock Your Identity */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Visual */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-6">
                <div style={{ fontSize: '12px', color: '#E7C6F3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Voice Configuration
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Tone', value: 'Motivational & Direct', locked: true },
                  { label: 'Complexity', value: 'Clear & Accessible', locked: true },
                  { label: 'Formality', value: 'Casual Professional', locked: false }
                ].map((param, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div style={{ fontSize: '13px', color: '#8B8F9E', fontWeight: 500 }}>
                        {param.label}
                      </div>
                      {param.locked && (
                        <div 
                          className="px-2 py-1 rounded flex items-center gap-1"
                          style={{
                            background: 'rgba(231, 198, 243, 0.12)',
                            border: '1px solid rgba(231, 198, 243, 0.2)'
                          }}
                        >
                          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                            <rect x="1" y="5" width="8" height="6" rx="1" fill="#E7C6F3" fillOpacity="0.3" stroke="#E7C6F3" strokeWidth="1.5"/>
                            <path d="M3 5V3.5C3 2.11929 4.11929 1 5.5 1C6.88071 1 8 2.11929 8 3.5V5" stroke="#E7C6F3" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span style={{ fontSize: '10px', color: '#E7C6F3', fontWeight: 600 }}>LOCKED</span>
                        </div>
                      )}
                    </div>
                    <div 
                      className="px-4 py-3 rounded-lg"
                      style={{
                        background: param.locked ? 'rgba(231, 198, 243, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        border: param.locked ? '1px solid rgba(231, 198, 243, 0.15)' : '1px solid rgba(255, 255, 255, 0.06)',
                        fontSize: '15px',
                        color: param.locked ? '#E7C6F3' : '#B4B8C7',
                        fontWeight: param.locked ? 600 : 400
                      }}
                    >
                      {param.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Explanation */}
            <div>
              <h2 
                style={{ 
                  fontSize: 'clamp(32px, 5vw, 42px)', 
                  fontWeight: 700, 
                  color: '#F4F3F8',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}
              >
                Lock Your Identity
              </h2>
              <p style={{ fontSize: '18px', color: '#B4B8C7', lineHeight: 1.6, marginBottom: '24px' }}>
                Once you've defined your brand voice, lock the parameters. Every piece of content generated in Content OS will automatically inherit your brand voice—no drift, no inconsistency.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Set Parameters', text: 'Define tone, complexity, formality, energy' },
                  { label: 'Lock Your Voice', text: 'Prevent accidental changes to core identity' },
                  { label: 'Apply Automatically', text: 'All content inherits locked parameters' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
                        boxShadow: '0 2px 8px rgba(231, 198, 243, 0.3)'
                      }}
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', color: '#F4F3F8', fontWeight: 600, marginBottom: '2px' }}>
                        {feature.label}
                      </div>
                      <div style={{ fontSize: '14px', color: '#B4B8C7' }}>
                        {feature.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messaging Framework */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Explanation */}
            <div>
              <h2 
                style={{ 
                  fontSize: 'clamp(32px, 5vw, 42px)', 
                  fontWeight: 700, 
                  color: '#F4F3F8',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}
              >
                Messaging Framework
              </h2>
              <p style={{ fontSize: '18px', color: '#B4B8C7', lineHeight: 1.6, marginBottom: '24px' }}>
                Define your core messaging pillars—the key themes, values, and angles you communicate. Content OS uses these frameworks to guide content generation.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Core Values', text: 'What you stand for—your principles and beliefs' },
                  { label: 'Key Themes', text: 'Topics you consistently talk about' },
                  { label: 'Messaging Angles', text: 'How you approach and frame topics' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
                        boxShadow: '0 2px 8px rgba(231, 198, 243, 0.3)'
                      }}
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', color: '#F4F3F8', fontWeight: 600, marginBottom: '2px' }}>
                        {feature.label}
                      </div>
                      <div style={{ fontSize: '14px', color: '#B4B8C7' }}>
                        {feature.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-6">
                <div style={{ fontSize: '12px', color: '#E7C6F3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Messaging Pillars
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Systems over Motivation', accent: '#E7C6F3' },
                  { name: 'Build to Scale', accent: '#DABFFF' },
                  { name: 'Clarity over Complexity', accent: '#E7C6F3' }
                ].map((pillar, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-[12px]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: pillar.accent }}
                      />
                      <div style={{ fontSize: '15px', color: '#F4F3F8', fontWeight: 600 }}>
                        {pillar.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Start with Brand OS */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-center">
            <h2 
              style={{ 
                fontSize: 'clamp(32px, 5vw, 42px)', 
                fontWeight: 700, 
                color: '#F4F3F8',
                marginBottom: '12px',
                letterSpacing: '-0.02em'
              }}
            >
              Why Start with Brand OS?
            </h2>
            <p style={{ fontSize: '18px', color: '#B4B8C7', maxWidth: '700px', margin: '0 auto' }}>
              Your brand voice is the foundation. Define it first, then let every module use it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Consistency',
                description: 'No more voice drift across content, campaigns, or platforms.',
                icon: '1'
              },
              {
                title: 'Efficiency',
                description: 'Set it once—every module inherits it automatically.',
                icon: '2'
              },
              {
                title: 'Scalability',
                description: 'As you grow, your brand voice stays intact across all content.',
                icon: '3'
              }
            ].map((benefit, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-[16px]"
                style={{
                  background: '#171923',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
                    boxShadow: '0 4px 12px rgba(231, 198, 243, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#0E0F14' }}>
                    {benefit.icon}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginBottom: '8px' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 
            className="mb-6"
            style={{ 
              fontSize: 'clamp(36px, 6vw, 52px)', 
              fontWeight: 700, 
              color: '#F4F3F8',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}
          >
            Ready to Define Your Brand?
          </h2>
          
          <Link 
            to="/app/brand-os/setup"
            className="inline-block px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
            style={{ 
              background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
              color: '#0E0F14',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 12px 32px rgba(231, 198, 243, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              textDecoration: 'none'
            }}
          >
            Set Up Brand OS
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}