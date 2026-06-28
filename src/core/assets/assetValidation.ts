import type { AssetV1 } from './asset';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const AV_001: ValidationRule<AssetV1> = {
  id: 'AV-001',
  description: 'Asset must have a non-empty id',
  validate: (asset): ValidationViolation | null => {
    if (!asset.id || asset.id.trim().length === 0) {
      return {
        field: 'id',
        message: 'AV-001: Asset id must be non-empty',
        severity: 'error',
      };
    }
    return null;
  },
};

export const AV_002: ValidationRule<AssetV1> = {
  id: 'AV-002',
  description: 'Asset must link to a non-empty blueprintHash',
  validate: (asset): ValidationViolation | null => {
    if (!asset.blueprintHash || asset.blueprintHash.trim().length === 0) {
      return {
        field: 'blueprintHash',
        message: 'AV-002: Asset must carry a blueprintHash linking it to its source blueprint',
        severity: 'error',
      };
    }
    return null;
  },
};

export const AV_003: ValidationRule<AssetV1> = {
  id: 'AV-003',
  description: 'Asset must reference a non-empty blueprintId',
  validate: (asset): ValidationViolation | null => {
    if (!asset.blueprintId || asset.blueprintId.trim().length === 0) {
      return {
        field: 'blueprintId',
        message: 'AV-003: Asset must reference a blueprintId',
        severity: 'error',
      };
    }
    return null;
  },
};

export const assetValidationSchema: ValidationSchema<AssetV1> = {
  rules: [AV_001, AV_002, AV_003],
};
