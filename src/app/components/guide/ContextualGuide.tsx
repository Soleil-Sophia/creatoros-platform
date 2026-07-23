import { useMemo, useState } from 'react';
import { BrandToneGuide } from './BrandToneGuide';

type GuideTopic = {
  id: string;
  label: string;
  title: string;
  explanation: string;
  nextStep?: string;
};

type GuideContext = {
  area: string;
  page: string;
  intro: string;
  topics: GuideTopic[];
};

const SHARED_TOPICS: GuideTopic[] = [
  {
    id: 'evidence',
    label: 'What does evidence mean?',
    title: 'Evidence',
    explanation: 'Evidence is information that supports or weakens a recommendation. Examples include previous content performance, clicks, leads, sales, audience feedback, and repeated patterns across similar content.',
    nextStep: 'Use evidence to understand why CreatorOS recommends an action instead of following it blindly.',
  },
  {
    id: 'confidence',
    label: 'How does confidence work?',
    title: 'Recommendation confidence',
    explanation: 'Confidence shows how strongly the available information supports a recommendation. Medium means the recommendation is plausible but needs more real results. High means several relevant signals point in the same direction.',
    nextStep: 'More relevant performance data can increase or decrease confidence over time.',
  },
  {
    id: 'bayesian',
    label: 'Explain Bayesian updating simply',
    title: 'Bayesian evidence updating',
    explanation: 'CreatorOS starts with a reasonable first estimate. Every new result updates that estimate. One successful post is a clue, not proof. Repeated similar results make the conclusion stronger; conflicting results make it weaker.',
    nextStep: 'Think of it as continuously improving an estimate instead of declaring a permanent truth too early.',
  },
];

function resolveGuideContext(pathname: string): GuideContext {
  if (pathname.includes('/creatoros/create')) {
    return {
      area: 'CreatorOS',
      page: 'Next Best Content Action',
      intro: 'This page helps you decide what content to create next and why that action fits your brand and business goal.',
      topics: [
        {
          id: 'recommendation',
          label: 'Why this recommendation?',
          title: 'Why CreatorOS recommends an action',
          explanation: 'CreatorOS combines your brand context, audience, offer, business goal, channel, format, and available evidence. It then returns one clear action instead of a generic list of ideas.',
          nextStep: 'Review the reason, policy status, confidence, and measurement plan before continuing to production.',
        },
        {
          id: 'goal',
          label: 'Help me choose a business goal',
          title: 'Choosing the business goal',
          explanation: 'Choose the result the content should support. Reach attracts relevant attention. Authority builds trust. Lead generation creates qualified enquiries. Sales helps warm audiences decide. Community deepens participation.',
          nextStep: 'Use one primary goal per recommendation so the content has a clear job.',
        },
        ...SHARED_TOPICS,
      ],
    };
  }

  if (pathname.includes('/brandos') || pathname.includes('/brand-os')) {
    return {
      area: 'BrandOS',
      page: 'Brand Playbook',
      intro: 'BrandOS is the controlled source of truth for who the brand is, how it speaks, what it promises, and what it must avoid.',
      topics: [
        {
          id: 'tone',
          label: 'Help me find my brand tone',
          title: 'Brand tone',
          explanation: 'Your brand tone is the consistent way your brand sounds.',
        },
        {
          id: 'positioning',
          label: 'What is positioning?',
          title: 'Positioning',
          explanation: 'Positioning explains who the brand helps, which important problem it solves, how it solves it differently, and why the audience should care.',
          nextStep: 'A useful structure is: We help [audience] achieve [result] through [distinct approach].',
        },
        {
          id: 'claims',
          label: 'What are allowed and prohibited claims?',
          title: 'Claim governance',
          explanation: 'Allowed claims are statements the brand is permitted to make and can support. Prohibited claims are promises, exaggerations, or sensitive statements the brand should not publish.',
          nextStep: 'Use this to prevent generated content from drifting outside the brand rules.',
        },
        ...SHARED_TOPICS,
      ],
    };
  }

  if (pathname.includes('/content-os') || pathname.includes('/contentos')) {
    return {
      area: 'CreatorOS',
      page: 'Content production',
      intro: 'This workspace turns the selected recommendation and brand context into a concrete content asset.',
      topics: [
        {
          id: 'production',
          label: 'What should I do here?',
          title: 'Content production workflow',
          explanation: 'Check the prefilled offer, audience, goal, tone, platform, and format. Generate the content, review it for accuracy and brand fit, then save the approved output to the Content Library.',
          nextStep: 'Do not publish automatically. Review the result and keep human approval in the workflow.',
        },
        {
          id: 'format',
          label: 'Which format should I use?',
          title: 'Format selection',
          explanation: 'Use short scripts for concise video, hook packs for testing openings, captions for text-led posts, briefs for deeper production, and repurposing plans when one strong idea should become several assets.',
        },
        ...SHARED_TOPICS,
      ],
    };
  }

  if (pathname.includes('/library')) {
    return {
      area: 'CreatorOS',
      page: 'Content Library',
      intro: 'The Content Library stores generated assets together with the context that explains why they were created.',
      topics: [
        {
          id: 'snapshot',
          label: 'What is a recommendation snapshot?',
          title: 'Recommendation snapshot',
          explanation: 'A recommendation snapshot freezes the original goal, reasoning, confidence, policy result, and measurement plan at the moment the asset is created.',
          nextStep: 'Later, IntelligenceOS can compare the original recommendation with the real performance result.',
        },
        ...SHARED_TOPICS,
      ],
    };
  }

  return {
    area: 'CreatorOS Platform',
    page: 'Current workspace',
    intro: 'Guide explains the current workspace, important terms, and the next useful action without changing canonical data automatically.',
    topics: SHARED_TOPICS,
  };
}

