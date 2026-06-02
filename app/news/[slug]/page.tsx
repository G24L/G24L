export function generateStaticParams() {
  return [
    { slug: 'mars-basis-update' },
    { slug: 'ai-automation-breakthrough' },
    { slug: 'expansion-announcement' },
  ];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const newsData: Record<string, any> = {
    'mars-basis-update': {
      title: 'Mars-Basis-Projekt: Wichtiger Meilenstein erreicht',
      date: '2024-05-15',
      category: 'Aerospace',
      content: `
Unser revolutionäres Mars-Basis-Alpha-Projekt hat einen historischen Meilenstein erreicht. Die autonomen Bausysteme
haben erfolgreich die erste Habitatstruktur auf dem Mars errichtet.

**Technische Highlights:**
- Autonome Robotersysteme mit 99.9% Zuverlässigkeit
- Lebenserhaltungssysteme für bis zu 12 Menschen
- Solaranlagen für Stromversorgung
- Wasserextraktionssysteme aus Marseis

**Nächste Schritte:**
In den kommenden Monaten werden wir die zweite Phase mit erweiterten Laborfazilitäten und Forschungseinrichtungen einleiten.
Dies ist nur der Anfang unserer Mission, die Menschheit ins All zu führen.
      `
    },
    'ai-automation-breakthrough': {
      title: 'Durchbruch in der KI-gestützten Vermögensautomatisierung',
      date: '2024-05-10',
      category: 'Technology',
      content: `
Die WealthAI-Plattform von G24L hat einen beeindruckenden Meilenstein erreicht: eine durchschnittliche jährliche Rendite von 45%.

**Algorithmen-Innovation:**
Unsere neuen Machine-Learning-Modelle analysieren über 500 Millionen Datenpunkte täglich und treffen Investitionsentscheidungen
in Millisekunden.

**Risikomanagement:**
- 99.7% Schutz vor Marktvolatilität
- Automatische Portfolio-Rebalancierung
- Fortgeschrittene Hedging-Strategien

Die Plattform ist jetzt für institutionelle und private Anleger verfügbar.
      `
    },
    'expansion-announcement': {
      title: 'G24L expandiert mit neuen Büros weltweit',
      date: '2024-05-01',
      category: 'Company',
      content: `
G24L freut sich, die Eröffnung neuer Büros in Tokyo, London und Toronto anzukündigen. Diese strategische Expansion unterstreicht
unseren globalen Anspruch und unseren Willen, die beste Talente weltweit zu erreichen.

**Neue Standorte:**
- Tokyo: 150 Mitarbeiter, Fokus auf Raumfahrttechnologie
- London: 200 Mitarbeiter, Fintech und Cloud-Lösungen
- Toronto: 100 Mitarbeiter, AI und Machine Learning

Mit dieser Expansion beschäftigen wir nun über 2.000 Mitarbeiter weltweit.
      `
    },
  };

  const article = newsData[params.slug] || {
    title: 'Artikel nicht gefunden',
    date: new Date().toISOString(),
    category: 'News',
    content: 'Der angeforderte Artikel existiert nicht.'
  };

  return (
    <main className="pt-32">
      <article className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <span className="text-gold text-sm font-semibold uppercase">{article.category}</span>
            <h1 className="text-5xl font-bold mt-2 mb-4">{article.title}</h1>
            <p className="text-gray-500">
              {new Date(article.date).toLocaleDateString('de-DE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph: string, i: number) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={i} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <li key={i} className="ml-4 text-gray-700">
                    {paragraph.replace('-', '').trim()}
                  </li>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </article>
    </main>
  );
}
