import { useMemo, useState } from 'react';
import { createBrandToneRecommendation, saveRecommendation } from '../../../core/decision-engine';

type AudienceFeeling = 'informed' | 'reassured' | 'motivated' | 'challenged' | 'inspired' | 'understood';
type CommunicationStyle = 'direct' | 'warm' | 'calm' | 'bold' | 'analytical' | 'playful';
type BrandEnergy = 'low' | 'balanced' | 'high';

type ToneProposal = {
  primaryTraits: string[];
  secondaryTraits: string[];
  avoid: string[];
  summary: string;
};

const feelingOptions: { value: AudienceFeeling; label: string }[] = [
  { value: 'informed', label: 'Informed' },
  { value: 'reassured', label: 'Reassured' },
  { value: 'motivated', label: 'Motivated' },
  { value: 'challenged', label: 'Positively challenged' },
  { value: 'inspired', label: 'Inspired' },
  { value: 'understood', label: 'Understood' },
];

const styleOptions: { value: CommunicationStyle; label: string }[] = [
  { value: 'direct', label: 'Direct' },
  { value: 'warm', label: 'Warm' },
  { value: 'calm', label: 'Calm' },
  { value: 'bold', label: 'Bold' },
  { value: 'analytical', label: 'Analytical' },
  { value: 'playful', label: 'Playful' },
];

function buildToneProposal(feeling: AudienceFeeling, styles: CommunicationStyle[], energy: BrandEnergy): ToneProposal {
  const feelingTraitMap: Record<AudienceFeeling, string> = {
    informed: 'clear',
    reassured: 'trustworthy',
    motivated: 'encouraging',
    challenged: 'thought-provoking',
    inspired: 'visionary',
    understood: 'empathetic',
  };

  const primaryTraits = Array.from(new Set([feelingTraitMap[feeling], ...styles])).slice(0, 3);
  const secondaryTraits = energy === 'high'
    ? ['energetic', 'decisive']
    : energy === 'low'
      ? ['measured', 'grounded']
      : ['confident', 'human'];

  const avoid = [
    styles.includes('analytical') ? 'unsupported claims' : 'unnecessary jargon',
    styles.includes('bold') ? 'empty provocation' : 'exaggerated promises',
    energy === 'high' ? 'constant urgency' : 'flat or passive language',
  ];

  return {
    primaryTraits,
    secondaryTraits,
    avoid,
    summary: `Use a ${primaryTraits.join(', ')} voice with ${secondaryTraits.join(' and ')} energy. The audience should feel ${feeling}. Avoid ${avoid.join(', ')}.`,
  };
}

const optionButton = (selected: boolean) => ({
  borderRadius: 10,
  border: selected ? '1px solid rgba(255,191,222,0.4)' : '1px solid rgba(255,255,255,0.08)',
  background: selected ? 'rgba(255,191,222,0.1)' : 'rgba(255,255,255,0.025)',
  color: selected ? '#FFD7EA' : '#C7CAD5',
  padding: '9px 10px',
  fontSize: 12,
  cursor: 'pointer',
} as const);

