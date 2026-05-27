export default function AboutPage() {
  return (
    <main className="pt-32">
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold mb-8">Über G24L</h1>

          <div className="space-y-8 text-gray-700">
            <div>
              <h2 className="text-3xl font-bold mb-4">Unsere Mission</h2>
              <p>
                G24L wurde gegründet mit dem Ziel, Menschen zu helfen und technische Errungenschaften
                der breiten Masse zugänglich zu machen. Wir glauben, dass innovative Technologie nicht
                nur für große Konzerne reserviert sein darf, sondern allen Menschen Nutzen bringen sollte.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Unsere Vision</h2>
              <p>
                G24L wird eines der Top-10-IT-Unternehmen weltweit. Mit Projekten wie unserer Mars-Basis
                und intelligenten Vermögensautomatisierungssystemen zeigen wir, dass das Unmögliche machbar ist.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Kernwerte</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span><strong>Innovation:</strong> Wir denken außerhalb der Grenzen.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span><strong>Zugänglichkeit:</strong> Technologie für alle.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span><strong>Excellence:</strong> Top-Qualität in allem, was wir tun.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">✓</span>
                  <span><strong>Nachhaltigkeit:</strong> Verantwortungsvolle Technologieentwicklung.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Team</h2>
              <p>
                Unser Team besteht aus führenden Experten in den Bereichen KI, Cloud-Computing,
                Raumfahrttechnologie und Finanzautomatisierung. Gemeinsam bringen wir Leidenschaft
                und Fachkompetenz in jedes Projekt ein.
              </p>
              <img src="/images/team.png" alt="Unser Team" className="mx-auto rounded-lg shadow-lg" />
              <p>
                Links: Fynn Scheuermann (CEO), Links mitte: Johannes Klindworth (CTO), Rechts mitte: Janeck Tabors (CEO), Rechts: Vincent Wespa (CTO)
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
