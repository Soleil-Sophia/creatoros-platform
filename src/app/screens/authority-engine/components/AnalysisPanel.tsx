import type { AuthorityAnalysis } from '../../../types/authority';
import { Badge, PanelShell, SectionLabel } from '../../../components/shared';

type Props = {
  analysis: AuthorityAnalysis | null;
  onGenerate: () => void;
  canGenerate: boolean;
};

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-white/50 mb-2">{label}</div>
      {children}
    </div>
  );
}

function BulletList({ items, accent = '#DABFFF' }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: '#B4B8C7' }}>
          <span style={{ color: accent, marginTop: 2 }}>•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function AnalysisPanel({ analysis, onGenerate, canGenerate }: Props) {
  if (!analysis) {
    return (
      <PanelShell>
        <SectionLabel>Step 3 — Analysis</SectionLabel>
        <div className="mt-6 text-center py-10">
          <div className="text-base font-semibold mb-2" style={{ color: '#F4F3F8' }}>
            No analysis yet
          </div>
          <div className="text-sm" style={{ color: '#8B8F9E' }}>
            Add or load a source, then click Analyze Source to extract key points, system insight,
            friction, anti-pattern, metric lens, and content angles.
          </div>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Step 3 — Analysis</SectionLabel>
        <div className="flex gap-2">
          {analysis.affectedZones.map((z) => (
            <Badge key={z} variant="purple" size="sm">
              {z.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <Group label="System Insight">
          <div
            className="p-3 rounded-lg text-sm leading-relaxed italic"
            style={{
              background: 'rgba(218, 191, 255, 0.08)',
              border: '1px solid rgba(218, 191, 255, 0.18)',
              color: '#E7C6F3',
            }}
          >
            {analysis.systemInsight}
          </div>
        </Group>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Group label="Key Points">
            <BulletList items={analysis.keyPoints} />
          </Group>
          <Group label="Excluded Noise">
            <BulletList items={analysis.excludedNoise} accent="#8B8F9E" />
          </Group>
          <Group label="Detected Friction">
            <BulletList items={analysis.detectedFriction} accent="#FFBFDE" />
          </Group>
          <Group label="Metric Lens">
            <BulletList items={analysis.metricLens} />
          </Group>
        </div>

        <Group label="Anti-Pattern">
          <div
            className="inline-block px-3 py-1.5 rounded-md text-sm font-semibold"
            style={{
              background: 'rgba(255, 191, 222, 0.12)',
              border: '1px solid rgba(255, 191, 222, 0.25)',
              color: '#FFBFDE',
            }}
          >
            {analysis.antiPattern}
          </div>
        </Group>

        <Group label="Content Angles">
          <BulletList items={analysis.contentAngles} />
        </Group>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!canGenerate}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 191, 222, 0.95), rgba(218, 191, 255, 0.95))',
            color: '#0E0F14',
          }}
        >
          Generate Assets →
        </button>
      </div>
    </PanelShell>
  );
}