export function BrandToneGuide({ onBack }: { onBack: () => void }) {
  const [feeling, setFeeling] = useState<AudienceFeeling>('informed');
  const [styles, setStyles] = useState<CommunicationStyle[]>(['direct', 'warm']);
  const [energy, setEnergy] = useState<BrandEnergy>('balanced');
  const [showProposal, setShowProposal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const proposal = useMemo(() => buildToneProposal(feeling, styles, energy), [feeling, styles, energy]);

  const toggleStyle = (style: CommunicationStyle) => {
    setStyles((current) => {
      if (current.includes(style)) return current.filter((item) => item !== style);
      if (current.length >= 3) return [...current.slice(1), style];
      return [...current, style];
    });
  };

  const submitForReview = () => {
    const createdAt = new Date().toISOString();
    saveRecommendation(createBrandToneRecommendation(proposal, createdAt));
    setSubmitted(true);
  };

  return (
    <div>
      <button type="button" onClick={onBack} style={{ border: 0, background: 'transparent', color: '#DABFFF', padding: 0, fontSize: 12, cursor: 'pointer' }}>
        ← Back to questions
      </button>

      <h3 style={{ margin: '16px 0 6px', fontSize: 17 }}>Find your brand tone</h3>
      <p style={{ color: '#A9ADBC', fontSize: 13, lineHeight: 1.6, margin: '0 0 18px' }}>
        Answer three simple questions. Guide creates a proposal, but BrandOS changes only after explicit approval.
      </p>

      <div style={{ display: 'grid', gap: 18 }}>
        <section>
          <div style={{ color: '#F0F0F4', fontSize: 13, fontWeight: 700, marginBottom: 9 }}>1. How should people feel?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {feelingOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => { setFeeling(option.value); setSubmitted(false); }} style={optionButton(feeling === option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div style={{ color: '#F0F0F4', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>2. How should the brand communicate?</div>
          <div style={{ color: '#777B8D', fontSize: 11, marginBottom: 9 }}>Choose up to three.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {styleOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => { toggleStyle(option.value); setSubmitted(false); }} style={optionButton(styles.includes(option.value))}>
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div style={{ color: '#F0F0F4', fontSize: 13, fontWeight: 700, marginBottom: 9 }}>3. What energy level fits?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 7 }}>
            {([['low', 'Measured'], ['balanced', 'Balanced'], ['high', 'Energetic']] as const).map(([value, label]) => (
              <button key={value} type="button" onClick={() => { setEnergy(value); setSubmitted(false); }} style={optionButton(energy === value)}>{label}</button>
            ))}
          </div>
        </section>

        <button type="button" disabled={styles.length === 0} onClick={() => setShowProposal(true)} style={{ borderRadius: 12, border: '1px solid rgba(218,191,255,0.28)', background: styles.length === 0 ? 'rgba(255,255,255,0.04)' : 'linear-gradient(135deg, rgba(255,191,222,0.16), rgba(218,191,255,0.14))', color: styles.length === 0 ? '#696D7D' : '#FFFFFF', padding: '11px 13px', fontSize: 13, fontWeight: 750, cursor: styles.length === 0 ? 'not-allowed' : 'pointer' }}>
          Create tone proposal
        </button>

        {showProposal && (
          <section style={{ borderRadius: 14, border: '1px solid rgba(255,191,222,0.14)', background: 'rgba(255,191,222,0.04)', padding: 14 }}>
            <div style={{ color: '#FFBFDE', fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Recommended proposal</div>
            <div style={{ display: 'grid', gap: 10, marginTop: 11, color: '#D7D9E2', fontSize: 13, lineHeight: 1.55 }}>
              <div><strong style={{ color: '#FFFFFF' }}>Primary:</strong> {proposal.primaryTraits.join(', ')}</div>
              <div><strong style={{ color: '#FFFFFF' }}>Secondary:</strong> {proposal.secondaryTraits.join(', ')}</div>
              <div><strong style={{ color: '#FFFFFF' }}>Avoid:</strong> {proposal.avoid.join(', ')}</div>
              <div style={{ color: '#A9ADBC' }}>{proposal.summary}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 13 }}>
              <button type="button" disabled={submitted} onClick={submitForReview} style={{ ...optionButton(true), flex: 1, opacity: submitted ? 0.65 : 1 }}>
                {submitted ? 'Submitted to Review Queue' : 'Submit for review'}
              </button>
              <button type="button" onClick={() => { setShowProposal(false); setSubmitted(false); }} style={{ ...optionButton(false), flex: 1 }}>
                Adjust answers
              </button>
            </div>
            {submitted && (
              <a href="/platform/decisions/review" style={{ display: 'block', marginTop: 11, color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>
                Open Review Queue →
              </a>
            )}
            <div style={{ color: '#737789', fontSize: 10.5, lineHeight: 1.45, marginTop: 10 }}>
              Submission creates a recommendation only. Approval still does not silently overwrite canonical BrandOS data.
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
