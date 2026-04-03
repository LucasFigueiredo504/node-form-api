"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formController = formController;
const submit_form_usecase_1 = require("../application/submit-form.usecase");
async function formController(app) {
    app.post("/submit", {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: "1 minute",
            },
        },
    }, async (request, reply) => {
        const { name, email, date, message } = request.body;
        // basic validation
        if (!name || !email || !date || !message) {
            return reply.status(400).send({
                error: "Missing fields",
            });
        }
        const result = await (0, submit_form_usecase_1.submitFormUseCase)({ name, email, date, message });
        if (result.status === "error") {
            return reply.status(400).send({
                error: result.error ?? "Something went wrong",
            });
        }
        return reply.send({
            message: "Reservation received ✅",
        });
    });
}
