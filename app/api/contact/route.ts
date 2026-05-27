import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, phone } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Alle erforderlichen Felder müssen ausgefüllt werden' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige Email-Adresse' },
        { status: 400 }
      );
    }

    // In production, integrate with email service (Nodemailer, SendGrid, etc.)
    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Integrate with database to store contact messages
    // const contactMessage = await prisma.contactMessage.create({
    //   data: { name, email, phone, subject, message }
    // });

    // TODO: Send email notification
    // await sendEmail({
    //   to: 'info@g24l.de',
    //   subject: `Neue Kontaktanfrage: ${subject}`,
    //   text: message
    // });

    return NextResponse.json(
      { success: true, message: 'Ihre Nachricht wurde erfolgreich gesendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
