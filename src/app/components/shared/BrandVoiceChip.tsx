import { Link } from 'react-router';

type BrandVoiceChipProps = {
  voiceLabel?: string | null;
  /** Optional route to BrandOS setup, shown only when no voice is connected. */
  setupRoute?: string;
};

/**
 * Passive, display-only indicator. Shows the saved BrandOS voice if present,
 * otherwise a subtle prompt to set one up. No interaction beyond an optional link.
 */
export function BrandVoiceChip({ voiceLabel, setupRoute }: BrandVoiceChipProps) {
  const hasVoice = Boolean(voiceLabel && voiceLabel.trim());

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        background: hasVoice ? 'rgba(231, 198, 243, 0.08)' : 'rgba(255, 255, 255, 0.04)',
        border: hasVoice
          ? '1px solid rgba(231, 198, 243, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '12px',
        lineHeight: 1,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: hasVoice ? '#E7C6F3' : '#8B8F9E',
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
