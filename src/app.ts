import "dotenv/config";
import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";
import { formController } from "./contact/infra/form.controller";

const app = Fastify({
  logger: true,
});

async function buildServer() {
  await app.register(cors, {
    origin:
      process.env.ENVIROMENT === "dev"
        ? "*"
        : ["https://www.tellarheaven.com.br", "https://tellarheaven.com.br"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  // Rate limiting
  await app.register(rateLimit, {
    max: 6,
    timeWindow: "1 minute",
  });

  // Routes
  await app.register(formController, { prefix: "/v1" });

  return app;
}

buildServer().then((server) => {
  server
    .listen({ port: 3000, host: "0.0.0.0" })
    .then(() => {
      console.log("Server running on http://localhost:3000");
    })
    .catch((err) => {
      server.log.error(err);
      process.exit(1);
    });
});
