import type { Blueprint, BlueprintState } from '../blueprint';
import type { AssetV1 } from './asset';

const registry = new Map<string, AssetV1>();

export function createAsset(
  blueprint: Blueprint,
  blueprintHash: string,
  state: BlueprintState = 'default',
): AssetV1 {
  const fixture = blueprint.fixtures[state] ?? {};
  const title = typeof fixture.title === 'string' ? fixture.title : blueprint.slug;

  const asset: AssetV1 = {
    id: `asset_${blueprint.id}_${state}_${blueprintHash}`,
    title,
    state,
    blueprintId: blueprint.id,
    blueprintHash,
    createdAt: new Date().toISOString(),
  };

  registry.set(asset.id, asset);
  return asset;
}

export function getAssetById(id: string): AssetV1 | null {
  return registry.get(id) ?? null;
}
