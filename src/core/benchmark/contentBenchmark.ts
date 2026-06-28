import type { Blueprint } from '../blueprint';
import type { BrandProfile } from '../brand';
import type { ContentRequest } from '../content/contentRequest';
import type { QualityEvaluation } from '../quality/contentEvaluator';
import { evaluateAsset } from '../quality/contentEvaluator';
import { createContentGenerator, isAIAvailable } from '../ai/generatorFactory';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BenchmarkEntry {
  requestIndex:       number;
  topic:              string;
  intent:             string;
  format:             string;
  deterministicEval:  QualityEvaluation;
  openaiEval:         QualityEvaluation | null;
  scoreDelta:         number | null;   // openai − deterministic (null if AI unavailable)
  winner:             'deterministic' | 'openai' | 'tie' | 'pending';
}

export interface BenchmarkRun {
  runAt:        string;
  aiAvailable:  boolean;
  totalRequests: number;
  entries:      BenchmarkEntry[];
}

// ─── Runner ───────────────────────────────────────────────────────────────────

export async function runBenchmark(
  requests: ContentRequest[],
  blueprint: Blueprint,
  blueprintHash: string,
  brandProfile: BrandProfile,
): Promise<BenchmarkRun> {
  const aiAvailable = isAIAvailable();

  const deterministicGen = createContentGenerator({ useAI: false });
  const openaiGen        = aiAvailable ? createContentGenerator({ useAI: true }) : null;

  const entries: BenchmarkEntry[] = [];

  for (let i = 0; i < requests.length; i++) {
    const req = requests[i];

    // Always run deterministic (zero I/O)
    const detAsset = await deterministicGen.generate(req, blueprint, blueprintHash);
    const detEval  = evaluateAsset(detAsset, brandProfile);

    // Run OpenAI only if available
    let openaiEval: QualityEvaluation | null = null;
    if (openaiGen) {
      try {
        const aiAsset = await openaiGen.generate(req, blueprint, blueprintHash);
        openaiEval    = evaluateAsset(aiAsset, brandProfile);
      } catch {
        openaiEval = null;
      }
    }

    const scoreDelta = openaiEval !== null
      ? openaiEval.overallScore - detEval.overallScore
      : null;

    const winner: BenchmarkEntry['winner'] =
      openaiEval === null          ? 'pending'
      : scoreDelta! > 0            ? 'openai'
      : scoreDelta! < 0            ? 'deterministic'
      : 'tie';

    entries.push({
      requestIndex:      i,
      topic:             req.topic,
      intent:            req.intent,
      format:            req.format,
      deterministicEval: detEval,
      openaiEval,
      scoreDelta,
      winner,
    });
  }

  return {
    runAt:         new Date().toISOString(),
    aiAvailable,
    totalRequests: requests.length,
    entries,
  };
}
