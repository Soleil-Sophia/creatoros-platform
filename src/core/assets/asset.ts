import type { BlueprintState } from '../blueprint';
import type { ArtifactHash } from './identity';

export interface AssetV1 {
  id: string;              // semantic: asset_{slug}_{state}_v{version}  — stable
  title: string;
  state: BlueprintState;
  blueprintId: string;
  blueprintHash: string;   // tracks which blueprint spec was used        — changes with spec
  artifactHash?: ArtifactHash; // fingerprint of generated content       — set by compiler (future)
  runId: string;           // unique per pipeline execution               — changes every run
  createdAt: string;
}
