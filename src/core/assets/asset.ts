import type { BlueprintState } from '../blueprint';

export interface AssetV1 {
  id: string;
  title: string;
  state: BlueprintState;
  blueprintId: string;
  blueprintHash: string;
  createdAt: string;
}
