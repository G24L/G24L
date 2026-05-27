export default function ServicesPage() {
  const services = [
    {
      title: 'Aerospace & Mars Technologies',
      description: 'Revolutionäre Lösungen für Raumfahrt und extraterrestrische Infrastruktur.',
      features: ['Mars-Basis-Systeme', 'Autonome Robotik', 'Lebenserhaltungssysteme']
    },
    {
      title: 'Intelligent Wealth Management',
      description: 'KI-gestützte automatisierte Vermögensoptimierung und -verwaltung.',
      features: ['Algorithmen-Trading', 'Portfolio-Optimierung', 'Risikoverwaltung']
    },
    {
      title: 'Cloud & Infrastructure',
      description: 'Enterprise-Grade Cloud-Lösungen mit höchster Sicherheit und Skalierbarkeit.',
      features: ['Cloud-Migration', 'DevOps', 'Infrastruktur-as-Code']
    },
    {
      title: 'AI & Machine Learning',
      description: 'Maßgeschneiderte KI-Lösungen für komplexe geschäftliche Herausforderungen.',
      features: ['Custom ML-Modelle', 'NLP-Lösungen', 'Predictive Analytics']
    },
    {
      title: 'Consulting & Strategy',
      description: 'Strategische Beratung für digitale Transformation und technologische Innovation.',
      features: ['Digital Strategy', 'Change Management', 'Innovation Workshops']
    },
    {
      title: 'Custom Software Development',
      description: 'Hochperformante, skalierbare Software-Lösungen nach Ihren Anforderungen.',
      features: ['Full-Stack Development', 'Mobile Apps', 'Enterprise Solutions']
    },
  ];

  return (
    <main className="pt-32">
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Unsere Services</h1>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl">
            Umfassende IT-Lösungen, die Ihr Unternehmen in die Zukunft führen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-lg p-8 hover:border-gold hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className="text-gold mr-2">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
