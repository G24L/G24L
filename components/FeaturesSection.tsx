export default function FeaturesSection() {
  const features = [
    {
      title: 'Innovative Projekte',
      description: 'Von Mars-Basen bis zur intelligenten Vermögensautomatisierung - wir realisieren die Zukunft.'
    },
    {
      title: 'Fokussiert & Effizient',
      description: 'Lösungen, die nicht nur funktionieren, sondern auch wirtschaftlich sinnvoll sind.'
    },
    {
      title: 'Für Alle Zugänglich',
      description: 'Komplexe Technologie wird von uns verständlich und nutzbar für jeden gemacht.'
    },
    {
      title: 'Technische Excellence',
      description: 'Top-Talent und Best Practices garantieren Qualität auf höchstem Niveau.'
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold mb-4">Warum G24L</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Wir sind nicht einfach nur ein weiteres IT-Unternehmen. Wir sind Visionäre, die Technologie
          in den Dienst der Menschheit stellen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border-2 border-gray-200 hover:border-gold hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
