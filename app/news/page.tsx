import Link from 'next/link';

export default function NewsPage() {
  const newsItems = [
    {
      slug: 'mars-basis-update',
      title: 'Mars-Basis-Projekt: Wichtiger Meilenstein erreicht',
      date: '2024-05-15',
      category: 'Aerospace',
      excerpt: 'Unser Mars-Basis-Alpha-Projekt hat ein kritisches Entwicklungsstadium erreicht. Die autonomen Bausysteme haben erfolgreich die erste Habitatstruktur errichtet.'
    },
    {
      slug: 'ai-automation-breakthrough',
      title: 'Durchbruch in der KI-gestützten Vermögensautomatisierung',
      date: '2024-05-10',
      category: 'Technology',
      excerpt: 'Neue Algorithmen in unserer WealthAI-Plattform haben eine 45%ige durchschnittliche jährliche Rendite erreicht.'
    },
    {
      slug: 'expansion-announcement',
      title: 'G24L expandiert mit neuen Büros weltweit',
      date: '2024-05-01',
      category: 'Company',
      excerpt: 'Wir freuen uns, die Eröffnung neuer Büros in Tokyo, London und Toronto anzukündigen. Mit dieser Expansion unterstreichen wir unseren globalen Anspruch.'
    },
    {
      slug: 'partnership-aws',
      title: 'Strategische Partnerschaft mit AWS angekündigt',
      date: '2024-04-28',
      category: 'Partnership',
      excerpt: 'G24L und Amazon Web Services geben eine strategische Partnerschaft bekannt, um Enterprise-Grade Cloud-Lösungen zu entwickeln.'
    },
    {
      slug: 'security-certification',
      title: 'Höchste Sicherheitszertifizierungen erhalten',
      date: '2024-04-20',
      category: 'Security',
      excerpt: 'G24L hat ISO 27001, SOC 2 Type II und weitere internationale Sicherheitszertifizierungen erhalten.'
    },
    {
      slug: 'team-expansion',
      title: 'Talentoffensive: 500 neue Positionen weltweit',
      date: '2024-04-15',
      category: 'Careers',
      excerpt: 'Wir stellen 500 neue Ingenieure, Datenwissenschaftler und Innovatoren ein. Deine Karriere bei G24L startet hier!'
    },
  ];

  return (
    <main className="pt-32">
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-xl text-gray-600 mb-16">
            Bleiben Sie auf dem Laufenden mit den neuesten Nachrichten von G24L.
          </p>

          <div className="space-y-8">
            {newsItems.map((item) => (
              <article
                key={item.slug}
                className="border-b border-gray-300 pb-8 hover:bg-slate p-6 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gold text-xs font-semibold uppercase px-3 py-1 bg-slate rounded-full">
                    {item.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(item.date).toLocaleDateString('de-DE')}
                  </span>
                </div>
                <Link href={`/news/${item.slug}`}>
                  <h2 className="text-2xl font-bold mb-3 hover:text-gold transition">
                    {item.title}
                  </h2>
                </Link>
                <p className="text-gray-700 mb-4">{item.excerpt}</p>
                <Link href={`/news/${item.slug}`} className="text-navy font-semibold hover:text-gold transition">
                  Weiter lesen →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