export function ContextualGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const context = useMemo(() => resolveGuideContext(typeof window === 'undefined' ? '/' : window.location.pathname), [isOpen]);
  const selectedTopic = context.topics.find((topic) => topic.id === selectedTopicId) ?? null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);
          setSelectedTopicId(null);
        }}
        aria-expanded={isOpen}
        aria-label="Open CreatorOS Guide"
        style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 80, borderRadius: 999, border: '1px solid rgba(218,191,255,0.28)', background: 'linear-gradient(135deg, rgba(255,191,222,0.96), rgba(218,191,255,0.96))', color: '#171923', boxShadow: '0 18px 50px rgba(0,0,0,0.38)', padding: '12px 16px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
      >
        ✦ Ask Guide
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="CreatorOS contextual guide"
          style={{ position: 'fixed', right: 24, bottom: 82, zIndex: 79, width: 'min(420px, calc(100vw - 32px))', maxHeight: 'min(680px, calc(100vh - 120px))', overflowY: 'auto', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(145deg, #1F2230, #14161F)', boxShadow: '0 28px 80px rgba(0,0,0,0.58)', color: '#F4F3F8' }}
        >
          <div style={{ padding: 20, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ color: '#DABFFF', fontSize: 11, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase' }}>{context.area} · {context.page}</div>
            <h2 style={{ margin: '8px 0', fontSize: 20 }}>How can I help?</h2>
            <p style={{ margin: 0, color: '#A9ADBC', fontSize: 13, lineHeight: 1.6 }}>{context.intro}</p>
          </div>

          <div style={{ padding: 16 }}>
            {selectedTopicId === 'tone' ? (
              <BrandToneGuide onBack={() => setSelectedTopicId(null)} />
            ) : selectedTopic ? (
              <div>
                <button type="button" onClick={() => setSelectedTopicId(null)} style={{ border: 0, background: 'transparent', color: '#DABFFF', padding: 0, fontSize: 12, cursor: 'pointer' }}>← Back to questions</button>
                <h3 style={{ margin: '16px 0 8px', fontSize: 17 }}>{selectedTopic.title}</h3>
                <p style={{ color: '#C0C3CF', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{selectedTopic.explanation}</p>
                {selectedTopic.nextStep && (
                  <div style={{ marginTop: 16, borderRadius: 12, border: '1px solid rgba(255,191,222,0.12)', background: 'rgba(255,191,222,0.045)', padding: 13 }}>
                    <div style={{ color: '#FFBFDE', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Next useful step</div>
                    <div style={{ color: '#D8DAE2', fontSize: 13, lineHeight: 1.55, marginTop: 5 }}>{selectedTopic.nextStep}</div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 9 }}>
                {context.topics.map((topic) => (
                  <button key={topic.id} type="button" onClick={() => setSelectedTopicId(topic.id)} style={{ width: '100%', textAlign: 'left', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', color: '#ECECF2', padding: '12px 13px', fontSize: 13, cursor: 'pointer' }}>
                    {topic.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding: '12px 16px 16px', color: '#737789', fontSize: 11, lineHeight: 1.5 }}>
            Guide explains and suggests. Canonical BrandOS or DesignOS rules always require explicit user approval.
          </div>
        </div>
      )}
    </>
  );
}
