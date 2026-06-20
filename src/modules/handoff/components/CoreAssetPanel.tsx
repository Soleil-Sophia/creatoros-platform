import type { CoreAsset } from '../types';

interface CoreAssetPanelProps {
  asset: CoreAsset;
  onChange: (asset: CoreAsset) => void;
  wordCount: number;
}

export function CoreAssetPanel({ asset, onChange, wordCount }: CoreAssetPanelProps) {
  return (
    <section className="flex max-h-[85vh] flex-col gap-5 overflow-y-auto pr-1 lg:col-span-5">
      <div className="flex flex-col gap-5 rounded-2xl border border-[#27272A] bg-[#09090B] p-5 shadow-xl md:p-6">
        <div className="border-b border-[#27272A] pb-4">
          <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-[#71717A]">Source Core Asset</h2>
          <input
            value={asset.title}
            onChange={(event) => onChange({ ...asset, title: event.target.value })}
            className="w-full border-none bg-transparent px-0 text-lg font-bold text-[#F4F4F5] focus:outline-none"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded border border-[#27272A] bg-[#1F1F23] px-2 py-0.5 font-mono text-[10px] text-[#D6B56D]">
              Theme: {asset.theme}
            </span>
            <span className="rounded border border-[#27272A] bg-[#111113] px-2 py-0.5 font-mono text-[10px] text-[#71717A]">
              Blueprint: {asset.brand_blueprint_id}
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#71717A]">Core Thesis</h3>
          <textarea
            value={asset.core_thesis}
            onChange={(event) => onChange({ ...asset, core_thesis: event.target.value })}
            className="w-full resize-y rounded-xl border border-[#27272A] bg-[#111113] p-3 font-serif text-sm leading-relaxed text-[#F4F4F5] focus:border-[#D6B56D] focus:outline-none"
            rows={4}
          />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-[#27272A] bg-[#111113] p-4">
          <h3 className="border-b border-[#27272A] pb-1 font-mono text-xs uppercase tracking-wider text-[#71717A]">
            Strategic Intent
          </h3>
          {([
            ['enemy', 'THE ENEMY'],
            ['desire', 'PRIMARY DESIRE'],
            ['mechanism', 'CORE MECHANISM'],
            ['transformation', 'TRANSFORMATION'],
          ] as const).map(([key, label]) => (
            <label key={key} className="text-xs">
              <span className="mb-1 block font-mono text-[#71717A]">{label}:</span>
              <input
                value={asset.strategic_notes[key]}
                onChange={(event) =>
                  onChange({
                    ...asset,
                    strategic_notes: { ...asset.strategic_notes, [key]: event.target.value },
                  })
                }
                className="w-full border-b border-zinc-800 bg-transparent pb-1 text-[#F4F4F5] focus:border-[#D6B56D] focus:outline-none"
              />
            </label>
          ))}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#71717A]">Editorial Draft Body</h3>
            <span className="rounded border border-[#27272A] bg-[#111113] px-2 py-0.5 font-mono text-[10px] text-[#71717A]">
              {wordCount} words
            </span>
          </div>
          <textarea
            value={asset.body_markdown}
            onChange={(event) => onChange({ ...asset, body_markdown: event.target.value })}
            className="w-full resize-y rounded-xl border border-[#27272A] bg-[#111113] p-4 font-serif text-sm leading-relaxed text-[#A1A1AA] focus:border-[#D6B56D] focus:outline-none"
            rows={10}
          />
        </div>
      </div>
    </section>
  );
}
