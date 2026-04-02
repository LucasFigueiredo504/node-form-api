import "dotenv/config";
import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import { formController } from "./form/infra/form.controller";

const app = Fastify({
  logger: true,
});

async function buildServer() {
  // Register rate limit plugin
  await app.register(rateLimit, {
    max: 10, // max requests
    timeWindow: "1 minute",
  });

  //routes
  await app.register(formController, { prefix: "/api" });

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
