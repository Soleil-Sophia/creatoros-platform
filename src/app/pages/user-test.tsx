import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function UserTest() {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const testMessage = `Hey — ich teste gerade eine Landingpage und brauche 60 Sekunden ehrliches Feedback.
Bitte erst anschauen, dann kurz antworten:

1. Was verkauft die Seite?
2. Für wen ist das?
3. Warum nicht einfach ChatGPT?
4. Würdest du auf „Start Creating" klicken? Warum?
5. Was war unklar oder wirkte generisch?

Link: https://deine-domain.com/test`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(testMessage);
      setCopied(true);
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (non-secure context or permission denied)
    }
  };

  return (
    <div style={{ background: '#0E0F14', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        
        {/* Block 1 — Header */}
        <header className="pt-16 lg:pt-24 pb-12 lg:pb-16">
          {/* Small label */}
          <div className="mb-4">
            <span 
              className="tracking-[0.15em] uppercase" 
              style={{ 
                fontSize: '11px', 
                fontWeight: 600,
                color: '#DABFFF',
                opacity: 0.8
              }}
            >
              USER TEST
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="mb-4"
            style={{ 
              fontSize: 'clamp(32px, 5vw, 48px)', 
              lineHeight: 1.1,
              fontWeight: 700,
              color: '#F4F3F8',
              letterSpacing: '-0.02em'
            }}
          >
            1-Minute User Test
          </h1>

          {/* Subline */}
          <p 
            style={{ 
              fontSize: '16px', 
              lineHeight: 1.6,
              color: '#B4B8C7',
              maxWidth: '540px'
            }}
          >
            Check whether the landing page explains itself clearly without extra context.
          </p>
        </header>

        {/* Block 2 — Main Message Box */}
        <section className="mb-12 lg:mb-16">
          {/* Title above box */}
          <h2 
            className="mb-4"
            style={{ 
              fontSize: '15px', 
              fontWeight: 600,
              color: '#F4F3F8',
              letterSpacing: '-0.01em'
            }}
          >
            Send this message
          </h2>

          {/* Message Box */}
          <div 
            className="relative rounded-[20px] p-8 lg:p-10"
            style={{ 
              background: '#1F2230',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)'
            }}
          >
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-[8px] transition-all duration-200"
              style={{
                background: copied ? 'rgba(205, 247, 230, 0.12)' : 'rgba(218, 191, 255, 0.12)',
                border: copied ? '1px solid rgba(205, 247, 230, 0.3)' : '1px solid rgba(218, 191, 255, 0.24)',
                color: copied ? '#CDF7E6' : '#DABFFF',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>

            {/* Message Text */}
            <pre 
              className="font-sans whitespace-pre-wrap"
              style={{ 
                fontSize: '15px', 
                lineHeight: 1.8,
                color: '#E8E7EE',
                paddingRight: '100px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              {testMessage}
            </pre>
          </div>
        </section>

        {/* Block 3 — Two Small Cards */}
        <section className="mb-12 lg:mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Card A — Best practice */}
            <div 
              className="rounded-[16px] p-6"
              style={{ 
                background: '#171923',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <h3 
                className="mb-4"
                style={{ 
                  fontSize: '14px', 
                  fontWeight: 600,
                  color: '#DABFFF',
                  letterSpacing: '0.02em'
                }}
              >
                Best practice
              </h3>
              <ul className="space-y-2.5">
                <li 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: 1.6,
                    color: '#B4B8C7'
                  }}
                >
                  • an 3–5 Leute schicken
                </li>
                <li 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: 1.6,
                    color: '#B4B8C7'
                  }}
                >
                  • erst Link, dann Fragen
                </li>
                <li 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: 1.6,
                    color: '#B4B8C7'
                  }}
                >
                  • Antworten am besten kurz als Text
                </li>
              </ul>
            </div>

            {/* Card B — Good answer */}
            <div 
              className="rounded-[16px] p-6"
              style={{ 
                background: '#171923',
                border: '1px solid rgba(205, 247, 230, 0.12)'
              }}
            >
              <h3 
                className="mb-4"
                style={{ 
                  fontSize: '14px', 
                  fontWeight: 600,
                  color: '#CDF7E6',
                  letterSpacing: '0.02em'
                }}
              >
                Good answer sounds like
              </h3>
              <p 
                style={{ 
                  fontSize: '14px', 
                  lineHeight: 1.7,
                  color: '#B4B8C7',
                  fontStyle: 'italic'
                }}
              >
                "Ein modulares System für Creator, das aus Ideen wiederverwendbare Content-Assets macht."
              </p>
            </div>

          </div>
        </section>

        {/* Block 4 — Footer Note */}
        <footer className="pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
          <p 
            style={{ 
              fontSize: '13px', 
              lineHeight: 1.6,
              color: '#B4B8C7',
              opacity: 0.8
            }}
          >
            <span style={{ fontWeight: 600, color: '#DABFFF' }}>Important:</span> Let them read first. No explanation before the link.
          </p>
        </footer>

      </div>
    </div>
  );
}