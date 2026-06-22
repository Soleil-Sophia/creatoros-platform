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

export function createBlueprint(_input: CreateBlueprintInput): Blueprint {
  throw new Error('createBlueprint: not yet implemented');
}

export function getBlueprintById(_id: BlueprintId): Blueprint | null {
  throw new Error('getBlueprintById: not yet implemented');
}
