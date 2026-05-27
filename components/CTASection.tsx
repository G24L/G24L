import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-navy to-carbon">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">
          Bereit, die Zukunft zu gestalten?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Lassen Sie uns zusammen innovative Lösungen entwickeln, die Ihr Unternehmen voranbringen.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-gold text-navy px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-all"
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </section>
  );
}

