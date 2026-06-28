import type { InstagramIntent, InstagramFormat } from '../instagram';
import { getAllAssets } from './assetRegistry';
import type { RegistryEntry } from './assetRegistry';

export interface SearchQuery {
  intent?: InstagramIntent;
  format?: InstagramFormat;
  titleContains?: string;
}

export interface SearchResult {
  query: SearchQuery;
  entries: RegistryEntry[];
  total: number;
}

export function searchAssets(query: SearchQuery): SearchResult {
  let results = getAllAssets().filter((e) => !e.isDuplicate);

  if (query.intent) {
    results = results.filter((e) => e.asset.intent === query.intent);
  }
  if (query.format) {
    results = results.filter((e) => e.asset.format === query.format);
  }
  if (query.titleContains) {
    const needle = query.titleContains.toLowerCase();
    results = results.filter((e) =>
      e.asset.title.toLowerCase().includes(needle),
    );
  }

  return { query, entries: results, total: results.length };
}

export function searchByIntent(intent: InstagramIntent): RegistryEntry[] {
  return searchAssets({ intent }).entries;
}

export function searchByFormat(format: InstagramFormat): RegistryEntry[] {
  return searchAssets({ format }).entries;
}
