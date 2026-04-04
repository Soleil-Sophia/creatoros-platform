import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Link, useNavigate } from 'react-router';

const modules = [
  {
    id: '01',
    name: 'Content OS',
    tagline: 'Structured Content Generation',
    description: 'Turn your offers, ideas, and expertise into structured content assets—hooks, scripts, captions, and brand voice—ready to deploy across platforms.',
    status: 'active',
    accent: '#FFBFDE',
    route: '/modules/content-os',
    appRoute: '/app/content-os/generate',
    features: ['Hooks & Scripts', 'Social Captions', 'Brand Voice System', 'Asset Library']
  },
  {
    id: '02',
    name: 'Campaign OS',
    tagline: 'Multi-Channel Campaign Planning',
    description: 'Design complete multi-platform campaigns with synchronized messaging, timeline management, and asset coordination across all channels.',
    status: 'coming-soon',
    accent: '#E7C6F3',
    route: '/modules/campaign-os',
    appRoute: null,
    features: ['Campaign Timeline', 'Cross-Platform Sync', 'Asset Mapping', 'Launch Scheduling']
  },
  {
    id: '03',
    name: 'Analytics OS',
    tagline: 'Performance Intelligence',
    description: 'Track content performance across platforms, identify top performers, and get AI-powered insights on what resonates with your audience.',
    status: 'coming-soon',
    accent: '#DABFFF',
    route: '/modules/analytics-os',
    appRoute: null,
    features: ['Cross-Platform Analytics', 'Performance Patterns', 'Engagement Insights', 'ROI Tracking']
  },
  {
    id: '04',
    name: 'Community OS',
    tagline: 'Audience Relationship Management',
    description: 'Manage your community interactions, track conversations, automate responses, and build deeper relationships with your audience.',
    status: 'planned',
    accent: '#FFBFDE',
    route: '/modules/community-os',
    appRoute: null,
    features: ['Interaction Tracking', 'Response Automation', 'Community Insights', 'Relationship Scoring']
  },
  {
    id: '05',
    name: 'Brand OS',
    tagline: 'Visual & Voice Identity System',
    description: 'Define and maintain your complete brand identity—visual guidelines, voice parameters, messaging frameworks, and brand assets in one system.',
    status: 'planned',
    accent: '#E7C6F3',
    route: '/modules/brand-os',
    appRoute: null,
    features: ['Voice Parameters', 'Visual Guidelines', 'Messaging Framework', 'Asset Library']
  },
  {
    id: '06',
    name: 'Research OS',
    tagline: 'Audience & Market Intelligence',
    description: 'Deep dive into your audience, competitors, and market trends. Extract insights, identify opportunities, and validate ideas with structured research.',
    status: 'planned',
    accent: '#DABFFF',
    route: '/modules/research-os',
    appRoute: null,
    features: ['Audience Analysis', 'Competitor Research', 'Trend Monitoring', 'Insight Extraction']
  }
];

