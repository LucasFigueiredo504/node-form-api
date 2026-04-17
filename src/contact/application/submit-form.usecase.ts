import { FastifyRequest } from "fastify";
import { Resend } from "resend";
import { buildContactEmailHtml } from "../templates/contact-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormBody = {
  name: string;
  email: string;
  message: string;
};

const domainMap: Record<string, { from: string; to: string }> = {
  "https://www.tellarheaven.com.br": {
    from: "Tellar Heaven <noreply@contact.tellarheaven.com.br>",
    to: process.env.CLIENT_EMAIL_1 as string,
  },
  "https://tellarheaven.com.br": {
    from: "Tellar Heaven <noreply@contact.tellarheaven.com.br>",
    to: process.env.CLIENT_EMAIL_1 as string,
  },
  "http://localhost:5173": {
    from: "onboarding@resend.dev",
    to: process.env.CLIENT_EMAIL_1 as string,
  },
  "https://artworks-portifolio.vercel.app": {
    from: "onboarding@resend.dev",
    to: process.env.CLIENT_EMAIL_1 as string,
  },
  "https://site2.com": {
    from: "Site 2 <noreply@site2.com>",
    to: process.env.CLIENT_EMAIL_1 as string,
  },
};

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function submitFormUseCase(
  request: FastifyRequest,
  body: FormBody,
) {
  const { name, email, message } = body;

  const apiKey = request.headers["x-api-key"];
  console.log(apiKey);
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return { status: "error", code: 401, error: "Unauthorized" };
  }

  const origin = request.headers.origin;
  if (!origin) {
    return { status: "error", code: 400, error: "Missing origin" };
  }

  const config = domainMap[origin];
  if (!config) {
    return { status: "error", code: 403, error: "Unauthorized domain" };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    const response = await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `✉ New message from ${safeName}`,
      html: buildContactEmailHtml(safeName, safeEmail, safeMessage),
    });

    if (response.error) {
      return {
        status: "error",
        code: 500,
        error: response.error.message,
      };
    }

    return { status: "success", code: 200 };
  } catch {
    return {
      status: "error",
      code: 500,
      error: "Failed to send email",
    };
  }
}
