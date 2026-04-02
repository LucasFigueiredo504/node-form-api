import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { submitFormUseCase } from "../application/submit-form.usecase";

type FormBody = {
  name: string;
  email: string;
  date: string;
  message: string;
};

export async function formController(app: FastifyInstance) {
  app.post(
    "/submit",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "1 minute",
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: FormBody }>,
      reply: FastifyReply,
    ) => {
      const { name, email, date, message } = request.body;

      // basic validation
      if (!name || !email || !date || !message) {
        return reply.status(400).send({
          error: "Missing fields",
        });
      }

      const result = await submitFormUseCase({ name, email, date, message });

      if (result.status === "error") {
        return reply.status(400).send({
          error: result.error ?? "Something went wrong",
        });
      }

      return reply.send({
        message: "Reservation received ✅",
      });
    },
  );
}
