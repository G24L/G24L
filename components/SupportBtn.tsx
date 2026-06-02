'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  reply: string;
  escalate: boolean;
}

const BACKEND_URL = '/api/support/chat';

export default function SupportBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Ich bin BugBot, der Support-Assistent von BUGLAND. 😊 Wie kann ich Ihnen heute helfen?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isEscalated]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Konversationsverlauf für die API aufbauen (initiale Begrüßung überspringen)
    const apiMessages: ApiMessage[] = updatedMessages
      .filter((m) => m.id !== '1')
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.escalate) {
        setIsEscalated(true);
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an support@bugland.de.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsEscalated(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat-Fenster */}
      {isOpen && (
        <div className="mb-4 w-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gold"
             style={{ height: isEscalated ? '28rem' : '24rem' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-navy to-blue-900 text-white p-4 flex justify-between items-center flex-shrink-0">
            <div>
              <h3 className="font-bold text-lg">BUGLAND Support</h3>
              <p className="text-xs text-blue-200">First-Level Support • KI-Assistent</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:opacity-80 text-xl font-bold"
              aria-label="Chat schließen"
            >
              ✕
            </button>
          </div>

          {/* Nachrichten */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-gold text-navy rounded-br-none'
                      : 'bg-navy text-white rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-navy text-white px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Eskalations-Kontaktkarte */}
            {isEscalated && (
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-sm">
                <p className="font-semibold text-amber-800 mb-2">Mitarbeiter erreichen:</p>
                <p className="text-amber-700">📧 support@bugland.de</p>
                <p className="text-amber-700">📞 +49 800 284 526</p>
                <p className="text-amber-600 text-xs mt-1">Mo–Fr, 9–17 Uhr</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Eingabezeile */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-3 bg-white flex gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ihre Frage..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gold hover:bg-opacity-90 disabled:opacity-50 text-navy font-bold px-4 py-2 rounded-lg transition-all text-sm"
            >
              Senden
            </button>
          </form>
        </div>
      )}

      {/* Toggle-Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className="w-16 h-16 bg-gold hover:bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        aria-label="Support Chat öffnen"
      >
        <span className="text-3xl">{isOpen ? '✕' : '💬'}</span>
      </button>
    </div>
  );
}
