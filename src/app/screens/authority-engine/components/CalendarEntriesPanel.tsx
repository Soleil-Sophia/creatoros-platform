import type { CalendarEntry } from '../../../types/authority';
import { PanelShell, SectionLabel } from '../../../components/shared';

type Props = { entries: CalendarEntry[] };

export function CalendarEntriesPanel({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <PanelShell>
        <SectionLabel>Step 6 — Calendar</SectionLabel>
        <div className="mt-4 text-sm" style={{ color: '#8B8F9E' }}>
          Calendar entries appear after assets are generated.
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell>
      <div className="mb-4">
        <SectionLabel>Step 6 — Calendar</SectionLabel>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider" style={{ color: '#8B8F9E' }}>
              <th className="text-left py-2 pr-3 font-medium">Week</th>
              <th className="text-left py-2 pr-3 font-medium">Day</th>
              <th className="text-left py-2 pr-3 font-medium">Platform</th>
              <th className="text-left py-2 pr-3 font-medium">Goal</th>
              <th className="text-left py-2 font-medium">Title</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr
                key={e.assetId}
                style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', color: '#F4F3F8' }}
              >
                <td className="py-2.5 pr-3">{e.week}</td>
                <td className="py-2.5 pr-3">{e.day}</td>
                <td className="py-2.5 pr-3" style={{ color: '#DABFFF' }}>
                  {e.platform}
                </td>
                <td className="py-2.5 pr-3" style={{ color: '#FFBFDE' }}>
                  {e.goal}
                </td>
                <td className="py-2.5">{e.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  );
}
