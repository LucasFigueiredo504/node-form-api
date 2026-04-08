import "dotenv/config";
import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import { formController } from "./form/infra/form.controller";

const app = Fastify({
  logger: true,
});

async function buildServer() {
  await app.register(rateLimit, {
    max: 6,
    timeWindow: "1 minute",
  });

  //routes
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
