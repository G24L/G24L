import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email ist erforderlich' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige Email-Adresse' },
        { status: 400 }
      );
    }

    // TODO: Integrate with database
    // const newsletter = await prisma.newsletter.create({
    //   data: { email }
    // });

    console.log('Newsletter Subscription:', { email, timestamp: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: 'Danke für Ihr Abonnement!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
