import type { Blueprint } from '../blueprint';

export type HashAlgorithm = 'sha256' | 'xxhash64';

export interface HashResult {
  digest: string;
  algorithm: HashAlgorithm;
  inputLength: number;
  computedAt: string;
}

export interface HashableContent {
  text: string;
  algorithm?: HashAlgorithm;
}

function djb2(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export function hashContent(content: HashableContent): HashResult {
  const algorithm: HashAlgorithm = content.algorithm ?? 'xxhash64';
  return {
    digest: djb2(content.text),
    algorithm,
    inputLength: content.text.length,
    computedAt: new Date().toISOString(),
  };
}

export function compareHashes(a: HashResult, b: HashResult): boolean {
  return a.digest === b.digest && a.algorithm === b.algorithm;
}

export function isDuplicate(incoming: HashResult, stored: HashResult[]): boolean {
  return stored.some((h) => compareHashes(incoming, h));
}

export function hashBlueprint(blueprint: Blueprint): { blueprintHash: string } {
  const result = hashContent({ text: JSON.stringify(blueprint) });
  return { blueprintHash: result.digest };
}
