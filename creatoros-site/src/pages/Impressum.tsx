import { useMeta } from '../hooks/useMeta';
import { SUPPORT_EMAIL, SITE_URL } from '../config/site';

export default function Impressum() {
  useMeta(
    'Impressum — CreatorOS',
    'Pflichtangaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) für CreatorOS by LXST.'
  );

  return (
    <div>
      <section style={{ padding: '100px 0 120px' }}>
        <div className="container" style={{ maxWidth: '680px' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Legal
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '12px',
          }}>
            Impressum
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-3)', marginBottom: '48px' }}>
            Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
          </p>

          <div style={{
            padding: '36px 44px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            position: 'relative', overflow: 'hidden',
            marginBottom: '40px',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.2) 50%, transparent)',
            }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '2px',
                background: 'rgba(218,191,255,0.08)',
                border: '1px solid rgba(218,191,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path d="M5 2v4M5 7.5v.5" stroke="#DABFFF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>
                Diese Seite enthält Pflichtangaben. Bitte ergänze die vollständige Anschrift vor dem öffentlichen Launch — du kannst das in <code style={{ fontSize: '12px', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>creatoros-site/src/pages/Impressum.tsx</code> tun.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px' }}>
                Dienstanbieter
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 600 }}>LXST SYSTEMS</p>
                <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                  [Vollständige Anschrift eintragen]<br />
                  [Straße, Hausnummer]<br />
                  [PLZ Ort]<br />
                  Deutschland
                </p>
              </div>
            </div>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px' }}>
                Kontakt
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-3)' }}>
                  E-Mail:{' '}
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    style={{ color: 'var(--lilac)', transition: 'opacity 0.15s' }}
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-3)' }}>
                  Website:{' '}
                  <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--lilac)', transition: 'opacity 0.15s' }}
                  >
                    {SITE_URL}
                  </a>
                </p>
              </div>
            </div>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px' }}>
                Verantwortlich für den Inhalt
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                [Vor- und Nachname der verantwortlichen Person]<br />
                Anschrift wie oben
              </p>
            </div>

            <div style={{ paddingBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px' }}>
                Haftungshinweis
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.75 }}>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
            </div>

          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '8px', lineHeight: 1.7 }}>
            Stand: April 2025. Bitte vollständige Angaben vor öffentlichem Launch eintragen.
          </p>

        </div>
      </section>
    </div>
  );
}
