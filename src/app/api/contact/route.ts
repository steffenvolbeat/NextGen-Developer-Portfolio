import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
];

function getEnvConfig() {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing SMTP env vars: ${missing.join(", ")}`);
  }

  const port = Number(process.env.SMTP_PORT);

  return {
    host: process.env.SMTP_HOST as string,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
    from: (process.env.CONTACT_FROM || process.env.SMTP_USER) as string,
    to: (process.env.CONTACT_TO || process.env.SMTP_USER) as string,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, E-Mail, Betreff und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }

    const config = getEnvConfig();

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });

    const text = [
      `Von: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Von:</strong> ${name}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
      <p><strong>Betreff:</strong> ${subject}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `Portfolio Kontakt: ${subject}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("/api/contact error", error);
    const status = error.message?.includes("SMTP") ? 500 : 500;
    return NextResponse.json(
      { error: "E-Mail Versand fehlgeschlagen.", details: error.message },
      { status }
    );
  }
}
