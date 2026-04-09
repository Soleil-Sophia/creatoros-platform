import { useState } from 'react';
import { Link } from 'react-router';
import { GenerateScreen } from '../../app/screens/generate';
import { LibraryScreen } from '../../app/screens/library';
import { getModule } from '../../config/modules';
import { getDisplayMeta } from '../../config/moduleDisplay';
import { contentOSData } from '../../data/contentos';

type Tab = 'overview' | 'generate' | 'library';

const module = getModule('contentos')!;
const { accent } = getDisplayMeta('contentos');

function QuickActionCard({
  title,
  description,
  accent,
  onClick,
}: {
  title: string;
  description: string;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative block w-full rounded-[14px] p-6 text-left transition-all"
      style={{
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        border: `1px solid ${accent}20`,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${accent}10`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}20`;
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-[14px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
      />
      <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
        {title}
      </h4>
      <p style={{ fontSize: '13px', color: '#8B8F9E', lineHeight: 1.5 }}>{description}</p>
      <div className="flex items-center gap-1.5 mt-4">
        <span style={{ fontSize: '13px', fontWeight: 600, color: accent }}>Open</span>
        <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
          <path
            d="M2 6h8M6 2l4 4-4 4"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

function OverviewTab({ onTabChange }: { onTabChange: (tab: Tab) => void }) {
  return (
    <div className="flex-1 overflow-auto p-6 lg:p-10" style={{ background: '#0E0F14' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Welcome header */}
        <div className="mb-10">
          <h2
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: '#F4F3F8',
              letterSpacing: '-0.01em',
              marginBottom: '6px',
            }}
          >
            Content OS Overview
          </h2>
          <p style={{ fontSize: '15px', color: '#8B8F9E' }}>
            Your content production system. Generate, manage, and reuse structured content assets.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {contentOSData.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[14px] p-5"
              style={{
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: accent,
                  marginBottom: '4px',
                  letterSpacing: '-0.01em',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#8B8F9E' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#8B8F9E',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <QuickActionCard
              title="Generate Content"
              description="Create hooks, scripts, captions, and plans from your offers and ideas."
              accent={accent}
              onClick={() => onTabChange('generate')}
            />
            <QuickActionCard
              title="Browse Library"
              description="Access your saved content assets and reuse your best work."
              accent="#DABFFF"
              onClick={() => onTabChange('library')}
            />
          </div>
        </div>

        {/* Workflow Steps */}
        <div>
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#8B8F9E',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            How Content OS Works
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentOSData.workflow.steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-[14px] p-5"
                style={{
                  background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: `${accent}14`,
                    border: `1px solid ${accent}20`,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: accent }}>
                    {step.number}
                  </span>
                </div>
                <h4
                  style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}
                >
                  {step.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#8B8F9E', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentOSApp() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'generate', label: 'Generate' },
    { id: 'library', label: 'Library' },
  ];

  return (
    <div className="h-screen flex flex-col" style={{ background: '#0E0F14' }}>
      {/* App Header */}
      <header
        style={{
          background: '#171923',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          flexShrink: 0,
        }}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16 gap-6">
            {/* Logo + module */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)' }}
                  />
                </div>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#F4F3F8' }}>CreatorOS</span>
              </Link>

              <div className="w-px h-5" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />

              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: accent,
                    boxShadow: `0 0 6px ${accent}80`,
                  }}
                />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>
                  Content OS
                </span>
                <div
                  className="px-2 py-0.5 rounded-md"
                  style={{
                    background: `${accent}14`,
                    border: `1px solid ${accent}25`,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: accent,
                  }}
                >
                  Module 02
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2 rounded-lg transition-all"
                  style={{
                    background:
                      activeTab === tab.id ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
                    border:
                      activeTab === tab.id
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid transparent',
                    color: activeTab === tab.id ? '#F4F3F8' : '#8B8F9E',
                    fontSize: '14px',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/modules/contentos"
                className="px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  color: '#8B8F9E',
                  fontSize: '13px',
                  textDecoration: 'none',
                }}
              >
                Module Info
              </Link>
              <Link
                to="/modules"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  color: '#8B8F9E',
                  fontSize: '13px',
                  textDecoration: 'none',
                }}
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path
                    d="M8 2L4 6l4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                All Modules
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'overview' && <OverviewTab onTabChange={setActiveTab} />}
        {activeTab === 'generate' && <GenerateScreen showTopbar={false} />}
        {activeTab === 'library' && <LibraryScreen showTopbar={false} />}
      </div>
    </div>
  );
}
