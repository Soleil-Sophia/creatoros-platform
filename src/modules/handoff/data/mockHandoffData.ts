import type { CoreAsset, DistributionAsset, LaunchIntent } from '../types';

export const MOCK_CORE_ASSET: CoreAsset = {
  id: 'COS-2026-06-19-02',
  asset_key: 'ASSET-20260619-SOLEIL',
  title: 'Warum CreatorOS kein Content-Tool ist, sondern ein Business-OS für Solo Founder',
  theme: 'Product Positioning & Category Design',
  source_module: 'ContentOS',
  brand_blueprint_id: 'BOS-SOLEIL-V1',
  core_thesis:
    'Content ist nur ein einzelner Knotenpunkt in einer viel größeren Maschine. Ein Solo Founder, der nur die Content-Erstellung optimiert, baut lediglich ein lauteres Megafon für ein ineffizientes Geschäftsmodell. CreatorOS ist kein Schreibwerkzeug – es ist ein modulares Betriebssystem, das Positionierung, Produktion, Distribution, tägliche Ausführung und Feedback-Schleifen zu einem geschlossenen, hocheffizienten Kreislauf verbindet.',
  strategic_notes: {
    enemy: "Die Inhalts-Tretmühle – viel posten, aber keine Conversion erzielen.",
    desire: 'Skalierbarkeit ohne Team-Overhead. Vorhersagbare operative Struktur.',
    mechanism: 'Die nahtlose Kopplung der 5 Kern-Module: Brand, Content, Launch, Management und Analytics.',
    transformation: 'Vom erschöpften Content-Creator zum strategischen System-Architekten.',
  },
  body_markdown: `Wir müssen aufhören, uns über Content-Kalender zu unterhalten. Ein Content-Kalender ist ein passives Planungsgitter, kein Wertschöpfungs-Werkzeug.

Wenn Solopreneure anfangen, ihre Systeme aufzubauen, machen sie fast immer den gleichen Fehler: Sie kaufen fünf verschiedene Tools. Ein Schreib-Tool für Texte, ein Automatisierungs-Tool zum Posten, ein Kanban-Board für Tasks, Excel für KPIs und Figma für Grafikvorlagen.

Das Ergebnis? Ein unkontrollierbares System-Rauschen und chronische Ermüdung. Jedes Tool saugt Aufmerksamkeit ab, statt Hebelwirkung zu erzeugen.

Wir müssen CreatorOS anders positionieren. Es ist kein weiteres Schreib-mir-Hooks-SaaS. Es ist die digitale Schaltzentrale für Gründer, die keine Lust mehr haben, Task-Runner in ihrem eigenen Unternehmen zu sein.

Der echte Wert entsteht nicht durch das Generieren von Wörtern. Er entsteht durch das Schließen der Feedbackschleife. Wenn ContentOS direkt von BrandOS kontrolliert wird und LaunchOS die Assets mit echtem Launch Intent ausspuckt, dann ist Veröffentlichung kein Zufallsprodukt mehr, sondern Ingenieursleistung.`,
  status: 'launch-ready',
  created_at: '2026-06-19T17:05:00Z',
  updated_at: '2026-06-19T17:05:00Z',
};

export const MOCK_LAUNCH_INTENT: LaunchIntent = {
  target_launch_date: '2026-06-25',
  launch_goal: 'category-definition',
  conversion_goal: 'waitlist-signup',
  audience_stage: 'problem-aware',
  primary_cta: "Kommentiere 'OS'",
  secondary_cta: 'Folge @SoleilSophia für Hebel-Strategien',
};

