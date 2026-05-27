export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-gold font-bold mb-4">G24L</h3>
            <p className="text-gray-400 text-sm">
              Innovative IT-Lösungen für die Zukunft.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/about" className="hover:text-gold transition">Über Uns</a></li>
              <li><a href="/services" className="hover:text-gold transition">Services</a></li>
              <li><a href="/portfolio" className="hover:text-gold transition">Portfolio</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ressourcen</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/news" className="hover:text-gold transition">News</a></li>
              <li><a href="/contact" className="hover:text-gold transition">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <p className="text-gray-400 text-sm">
              info@g24l.de<br />
              +49 (0) 123 456789
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} G24L GmbH & Co. KG. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition">Datenschutz</a>
            <a href="#" className="hover:text-gold transition">Impressum</a>
            <a href="#" className="hover:text-gold transition">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
