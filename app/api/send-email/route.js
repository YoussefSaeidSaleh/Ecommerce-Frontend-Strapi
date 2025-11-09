// app/api/send-email/route.js
import { EmailTemplate } from "../../_components/email-template.jsx";

// اجعل الـ route ديناميكيًا بالكامل
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, html, text } = body;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { ok: false, error: "RESEND_API_KEY is missing" },
        { status: 500 }
      );
    }

    // استيراد ديناميكي داخل الدالة
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'onboarding@yourdomain.com',
      to: to ?? ['youssefsaidk123@gmail.com'],
      subject: subject ?? 'Hello from Ecommerce',
      react: EmailTemplate({ firstName: 'Customer' }),
      html,
      text,
    });

    return Response.json({ ok: true, data: result });
  } catch (error: any) {
    return Response.json(
      { ok: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
