interface BottomActionBarProps {
  isDecomposed: boolean;
  onExportMarkdown: () => void;
  onExportJson: () => void;
  onTriggerToast: (message: string) => void;
}

export function BottomActionBar({ isDecomposed, onExportMarkdown, onExportJson, onTriggerToast }: BottomActionBarProps) {
  const buttonClass = isDecomposed
    ? 'cursor-pointer bg-[#111113] text-[#F4F4F5] hover:border-[#F4F4F5]'
    : 'cursor-not-allowed text-[#71717A] opacity-50';

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#27272A]/80 bg-[#09090B]/90 px-4 py-4 backdrop-blur-md md:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="hidden items-center gap-2 font-mono text-xs text-[#71717A] md:flex">
          <span>CREATOROS V1.0</span>
          <span>•</span>
          <span>LAUNCHOS ENGINE READY</span>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={onExportMarkdown}
            disabled={!isDecomposed}
            className={`rounded-xl border border-[#27272A] px-4 py-2.5 font-mono text-xs font-bold transition-colors ${buttonClass}`}
          >
            EXPORT MD
          </button>
          <button
            type="button"
            onClick={onExportJson}
            disabled={!isDecomposed}
            className={`rounded-xl border border-[#27272A] px-4 py-2.5 font-mono text-xs font-bold transition-colors ${buttonClass}`}
          >
            EXPORT JSON
          </button>
          <button
            type="button"
            onClick={() => onTriggerToast('ManagementOS handoff is queued for the next build step.')}
            disabled={!isDecomposed}
            className={isDecomposed ? 'rounded-xl bg-[#D6B56D] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#c9a65c]' : 'cursor-not-allowed rounded-xl bg-[#D6B56D] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black opacity-50'}
          >
            Send to ManagementOS
          </button>
        </div>
      </div>
    </footer>
  );
}
