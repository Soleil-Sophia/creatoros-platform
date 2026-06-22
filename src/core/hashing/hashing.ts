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

export function hashContent(_content: HashableContent): HashResult {
  throw new Error('hashContent: not yet implemented');
}

export function compareHashes(a: HashResult, b: HashResult): boolean {
  throw new Error('compareHashes: not yet implemented');
}

export function isDuplicate(_incoming: HashResult, _stored: HashResult[]): boolean {
  throw new Error('isDuplicate: not yet implemented');
}
