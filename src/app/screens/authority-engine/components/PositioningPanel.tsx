import type { ContentGoal, Platform, PositioningInput } from '../../../types/authority';
import { PanelShell, SectionLabel } from '../../../components/shared';

type Props = {
  value: PositioningInput;
  onChange: (next: PositioningInput) => void;
};

const ALL_PLATFORMS: Platform[] = ['LinkedIn', 'X', 'Threads', 'TikTok', 'Reels', 'YouTube'];
const ALL_GOALS: { value: ContentGoal; label: string }[] = [
  { value: 'awareness', label: 'Awareness' },
  { value: 'authority', label: 'Authority' },
  { value: 'trust', label: 'Trust' },
  { value: 'education', label: 'Education' },
  { value: 'conversion', label: 'Conversion' },
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

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs px-3 py-1.5 rounded-full transition-all"
      style={{
        background: active ? 'rgba(218, 191, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)',
        border: active
          ? '1px solid rgba(218, 191, 255, 0.45)'
          : '1px solid rgba(255, 255, 255, 0.1)',
        color: active ? '#DABFFF' : '#B4B8C7',
      }}
    >
      {children}
    </button>
  );
}

export function PositioningPanel({ value, onChange }: Props) {
  const togglePlatform = (p: Platform) => {
    const exists = value.platforms.includes(p);
    onChange({
      ...value,
      platforms: exists ? value.platforms.filter((x) => x !== p) : [...value.platforms, p],
    });
  };
  const toggleGoal = (g: ContentGoal) => {
    const exists = value.contentGoals.includes(g);
    onChange({
      ...value,
      contentGoals: exists ? value.contentGoals.filter((x) => x !== g) : [...value.contentGoals, g],
    });
  };

  return (
    <PanelShell>
      <div className="mb-4">
        <SectionLabel>Step 2 — Positioning</SectionLabel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            Audience
          </label>
          <textarea
            value={value.audience}
            onChange={(e) => onChange({ ...value, audience: e.target.value })}
            rows={2}
            placeholder="Who is this for, specifically?"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            Positioning
          </label>
          <textarea
            value={value.positioning}
            onChange={(e) => onChange({ ...value, positioning: e.target.value })}
            rows={2}
            placeholder="What do you stand for that no one else does?"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            Offer
          </label>
          <input
            type="text"
            value={value.offer}
            onChange={(e) => onChange({ ...value, offer: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            CTA goal
          </label>
          <input
            type="text"
            value={value.ctaGoal}
            onChange={(e) => onChange({ ...value, ctaGoal: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            Calendar week
          </label>
          <input
            type="text"
            value={value.calendarWeek}
            onChange={(e) => onChange({ ...value, calendarWeek: e.target.value })}
            placeholder="e.g. Week 22"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1.5">
            Series name
          </label>
          <input
            type="text"
            value={value.seriesName}
            onChange={(e) => onChange({ ...value, seriesName: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-2">
          Target platforms
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_PLATFORMS.map((p) => (
            <Chip key={p} active={value.platforms.includes(p)} onClick={() => togglePlatform(p)}>
              {p}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-2">
          Content goals
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_GOALS.map((g) => (
            <Chip
              key={g.value}
              active={value.contentGoals.includes(g.value)}
              onClick={() => toggleGoal(g.value)}
            >
              {g.label}
            </Chip>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
