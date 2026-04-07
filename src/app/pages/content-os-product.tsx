import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Link } from 'react-router';

export function ContentOSProductPage() {
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
                background: 'rgba(255, 191, 222, 0.12)', 
                border: '1px solid rgba(255, 191, 222, 0.2)',
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#FFBFDE', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}
            >
              Module 02
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
            Content OS
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
            Turn your offers, ideas, and expertise into structured content assets—hooks, scripts, and captions that work. Stop treating AI like a chat. Use it like a production system built for your community.
          </p>
          
          <Link 
            to="/app/content-os/generate"
            className="inline-block px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
            style={{ 
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
              color: '#0E0F14',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 12px 32px rgba(255, 191, 222, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              textDecoration: 'none'
            }}
          >
            Start Creating
          </Link>
        </div>
      </section>

      {/* From Idea to Ready Content - Workflow */}
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
              From Idea to ready content
            </h2>
            <p style={{ fontSize: '18px', color: '#B4B8C7' }}>
              Define your input—Content OS structures your output into ready-to-ship formats.
            </p>
          </div>

          {/* Workflow Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Input Steps */}
            <div className="space-y-4">
              <div 
                className="p-6 rounded-[16px]"
                style={{
                  background: '#171923',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                      color: '#0E0F14',
                      fontSize: '14px',
                      fontWeight: 700
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                      What are you promoting?
                    </h3>
                    <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                      Your offer, product, service, or idea—the thing you're building content around.
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="p-6 rounded-[16px]"
                style={{
                  background: '#171923',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                      color: '#0E0F14',
                      fontSize: '14px',
                      fontWeight: 700
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                      Who is it for?
                    </h3>
                    <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                      Your audience—their level, pain points, and where they are in their journey.
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="p-6 rounded-[16px]"
                style={{
                  background: '#171923',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                      color: '#0E0F14',
                      fontSize: '14px',
                      fontWeight: 700
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                      Where + why?
                    </h3>
                    <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                      Platform, format, and goal—Instagram Reel for awareness, email for conversion, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Output Examples */}
            <div className="space-y-4">
              <div 
                className="p-6 rounded-[16px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.08) 0%, rgba(231, 198, 243, 0.06) 100%)',
                  border: '1px solid rgba(255, 191, 222, 0.2)'
                }}
              >
                <div className="mb-3">
                  <span style={{ fontSize: '11px', color: '#FFBFDE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Generated Hook
                  </span>
                </div>
                <p style={{ fontSize: '15px', color: '#F4F3F8', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "You don't need more content ideas. You need a system that turns the ideas you have into content that actually ships."
                </p>
              </div>

              <div 
                className="p-6 rounded-[16px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.08) 0%, rgba(218, 191, 255, 0.06) 100%)',
                  border: '1px solid rgba(231, 198, 243, 0.2)'
                }}
              >
                <div className="mb-3">
                  <span style={{ fontSize: '11px', color: '#E7C6F3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Script Structure
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div style={{ fontSize: '11px', color: '#8B8F9E', fontWeight: 600, marginBottom: '4px' }}>Hook (0-3s)</div>
                    <div style={{ fontSize: '14px', color: '#F4F3F8' }}>POV: You realize chat isn't a content system</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#8B8F9E', fontWeight: 600, marginBottom: '4px' }}>Setup (4-20s)</div>
                    <div style={{ fontSize: '14px', color: '#F4F3F8' }}>Most creators treat AI like a conversation...</div>
                  </div>
                </div>
              </div>

              <div 
                className="p-6 rounded-[16px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(218, 191, 255, 0.08) 0%, rgba(255, 191, 222, 0.06) 100%)',
                  border: '1px solid rgba(218, 191, 255, 0.2)'
                }}
              >
                <div className="mb-3">
                  <span style={{ fontSize: '11px', color: '#DABFFF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Caption + CTA
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#F4F3F8', lineHeight: 1.6 }}>
                  Here's what I learned after generating 500+ pieces with structured systems instead of chat...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not Just Use Chat */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <h2 
              style={{ 
                fontSize: 'clamp(32px, 5vw, 42px)', 
                fontWeight: 700, 
                color: '#F4F3F8',
                marginBottom: '12px',
                letterSpacing: '-0.02em'
              }}
            >
              Why Not Just Use Chat?
            </h2>
            <p style={{ fontSize: '18px', color: '#B4B8C7', maxWidth: '700px' }}>
              Chat is powerful for exploration. Content OS is built for production.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Chat Approach */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="mb-6">
                <div style={{ fontSize: '13px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  TYPICAL AI CHAT
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#F4F3F8' }}>
                  Conversation
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  'Prompt engineering every time',
                  'Copy-paste from chat windows',
                  'Inconsistent outputs',
                  'No organization or reuse',
                  'Voice drift across sessions'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: '#8B8F9E' }}></div>
                    </div>
                    <div style={{ fontSize: '15px', color: '#B4B8C7', lineHeight: 1.6 }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content OS Approach */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.08) 0%, rgba(231, 198, 243, 0.06) 100%)',
                border: '1px solid rgba(255, 191, 222, 0.2)',
                boxShadow: '0 8px 24px rgba(255, 191, 222, 0.15)'
              }}
            >
              <div className="mb-6">
                <div style={{ fontSize: '13px', color: '#FFBFDE', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  CONTENT OS
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#F4F3F8' }}>
                  Production System
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  'Structured inputs—fill the form',
                  'Organized asset suites',
                  'Consistent, repeatable quality',
                  'Built-in library & reuse',
                  'Brand voice system layer'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                        boxShadow: '0 2px 8px rgba(255, 191, 222, 0.3)'
                      }}
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: '15px', color: '#F4F3F8', lineHeight: 1.6, fontWeight: 500 }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Content Library */}
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
                Your Content Library
              </h2>
              <p style={{ fontSize: '18px', color: '#B4B8C7', lineHeight: 1.6, marginBottom: '24px' }}>
                Every generated asset saves to your library. Organize by campaign, platform, or goal. Reuse proven hooks. Adapt scripts. Build a content system that compounds.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Organized', text: 'Assets grouped by campaign, type, and platform' },
                  { label: 'Searchable', text: 'Find what worked before—fast' },
                  { label: 'Reusable', text: 'Adapt proven content, don\'t start from zero' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                        boxShadow: '0 2px 8px rgba(255, 191, 222, 0.3)'
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

            {/* Right: Visual Library */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-6">
                <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Asset Library
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Launch Campaign Q1', items: 47, accent: '#FFBFDE' },
                  { name: 'Batch Content—Instagram', items: 32, accent: '#E7C6F3' },
                  { name: 'Educational Series', items: 28, accent: '#DABFFF' }
                ].map((folder, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-[12px] flex items-center justify-between"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: `${folder.accent}15`,
                          border: `1px solid ${folder.accent}30`
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 4.5C2 3.67157 2.67157 3 3.5 3H6L7 5H12.5C13.3284 5 14 5.67157 14 6.5V11.5C14 12.3284 13.3284 13 12.5 13H3.5C2.67157 13 2 12.3284 2 11.5V4.5Z" fill={folder.accent} fillOpacity="0.2" stroke={folder.accent} strokeWidth="1.5"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', color: '#F4F3F8', fontWeight: 600, marginBottom: '2px' }}>
                          {folder.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8B8F9E' }}>
                          {folder.items} assets
                        </div>
                      </div>
                    </div>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M1 1L5 5L1 9" stroke="#8B8F9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Voice System */}
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
                <div style={{ fontSize: '12px', color: '#FFBFDE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Brand Voice Configuration
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Tone', value: 'Motivational & Direct' },
                  { label: 'Complexity', value: 'Clear & Accessible' },
                  { label: 'Formality', value: 'Casual Professional' }
                ].map((param, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '13px', color: '#8B8F9E', fontWeight: 500, marginBottom: '6px' }}>
                      {param.label}
                    </div>
                    <div 
                      className="px-4 py-3 rounded-lg"
                      style={{
                        background: 'rgba(255, 191, 222, 0.08)',
                        border: '1px solid rgba(255, 191, 222, 0.15)',
                        fontSize: '15px',
                        color: '#FFBFDE',
                        fontWeight: 500
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
                Brand Voice System
              </h2>
              <p style={{ fontSize: '18px', color: '#B4B8C7', lineHeight: 1.6, marginBottom: '24px' }}>
                Define your voice once. Apply it consistently. Every generated asset inherits your brand voice parameters—no drift, no inconsistency.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Define Parameters', text: 'Set tone, complexity, formality once' },
                  { label: 'Lock Your Voice', text: 'Save proven voice configs as presets' },
                  { label: 'Apply Consistently', text: 'All content inherits your voice automatically' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                        boxShadow: '0 2px 8px rgba(255, 191, 222, 0.3)'
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
            Ready to Build Content That Ships?
          </h2>
          
          <Link 
            to="/app/content-os/generate"
            className="inline-block px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
            style={{ 
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
              color: '#0E0F14',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 12px 32px rgba(255, 191, 222, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              textDecoration: 'none'
            }}
          >
            Start Creating
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}