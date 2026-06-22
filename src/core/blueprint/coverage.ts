import type { Blueprint } from './blueprint';

export interface BlueprintCoverage {
  stateCoverage: number;
  requiredPropCoverage: number;
}

export function calculateCoverage(blueprint: Blueprint): BlueprintCoverage {
  const declaredStates = blueprint.states;
  const coveredStates = declaredStates.filter(
    (s) => blueprint.fixtures[s] !== undefined,
  );
  const stateCoverage =
    declaredStates.length > 0 ? coveredStates.length / declaredStates.length : 1;

  const requiredFields = blueprint.fields
    .filter((f) => f.required)
    .map((f) => f.key);
  const defaultFixture = blueprint.fixtures.default ?? {};
  const coveredRequired = requiredFields.filter((key) => key in defaultFixture);
  const requiredPropCoverage =
    requiredFields.length > 0 ? coveredRequired.length / requiredFields.length : 1;

  return {
    stateCoverage: Math.round(stateCoverage * 100) / 100,
    requiredPropCoverage: Math.round(requiredPropCoverage * 100) / 100,
  };
}
