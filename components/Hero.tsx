import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-navy via-navy to-carbon">
      <div className="container mx-auto text-center text-white animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
          Die Zukunft der
          <span className="text-gold block"> Technologie</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-center">
          G24L bringt bahnbrechende technische Errungenschaften der breiten Masse näher.
          Von Mars-Basisprojekten bis zur intelligenten Vermögensautomatisierung.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="px-8 py-4 bg-gold text-navy font-bold rounded-lg hover:bg-yellow-400 transition-all inline-block"
          >
            Jetzt Kontaktieren
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-navy transition-all inline-block"
          >
            Portfolio Ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}

