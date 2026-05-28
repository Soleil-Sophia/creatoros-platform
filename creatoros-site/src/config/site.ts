// ─────────────────────────────────────────────────────────────────────────────
// Site configuration — update these before going live
// ─────────────────────────────────────────────────────────────────────────────

// Current production domain (Replit). `creatoros.co` is a FUTURE custom-domain
// placeholder — do not switch SITE_URL to it until the custom domain is live.
export const SITE_URL = 'https://creatorospage.replit.app';
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
// Status as of the current production domain (https://creatorospage.replit.app):
//
// [x] SITE_URL set to current production domain (Replit)
// [x] og:url + canonical in index.html match the production domain
// [ ] Verify canonical tags resolve correctly after deployment (manual)
// [ ] Replace CREATOR_CLARITY_KIT_CHECKOUT_URL in checkout.ts with the LIVE
//     Gumroad link — currently a clearly-marked PLACEHOLDER (no live link yet)
// [ ] Add final Privacy and Terms legal copy — currently DRAFT placeholders,
//     not legally final (real company/legal info still required)
// [ ] Fill real Impressum details (legal entity + full postal address)
// [ ] Connect real analytics — currently a no-op stub (see src/lib/analytics.ts);
//     no provider wired yet, do not add one without confirmation
// [ ] Test the full checkout flow end-to-end once the live Gumroad link exists
// [ ] Verify OG image URLs load on the real domain (check with opengraph.xyz)
// [ ] Test all nav and footer links on the production URL
// [ ] Run a final mobile layout check on real iOS and Android
// [ ] When the custom domain (creatoros.co) goes live, update SITE_URL + index.html
// ─────────────────────────────────────────────────────────────────────────────
