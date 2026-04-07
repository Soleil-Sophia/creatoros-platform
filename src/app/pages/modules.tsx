import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Link } from 'react-router';
import { useState } from 'react';

const coreModules = [
  {
    id: '01',
    name: 'Brand OS',
    tagline: 'Voice & Identity Foundation',
    description: 'The strategic foundation of your workflow — defines identity, voice & messaging before content, launches, and execution. Makes your brand machine-readable and workflow-ready.',
    status: 'active',
    accent: '#E7C6F3',
    route: '/modules/brand-os',
    appRoute: '/app/brand-os/setup',
    features: ['Voice Parameters', 'Tone Configuration', 'Messaging Framework', 'Identity Lock'],
    category: 'core'
  },
  {
    id: '02',
    name: 'Content OS',
    tagline: 'Structured Content Generation',
    description: 'Turn your offers, ideas, and expertise into structured content assets—hooks, scripts, captions, and brand voice—ready to deploy across platforms.',
    status: 'active',
    accent: '#FFBFDE',
    route: '/modules/content-os',
    appRoute: '/app/content-os/generate',
    features: ['Hooks & Scripts', 'Social Captions', 'Brand Voice System', 'Asset Library'],
    category: 'core'
  },
  {
    id: '03',
    name: 'Launch OS',
    tagline: 'Rollout & Coordination',
    description: 'Structure launches, coordinate rollouts, and orchestrate focused content phases across platforms with clear timing and goals.',
    status: 'coming-soon',
    accent: '#DABFFF',
    route: '/modules/launch-os',
    appRoute: null,
    features: ['Launch Planning', 'Rollout Coordination', 'Phase Orchestration', 'Goal Tracking'],
    visual: 'launch-flow',
    category: 'core'
  },
  {
    id: '04',
    name: 'Management OS',
    tagline: 'Scheduling & Execution',
    description: 'Schedule content, manage publishing queue, and execute multi-platform posting. The operational layer between strategy and measurement.',
    status: 'coming-soon',
    accent: '#C4B5FD',
    route: '/modules/management-os',
    appRoute: null,
    features: ['Content Calendar', 'Publishing Queue', 'Multi-Platform Scheduling', 'Post Execution'],
    visual: 'management-flow',
    category: 'core'
  },
  {
    id: '05',
    name: 'Analytics OS',
    tagline: 'Performance Intelligence',
    description: 'Track content performance across platforms, identify top performers, and get AI-powered insights on what resonates with your audience.',
    status: 'coming-soon',
    accent: '#B8A3FF',
    route: '/modules/analytics-os',
    appRoute: null,
    features: ['Cross-Platform Analytics', 'Performance Patterns', 'Engagement Insights', 'ROI Tracking'],
    category: 'core'
  }
];

const addOnModules = [
  {
    id: '06',
    name: 'Community OS',
    tagline: 'Audience Relationship Management',
    description: 'Manage your community interactions, track conversations, automate responses, and build deeper relationships with your audience.',
    status: 'planned',
    accent: '#E7C6F3',
    route: '/modules/community-os',
    appRoute: null,
    features: ['Interaction Tracking', 'Response Automation', 'Community Insights', 'Relationship Scoring'],
    category: 'addon'
  },
  {
    id: '07',
    name: 'Research OS',
    tagline: 'Audience & Market Intelligence',
    description: 'Deep dive into your audience, competitors, and market trends. Extract insights, identify opportunities, and validate ideas with structured research.',
    status: 'planned',
    accent: '#DABFFF',
    route: '/modules/research-os',
    appRoute: null,
    features: ['Audience Analysis', 'Competitor Research', 'Trend Monitoring', 'Insight Extraction'],
    category: 'addon'
  }
];

const allModules = [...coreModules, ...addOnModules];

type ViewMode = 'core' | 'addons' | 'all';

export function ModulesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  const displayModules = viewMode === 'core' 
    ? coreModules 
    : viewMode === 'addons' 
    ? addOnModules 
    : allModules;

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
            Build your creator system your way. Start with the core workflow or add what you need.
          </p>
        </div>
      </section>

      {/* View Mode Tabs */}
      <section className="pb-12 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center gap-3">
            {[
              { id: 'core' as ViewMode, label: 'Core Workflow', description: 'Recommended path' },
              { id: 'addons' as ViewMode, label: 'Add-on Modules', description: 'Optional extensions' },
              { id: 'all' as ViewMode, label: 'All Modules', description: 'Everything' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className="px-6 py-3 rounded-[12px] transition-all"
                style={{
                  background: viewMode === tab.id 
                    ? 'linear-gradient(135deg, rgba(255, 191, 222, 0.15) 0%, rgba(231, 198, 243, 0.12) 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: viewMode === tab.id
                    ? '1px solid rgba(255, 191, 222, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow: viewMode === tab.id
                    ? '0 4px 16px rgba(255, 191, 222, 0.15)'
                    : 'none'
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 600, color: viewMode === tab.id ? '#FFBFDE' : '#B4B8C7' }}>
                  {tab.label}
                </div>
                <div style={{ fontSize: '12px', color: '#8B8F9E', marginTop: '2px' }}>
                  {tab.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="pb-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Title */}
          {viewMode === 'core' && (
            <div className="mb-10">
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#F4F3F8', marginBottom: '8px' }}>
                Core Workflow
              </h2>
              <p style={{ fontSize: '15px', color: '#8B8F9E' }}>
                The recommended path. Each module is standalone, but strongest together.
              </p>
            </div>
          )}
          
          {viewMode === 'addons' && (
            <div className="mb-10">
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#F4F3F8', marginBottom: '8px' }}>
                Add-on Modules
              </h2>
              <p style={{ fontSize: '15px', color: '#8B8F9E' }}>
                Optional extensions. Not part of the core flow, but equally valuable when you need them.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayModules.map((module) => (
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

                    {/* Category Badge */}
                    {module.category === 'core' && (
                      <div
                        className="px-2.5 py-1 rounded-lg"
                        style={{
                          background: 'rgba(255, 191, 222, 0.12)',
                          border: '1px solid rgba(255, 191, 222, 0.2)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#FFBFDE',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em'
                        }}
                      >
                        Core
                      </div>
                    )}
                    {module.category === 'addon' && (
                      <div
                        className="px-2.5 py-1 rounded-lg"
                        style={{
                          background: 'rgba(231, 198, 243, 0.12)',
                          border: '1px solid rgba(231, 198, 243, 0.2)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#E7C6F3',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em'
                        }}
                      >
                        Add-on
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
              Start with the Core
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#B4B8C7',
                maxWidth: '600px',
                margin: '0 auto 32px'
              }}
            >
              Begin with Brand OS, then build your content system. More modules launching soon.
            </p>
            <Link
              to="/app/brand-os/setup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
                color: '#0E0F14',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 12px 32px rgba(231, 198, 243, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                textDecoration: 'none'
              }}
            >
              Launch Brand OS
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