export function ModulesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div 
              className="px-3 py-1 rounded-lg" 
              style={{ 
                background: 'rgba(255, 191, 222, 0.12)', 
                border: '1px solid rgba(255, 191, 222, 0.2)',
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#FFBFDE', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}
            >
              Modular Creator System
            </div>
          </div>
          
          <h1 
            style={{ 
              fontSize: '72px', 
              fontWeight: 700, 
              color: '#F4F3F8',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              lineHeight: 1.1
            }}
          >
            CreatorOS Modules
          </h1>
          
          <p 
            style={{ 
              fontSize: '24px', 
              color: '#B4B8C7', 
              maxWidth: '800px',
              lineHeight: 1.6,
              margin: '0 auto'
            }}
          >
            Specialized tools for every aspect of creator operations. Use individually or combine into your complete creator system.
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="pb-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module) => (
              <div
                key={module.id}
                className="relative group"
              >
                <div
                  className="p-8 rounded-[20px] transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: module.status === 'active' 
                      ? `linear-gradient(135deg, ${module.accent}08 0%, ${module.accent}04 100%)`
                      : 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: module.status === 'active'
                      ? `1px solid ${module.accent}30`
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: module.status === 'active'
                      ? `0 8px 24px ${module.accent}15, inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                      : '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
                    opacity: module.status === 'planned' ? 0.5 : 1
                  }}
                >
                  {/* Top edge light */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ 
                      background: module.status === 'active'
                        ? `linear-gradient(90deg, transparent, ${module.accent}40, transparent)`
                        : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)'
                    }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Module Number */}
                      <div 
                        className="w-12 h-12 rounded-[12px] flex items-center justify-center"
                        style={{ 
                          background: module.status === 'active'
                            ? `linear-gradient(135deg, ${module.accent}, ${module.accent}CC)`
                            : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${module.status === 'active' ? module.accent : 'rgba(255, 255, 255, 0.1)'}`,
                          boxShadow: module.status === 'active' ? `0 4px 12px ${module.accent}30` : 'none'
                        }}
                      >
                        <span 
                          style={{ 
                            fontSize: '18px', 
                            fontWeight: 700, 
                            color: module.status === 'active' ? '#0E0F14' : '#8B8F9E'
                          }}
                        >
                          {module.id}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div
                        className="px-3 py-1 rounded-lg"
                        style={{
                          background: module.status === 'active'
                            ? `${module.accent}20`
                            : 'rgba(255, 255, 255, 0.05)',
                          border: module.status === 'active'
                            ? `1px solid ${module.accent}30`
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: module.status === 'active' ? module.accent : '#8B8F9E',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em'
                        }}
                      >
                        {module.status === 'active' && 'Active'}
                        {module.status === 'coming-soon' && 'Coming Soon'}
                        {module.status === 'planned' && 'Planned'}
                      </div>
                    </div>

                    {/* Arrow Icon - Only for active modules */}
                    {module.status === 'active' && (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:translate-x-1 group-hover:translate-y-[-2px] transition-transform"
                        style={{
                          background: `linear-gradient(135deg, ${module.accent}15, ${module.accent}08)`,
                          border: `1px solid ${module.accent}20`
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M8 3l5 5-5 5" stroke={module.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 
                      style={{ 
                        fontSize: '28px', 
                        fontWeight: 700, 
                        color: '#F4F3F8',
                        marginBottom: '8px',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {module.name}
                    </h3>
                    <div 
                      style={{ 
                        fontSize: '14px', 
                        color: module.status === 'active' ? module.accent : '#8B8F9E',
                        fontWeight: 600,
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {module.tagline}
                    </div>
                    <p 
                      style={{ 
                        fontSize: '16px', 
                        color: '#B4B8C7', 
                        lineHeight: 1.6
                      }}
                    >
                      {module.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {module.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: module.status === 'active' ? module.accent : '#8B8F9E' }}
                        />
                        <span style={{ fontSize: '13px', color: '#B4B8C7' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {/* Learn More Button - Only for active modules */}
                    {module.status === 'active' && (
                      <Link
                        to={module.route}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] transition-all hover:opacity-90"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${module.accent}30`,
                          color: module.accent,
                          fontSize: '14px',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        Learn More
                      </Link>
                    )}
                    
                    {/* Launch Button - Only for active modules with appRoute */}
                    {module.status === 'active' && module.appRoute && (
                      <Link
                        to={module.appRoute}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] transition-all hover:opacity-90"
                        style={{
                          background: `linear-gradient(135deg, ${module.accent}, ${module.accent}CC)`,
                          color: '#0E0F14',
                          fontSize: '14px',
                          fontWeight: 600,
                          boxShadow: `0 4px 16px ${module.accent}30, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
                          textDecoration: 'none'
                        }}
                      >
                        Launch {module.name}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M7 2l5 5-5 5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="p-12 rounded-[20px] text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.08) 0%, rgba(218, 191, 255, 0.06) 100%)',
              border: '1px solid rgba(255, 191, 222, 0.2)',
              boxShadow: '0 16px 48px rgba(255, 191, 222, 0.15)'
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.4), transparent)' }}
            />

            <h2
              style={{
                fontSize: '42px',
                fontWeight: 700,
                color: '#F4F3F8',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Start with Content OS
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#B4B8C7',
                maxWidth: '600px',
                margin: '0 auto 32px'
              }}
            >
              Begin your creator journey with structured content generation. More modules launching soon.
            </p>
            <Link
              to="/app/content-os/generate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 12px 32px rgba(255, 191, 222, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                textDecoration: 'none'
              }}
            >
              Launch Content OS
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}