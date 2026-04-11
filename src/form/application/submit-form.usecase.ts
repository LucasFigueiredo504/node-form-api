import { FastifyRequest } from "fastify";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormBody = {
  name: string;
  email: string;
  message: string;
};

const domainMap: Record<string, string> = {
  "https://tellarheaven.com.br": "Tellar Heaven <noreply@tellarheaven.com.br>",
  "https://site2.com": "Site 2 <noreply@site2.com>",
};

export async function submitFormUseCase(
  request: FastifyRequest,
  body: FormBody,
) {
  const { name, email, message } = body;

  const apiKey = request.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return { status: "error", error: "Unauthorized" };
  }

  const origin = request.headers.origin;
  if (!origin) {
    return { status: "error", error: "Missing origin" };
  }

  const from = domainMap[origin];
  if (!from) {
    return { status: "error", error: "Unauthorized domain" };
  }

  try {
    const response = await resend.emails.send({
      from,
      to: email,
      subject: "New Message ✉",
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (response.error) {
      return { status: "error", error: response.error.message };
    }

    return { status: "success" };
  } catch {
    return { status: "error", error: "Failed to send email" };
  }
}
