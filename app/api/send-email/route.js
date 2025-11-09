// app/api/send-email/route.js
import { EmailTemplate } from "../../_components/email-template.jsx";

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, html, text } = body;

    // تحقق من وجود المفتاح قبل أي شيء
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("❌ RESEND_API_KEY is missing");
      return new Response(JSON.stringify({ ok: false, error: "RESEND_API_KEY is missing" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // dynamic import + fallback handling عشان نتعامل مع أي شكل تصدير للحزمة
    const mod = await import("resend");
    const Resend = mod.Resend || mod.default || mod;
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: "onboarding@yourdomain.com",
      to: to || ["youssefsaidk123@gmail.com"],
      subject: subject || "Hello world",
      react: EmailTemplate({ firstName: "John" }),
      html,
      text,
    });

    return new Response(JSON.stringify({ ok: true, data: result }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Send-email error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
