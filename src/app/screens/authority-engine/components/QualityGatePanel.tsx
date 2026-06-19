import type { QualityGate } from '../../../types/authority';
import { PanelShell, SectionLabel } from '../../../components/shared';

type Props = { gate: QualityGate | null };

function Check({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div
      className="flex items-center justify-between rounded-md px-3 py-2"
      style={{
        background: ok ? 'rgba(120, 230, 180, 0.06)' : 'rgba(255, 191, 222, 0.06)',
        border: ok
          ? '1px solid rgba(120, 230, 180, 0.18)'
          : '1px solid rgba(255, 191, 222, 0.2)',
      }}
    >
      <span className="text-sm" style={{ color: '#F4F3F8' }}>
        {label}
      </span>
      <span
        className="text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: ok ? '#78E6B4' : '#FFBFDE' }}
      >
        {ok ? 'Pass' : 'Review'}
      </span>
    </div>
  );
}

export function QualityGatePanel({ gate }: Props) {
  if (!gate) {
    return (
      <PanelShell>
        <SectionLabel>Step 5 — Quality Gate</SectionLabel>
        <div className="mt-4 text-sm" style={{ color: '#8B8F9E' }}>
          Quality gate runs automatically after assets are generated.
        </div>
      </PanelShell>
    );
  }

  const rows: Array<[string, boolean]> = [
    ['Hook in first sentence', gate.hookInFirstSentence],
    ['No hype', gate.noHype],
    ['Clear audience', gate.clearAudience],
    ['System insight present', gate.systemInsightPresent],
    ['CTA present', gate.ctaPresent],
    ['Positioning visible', gate.positioningVisible],
    ['Platform format valid', gate.platformFormatValid],
    ['Technical claims safe', gate.technicalClaimsSafe],
  ];
  const passes = rows.filter(([, ok]) => ok).length;

  return (
    <PanelShell>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Step 5 — Quality Gate</SectionLabel>
        <span className="text-xs" style={{ color: '#8B8F9E' }}>
          {passes}/{rows.length} passing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {rows.map(([label, ok]) => (
          <Check key={label} label={label} ok={ok} />
        ))}
      </div>

      {gate.notes.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-wider text-white/50 mb-2">Notes</div>
          <ul className="space-y-1.5">
            {gate.notes.map((n, i) => (
              <li key={i} className="text-sm" style={{ color: '#B4B8C7' }}>
                — {n}
              </li>
            ))}
          </ul>
        </div>
      )}
    </PanelShell>
  );
}
