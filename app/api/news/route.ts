import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    // TODO: Fetch from Sanity CMS or database
    const mockNews = [
      {
        slug: 'mars-basis-update',
        title: 'Mars-Basis-Projekt: Meilenstein erreicht',
        date: '2024-05-15',
        excerpt: 'Unser innovatives Mars-Basen-Projekt hat ein wichtiges Entwicklungsstadium erreicht.',
        category: 'Aerospace'
      },
      {
        slug: 'ai-automation-breakthrough',
        title: 'Durchbruch in der KI-Automatisierung',
        date: '2024-05-10',
        excerpt: 'Neue Algorithmen revolutionieren die automatisierte Vermögensoptimierung.',
        category: 'Technology'
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockNews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: mockNews.length
      }
    });
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
