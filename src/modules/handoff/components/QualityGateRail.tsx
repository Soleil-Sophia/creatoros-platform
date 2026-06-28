import type { QualityGateChecks } from '../types';

interface QualityGateRailProps {
  score: number;
  passed: boolean;
  checks: QualityGateChecks;
  isDecomposed: boolean;
  onDecompose: () => void;
}

const CHECK_LABELS: Array<[keyof QualityGateChecks, string]> = [
  ['thesisLongEnough', 'Thesis clear'],
  ['wordCountPassed', 'Minimum density'],
  ['hasSubpoints', 'Reusable structure'],
  ['cleanVoice', 'No generic AI sound'],
  ['ctaDefined', 'Unified CTA'],
];

export function QualityGateRail({ score, passed, checks, isDecomposed, onDecompose }: QualityGateRailProps) {
  return (
    <aside className="flex flex-col gap-5 lg:col-span-2">
      <div className="flex flex-col gap-6 rounded-2xl border border-[#27272A] bg-[#111113] p-5 shadow-xl">
        <div className="border-b border-[#27272A] pb-4 text-center">
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#71717A]">Quality Gate</h3>
          <div className="inline-flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-[#27272A] bg-[#09090B] p-4 shadow-inner">
            <span className={passed ? 'font-mono text-2xl font-bold text-[#D6B56D]' : 'font-mono text-2xl font-bold text-[#EF4444]'}>
              {score}
            </span>
            <span className="mt-1 font-mono text-[9px] text-[#71717A]">SCALE 1–5</span>
          </div>
          <div className="mt-3">
            <span className={passed ? 'rounded-full bg-[#22C55E] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-black' : 'rounded-full bg-[#EF4444] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white'}>
              {passed ? 'Passed' : 'Blocked'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#71717A]">Gate Checklist</h3>
          {CHECK_LABELS.map(([key, label]) => (
            <div key={key} className="flex items-start gap-2.5 text-xs">
              <span className={checks[key] ? 'mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-[#22C55E] font-mono text-[9px] font-bold text-black' : 'mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-transparent font-mono text-[9px] text-zinc-600'}>
                {checks[key] ? '✓' : '×'}
              </span>
              <span className={checks[key] ? 'text-[#F4F4F5]' : 'text-[#71717A]'}>{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 border-t border-[#27272A] pt-4">
          <button
            onClick={onDecompose}
            disabled={!passed}
            className={passed ? 'w-full rounded-xl bg-[#F4F4F5] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-black/30 transition-colors hover:bg-[#D6B56D]' : 'w-full cursor-not-allowed rounded-xl border border-[#27272A] bg-[#18181B] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#71717A]'}
          >
            Decompose
          </button>
          <div className="mt-2 text-center font-mono text-[9px] text-[#71717A]">TARGET: LAUNCHOS</div>
        </div>
      </div>
    </aside>
  );
}
