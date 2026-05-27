# G24L Website 🚀

Moderne, professionelle Website für G24L GmbH & Co. KG - Innovative IT-Lösungen für die Zukunft.

## Überblick

G24L ist ein zukunftsträchtiges IT-Unternehmen, das technische Errungenschaften der breiten Masse zugänglich macht. Diese Website präsentiert:

- **Raumfahrttechnologie**: Mars-Basis-Projekte und autonome Robotik
- **Fintech-Lösungen**: KI-gestützte Vermögensautomatisierung
- **Enterprise-Services**: Cloud, AI/ML, Consulting
- **News & Updates**: Blog mit neuesten Entwicklungen

## Tech-Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Backend**: Next.js API Routes
- **Datenbank**: PostgreSQL mit Prisma ORM
- **CMS**: Sanity.io (optional)
- **Email**: Nodemailer
- **Deployment**: Docker & Docker Compose

## Features

✅ Responsive Design (Mobile-first)
✅ Corporate Klassisches Design mit edlen Farben (Navy, Gold)
✅ Mehrsprachigkeit (Deutsch/Englisch)
✅ Kontaktformular mit Email-Validierung
✅ News/Blog-System
✅ Portfolio-Showcase
✅ Unternehmensseiten
✅ SEO-optimiert
✅ Performance-optimiert
✅ Docker-Ready

## Installation & Setup

### Lokale Entwicklung

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Environment-Variablen konfigurieren
cp .env.example .env.local

# 3. Datenbank Setup
npm run db:push

# 4. Development Server starten
npm run dev
```

App läuft unter `http://localhost:3000`

### Mit Docker

```bash
# Docker containers starten
docker-compose -f docker/docker-compose.yml up

# Datenbank migrieren
docker-compose -f docker/docker-compose.yml exec app npm run db:migrate:deploy
```

## Verzeichnisstruktur

```
g24l-website/
├── app/                    # Next.js App Directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root Layout
│   ├── pages/             # Seiten
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── news/
│   │   └── contact/
│   └── api/               # API Routes
│       ├── contact/
│       ├── newsletter/
│       └── news/
├── components/            # React Components
├── styles/               # Global Styles
├── prisma/               # Database Schema
├── docker/               # Docker Configuration
├── public/               # Static Assets
└── package.json          # Dependencies
```

## Seiten

### 🏠 Homepage
- Hero Section mit Call-to-Action
- Features/Highlights
- News Teaser
- Engagement Section

### 📖 Über Uns
- Unternehmensgeschichte
- Vision & Mission
- Team
- Kernwerte

### 🛠️ Services
- Aerospace & Mars Technologies
- Intelligent Wealth Management
- Cloud & Infrastructure
- AI & Machine Learning
- Consulting & Strategy
- Custom Software Development

### 🎯 Portfolio
- Showcase innovativer Projekte
- Mars Base Alpha
- WealthAI Automation Platform
- Enterprise Cloud Migration
- Und weitere...

### 📰 News
- Blog mit neuesten Updates
- Kategorisierung
- Suchfunktion
- Detail-Seiten

### 📧 Kontakt
- Kontaktformular
- Email-Versand
- Validierung
- Bestätigung

## Konfiguration

### Environment-Variablen

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost/dbname

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASSWORD=app_password
SMTP_FROM=noreply@g24l.de

# Sanity CMS (optional)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
```

## Styling & Design

- **Farbschema**: Navy (#001f3f), Gold (#d4af37), Cream (#faf9f7)
- **Fonts**: Inter (sans-serif), Georgia (serif)
- **Icons**: Unicode Emojis
- **Breakpoints**: Mobile-first responsive design

## API Endpoints

### Contact Form
```
POST /api/contact
Body: { name, email, phone?, subject, message }
```

### Newsletter
```
POST /api/newsletter
Body: { email }
```

### News
```
GET /api/news?page=1&limit=10
```

## Performance

- Lighthouse Score: 90+
- Optimized Images
- Code Splitting
- CSS Minification
- Static Generation wo möglich

## Deployment

### Docker Production Build
```bash
docker build -f docker/Dockerfile -t g24l-app:latest .
docker run -p 3000:3000 g24l-app:latest
```

### Mit Docker Compose
```bash
docker-compose -f docker/docker-compose.yml up -d
```

## Entwicklung

### Database Migrations
```bash
# Migration erstellen
npm run db:migrate:dev

# Migration deploymen
npm run db:migrate:deploy

# Prisma Studio öffnen
npm run studio
```

### Code Quality
```bash
# Linting
npm run lint

# Build testen
npm run build
```

## Nächste Schritte

- [ ] Sanity CMS Integration ausbauen
- [ ] Email-Service (Nodemailer) konfigurieren
- [ ] Database Migrations durchführen
- [ ] Authentifizierung (optional Admin-Panel)
- [ ] Analytics Integration (Google Analytics)
- [ ] CDN Setup für Assets
- [ ] SSL/TLS Zertifikat
- [ ] Monitoring & Logging

## Support

Fragen oder Probleme? Kontaktieren Sie:
- Email: info@g24l.de
- Website: https://g24l.de

## Lizenz

© 2024 G24L GmbH & Co. KG. Alle Rechte vorbehalten.
