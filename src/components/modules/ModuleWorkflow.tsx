type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

type ModuleWorkflowProps = {
  title?: string;
  subtitle?: string;
  steps: WorkflowStep[];
  accent?: string;
};

export function ModuleWorkflow({
  title = 'How it works',
  subtitle,
  steps,
  accent = '#FFBFDE',
}: ModuleWorkflowProps) {
  return (
    <section className="py-20 lg:py-28" style={{ background: '#171923' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${accent})` }} />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: accent,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Workflow
            </span>
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: '#F4F3F8',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: subtitle ? '12px' : 0,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '17px', color: '#B4B8C7', lineHeight: 1.6 }}>{subtitle}</p>
          )}
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute left-[31px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)' }}
          />

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-6 md:gap-8">
                {/* Step number node */}
                <div className="flex-shrink-0 relative">
                  <div
                    className="w-[62px] h-[62px] rounded-[16px] flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                      border: `1px solid ${accent}30`,
                      boxShadow: `0 0 24px ${accent}14`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px rounded-t-[16px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
                    />
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: accent,
                        fontFamily: 'var(--font-heading, "Manrope", sans-serif)',
                      }}
                    >
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-[16px] p-6"
                  style={{
                    background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    marginTop: '4px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: '#F4F3F8',
                      marginBottom: '6px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#B4B8C7', lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
