import Link from 'next/link';

export default function NewsTeaser() {
  const newsItems = [
    {
      slug: 'mars-basis-update',
      title: 'Mars-Basis-Projekt: Meilenstein erreicht',
      date: '2024-05-15',
      excerpt: 'Unser innovatives Mars-Basen-Projekt hat ein wichtiges Entwicklungsstadium erreicht.'
    },
    {
      slug: 'ai-automation-breakthrough',
      title: 'Durchbruch in der KI-Automatisierung',
      date: '2024-05-10',
      excerpt: 'Neue Algorithmen revolutionieren die automatisierte Vermögensoptimierung.'
    },
    {
      slug: 'expansion-announcement',
      title: 'G24L expandiert in neue Märkte',
      date: '2024-05-01',
      excerpt: 'Mit neuen Büros weltweit wächst G24L schneller denn je.'
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold mb-12">Aktuelle News</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <p className="text-gold text-sm font-semibold mb-2">
                {new Date(item.date).toLocaleDateString('de-DE')}
              </p>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.excerpt}</p>
              <span className="text-navy font-semibold hover:text-gold transition">
                Mehr lesen →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/news" className="button-secondary">
            Alle News ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
