export type BlueprintId = string;

export type BlueprintStatus = 'draft' | 'active' | 'deprecated';

export interface BlueprintField {
  key: string;
  label: string;
  type: 'text' | 'multiline' | 'select' | 'date' | 'number';
  required: boolean;
}

export interface Blueprint {
  id: BlueprintId;
  slug: string;
  version: number;
  status: BlueprintStatus;
  fields: BlueprintField[];
  createdAt: string;
  updatedAt: string;
}

export type CreateBlueprintInput = Omit<Blueprint, 'id' | 'createdAt' | 'updatedAt'>;

const registry = new Map<BlueprintId, Blueprint>();

export function createBlueprint(input: CreateBlueprintInput): Blueprint {
  const now = new Date().toISOString();
  const blueprint: Blueprint = {
    ...input,
    id: `bp_${input.slug}_v${input.version}`,
    createdAt: now,
    updatedAt: now,
  };
  registry.set(blueprint.id, blueprint);
  return blueprint;
}

export function getBlueprintById(id: BlueprintId): Blueprint | null {
  return registry.get(id) ?? null;
}
