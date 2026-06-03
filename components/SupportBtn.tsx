'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

const MIN_W = 320;
const MAX_W = 700;
const MIN_H = 400;
const MAX_H = 850;
const DEFAULT_W = 420;
const DEFAULT_H = 600;

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
  const [size, setSize] = useState({ width: DEFAULT_W, height: DEFAULT_H });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isEscalated]);

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      // window anchored bottom-right: dragging left/up makes it bigger
      const dx = lastPos.current.x - e.clientX;
      const dy = lastPos.current.y - e.clientY;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setSize((prev) => ({
        width: Math.max(MIN_W, Math.min(MAX_W, prev.width + dx)),
        height: Math.max(MIN_H, Math.min(MAX_H, prev.height + dy)),
      }));
    };

    const onMouseUp = () => {
      isResizing.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

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
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: ChatResponse = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: data.reply, sender: 'bot', timestamp: new Date() },
      ]);
      if (data.escalate) setIsEscalated(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte wenden Sie sich direkt an support@bugland.de.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div
          className="mb-4 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gold select-none"
          style={{ width: size.width, height: size.height }}
        >
          {/* Resize-Griff oben links */}
          <div
            className="absolute top-0 left-0 w-5 h-5 cursor-nw-resize z-10 flex items-center justify-center"
            onMouseDown={startResize}
            title="Größe ändern"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-40 hover:opacity-80 transition-opacity">
              <line x1="0" y1="10" x2="10" y2="0" stroke="white" strokeWidth="1.5" />
              <line x1="0" y1="6"  x2="6"  y2="0" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-navy to-blue-900 text-white px-5 py-4 flex justify-between items-center flex-shrink-0">
            <div>
              <h3 className="font-bold text-base">BUGLAND Support</h3>
              <p className="text-xs text-blue-200 mt-0.5">BugBot · KI First-Level-Support</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-70 text-lg font-bold leading-none"
              aria-label="Chat schließen"
            >
              ✕
            </button>
          </div>

          {/* Nachrichten */}
          <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-gold text-navy rounded-br-sm'
                      : 'bg-navy text-white rounded-bl-sm'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mt-1 mb-1 space-y-0.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mt-1 mb-1 space-y-0.5">{children}</ol>,
                        li: ({ children }) => <li className="text-sm">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-gold">{children}</strong>,
                        em: ({ children }) => <em className="italic opacity-90">{children}</em>,
                        code: ({ children }) => (
                          <code className="bg-white/20 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                        ),
                        h1: ({ children }) => <p className="font-bold text-base mb-1">{children}</p>,
                        h2: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
                        h3: ({ children }) => <p className="font-semibold mb-0.5">{children}</p>,
                        hr: () => <hr className="border-white/20 my-2" />,
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-navy px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {isEscalated && (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-sm">
                <p className="font-semibold text-amber-800 mb-2">Direkter Kontakt:</p>
                <p className="text-amber-700">📧 support@bugland.de</p>
                <p className="text-amber-700">📞 +49 800 284 526</p>
                <p className="text-amber-600 text-xs mt-1">Mo–Fr, 9–17 Uhr</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Eingabe */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 px-4 py-3 bg-white flex gap-2 flex-shrink-0"
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
              className="bg-gold hover:bg-opacity-90 disabled:opacity-40 text-navy font-bold px-4 py-2 rounded-lg transition-all text-sm"
            >
              Senden
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-16 h-16 bg-gold hover:bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        aria-label="Support Chat"
      >
        <span className="text-3xl">{isOpen ? '✕' : '💬'}</span>
      </button>
    </div>
  );
}
