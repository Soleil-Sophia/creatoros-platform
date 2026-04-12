import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('public/og', { recursive: true });

function buildDefaultSVG() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="15%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FFBFDE" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FFBFDE" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="90%" cy="80%" r="45%">
      <stop offset="0%" stop-color="#DABFFF" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#DABFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="topLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFBFDE" stop-opacity="0"/>
      <stop offset="30%" stop-color="#FFBFDE" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="#DABFFF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#DABFFF" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="wordmarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFBFDE"/>
      <stop offset="100%" stop-color="#DABFFF"/>
    </linearGradient>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFBFDE"/>
      <stop offset="100%" stop-color="#DABFFF"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0E0F14"/>

  <!-- Glow layers -->
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="1200" height="1" fill="url(#topLine)"/>

  <!-- Logo mark — top left -->
  <rect x="80" y="72" width="44" height="44" rx="10" fill="#1A1D2A" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <rect x="94" y="86" width="16" height="16" rx="4" fill="url(#logoGrad)"/>

  <!-- Brand name -->
  <text x="138" y="101" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="26" fill="rgba(255,255,255,0.9)" letter-spacing="-0.3">CreatorOS</text>
  <text x="139" y="117" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="13" fill="rgba(255,255,255,0.3)" letter-spacing="0.5">by LXST</text>

  <!-- Decorative dot grid — subtle -->
  <circle cx="1100" cy="120" r="2" fill="rgba(255,191,222,0.15)"/>
  <circle cx="1130" cy="120" r="2" fill="rgba(255,191,222,0.1)"/>
  <circle cx="1100" cy="150" r="2" fill="rgba(255,191,222,0.1)"/>
  <circle cx="1130" cy="150" r="2" fill="rgba(218,191,255,0.1)"/>
  <circle cx="1160" cy="120" r="2" fill="rgba(218,191,255,0.08)"/>
  <circle cx="1160" cy="150" r="2" fill="rgba(218,191,255,0.06)"/>

  <!-- Main headline -->
  <text x="80" y="310" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="72" fill="#FFFFFF" letter-spacing="-2">Turn idea chaos</text>
  <text x="80" y="400" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="72" fill="rgba(255,255,255,0.45)" letter-spacing="-2">into a clear offer.</text>

  <!-- Bottom section -->
  <rect x="80" y="530" width="1040" height="1" fill="rgba(255,255,255,0.08)"/>

  <!-- Bottom label -->
  <text x="80" y="568" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="18" fill="rgba(255,255,255,0.35)" letter-spacing="0.5">Clarity-first tools for creators and solo brands</text>

  <!-- Bottom right badge -->
  <rect x="980" y="545" width="140" height="36" rx="8" fill="rgba(255,191,222,0.08)" stroke="rgba(255,191,222,0.2)" stroke-width="1"/>
  <text x="1050" y="568" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="14" fill="#FFBFDE" text-anchor="middle">creatoros.co</text>
</svg>`;
}

function buildProductSVG() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="20%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FFBFDE" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FFBFDE" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="60%" r="40%">
      <stop offset="0%" stop-color="#DABFFF" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#DABFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="topLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFBFDE" stop-opacity="0"/>
      <stop offset="40%" stop-color="#FFBFDE" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#FFBFDE" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFBFDE"/>
      <stop offset="100%" stop-color="#DABFFF"/>
    </linearGradient>
    <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFBFDE"/>
      <stop offset="100%" stop-color="#E7C6F3"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0E0F14"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="0" y="0" width="1200" height="1" fill="url(#topLine)"/>

  <!-- Logo mark -->
  <rect x="80" y="72" width="44" height="44" rx="10" fill="#1A1D2A" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <rect x="94" y="86" width="16" height="16" rx="4" fill="url(#logoGrad)"/>
  <text x="138" y="101" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="26" fill="rgba(255,255,255,0.9)" letter-spacing="-0.3">CreatorOS</text>
  <text x="139" y="117" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="13" fill="rgba(255,255,255,0.3)" letter-spacing="0.5">by LXST</text>

  <!-- Eyebrow label -->
  <text x="80" y="218" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="14" fill="#FFBFDE" letter-spacing="2">CREATOR CLARITY KIT</text>

  <!-- Product name / headline -->
  <text x="80" y="310" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="68" fill="#FFFFFF" letter-spacing="-2">Start with clarity.</text>
  <text x="80" y="392" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="68" fill="rgba(255,255,255,0.4)" letter-spacing="-2">Build with direction.</text>

  <!-- Price block -->
  <text x="80" y="470" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="40" fill="#FFFFFF" letter-spacing="-1">&#x20AC;24</text>
  <text x="148" y="470" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="18" fill="rgba(255,255,255,0.4)">one-time · instant access</text>

  <!-- Kit items -->
  <circle cx="88" cy="518" r="3" fill="rgba(255,191,222,0.5)"/>
  <text x="102" y="524" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="rgba(255,255,255,0.45)">Notion Template</text>
  <circle cx="248" cy="518" r="3" fill="rgba(255,191,222,0.5)"/>
  <text x="262" y="524" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="rgba(255,255,255,0.45)">Workbook</text>
  <circle cx="371" cy="518" r="3" fill="rgba(255,191,222,0.5)"/>
  <text x="385" y="524" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="rgba(255,255,255,0.45)">Prompt Assist</text>
  <circle cx="510" cy="518" r="3" fill="rgba(255,191,222,0.5)"/>
  <text x="524" y="524" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="rgba(255,255,255,0.45)">Start Here Guide</text>

  <!-- Bottom line -->
  <rect x="80" y="558" width="1040" height="1" fill="rgba(255,255,255,0.07)"/>
  <text x="80" y="594" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="16" fill="rgba(255,255,255,0.25)">creatoros.co/product</text>

  <!-- CTA badge -->
  <rect x="970" y="540" width="160" height="44" rx="10" fill="url(#btnGrad)"/>
  <text x="1050" y="568" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="#0E0F14" text-anchor="middle">Get the Kit</text>
</svg>`;
}

async function generate() {
  const defaultSVG = Buffer.from(buildDefaultSVG());
  await sharp(defaultSVG, { density: 150 })
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile('public/og/og-default.png');
  console.log('Generated: public/og/og-default.png');

  const productSVG = Buffer.from(buildProductSVG());
  await sharp(productSVG, { density: 150 })
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile('public/og/og-product-creator-clarity-kit.png');
  console.log('Generated: public/og/og-product-creator-clarity-kit.png');
}

generate().catch(err => {
  console.error('Error generating OG images:', err.message);
  process.exit(1);
});
