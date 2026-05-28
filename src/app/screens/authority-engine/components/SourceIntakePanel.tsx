import type { SourcePack, SourceType } from '../../../types/authority';
import { PanelShell, SectionLabel } from '../../../components/shared';

type Props = {
  source: SourcePack;
  onChange: (source: SourcePack) => void;
  onLoadExample: () => void;
  onAnalyze: () => void;
  canAnalyze: boolean;
  analyzing: boolean;
};

const SOURCE_TYPES: { value: SourceType; label: string }[] = [
  { value: 'tech_doc', label: 'Tech Doc' },
  { value: 'changelog', label: 'Changelog' },
  { value: 'engineering_blog', label: 'Engineering Blog' },
  { value: 'rfc', label: 'RFC' },
  { value: 'incident_report', label: 'Incident Report' },
  { value: 'research_paper', label: 'Research Paper' },
  { value: 'other', label: 'Other' },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0E0F14',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 8,
  padding: '10px 12px',
  color: '#F4F3F8',
  fontSize: 13,
  fontFamily: 'Inter, sans-serif',
};

export function SourceIntakePanel({
  source,
  onChange,
  onLoadExample,
  onAnalyze,
  canAnalyze,
  analyzing,
}: Props) {
  return (
    <PanelShell>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Step 1 — Source Intake</SectionLabel>
        <button
          type="button"
          onClick={onLoadExample}
          className="text-xs px-3 py-1.5 rounded-md transition-colors"
          style={{
            background: 'rgba(218, 191, 255, 0.12)',
            border: '1px solid rgba(218, 191, 255, 0.25)',
            color: '#DABFFF',
          }}
        >
          Load example source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="md:col-span-2">
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={source.title}
            onChange={(e) => onChange({ ...source, title: e.target.value })}
            placeholder="e.g. GitHub Copilot — Test Coverage Best Practices"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            Source type
          </label>
          <select
            value={source.sourceType}
            onChange={(e) => onChange({ ...source, sourceType: e.target.value as SourceType })}
            style={inputStyle}
          >
            {SOURCE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
          Source URL <span className="text-white/30 normal-case">(optional)</span>
        </label>
        <input
          type="url"
          value={source.url ?? ''}
          onChange={(e) => onChange({ ...source, url: e.target.value })}
          placeholder="https://..."
          style={inputStyle}
        />
      </div>

      <div className="mb-4">
        <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
          Paste source content
        </label>
        <textarea
          value={source.body}
          onChange={(e) => onChange({ ...source, body: e.target.value })}
          rows={10}
          placeholder="Paste the full technical source — engineering blog post, RFC, changelog, postmortem, etc."
          style={{ ...inputStyle, resize: 'vertical', minHeight: 180, lineHeight: 1.5 }}
        />
        <div className="text-[11px] text-white/40 mt-1.5">
          {source.body.trim().split(/\s+/).filter(Boolean).length} words
        </div>
      </div>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={!canAnalyze || analyzing}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 191, 222, 0.95), rgba(218, 191, 255, 0.95))',
          color: '#0E0F14',
        }}
      >
        {analyzing ? 'Analyzing…' : 'Analyze Source →'}
      </button>
    </PanelShell>
  );
}
