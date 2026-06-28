interface HandoffHeaderProps {
  assetId: string;
  isDecomposed: boolean;
}

export function HandoffHeader({ assetId, isDecomposed }: HandoffHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#27272A]/80 bg-[#09090B]/95 px-6 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <span className="rounded border border-[#27272A] bg-[#111113] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#71717A]">
            ContentOS → LaunchOS
          </span>
          <h1 className="mt-2 text-xl font-bold tracking-tight text-[#F4F4F5] md:text-2xl">
            CreatorOS Handoff Pipeline
          </h1>
          <p className="mt-1 text-xs text-[#A1A1AA] md:text-sm">
            Turn one approved core asset into a launch-ready multi-platform package.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="rounded-lg border border-[#27272A] bg-[#111113] px-3 py-2">
            <span className="text-[#71717A]">ASSET_ID: </span>
            <span className="text-[#F4F4F5]">{assetId}</span>
          </div>
          <div className="rounded-lg border border-[#27272A] bg-[#111113] px-3 py-2">
            <span className="text-[#71717A]">STATUS: </span>
            <span className={isDecomposed ? 'font-bold text-[#D6B56D]' : 'font-bold text-[#71717A]'}>
              {isDecomposed ? 'LAUNCH READY' : 'AWAITING DECOMPOSITION'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
