import { Link } from 'react-router';
import type { BrandProfileStatus } from '../../lib/brand-profile/storage';

type BrandVoiceChipProps = {
  voiceLabel?: string | null;
  status?: BrandProfileStatus;
  /** Optional route to BrandOS setup, shown only when no voice is connected. */
  setupRoute?: string;
};

/**
 * Passive, display-only indicator. Shows the saved BrandOS voice if present,
 * otherwise a subtle prompt to set one up. No interaction beyond an optional link.
 */
<<<<<<< HEAD
export function BrandVoiceChip({ voiceLabel, status, setupRoute }: BrandVoiceChipProps) {
  const hasVoice = status === 'complete' && Boolean(voiceLabel && voiceLabel.trim());
  const isIncomplete = status === 'in_progress';
=======
export function BrandVoiceChip({ voiceLabel, setupRoute }: BrandVoiceChipProps) {
  const hasVoice = Boolean(voiceLabel && voiceLabel.trim());
>>>>>>> origin/main

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
<<<<<<< HEAD
        background: hasVoice
          ? 'rgba(231, 198, 243, 0.08)'
          : isIncomplete
          ? 'rgba(255, 191, 222, 0.08)'
          : 'rgba(255, 255, 255, 0.04)',
        border: hasVoice
          ? '1px solid rgba(231, 198, 243, 0.2)'
          : isIncomplete
          ? '1px solid rgba(255, 191, 222, 0.18)'
=======
        background: hasVoice ? 'rgba(231, 198, 243, 0.08)' : 'rgba(255, 255, 255, 0.04)',
        border: hasVoice
          ? '1px solid rgba(231, 198, 243, 0.2)'
>>>>>>> origin/main
          : '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '12px',
        lineHeight: 1,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
<<<<<<< HEAD
          background: hasVoice ? '#E7C6F3' : isIncomplete ? '#FFBFDE' : '#8B8F9E',
=======
          background: hasVoice ? '#E7C6F3' : '#8B8F9E',
>>>>>>> origin/main
          boxShadow: hasVoice ? '0 0 6px rgba(231, 198, 243, 0.5)' : 'none',
        }}
      />
      <span
        style={{
          color: '#8B8F9E',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontSize: '10px',
        }}
      >
        Brand Voice
      </span>
      {hasVoice ? (
        <span style={{ color: '#F4F3F8', fontWeight: 500 }}>{voiceLabel}</span>
<<<<<<< HEAD
      ) : isIncomplete ? (
        <>
          <span style={{ color: '#B4B8C7' }}>Incomplete</span>
      ) : isInProgress ? (
        <>
          <span style={{ color: '#F4F3F8', fontWeight: 500 }}>In progress</span>
          {setupRoute && (
            <Link
              to={setupRoute}
              style={{
                color: '#FFBFDE',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Open BrandOS →
              Finish setup →
            </Link>
          )}
        </>
=======
>>>>>>> origin/main
      ) : (
        <>
          <span style={{ color: '#B4B8C7' }}>Not connected</span>
          {setupRoute && (
            <Link
              to={setupRoute}
              style={{
                color: '#E7C6F3',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Set up →
            </Link>
          )}
        </>
      )}
    </div>
  );
}
