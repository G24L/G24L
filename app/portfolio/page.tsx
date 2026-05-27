export default function PortfolioPage() {
  const projects = [
    {
      title: 'Automatisierung von Arbeitsintensiven langwieriegen, repetitiven Prozessen',
      category: 'Automation',
      description: 'Effiziente Automatisierung von Arbeitsprozessen, um Zeit und Ressourcen zu sparen.',
      impact: 'Gewinning von Humankapital für kreative und strategische Aufgaben',
      year: '2026'
    },
    {
      title: 'Mars Base Alpha',
      category: 'Aerospace',
      description: 'Ein hochinnovativer, autonomer Basiskomplex auf dem Mars mit Lebenserhaltungssystemen, Laboreinrichtungen und automatisierten Baumaschinen.',
      impact: 'Technologische Revolution',
      year: '2024'
    },
    {
      title: 'WealthAI Automation Platform',
      category: 'Finance Tech',
      description: 'KI-gestützte Plattform zur automatisierten Vermögensoptimierung mit Algorithmen-Trading und Risikoverwaltung.',
      impact: '+45% durchschnittliche jährliche Rendite',
      year: '2023'
    },
    {
      title: 'Enterprise Cloud Migration',
      category: 'Cloud Infrastructure',
      description: 'Erfolgreiche Migration eines Fortune-500-Unternehmens zu unserer Cloud-Infrastruktur.',
      impact: '60% Kosteneinsparung',
      year: '2023'
    },
    {
      title: 'Autonomous Robotics System',
      category: 'Robotics',
      description: 'Entwicklung von autonomen Robotersystemen für Extreme-Environment-Einsätze.',
      impact: '10x höhere Effizienz',
      year: '2024'
    },
    {
      title: 'Smart Analytics Dashboard',
      category: 'Data Intelligence',
      description: 'Real-time Analytics-Dashboard mit KI-gestützten Insights für Großunternehmen.',
      impact: 'Bessere Entscheidungsfindung',
      year: '2023'
    },
    {
      title: 'NextGen Security Platform',
      category: 'Cybersecurity',
      description: 'Fortgeschrittene Sicherheitsplattform mit Machine-Learning-basierten Anomalieerkennung.',
      impact: '99.99% Bedrohungserkennung',
      year: '2024'
    },
  ];

  return (
    <main className="pt-32">
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl">
            Showcase unserer innovativsten Projekte und Lösungen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border-l-4 border-gold p-8 bg-slate rounded-r-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold flex-1">{project.title}</h3>
                  <span className="text-gold font-semibold text-sm">{project.year}</span>
                </div>
                <p className="text-sm text-gold font-semibold mb-3">{project.category}</p>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="bg-navy bg-opacity-5 p-4 rounded">
                  <p className="text-navy font-semibold text-sm">
                    <span className="text-gold">Impact: </span>{project.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
