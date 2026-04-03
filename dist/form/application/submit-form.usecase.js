"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitFormUseCase = submitFormUseCase;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function submitFormUseCase(body) {
    const { name, email, date, message } = body;
    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.CLENT_EMAIL,
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
    }
    catch (error) {
        return { status: "error", error: "Failed to send email" };
    }
}
