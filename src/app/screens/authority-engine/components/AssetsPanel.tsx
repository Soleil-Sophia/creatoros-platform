import { useState } from 'react';
import type { ContentAsset } from '../../../types/authority';
import { Badge, PanelShell, SectionLabel } from '../../../components/shared';

type Props = { assets: ContentAsset[] };

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {
          // ignore
        }
      }}
      className="text-[11px] px-2.5 py-1 rounded-md transition-colors"
      style={{
        background: copied ? 'rgba(120, 230, 180, 0.15)' : 'rgba(255, 255, 255, 0.06)',
        border: copied
          ? '1px solid rgba(120, 230, 180, 0.35)'
          : '1px solid rgba(255, 255, 255, 0.12)',
        color: copied ? '#78E6B4' : '#B4B8C7',
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export function AssetsPanel({ assets }: Props) {
  if (assets.length === 0) {
    return (
      <PanelShell>
        <SectionLabel>Step 4 — Assets</SectionLabel>
        <div className="mt-6 text-center py-10">
          <div className="text-base font-semibold mb-2" style={{ color: '#F4F3F8' }}>
            No assets generated yet
          </div>
          <div className="text-sm" style={{ color: '#8B8F9E' }}>
            Run the analysis first, then click Generate Assets to produce one draft per selected
            content goal.
          </div>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell>
      <div className="mb-4">
        <SectionLabel>Step 4 — Assets</SectionLabel>
      </div>

      <div className="space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="purple" size="sm">
                  {asset.goal}
                </Badge>
                <Badge variant="pink" size="sm">
                  {asset.platform}
                </Badge>
                <span className="text-[11px]" style={{ color: '#8B8F9E' }}>
                  {asset.wordCount} words
                </span>
              </div>
              <CopyButton text={asset.body} />
            </div>
            <div
              className="text-sm whitespace-pre-wrap leading-relaxed"
              style={{ color: '#F4F3F8', fontFamily: 'Inter, sans-serif' }}
            >
              {asset.body}
            </div>
            {asset.cta && (
              <div
                className="mt-3 pt-3 text-xs"
                style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', color: '#8B8F9E' }}
              >
                <span className="uppercase tracking-wider" style={{ color: '#DABFFF' }}>
                  CTA goal:
                </span>{' '}
                {asset.cta}
              </div>
            )}
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
