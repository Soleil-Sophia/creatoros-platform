import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Link } from 'react-router';

export function ContentOSProductPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />
      
      {/* Product Hero */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 flex items-center gap-3">
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
              Module 01
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
            Content OS
          </h1>
          
          <p 
            style={{ 
              fontSize: '24px', 
              color: '#B4B8C7', 
              maxWidth: '800px',
              lineHeight: 1.6,
              marginBottom: '48px'
            }}
          >
            Turn your offers, ideas, and expertise into structured content assets—hooks, scripts, captions, and brand voice—ready to deploy across platforms.
          </p>
          
          <div className="flex gap-4">
            <Link 
              to="/app/content-os/generate"
              className="px-8 py-4 rounded-[12px] transition-all hover:opacity-90 relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 12px 32px rgba(255, 191, 222, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Open Content OS
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Product Preview - Foreground Panel */}
      <section className="py-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div 
            className="relative p-12 rounded-[20px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Background grid subtle effect */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(255, 191, 222, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 191, 222, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="mb-8">
                <h2 
                  style={{ 
                    fontSize: '36px', 
                    fontWeight: 700, 
                    color: '#F4F3F8',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  From Input to Output
                </h2>
                <p style={{ fontSize: '18px', color: '#B4B8C7', maxWidth: '700px' }}>
                  Define parameters, generate complete asset suites, save to your library—structured workflow, organized results.
                </p>
              </div>

              {/* Interface Preview - Grid Layout */}
              <div className="grid grid-cols-12 gap-6">
                {/* Left: Input Panel */}
                <div className="col-span-4">
                  <div 
                    className="p-6 rounded-[16px] h-full"
                    style={{
                      background: '#0E0F14',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <div style={{ fontSize: '12px', color: '#8B8F9E', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Input Configuration
                      </div>
                    </div>
                    
                    {['Offer', 'Audience', 'Platform', 'Goal', 'Voice'].map((field, idx) => (
                      <div key={idx} className="mb-4">
                        <div style={{ fontSize: '13px', color: '#8B8F9E', marginBottom: '6px', fontWeight: 500 }}>
                          {field}
                        </div>
                        <div 
                          className="px-3 py-2 rounded-lg"
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            fontSize: '14px',
                            color: '#B4B8C7'
                          }}
                        >
                          {field === 'Offer' && 'Online Course Launch'}
                          {field === 'Audience' && 'Aspiring Creators'}
                          {field === 'Platform' && 'Instagram + YouTube'}
                          {field === 'Goal' && 'Awareness'}
                          {field === 'Voice' && 'Motivational & Clear'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Output Examples Grid */}
                <div className="col-span-8 space-y-4">
                  {/* Hook Example */}
                  <div 
                    className="p-5 rounded-[12px]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.06) 0%, rgba(231, 198, 243, 0.04) 100%)',
                      border: '1px solid rgba(255, 191, 222, 0.15)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div style={{ fontSize: '11px', color: '#FFBFDE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Hook — Problem-Solution
                      </div>
                      <div 
                        className="px-2 py-1 rounded"
                        style={{
                          background: 'rgba(255, 191, 222, 0.15)',
                          fontSize: '10px',
                          color: '#FFBFDE',
                          fontWeight: 600
                        }}
                      >
                        VARIANT 3/8
                      </div>
                    </div>
                    <p style={{ fontSize: '15px', color: '#F4F3F8', lineHeight: 1.5, fontStyle: 'italic' }}>
                      "You don't need more ideas. You need a system that turns the ideas you have into content that actually ships."
                    </p>
                  </div>

                  {/* Script Example */}
                  <div 
                    className="p-5 rounded-[12px]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(231, 198, 243, 0.06) 0%, rgba(218, 191, 255, 0.04) 100%)',
                      border: '1px solid rgba(231, 198, 243, 0.15)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div style={{ fontSize: '11px', color: '#E7C6F3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Script — Short-Form (60s)
                      </div>
                      <div 
                        className="px-2 py-1 rounded"
                        style={{
                          background: 'rgba(231, 198, 243, 0.15)',
                          fontSize: '10px',
                          color: '#E7C6F3',
                          fontWeight: 600
                        }}
                      >
                        FORMAT 1/3
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Hook (0-3s)', text: 'POV: You realize chat isn\'t a content system' },
                        { label: 'Setup (4-20s)', text: 'Most creators treat AI like a conversation partner...' }
                      ].map((section, idx) => (
                        <div key={idx}>
                          <div style={{ fontSize: '10px', color: '#8B8F9E', marginBottom: '2px', fontWeight: 600 }}>
                            {section.label}
                          </div>
                          <div style={{ fontSize: '13px', color: '#F4F3F8', lineHeight: 1.4 }}>
                            {section.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Caption + Plan in Row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Caption */}
                    <div 
                      className="p-4 rounded-[12px]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(218, 191, 255, 0.06) 0%, rgba(255, 191, 222, 0.04) 100%)',
                        border: '1px solid rgba(218, 191, 255, 0.15)'
                      }}
                    >
                      <div style={{ fontSize: '11px', color: '#DABFFF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                        Caption — Educational
                      </div>
                      <p style={{ fontSize: '13px', color: '#F4F3F8', lineHeight: 1.5 }}>
                        Here's what I learned after generating 500+ pieces of content with structured systems instead of chat...
                      </p>
                    </div>

                    {/* Plan */}
                    <div 
                      className="p-4 rounded-[12px]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 191, 222, 0.06) 0%, rgba(231, 198, 243, 0.04) 100%)',
                        border: '1px solid rgba(255, 191, 222, 0.15)'
                      }}
                    >
                      <div style={{ fontSize: '11px', color: '#FFBFDE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                        Content Plan — 30 Days
                      </div>
                      <div className="space-y-1.5">
                        {['Week 1 — Awareness', 'Week 2 — Education', 'Week 3 — Proof'].map((week, idx) => (
                          <div key={idx} style={{ fontSize: '12px', color: '#B4B8C7' }}>
                            {week}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not Chat - Differentiation */}
      <section className="py-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <h2 
              style={{ 
                fontSize: '42px', 
                fontWeight: 700, 
                color: '#F4F3F8',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Why Not Just Use Chat?
            </h2>
            <p style={{ fontSize: '18px', color: '#B4B8C7', maxWidth: '700px' }}>
              Chat is powerful for exploration. Content OS is built for production.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Chat Approach */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                opacity: 0.7
              }}
            >
              <div className="mb-6">
                <div style={{ fontSize: '14px', color: '#8B8F9E', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Chat-Based Approach
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
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
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
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
                <div style={{ fontSize: '14px', color: '#FFBFDE', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Content OS Approach
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#F4F3F8', marginBottom: '4px' }}>
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
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Asset Library Concept */}
      <section className="py-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left: Explanation */}
            <div>
              <h2 
                style={{ 
                  fontSize: '42px', 
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
                  { label: 'Auto-Save', text: 'Everything generated saves automatically' },
                  { label: 'Organize', text: 'Tag by campaign, platform, content type' },
                  { label: 'Reuse', text: 'Adapt proven assets instead of starting from zero' },
                  { label: 'Export', text: 'Copy, download, or integrate with your tools' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                        boxShadow: '0 2px 8px rgba(255, 191, 222, 0.3)'
                      }}
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
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

            {/* Right: Visual Library Representation */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-6 pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Asset Library
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Launch Campaign Q1', items: 47, accent: '#FFBFDE' },
                  { name: 'Batch Content — Instagram', items: 32, accent: '#E7C6F3' },
                  { name: 'Educational Series', items: 28, accent: '#DABFFF' },
                  { name: 'Brand Voice Tests', items: 15, accent: '#FFBFDE' }
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
                          background: `linear-gradient(135deg, ${folder.accent}20, ${folder.accent}10)`,
                          border: `1px solid ${folder.accent}30`
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <section className="py-20 px-8" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left: Visual Voice Builder */}
            <div 
              className="p-8 rounded-[16px]"
              style={{
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-6 pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontSize: '12px', color: '#FFBFDE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Brand Voice Configuration
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Tone', value: 'Motivational & Direct', locked: true },
                  { label: 'Complexity', value: 'Clear & Accessible', locked: true },
                  { label: 'Formality', value: 'Casual Professional', locked: false },
                  { label: 'Energy', value: 'High Drive', locked: false }
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
                            background: 'rgba(255, 191, 222, 0.12)',
                            border: '1px solid rgba(255, 191, 222, 0.2)'
                          }}
                        >
                          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="5" width="8" height="6" rx="1" fill="#FFBFDE" fillOpacity="0.3" stroke="#FFBFDE" strokeWidth="1.5"/>
                            <path d="M3 5V3.5C3 2.11929 4.11929 1 5.5 1C6.88071 1 8 2.11929 8 3.5V5" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span style={{ fontSize: '10px', color: '#FFBFDE', fontWeight: 600 }}>LOCKED</span>
                        </div>
                      )}
                    </div>
                    <div 
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: param.locked ? 'rgba(255, 191, 222, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        border: param.locked ? '1px solid rgba(255, 191, 222, 0.15)' : '1px solid rgba(255, 255, 255, 0.06)',
                        fontSize: '14px',
                        color: param.locked ? '#FFBFDE' : '#B4B8C7',
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
                  fontSize: '42px', 
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
                  { label: 'Define Parameters', text: 'Set tone, complexity, formality, energy levels' },
                  { label: 'Lock Your Voice', text: 'Save proven voice configs as presets' },
                  { label: 'Apply Consistently', text: 'All content inherits your voice automatically' },
                  { label: 'Test Variations', text: 'A/B test voice parameters without losing your base' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div 
                      className="mt-1 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                        boxShadow: '0 2px 8px rgba(255, 191, 222, 0.3)'
                      }}
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <section className="py-32 px-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 
            style={{ 
              fontSize: '56px', 
              fontWeight: 700, 
              color: '#F4F3F8',
              marginBottom: '48px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}
          >
            Ready to Build Content<br/>That Ships?
          </h2>
          <Link 
            to="/app/content-os/generate"
            className="px-12 py-5 rounded-[12px] transition-all hover:opacity-90 relative overflow-hidden inline-block"
            style={{ 
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
              color: '#0E0F14',
              fontSize: '18px',
              fontWeight: 600,
              boxShadow: '0 16px 40px rgba(255, 191, 222, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              textDecoration: 'none'
            }}
          >
            Open Content OS
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}