import type { AuthorityRun } from '../../../types/authority';
import { PanelShell, SectionLabel } from '../../../components/shared';

type Props = {
  runs: AuthorityRun[];
  currentRunId: string | null;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
};

export function RunHistoryPanel({ runs, currentRunId, onOpen, onDelete }: Props) {
  return (
    <PanelShell>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>Run History</SectionLabel>
        <span className="text-[11px]" style={{ color: '#8B8F9E' }}>
          {runs.length} saved
        </span>
      </div>

      {runs.length === 0 ? (
        <div className="text-sm" style={{ color: '#8B8F9E' }}>
          No saved runs yet. Generate a run and click Save Run to keep it here.
        </div>
      ) : (
        <ul className="space-y-2">
          {runs.map((run) => {
            const isCurrent = run.id === currentRunId;
            return (
              <li
                key={run.id}
                className="rounded-lg p-3"
                style={{
                  background: isCurrent ? 'rgba(218, 191, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: isCurrent
                    ? '1px solid rgba(218, 191, 255, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div
                  className="text-sm font-medium mb-1 truncate"
                  style={{ color: '#F4F3F8' }}
                  title={run.source.title}
                >
                  {run.source.title || 'Untitled run'}
                </div>
                <div className="text-[11px] mb-2" style={{ color: '#8B8F9E' }}>
                  {run.assets.length} assets · {new Date(run.updatedAt).toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onOpen(run.id)}
                    className="text-[11px] px-2.5 py-1 rounded-md transition-colors"
                    style={{
                      background: 'rgba(218, 191, 255, 0.12)',
                      border: '1px solid rgba(218, 191, 255, 0.25)',
                      color: '#DABFFF',
                    }}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this run? This cannot be undone.')) onDelete(run.id);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-md transition-colors"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#B4B8C7',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </PanelShell>
  );
}
