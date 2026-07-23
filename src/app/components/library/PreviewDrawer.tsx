import type { CreatorRecommendationSnapshot } from '../../lib/content-library/recommendationSnapshot';
import { DrawerHeader } from './DrawerHeader';
import { DrawerMetadata } from './DrawerMetadata';
import { DrawerActions } from './DrawerActions';

type Asset = {
  id: number | string;
  type: string;
  title: string;
  preview: string;
  platform: string;
  campaign: string;
  brandVoice: string;
  date: string;
  variants: number;
  status: string;
  creatorRecommendationSnapshot?: CreatorRecommendationSnapshot;
};

type PreviewDrawerProps = {
  asset: Asset;
  onClose: () => void;
  onCopy: (text: string) => void;
  onReuse: () => void;
  onDelete?: () => void;
};

export function PreviewDrawer({ asset, onClose, onCopy, onReuse, onDelete }: PreviewDrawerProps) {
  const recommendation = asset.creatorRecommendationSnapshot?.recommendation;
  const policyPassed = recommendation?.brandPolicyCheck.status === 'passed';

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      <div
        className="fixed z-50 overflow-y-auto right-0 top-0 bottom-0 w-[480px] max-w-full lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:top-8 lg:bottom-8 lg:w-[min(860px,calc(100vw-96px))] lg:rounded-[16px] lg:border lg:border-white/10"
        style={{
          background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
        }}
      >
        <DrawerHeader asset={asset} onClose={onClose} />

        <div className="p-6">
          <div className="mb-6">
            <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Content
            </div>
            <div
              className="p-4 rounded-[12px]"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '15px',
                color: '#F4F3F8',
                lineHeight: 1.7,
              }}
            >
              {asset.preview}
            </div>
          </div>

          {recommendation && (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div style={{ fontSize: '12px', color: '#DABFFF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  CreatorOS Recommendation Context
                </div>
                <span
                  style={{
                    borderRadius: 999,
                    padding: '5px 9px',
                    border: `1px solid ${policyPassed ? 'rgba(122,255,185,0.25)' : 'rgba(255,190,120,0.28)'}`,
                    background: policyPassed ? 'rgba(122,255,185,0.07)' : 'rgba(255,190,120,0.07)',
                    color: policyPassed ? '#83F3B7' : '#FFC27A',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {policyPassed ? 'Policy Passed' : 'Needs Review'}
                </span>
              </div>

              <div className="p-4 rounded-[12px] space-y-3" style={{ background: 'rgba(218,191,255,0.035)', border: '1px solid rgba(218,191,255,0.12)' }}>
                <div>
                  <div style={{ color: '#777B8D', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recommended action</div>
                  <div style={{ color: '#F4F3F8', fontSize: 14, lineHeight: 1.55, marginTop: 5 }}>{recommendation.coreMessage}</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Goal</div><div style={{ color: '#B9BBC7', fontSize: 12, marginTop: 4 }}>{recommendation.businessGoal}</div></div>
                  <div><div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Format</div><div style={{ color: '#B9BBC7', fontSize: 12, marginTop: 4 }}>{recommendation.recommendedFormat}</div></div>
                  <div><div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Confidence</div><div style={{ color: '#B9BBC7', fontSize: 12, marginTop: 4 }}>{recommendation.confidence}</div></div>
                </div>
                <div>
                  <div style={{ color: '#777B8D', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Measurement</div>
                  <div style={{ color: '#B9BBC7', fontSize: 13, lineHeight: 1.55, marginTop: 5 }}>{recommendation.measurementPlan.primaryMetric} · {recommendation.measurementPlan.evaluationWindowDays} days</div>
                </div>
                <div style={{ color: '#777B8D', fontSize: 11 }}>
                  Snapshot captured {new Date(asset.creatorRecommendationSnapshot!.capturedAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {asset.variants > 1 && (
            <div className="mb-6">
              <div style={{ fontSize: '12px', color: '#8B8F9E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Variants ({asset.variants})
              </div>
              <div className="space-y-2">
                {Array.from({ length: Math.min(asset.variants, 3) }).map((_, idx) => (
                  <div key={idx} className="p-3 rounded-lg flex items-center justify-between" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '13px', color: '#B4B8C7' }}>
                    <span>Variant {idx + 1}</span>
                    <button style={{ color: '#FFBFDE', fontWeight: 600 }}>View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DrawerMetadata asset={asset} />
        </div>

        <DrawerActions onCopy={() => onCopy(asset.preview)} onReuse={onReuse} />

        {onDelete && (
          <div className="px-6 py-4 flex justify-end" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 rounded-[8px] transition-all hover:opacity-90"
              style={{ background: 'rgba(255, 99, 132, 0.08)', border: '1px solid rgba(255, 99, 132, 0.3)', color: '#FF8FA3', fontSize: '12px', fontWeight: 600 }}
            >
              Delete saved asset
            </button>
          </div>
        )}
      </div>
    </>
  );
}
