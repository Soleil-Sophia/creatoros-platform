import { useMeta } from '../hooks/useMeta';

const values = [
  {
    title: 'System over hustle.',
    body: 'We don\'t believe in producing more. We believe in building better infrastructure. Less output, more compounding.',
    accent: '#FFBFDE',
  },
  {
    title: 'Clarity over output.',
    body: 'A thousand pieces of unclear content is worth less than ten pieces built on sharp positioning. We start with foundation.',
    accent: '#DABFFF',
  },
  {
    title: 'Premium over viral.',
    body: 'We\'re not building for the algorithm. We\'re building for creators who want to attract the right people — not everyone.',
    accent: '#FFBFDE',
  },
  {
    title: 'Built with, not just for.',
    body: 'We\'re building CreatorOS in public, module by module, with the people who use it. Early access isn\'t a waitlist — it\'s a seat at the table.',
    accent: '#DABFFF',
  },
];

export default function About() {
  useMeta('About CreatorOS', 'Learn what CreatorOS is, why it exists, and who it is built for.');
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-150px', right: '-100px',
          width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(218,191,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              About CreatorOS
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '24px', maxWidth: '760px',
          }}>
            Built by creators,<br />for creators who<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              think in systems.
            </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '60px 0 100px', background: '#0A0B10' }}>
        <div className="container">
          <div className="col-2">
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '24px',
              }}>
                Why we built this.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'The tools for creators are scattered, generic, and built for output — not for thinking.',
                  'AI made it easier to produce. But it didn\'t make it easier to position, to be clear, or to build a system that compounds.',
                  'We saw creators produce more and convert less. Post constantly and build nothing lasting. Hustle without infrastructure.',
                  'CreatorOS was built to solve the system problem — not the output problem.',
                  'We started with the Creator Clarity Kit — a focused toolkit for solo creators and brands who need to find clarity before they build anything else.',
                  'The rest of the ecosystem is being built with our early community. If you\'re a creator who thinks in systems, you\'re the right person to join.',
                ].map((para, i) => (
                  <p key={i} style={{ fontSize: '16px', color: i < 2 ? 'var(--text-2)' : 'var(--text-3)', lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {values.map(({ title, body, accent }) => (
                <div key={title} style={{
                  padding: '32px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                  border: `1px solid ${accent}15`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: `linear-gradient(90deg, transparent, ${accent}30, transparent)`,
                  }} />
                  <h4 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '17px', fontWeight: 700,
                    color: 'var(--text)', marginBottom: '10px',
                  }}>
                    {title}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
            Our mission
          </p>
          <blockquote style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.3,
            maxWidth: '760px', margin: '0 auto',
          }}>
            "Build the infrastructure that lets serious creators stop working harder and start working smarter — with a system that compounds."
          </blockquote>
        </div>
      </section>
    </div>
  );
}
