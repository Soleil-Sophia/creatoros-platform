import type { DistributionAsset, LaunchIntent } from '../types';
import { DistributionAssetCard } from './DistributionAssetCard';

interface LaunchPackagePanelProps {
  intent: LaunchIntent;
  onIntentChange: (intent: LaunchIntent) => void;
  isDecomposed: boolean;
  assets: DistributionAsset[];
  expandedCard: number | null;
  onCardToggle: (index: number | null) => void;
  onCopy: (text: string, index: number) => void;
  copiedIndex: number | null;
}

export function LaunchPackagePanel({
  intent,
  onIntentChange,
  isDecomposed,
  assets,
  expandedCard,
  onCardToggle,
  onCopy,
  copiedIndex,
}: LaunchPackagePanelProps) {
  return (
    <section className="flex max-h-[85vh] flex-col gap-5 overflow-y-auto pr-1 lg:col-span-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-[#27272A] bg-[#09090B] p-5 shadow-xl">
        <h3 className="border-b border-[#27272A] pb-2 font-mono text-xs uppercase tracking-wider text-[#71717A]">
          Strategic Launch Intent
        </h3>
        <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
          <label>
            <span className="mb-1 block font-mono text-[#71717A]">LAUNCH GOAL:</span>
            <select
              value={intent.launch_goal}
              onChange={(event) => onIntentChange({ ...intent, launch_goal: event.target.value as LaunchIntent['launch_goal'] })}
              className="w-full rounded-lg border border-[#27272A] bg-[#111113] px-2.5 py-1.5 text-[#F4F4F5] focus:border-[#D6B56D] focus:outline-none"
            >
              <option value="category-definition">Category definition</option>
              <option value="authority-building">Authority building</option>
              <option value="lead-generation">Lead generation</option>
              <option value="offer-launch">Offer launch</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block font-mono text-[#71717A]">AUDIENCE STAGE:</span>
            <select
              value={intent.audience_stage}
              onChange={(event) => onIntentChange({ ...intent, audience_stage: event.target.value as LaunchIntent['audience_stage'] })}
              className="w-full rounded-lg border border-[#27272A] bg-[#111113] px-2.5 py-1.5 text-[#F4F4F5] focus:border-[#D6B56D] focus:outline-none"
            >
              <option value="unaware">Unaware</option>
              <option value="problem-aware">Problem-aware</option>
              <option value="solution-aware">Solution-aware</option>
              <option value="most-aware">Most-aware</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block font-mono text-[#71717A]">CONVERSION GOAL:</span>
            <input
              value={intent.conversion_goal}
              onChange={(event) => onIntentChange({ ...intent, conversion_goal: event.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#111113] px-2.5 py-1.5 text-[#F4F4F5] focus:border-[#D6B56D] focus:outline-none"
            />
          </label>
          <label>
            <span className="mb-1 block font-mono text-[#71717A]">LAUNCH DATE:</span>
            <input
              type="date"
              value={intent.target_launch_date}
              onChange={(event) => onIntentChange({ ...intent, target_launch_date: event.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#111113] px-2.5 py-1.5 text-[#F4F4F5] focus:border-[#D6B56D] focus:outline-none"
            />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1 block font-mono text-[#71717A]">PRIMARY CTA:</span>
            <input
              value={intent.primary_cta}
              onChange={(event) => onIntentChange({ ...intent, primary_cta: event.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#111113] px-2.5 py-1.5 text-[#F4F4F5] focus:border-[#D6B56D] focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#71717A]">Distribution Leaf Nodes</h3>
          <span className="rounded border border-[#27272A] bg-[#111113] px-2 py-0.5 font-mono text-[10px] text-[#71717A]">
            {isDecomposed ? '4 PLATFORMS LOADED' : 'AWAITING DECOMPOSITION'}
          </span>
        </div>

        {!isDecomposed ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#27272A] bg-[#09090B] p-8 text-center">
            <span className="text-2xl">⏳</span>
            <span className="mt-1 font-mono text-xs text-[#F4F4F5]">AWAITING DECOMPOSITION</span>
            <span className="max-w-xs text-xs leading-relaxed text-[#71717A]">
              Pass the Quality Gate and click Decompose to generate platform-ready assets.
            </span>
          </div>
        ) : (
          assets.map((asset, index) => (
            <DistributionAssetCard
              key={asset.id}
              asset={asset}
              isExpanded={expandedCard === index}
              onToggle={() => onCardToggle(expandedCard === index ? null : index)}
              onCopy={() => onCopy(asset.content_markdown, index)}
              isCopied={copiedIndex === index}
            />
          ))
        )}
      </div>
    </section>
  );
}
