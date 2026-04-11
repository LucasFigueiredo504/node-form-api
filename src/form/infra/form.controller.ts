import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { submitFormUseCase } from "../application/submit-form.usecase";

type FormBody = {
  name: string;
  email: string;
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
      const { name, email, message } = request.body;

      // basic validation
      if (!name || !email || !message) {
        return reply.status(400).send({
          error: "Missing fields",
        });
      }

      const result = await submitFormUseCase(request, {
        name,
        email,
        message,
      });

      if (result.status === "error") {
        return reply.status(400).send({
          error: result.error ?? "Something went wrong",
        });
      }

      return reply.send({
        message: "Request received ✅",
      });
    },
  );
}
