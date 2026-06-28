import { useRef, useMemo, useState } from 'react';
import { BottomActionBar } from './components/BottomActionBar';
import { CoreAssetPanel } from './components/CoreAssetPanel';
import { HandoffHeader } from './components/HandoffHeader';
import { LaunchPackagePanel } from './components/LaunchPackagePanel';
import { QualityGateRail } from './components/QualityGateRail';
import { MOCK_CORE_ASSET, MOCK_LAUNCH_INTENT, generateMockDistributionAssets } from './data/mockHandoffData';
import { exportJson, exportMarkdown } from './utils/exportHandoff';

export function HandoffPage() {
  const [coreAsset, setCoreAsset] = useState(MOCK_CORE_ASSET);
  const [launchIntent, setLaunchIntent] = useState(MOCK_LAUNCH_INTENT);
  const [isDecomposed, setIsDecomposed] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const wordCount = coreAsset.body_markdown.split(/\s+/).filter(Boolean).length;
  const thesisLongEnough = coreAsset.core_thesis.length >= 50;
  const wordCountPassed = wordCount >= 100;
  const hasSubpoints = (coreAsset.body_markdown.match(/\n/g) || []).length >= 4;
  const cleanVoice = !/in der heutigen schnelllebigen welt/i.test(coreAsset.body_markdown) && !/entfessle dein/i.test(coreAsset.body_markdown);
  const ctaDefined = launchIntent.primary_cta.trim().length > 2;

  const qualityGateScore = Number(
    (
      1.0 +
      [thesisLongEnough, wordCountPassed, hasSubpoints, cleanVoice, ctaDefined].filter(Boolean).length * 0.8
    ).toFixed(1),
  );

  const passed = qualityGateScore >= 3.5;
  const effectiveDecomposed = isDecomposed && passed;
  const distributionAssets = useMemo(
    () => (isDecomposed ? generateMockDistributionAssets(coreAsset, launchIntent) : []),
    [isDecomposed, coreAsset, launchIntent],
  );

  function showToast(message: string) {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2600);
  }

  function handleDecompose() {
    if (!passed) {
      showToast('Quality Gate blocked. Refine the Core Asset first.');
      return;
    }
    setIsDecomposed(true);
    showToast('Launch Package decomposed successfully.');
  }

  async function handleCopy(text: string, index: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current);
      }
      copiedTimerRef.current = window.setTimeout(() => {
        setCopiedIndex(null);
        copiedTimerRef.current = null;
      }, 2000);
      showToast('Copied to clipboard.');
    } catch {
      showToast('Failed to copy to clipboard.');
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#050507] pb-28 font-sans text-[#F4F4F5] selection:bg-[#D6B56D] selection:text-black">
      {toastMessage && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-xl border border-[#3F3F46] bg-[#1F1F23] px-5 py-3 shadow-2xl">
          <span className="h-2 w-2 rounded-full bg-[#D6B56D]" />
          <span className="font-mono text-sm text-[#F4F4F5]">{toastMessage}</span>
        </div>
      )}

      <HandoffHeader assetId={coreAsset.id} isDecomposed={effectiveDecomposed} />

      <main className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-start gap-6 px-4 py-6 md:px-6 lg:grid-cols-12">
        <CoreAssetPanel asset={coreAsset} onChange={setCoreAsset} wordCount={wordCount} />
        <QualityGateRail
          score={qualityGateScore}
          passed={passed}
          checks={{ thesisLongEnough, wordCountPassed, hasSubpoints, cleanVoice, ctaDefined }}
          isDecomposed={isDecomposed}
          onDecompose={handleDecompose}
        />
        <LaunchPackagePanel
          intent={launchIntent}
          onIntentChange={setLaunchIntent}
          isDecomposed={effectiveDecomposed}
          assets={distributionAssets}
          expandedCard={expandedCard}
          onCardToggle={setExpandedCard}
          onCopy={handleCopy}
          copiedIndex={copiedIndex}
        />
      </main>

      <BottomActionBar
        isDecomposed={effectiveDecomposed}
        onExportMarkdown={() => exportMarkdown(coreAsset, launchIntent, qualityGateScore, distributionAssets)}
        onExportJson={() => exportJson(coreAsset, launchIntent, qualityGateScore, distributionAssets)}
        onTriggerToast={showToast}
      />
    </div>
  );
}
