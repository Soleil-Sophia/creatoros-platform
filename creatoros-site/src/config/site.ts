// ─────────────────────────────────────────────────────────────────────────────
// Site configuration — update these before going live
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://creatoros.co';
export const SUPPORT_EMAIL = 'hello@creatoros.co';
export const BRAND_NAME = 'CreatorOS';

// Paths to each module's app entry. Used by the owner-signed-in view on /modules.
// `null` = no app yet (module is planned/in development) — owner sees a disabled state.
export const MODULE_APP_PATHS: Record<string, string | null> = {
  BrandOS: '/modules/brandos',
  ContentOS: '/modules/contentos',
  LaunchOS: null,
  ManagementOS: null,
  AnalyticsOS: null,
};

/**
 * Resolves the URL of the actual platform app where modules live.
 *  - In production, set `VITE_PLATFORM_URL` to the deployed platform URL (e.g. https://app.creatoros.co).
 *  - In dev, falls back to '/platform' which is proxied by Vite to the root project on port 3000.
 */
export function getPlatformUrl(): string {
  const override = (import.meta as unknown as { env: Record<string, string | undefined> }).env
    .VITE_PLATFORM_URL;
  if (override) return override.replace(/\/$/, '');
  return '/platform';
}

// ─────────────────────────────────────────────────────────────────────────────
// LAUNCH CHECKLIST
// ─────────────────────────────────────────────────────────────────────────────
// Before making the site public, complete the following:
//
// [ ] Replace CREATOR_CLARITY_KIT_CHECKOUT_URL in checkout.ts with live Gumroad link
// [ ] Update SITE_URL above to the real production domain
// [ ] Update og:url in index.html to match the real domain
// [ ] Confirm canonical tags resolve correctly after deployment
// [ ] Add final Privacy and Terms legal copy (replace placeholder stubs)
// [ ] Connect real analytics — see src/lib/analytics.ts for the integration hook
// [ ] Test the full checkout flow end-to-end on the live Gumroad link
// [ ] Verify OG image URLs load on the real domain (check with opengraph.xyz)
// [ ] Test all nav and footer links on the production URL
// [ ] Run a final mobile layout check on real iOS and Android
// ─────────────────────────────────────────────────────────────────────────────
