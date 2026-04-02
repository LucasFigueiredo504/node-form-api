import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormBody = {
  name: string;
  email: string;
  date: string;
  message: string;
};

export async function submitFormUseCase(body: FormBody) {
  const { name, email, date, message } = body;

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // change later to your domain
      to: process.env.CLENT_EMAIL as string, // restaurant owner email
      subject: "New Reservation 📅",
      html: `
        <h2>New Reservation</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (response.error) {
      return { status: "error", error: response.error.message };
    }

    return { status: "success" };
  } catch (error) {
    return { status: "error", error: "Failed to send email" };
  }
}
