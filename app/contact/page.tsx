'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <main className="pt-32">
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Kontakt</h1>
          <p className="text-xl text-gray-600 mb-12">
            Haben Sie Fragen? Wir freuen uns auf Ihre Nachricht.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  placeholder="Ihre Email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Telefon (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  placeholder="Ihre Nummer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Betreff</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  placeholder="Betreff"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Nachricht</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-none"
                placeholder="Ihre Nachricht..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full button-primary bg-navy hover:bg-opacity-90 disabled:opacity-50"
            >
              {status === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
            </button>

            {status === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                ✓ Danke! Wir werden uns in Kürze bei Ihnen melden.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                ✗ Es gab einen Fehler. Bitte versuchen Sie es später erneut.
              </div>
            )}
          </form>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t">
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600">info@g24l.de</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Telefon</h3>
              <p className="text-gray-600">+49 (0) 123 456789</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Adresse</h3>
              <p className="text-gray-600">Berlin, Deutschland</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
