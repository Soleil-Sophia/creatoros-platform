// ─────────────────────────────────────────────────────────────────────────────
// Site configuration — update these before going live
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://creatoros.co';
export const SUPPORT_EMAIL = 'hello@creatoros.co';
export const BRAND_NAME = 'CreatorOS';

// Base URL for the actual platform app where modules live.
// Use '' for same-origin links, or set to the deployed platform URL.
export const PLATFORM_URL = '';

// Paths to each module's app entry. Used by the owner-signed-in view on /modules.
export const MODULE_APP_PATHS: Record<string, string> = {
  BrandOS: '/modules/brandos/app',
  ContentOS: '/modules/contentos/app',
  LaunchOS: '/modules/launchos/app',
  ManagementOS: '/modules/managementos/app',
  AnalyticsOS: '/modules/analyticsos/app',
};

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
