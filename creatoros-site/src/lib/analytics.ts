// ─────────────────────────────────────────────────────────────────────────────
// Analytics — lightweight event layer
// ─────────────────────────────────────────────────────────────────────────────
// This file is a no-op stub. Replace the function bodies with your chosen
// analytics provider when you are ready to enable tracking.
//
// Plausible (recommended — privacy-first, no cookies):
//   1. Add to index.html:
//      <script defer data-domain="creatoros.co" src="https://plausible.io/js/script.js"></script>
//   2. Replace trackEvent below with: window.plausible?.(name, { props });
//
// Fathom:
//   1. Add the Fathom script to index.html
//   2. Replace trackEvent below with: window.fathom?.trackEvent(name);
//
// GA4:
//   1. Add the gtag script to index.html
//   2. Replace trackEvent below with: window.gtag?.('event', name, props);
// ─────────────────────────────────────────────────────────────────────────────

export function trackEvent(
  name: string,
  props?: Record<string, string | number>,
): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, props ?? '');
  }
  // Replace with your provider:
  // window.plausible?.(name, { props });
}

export function trackPageView(path: string): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics:pageview]', path);
  }
  // Most providers auto-track page views via their script tag.
  // Only implement this if you need manual SPA page view tracking.
}

// Convenience events
export const events = {
  checkoutClick: () => trackEvent('Checkout Click', { product: 'Creator Clarity Kit' }),
  earlyAccessSubmit: () => trackEvent('Early Access Submit'),
  navCtaClick: () => trackEvent('Nav CTA Click'),
} as const;
