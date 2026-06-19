import { Link } from 'react-router';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { modules, coreModules, addonModules, type CreatorOSModule } from '../../config/modules';
import { getDisplayMeta } from '../../config/moduleDisplay';
import { useState } from 'react';

type ViewMode = 'all' | 'core' | 'addons';

const STATUS_STYLES: Record<string, { label: string; bg: string; color: string; dot?: boolean }> = {
  active: { label: 'Active', bg: 'rgba(34, 197, 94, 0.08)', color: '#22c55e', dot: true },
  beta: { label: 'Beta', bg: 'rgba(251, 191, 36, 0.08)', color: '#fbbf24', dot: true },
  planned: { label: 'Planned', bg: 'rgba(255, 255, 255, 0.04)', color: '#8B8F9E' },
};

function ModuleCard({ module }: { module: CreatorOSModule }) {
  const { accent, number, tagline, features } = getDisplayMeta(module.id);
  const status = STATUS_STYLES[module.status] ?? STATUS_STYLES.planned;
  const isAvailable = module.status === 'active' || module.status === 'beta';

  return (
    <div
      className="relative rounded-[20px] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        border: `1px solid ${isAvailable ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        opacity: isAvailable ? 1 : 0.65,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        if (isAvailable) {
          (e.currentTarget as HTMLElement).style.borderColor = `${accent}30`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${accent}10`;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = isAvailable
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(255,255,255,0.05)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {isAvailable && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
        />
      )}

      <div className="p-6 lg:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: isAvailable ? `${accent}14` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isAvailable ? `${accent}25` : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 700, color: isAvailable ? accent : '#8B8F9E' }}>
                {number}
              </span>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', lineHeight: 1.2, marginBottom: '2px' }}>
                {module.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#8B8F9E' }}>{tagline}</p>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ background: status.bg, border: `1px solid ${status.color}20` }}
          >
            {status.dot && (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: status.color, boxShadow: `0 0 6px ${status.color}80` }}
              />
            )}
            <span style={{ fontSize: '11px', fontWeight: 600, color: status.color, letterSpacing: '0.06em' }}>
              {status.label}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6, marginBottom: '18px' }}>
          {module.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((f) => (
            <span
              key={f}
              className="px-2.5 py-1 rounded-md"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '12px',
                color: '#8B8F9E',
              }}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAvailable ? (
            <>
              <Link
                to={module.routes.overview}
                className="flex-1 py-2.5 rounded-[10px] text-center transition-all hover:opacity-90"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}30`,
                  color: accent,
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Learn More
              </Link>
              {module.routes.app && (
                <Link
                  to={module.routes.app}
                  className="flex-1 py-2.5 rounded-[10px] text-center transition-all hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`,
                    color: '#0E0F14',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: `0 4px 16px ${accent}30`,
                  }}
                >
                  Open App
                </Link>
              )}
            </>
          ) : (
            <div
              className="w-full py-2.5 rounded-[10px] text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: '#4A4F62',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Planned
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ModulesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  const coreDisplay = viewMode !== 'addons' ? coreModules : [];
  const addonDisplay = viewMode !== 'core' ? addonModules : [];
  const activeCount = modules.filter((m) => m.status === 'active').length;

  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(218, 191, 255, 0.07) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: 'rgba(218, 191, 255, 0.4)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#DABFFF', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Platform Modules
            </span>
            <div className="h-px w-8" style={{ background: 'rgba(218, 191, 255, 0.4)' }} />
          </div>

          <h1
            className="mb-5"
            style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            CreatorOS Modules
          </h1>

          <p
            style={{ fontSize: 'clamp(17px, 2.5vw, 20px)', color: '#B4B8C7', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}
          >
            A connected system of standalone tools. Each module works independently — together they form
            your creator operating system.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>{activeCount} modules live</span>
            </div>
            <span
              className="px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '12px', color: '#8B8F9E' }}
            >
              {modules.length - activeCount} in roadmap
            </span>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div
            className="inline-flex items-center gap-1 p-1 rounded-[12px]"
            style={{ background: '#1F2230', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {(['all', 'core', 'addons'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="px-5 py-2 rounded-[10px] transition-all"
                style={{
                  background: viewMode === mode ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: viewMode === mode ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                  color: viewMode === mode ? '#F4F3F8' : '#8B8F9E',
                  fontSize: '14px',
                  fontWeight: viewMode === mode ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {mode === 'all' ? 'All Modules' : mode === 'core' ? 'Core Workflow' : 'Add-ons'}
              </button>
            ))}
          </div>
        </div>

        {/* Core modules */}
        {coreDisplay.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="px-3 py-1.5 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #E7C6F3 0%, #FFBFDE 100%)', boxShadow: '0 4px 12px rgba(231, 198, 243, 0.25)' }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>CORE WORKFLOW</span>
              </div>
              <span style={{ fontSize: '14px', color: '#8B8F9E' }}>Recommended path</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {coreDisplay.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        )}

        {/* Add-on modules */}
        {addonDisplay.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="px-3 py-1.5 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #DABFFF 0%, #B8A3FF 100%)', boxShadow: '0 4px 12px rgba(218, 191, 255, 0.25)' }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0E0F14', letterSpacing: '0.05em' }}>ADD-ONS</span>
              </div>
              <span style={{ fontSize: '14px', color: '#8B8F9E' }}>Optional extensions</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {addonDisplay.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="py-20 relative" style={{ background: '#171923' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(231, 198, 243, 0.05) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-[640px] mx-auto px-6 text-center">
          <h2 className="mb-4" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#F4F3F8', letterSpacing: '-0.02em' }}>
            Start with the core workflow
          </h2>
          <p className="mb-8" style={{ fontSize: '17px', color: '#B4B8C7', lineHeight: 1.6 }}>
            Begin with Brand OS to define your foundation. Then Content OS to build your system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/modules/brandos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
                color: '#0E0F14',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 12px 32px rgba(231, 198, 243, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
                textDecoration: 'none',
              }}
            >
              Start with Brand OS
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/modules/contentos"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-[12px] transition-all hover:opacity-90"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#B4B8C7',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Explore Content OS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
