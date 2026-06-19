import { useMemo, useState } from 'react';
import type { AuthorityRun } from '../../../types/authority';
import { exportRunToMarkdown } from '../../../lib/authority-engine/markdownExport';
import { PanelShell, SectionLabel } from '../../../components/shared';

type Props = {
  run: AuthorityRun;
  onSave: () => void;
  saved: boolean;
};

export function ExportPanel({ run, onSave, saved }: Props) {
  const [copied, setCopied] = useState(false);
  const markdown = useMemo(() => exportRunToMarkdown(run), [run]);

  const canExport = run.assets.length > 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeTitle = run.source.title.replace(/[^a-z0-9-]+/gi, '-').toLowerCase().slice(0, 60);
    a.href = url;
    a.download = `authority-run-${safeTitle || 'untitled'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PanelShell>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Step 7 — Export & Save</SectionLabel>
        <span className="text-[11px]" style={{ color: '#8B8F9E' }}>
          {markdown.split('\n').length} lines
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!canExport}
          className="text-xs px-3 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          style={{
            background: copied ? 'rgba(120, 230, 180, 0.15)' : 'rgba(218, 191, 255, 0.12)',
            border: copied
              ? '1px solid rgba(120, 230, 180, 0.35)'
              : '1px solid rgba(218, 191, 255, 0.25)',
            color: copied ? '#78E6B4' : '#DABFFF',
          }}
        >
          {copied ? 'Copied Markdown' : 'Copy Markdown'}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!canExport}
          className="text-xs px-3 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#F4F3F8',
          }}
        >
          Download .md
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={!canExport}
          className="text-xs px-3 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-opacity"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 191, 222, 0.95), rgba(218, 191, 255, 0.95))',
            color: '#0E0F14',
          }}
        >
          {saved ? 'Saved ✓ Update Run' : 'Save Run'}
        </button>
      </div>

      <div
        className="rounded-lg overflow-auto"
        style={{
          background: '#0A0B0F',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          maxHeight: 260,
        }}
      >
        <pre
          className="text-[11px] p-3 leading-relaxed whitespace-pre-wrap"
          style={{ color: '#B4B8C7', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
        >
          {canExport ? markdown : '# Export preview will appear after assets are generated.'}
        </pre>
      </div>
    </PanelShell>
  );
}
