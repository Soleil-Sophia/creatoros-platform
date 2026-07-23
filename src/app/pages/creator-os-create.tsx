import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { readBrandProfile } from '../lib/brand-profile/storage';
import {
  adaptBrandProfileToPlaybook,
  adaptLegacyInputsToRequestContext,
} from '../../core/creator-intelligence/brandPlaybookAdapter';
import { buildContentRecommendation } from '../../core/creator-intelligence/recommendationBuilder';
import type { ContentRecommendation } from '../../core/creator-intelligence/types';

const fieldStyle = {
  width: '100%',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.035)',
  color: '#F4F3F8',
  padding: '12px 14px',
  fontSize: 14,
} as const;

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
} as const;

function Field({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label style={{ display: 'grid', gap: 7 }}>
      <span style={{ color: '#A8ABBA', fontSize: 12, fontWeight: 600 }}>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} style={fieldStyle} />
    </label>
  );
}

function RecommendationView({
  recommendation,
  onContinue,
}: {
  recommendation: ContentRecommendation;
  onContinue: () => void;
}) {
  const passed = recommendation.brandPolicyCheck.status === 'passed';

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <section style={{ ...panelStyle, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Next Best Content Action
            </div>
            <h2 style={{ color: '#FFFFFF', fontSize: 26, lineHeight: 1.2, margin: '10px 0 8px' }}>{recommendation.hook}</h2>
            <p style={{ color: '#B9BBC7', fontSize: 15, lineHeight: 1.65, margin: 0 }}>{recommendation.coreMessage}</p>
          </div>
          <div style={{ borderRadius: 999, padding: '8px 12px', whiteSpace: 'nowrap', border: `1px solid ${passed ? 'rgba(122,255,185,0.28)' : 'rgba(255,190,120,0.3)'}`, background: passed ? 'rgba(122,255,185,0.08)' : 'rgba(255,190,120,0.08)', color: passed ? '#83F3B7' : '#FFC27A', fontSize: 12, fontWeight: 700 }}>
            {passed ? 'Policy Passed' : 'Needs Review'}
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        {[
          ['Format', recommendation.recommendedFormat],
          ['Goal', recommendation.businessGoal],
          ['Confidence', recommendation.confidence],
        ].map(([label, value]) => (
          <div key={label} style={{ ...panelStyle, padding: 16 }}>
            <div style={{ color: '#777B8D', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
            <div style={{ color: '#F4F3F8', marginTop: 7, fontSize: 14, fontWeight: 600 }}>{value}</div>
          </div>
        ))}
      </div>

      <section style={{ ...panelStyle, padding: 22 }}>
        <h3 style={{ color: '#F4F3F8', fontSize: 16, margin: '0 0 14px' }}>Production structure</h3>
        <ol style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 10, color: '#B9BBC7', lineHeight: 1.55 }}>
          {recommendation.contentStructure.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section style={{ ...panelStyle, padding: 22 }}>
        <h3 style={{ color: '#F4F3F8', fontSize: 16, margin: '0 0 14px' }}>Visual direction</h3>
        <div style={{ display: 'grid', gap: 9 }}>
          {recommendation.visualDirection.map((direction) => <div key={direction} style={{ color: '#B9BBC7', fontSize: 14 }}>• {direction}</div>)}
        </div>
      </section>

      <section style={{ ...panelStyle, padding: 22 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div><strong style={{ color: '#F4F3F8' }}>CTA:</strong> <span style={{ color: '#FFBFDE' }}>{recommendation.cta}</span></div>
          <div><strong style={{ color: '#F4F3F8' }}>Caption:</strong> <span style={{ color: '#B9BBC7' }}>{recommendation.captionGuidance}</span></div>
          <div><strong style={{ color: '#F4F3F8' }}>Expected impact:</strong> <span style={{ color: '#B9BBC7' }}>{recommendation.expectedImpact}</span></div>
        </div>
      </section>

      <section style={{ ...panelStyle, padding: 22 }}>
        <h3 style={{ color: '#F4F3F8', fontSize: 16, margin: '0 0 14px' }}>Why this recommendation</h3>
        <div style={{ display: 'grid', gap: 9 }}>
          {recommendation.reasoning.map((reason) => <div key={reason} style={{ color: '#B9BBC7', fontSize: 14 }}>• {reason}</div>)}
        </div>
      </section>

      <section style={{ ...panelStyle, padding: 22 }}>
        <h3 style={{ color: '#F4F3F8', fontSize: 16, margin: '0 0 14px' }}>Measurement plan</h3>
        <div style={{ color: '#B9BBC7', lineHeight: 1.7, fontSize: 14 }}>
          <div><strong style={{ color: '#F4F3F8' }}>Primary:</strong> {recommendation.measurementPlan.primaryMetric}</div>
          <div><strong style={{ color: '#F4F3F8' }}>Secondary:</strong> {recommendation.measurementPlan.secondaryMetric}</div>
          <div><strong style={{ color: '#F4F3F8' }}>Rule:</strong> {recommendation.measurementPlan.targetRule}</div>
        </div>
      </section>

      <button type="button" onClick={onContinue} style={{ border: '1px solid rgba(255,191,222,0.35)', background: 'linear-gradient(135deg, rgba(255,191,222,0.24), rgba(218,191,255,0.2))', color: '#FFFFFF', borderRadius: 14, padding: '15px 18px', fontWeight: 700, cursor: 'pointer' }}>
        Continue to content generation →
      </button>
    </div>
  );
}

export function CreatorOSCreatePage() {
  const navigate = useNavigate();
  const profile = useMemo(() => readBrandProfile(), []);
  const [offer, setOffer] = useState('CreatorOS Platform');
  const [audience, setAudience] = useState('creator-led service businesses');
  const [goal, setGoal] = useState('Generate qualified leads through clearer social content');
  const [tone, setTone] = useState(profile?.voiceTone || 'Direct and evidence-based');
  const [platform, setPlatform] = useState('LinkedIn');
  const [outputType, setOutputType] = useState('short-script');
  const [recommendation, setRecommendation] = useState<ContentRecommendation | null>(null);

  const inputs = { offer, audience, goal, tone, platform, outputType };

  const generateRecommendation = () => {
    const playbook = adaptBrandProfileToPlaybook(profile, inputs);
    const context = adaptLegacyInputsToRequestContext(inputs);
    setRecommendation(buildContentRecommendation(playbook, context));
  };

  const continueToGenerator = () => {
    if (!recommendation) return;

    navigate('/app/content-os/generate', {
      state: {
        reuseAsset: {
          id: 'creatoros-recommendation-handoff',
          type: 'plan',
          title: 'CreatorOS Next Best Content Action',
          preview: recommendation.coreMessage,
          platform,
          campaign: 'CreatorOS Recommendation',
          brandVoice: tone,
          date: new Date().toISOString().slice(0, 10),
          variants: 1,
          status: 'ready',
          source: 'generated',
          outputType,
          inputs: { offer, audience, goal, tone, outputType },
          creatorRecommendation: recommendation,
        },
      },
    });
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ color: '#FFBFDE', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>CreatorOS · Creator Intelligence</div>
            <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Create the next best content action</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 760, lineHeight: 1.6 }}>Uses the existing BrandOS profile and your request context to produce a deterministic, explainable recommendation.</p>
          </div>
          <Link to="/modules/brandos/app" style={{ color: '#DABFFF', textDecoration: 'none', fontSize: 13 }}>Open BrandOS →</Link>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '360px minmax(0, 1fr)', gap: 22, alignItems: 'start' }}>
          <aside style={{ ...panelStyle, padding: 22, position: 'sticky', top: 24 }}>
            <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 4 }}>Request context</div>
            <div style={{ color: '#777B8D', fontSize: 12, marginBottom: 20 }}>Brand: {profile?.brandName || 'No saved BrandOS profile'}</div>
            <div style={{ display: 'grid', gap: 15 }}>
              <Field label="Offer" value={offer} onChange={setOffer} placeholder="What are you selling?" />
              <Field label="Audience" value={audience} onChange={setAudience} placeholder="Who should this reach?" />
              <Field label="Business goal" value={goal} onChange={setGoal} placeholder="What should the content achieve?" />
              <Field label="Tone" value={tone} onChange={setTone} placeholder="How should it sound?" />
              <label style={{ display: 'grid', gap: 7 }}>
                <span style={{ color: '#A8ABBA', fontSize: 12, fontWeight: 600 }}>Channel</span>
                <select value={platform} onChange={(event) => setPlatform(event.target.value)} style={fieldStyle}>
                  <option>LinkedIn</option><option>Instagram</option><option>TikTok</option><option>YouTube</option><option>X</option>
                </select>
              </label>
              <label style={{ display: 'grid', gap: 7 }}>
                <span style={{ color: '#A8ABBA', fontSize: 12, fontWeight: 600 }}>Format preference</span>
                <select value={outputType} onChange={(event) => setOutputType(event.target.value)} style={fieldStyle}>
                  <option value="short-script">Short script</option><option value="hook-pack">Hook pack</option><option value="caption-draft">Text post</option><option value="content-brief">Long-form brief</option><option value="repurposing-plan">Carousel / repurposing</option>
                </select>
              </label>
              <button type="button" onClick={generateRecommendation} style={{ border: '1px solid rgba(255,191,222,0.3)', background: 'linear-gradient(135deg, rgba(255,191,222,0.2), rgba(218,191,255,0.16))', color: '#FFFFFF', borderRadius: 12, padding: '13px 16px', fontWeight: 700, cursor: 'pointer' }}>
                Generate recommendation
              </button>
            </div>
          </aside>

          <section>
            {recommendation ? <RecommendationView recommendation={recommendation} onContinue={continueToGenerator} /> : (
              <div style={{ ...panelStyle, minHeight: 520, display: 'grid', placeItems: 'center', padding: 40, textAlign: 'center' }}>
                <div style={{ maxWidth: 500 }}>
                  <div style={{ fontSize: 42, marginBottom: 18 }}>✦</div>
                  <h2 style={{ fontSize: 24, margin: '0 0 10px' }}>Ready for the first recommendation</h2>
                  <p style={{ color: '#8B8F9E', lineHeight: 1.65, margin: 0 }}>CreatorOS will combine BrandOS context with the selected business goal, channel, and format to recommend the next content action.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
