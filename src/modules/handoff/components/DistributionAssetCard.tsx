import type { DistributionAsset } from '../types';

interface DistributionAssetCardProps {
  asset: DistributionAsset;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
  isCopied: boolean;
}

export function DistributionAssetCard({ asset, isExpanded, onToggle, onCopy, isCopied }: DistributionAssetCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#27272A] bg-[#09090B] shadow-lg transition-all duration-200 hover:border-[#3F3F46]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`asset-content-${asset.id}`}
        className="flex w-full cursor-pointer select-none items-center justify-between bg-[#111113] p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#D6B56D]" />
          <div>
            <span className="block font-mono text-xs font-bold uppercase tracking-wider text-[#F4F4F5]">{asset.channel}</span>
            <span className="font-mono text-[10px] text-[#71717A]">{asset.format}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded border border-[#27272A] bg-[#050507] px-2 py-0.5 font-mono text-[10px] text-[#71717A]">
            {asset.status.toUpperCase()}
          </span>
          <span className="text-xs text-zinc-500">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {isExpanded && (
        <div id={`asset-content-${asset.id}`} className="flex flex-col gap-3 border-t border-[#27272A] bg-[#050507]/40 p-4">
          <div className="grid grid-cols-1 gap-2 rounded-lg border border-[#27272A] bg-[#111113] p-2.5 font-mono text-[10px] text-[#71717A] sm:grid-cols-2">
            <div>
              <span className="block font-bold text-zinc-600">TARGET DATE:</span>
              <span>{asset.target_date}</span>
            </div>
            <div>
              <span className="block font-bold text-zinc-600">GOAL:</span>
              <span>{asset.goal}</span>
            </div>
          </div>

          <div className="relative">
            <pre className="max-h-72 overflow-y-auto overflow-x-auto whitespace-pre-wrap rounded-xl border border-[#27272A] bg-[#111113] p-3.5 font-serif text-xs leading-relaxed text-[#A1A1AA]">
              {asset.content_markdown}
            </pre>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onCopy();
              }}
              className="absolute right-2.5 top-2.5 rounded-lg border border-[#27272A] bg-black/60 px-2.5 py-1.5 font-mono text-[9px] text-zinc-400 backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
            >
              {isCopied ? '✓ COPIED' : 'COPY'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
