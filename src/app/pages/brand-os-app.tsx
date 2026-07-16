import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Lock, Save, Check } from 'lucide-react';
import {
  readBrandProfile,
  writeBrandProfile,
  createVoiceLabel,
} from '../lib/brand-profile/storage';

const inputClassName =
  'w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2';
const inputStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#F4F3F8',
  fontSize: '15px',
} as const;

export function BrandOSAppPage() {
  const [brandName, setBrandName] = useState('');
  const [tone, setTone] = useState('');
  const [complexity, setComplexity] = useState('');
  const [formality, setFormality] = useState('');
  const [energy, setEnergy] = useState('');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const profile = readBrandProfile();
    if (profile) {
      setBrandName(profile.brandName);
      setTone(profile.voiceTone);
      setComplexity(profile.voiceComplexity);
      setFormality(profile.voiceFormality);
      setEnergy(profile.voiceEnergy);
      setSavedAt(profile.updatedAt ?? null);
    }
  }, []);

  const handleSave = () => {
    const profile = {
      brandName: brandName.trim(),
      voiceTone: tone.trim(),
      voiceComplexity: complexity.trim(),
      voiceFormality: formality.trim(),
      voiceEnergy: energy.trim(),
    };
    const next = writeBrandProfile({
      ...profile,
      voiceLabel: createVoiceLabel(profile),
    });
    setSavedAt(next.updatedAt ?? null);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      {/* Top Navigation Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(14, 15, 20, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-6">
              <Link
                to="/modules/brand-os"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
                style={{ color: '#B4B8C7', fontSize: '14px', textDecoration: 'none' }}
              >
                <ArrowLeft size={16} />
                Back to Brand OS
              </Link>
              <div
                className="h-6 w-px"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              />
              <h1 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8' }}>
                Brand OS Setup
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {savedAt && !justSaved && (
                <span style={{ fontSize: '12px', color: '#8B8F9E' }}>
                  Saved {new Date(savedAt).toLocaleString()}
                </span>
              )}
              {justSaved && (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                  style={{
                    background: 'rgba(191, 255, 222, 0.1)',
                    border: '1px solid rgba(191, 255, 222, 0.2)',
                    color: '#BFFFDE',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  <Check size={12} />
                  Saved
                </span>
              )}
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#F4F3F8',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                <Save size={16} />
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <div
              className="inline-block px-3 py-1 rounded-lg mb-4"
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
              Step 1 of 3
            </div>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#F4F3F8',
                marginBottom: '12px',
                letterSpacing: '-0.02em'
              }}
            >
              Define Your Brand Voice
            </h2>
            <p style={{ fontSize: '16px', color: '#B4B8C7', lineHeight: 1.6, maxWidth: '700px' }}>
              Set your voice parameters once. These settings will be applied automatically to all content generated in Content OS.
            </p>
          </div>

          {/* Voice Parameters Form */}
          <div className="space-y-6">
            {/* Brand Name */}
            <div
              className="p-6 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                    Brand Name
                  </h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.5 }}>
                    The primary name of the brand or creator.
                  </p>
                </div>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: 'rgba(231, 198, 243, 0.12)',
                    border: '1px solid rgba(231, 198, 243, 0.2)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#E7C6F3'
                  }}
                >
                  <Lock size={12} />
                  Lock
                </button>
              </div>
              <input
                type="text"
                placeholder="e.g., CreatorOS"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
            </div>

            {/* Tone */}
            <div
              className="p-6 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                    Voice Tone
                  </h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.5 }}>
                    How your brand sounds—professional, casual, motivational, technical
                  </p>
                </div>
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: 'rgba(231, 198, 243, 0.12)',
                    border: '1px solid rgba(231, 198, 243, 0.2)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#E7C6F3'
                  }}
                >
                  <Lock size={12} />
                  Lock
                </button>
              </div>
              <input
                type="text"
                placeholder="e.g., Motivational & Direct"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
            </div>

            {/* Complexity */}
            <div
              className="p-6 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                    Voice Complexity
                  </h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.5 }}>
                    Language level—simple, accessible, technical, expert
                  </p>
                </div>
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: 'rgba(231, 198, 243, 0.12)',
                    border: '1px solid rgba(231, 198, 243, 0.2)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#E7C6F3'
                  }}
                >
                  <Lock size={12} />
                  Lock
                </button>
              </div>
              <input
                type="text"
                placeholder="e.g., Clear & Accessible"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
            </div>

            {/* Formality */}
            <div
              className="p-6 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                    Voice Formality
                  </h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.5 }}>
                    How formal or casual—corporate, professional, friendly
                  </p>
                </div>
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: 'rgba(231, 198, 243, 0.12)',
                    border: '1px solid rgba(231, 198, 243, 0.2)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#E7C6F3'
                  }}
                >
                  <Lock size={12} />
                  Lock
                </button>
              </div>
              <input
                type="text"
                placeholder="e.g., Casual Professional"
                value={formality}
                onChange={(e) => setFormality(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
            </div>

            {/* Energy */}
            <div
              className="p-6 rounded-[16px]"
              style={{
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F4F3F8', marginBottom: '6px' }}>
                    Voice Energy
                  </h3>
                  <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.5 }}>
                    Overall energy level—high drive, calm, enthusiastic, measured
                  </p>
                </div>
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: 'rgba(231, 198, 243, 0.12)',
                    border: '1px solid rgba(231, 198, 243, 0.2)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#E7C6F3'
                  }}
                >
                  <Lock size={12} />
                  Lock
                </button>
              </div>
              <input
                type="text"
                placeholder="e.g., High Drive"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                className={inputClassName}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Next Step Button */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-lg transition-all hover:opacity-90"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#F4F3F8',
                fontSize: '15px',
                fontWeight: 500
              }}
            >
              Save as Draft
            </button>
            <Link
              to="/app/content-os/generate"
              className="px-6 py-3 rounded-lg transition-all hover:opacity-90 inline-flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
                color: '#0E0F14',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(231, 198, 243, 0.3)',
                textDecoration: 'none'
              }}
            >
              Continue to Messaging Framework
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
