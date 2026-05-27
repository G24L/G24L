'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/about', label: 'Über Uns' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Kontakt' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-navy bg-opacity-95 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <span className="text-navy font-bold">G</span>
          </div>
          <span className="text-white font-bold text-xl hidden sm:inline">G24L</span>
        </Link>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div className={`
          absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto
          bg-navy md:bg-transparent p-4 md:p-0
          ${isOpen ? 'block' : 'hidden md:flex'}
          flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6
        `}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gold transition-colors py-2 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
