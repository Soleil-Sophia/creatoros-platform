export interface BrandProfile {
  brandName: string;
  voice: string;       // e.g. "Motivational & Direct"
  audience: string;    // e.g. "Solopreneurs and independent creators"
  positioning: string; // e.g. "Systematic content production for creators"
}

const registry = new Map<string, BrandProfile>();

export function createBrandProfile(input: BrandProfile): BrandProfile {
  registry.set(input.brandName, { ...input });
  return { ...input };
}

export function getBrandProfile(brandName: string): BrandProfile | null {
  return registry.get(brandName) ?? null;
}