export function generateMockDistributionAssets(coreAsset: CoreAsset, intent: LaunchIntent): DistributionAsset[] {
  return [
    {
      id: 'DIST-01',
      launch_package_id: 'LPK-2026-MOCK',
      channel: 'Newsletter',
      format: 'Editorial Email Draft',
      target_date: intent.target_launch_date,
      goal: 'Deep Trust + Kategorie-Abgrenzung',
      cta: intent.primary_cta,
      status: 'draft',
      content_markdown: `# Newsletter Draft\n\n**Subject:** Warum du keine besseren Hooks brauchst\n\nHallo [First Name],\n\nDie meisten Solopreneure scheitern nicht, weil ihr Content schlecht ist. Sie scheitern, weil sie Content isoliert betrachten.\n\n${coreAsset.core_thesis}\n\nEin Content-Tool optimiert den Input. Ein Business-OS optimiert den Yield: BrandOS, ContentOS, LaunchOS, ManagementOS und AnalyticsOS arbeiten als geschlossener Loop.\n\n${intent.primary_cta} und ich schicke dir den Beta-Link.\n\nBeste Grüße,\nSoleil`,
    },
    {
      id: 'DIST-02',
      launch_package_id: 'LPK-2026-MOCK',
      channel: 'LinkedIn',
      format: 'Authority Text Post',
      target_date: intent.target_launch_date,
      goal: 'Thought Leadership + Conversion',
      cta: intent.primary_cta,
      status: 'draft',
      content_markdown: `Ein lautes Megafon nützt dir nichts, wenn dahinter kein funktionierendes Geschäftsmodell steht.\n\nDas Problem ist nicht dein Content. Das Problem ist deine Infrastruktur.\n\n${coreAsset.core_thesis}\n\nEin echtes Creator-Business-OS verbindet die Punkte, die sonst isoliert bluten:\n\n1. BrandOS – Positionierung und Stimme.\n2. ContentOS – Denk-Fabrik.\n3. LaunchOS – Distribution mit Absicht.\n4. ManagementOS – tägliche Kommandozentrale.\n5. AnalyticsOS – Feedback-Schleife.\n\nHör auf, Aufgaben abzuarbeiten. Fang an, Systeme zu bauen.\n\n${intent.primary_cta} unter diesen Beitrag und ich schicke dir den Beta-Zugang.`,
    },
    {
      id: 'DIST-03',
      launch_package_id: 'LPK-2026-MOCK',
      channel: 'X',
      format: 'Structured Multi-post Thread',
      target_date: intent.target_launch_date,
      goal: 'Virality + Waitlist Leads',
      cta: intent.primary_cta,
      status: 'draft',
      content_markdown: `1/ Die größte Lüge im Creator-Space: Du musst einfach nur mehr Content posten.\n\nMehr Output ohne System ist nur ein lauteres Megafon für ein kaputtes Business.\n\n---\n\n2/ Die meisten Tools verkaufen dir schnelleres Schreiben. Das Ergebnis: Du postest mehr, aber konvertierst weniger.\n\n---\n\n3/ ${coreAsset.core_thesis}\n\n---\n\n4/ Content allein löst kein Geschäftsproblem. Erst wenn Brand, Content, Launch, Management und Analytics verbunden sind, entsteht Hebelwirkung.\n\n---\n\n5/ Wer nur Content-Tools nutzt, bleibt Task-Runner. Wer ein Business-OS nutzt, wird Architekt.\n\n${intent.primary_cta}.`,
    },
    {
      id: 'DIST-04',
      launch_package_id: 'LPK-2026-MOCK',
      channel: 'YouTube-Shorts',
      format: '50-Second Vertical Video Script',
      target_date: intent.target_launch_date,
      goal: 'Attention-Grab + Comment Trigger',
      cta: intent.primary_cta,
      status: 'draft',
      content_markdown: `**[Hook 0-5s]**\nHör auf, Content zu produzieren. Fang an, ein System zu bauen.\n\n**[Body 5-35s]**\nDie meisten Solo-Gründer scheitern nicht an ihren Ideen. Sie scheitern an der Tretmühle: schreiben, kopieren, anpassen, posten, wiederholen.\n\n${coreAsset.core_thesis}\n\n**[CTA 35-50s]**\nWir öffnen die Beta von CreatorOS. ${intent.primary_cta} unter dieses Video und ich schicke dir den Link.`,
    },
  ];
}
