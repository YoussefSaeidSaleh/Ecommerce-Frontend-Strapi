import { EmailTemplate } from "../../_components/email-template.jsx";

export async function POST() {
  try {
    // dynamic import علشان ما يتحملش وقت الـ build
    const { Resend } = await import("resend");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("❌ RESEND_API_KEY is missing");
      return Response.json(
        { error: "RESEND_API_KEY is missing" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["youssefsaidk123@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Send email error:", error);
    return Response.json({ error }, { status: 500 });
  }
}
