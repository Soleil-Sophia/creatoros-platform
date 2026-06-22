import type { CoreAsset, DistributionAsset, LaunchIntent } from '../types';

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function exportMarkdown(coreAsset: CoreAsset, intent: LaunchIntent, score: number, assets: DistributionAsset[]) {
  const lines = [
    '---',
    `asset_id: "${coreAsset.id}"`,
    `title: "${coreAsset.title}"`,
    `theme: "${coreAsset.theme}"`,
    `target_launch_date: "${intent.target_launch_date}"`,
    `launch_goal: "${intent.launch_goal}"`,
    `conversion_goal: "${intent.conversion_goal}"`,
    `primary_cta: "${intent.primary_cta}"`,
    `quality_gate_score: ${score}`,
    '---',
    '',
    `# ${coreAsset.title}`,
    '',
    '## Core Thesis',
    coreAsset.core_thesis,
    '',
    '## Strategic Intent',
    `- **Enemy:** ${coreAsset.strategic_notes.enemy}`,
    `- **Desire:** ${coreAsset.strategic_notes.desire}`,
    `- **Mechanism:** ${coreAsset.strategic_notes.mechanism}`,
    `- **Transformation:** ${coreAsset.strategic_notes.transformation}`,
    '',
    '---',
    '',
    '# LaunchOS Distribution Package',
  ];

  assets.forEach((asset) => {
    lines.push('', `## Channel: ${asset.channel}`, `Format: ${asset.format}`, `Goal: ${asset.goal}`, `CTA: ${asset.cta}`, '', asset.content_markdown, '', '---');
  });

  downloadFile(`creatoros_launch_package_${coreAsset.id}.md`, lines.join('\n'), 'text/markdown;charset=utf-8');
}

export function exportJson(coreAsset: CoreAsset, intent: LaunchIntent, score: number, assets: DistributionAsset[]) {
  const payload = {
    coreAsset,
    launchIntent: intent,
    qualityGate: {
      score,
      passed: score >= 3.5,
    },
    generatedAssets: assets,
  };

  downloadFile(
    `creatoros_launch_package_${coreAsset.id}.json`,
    JSON.stringify(payload, null, 2),
    'application/json;charset=utf-8',
  );
}
