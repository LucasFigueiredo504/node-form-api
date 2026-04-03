"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const form_controller_1 = require("./form/infra/form.controller");
const app = (0, fastify_1.default)({
    logger: true,
});
async function buildServer() {
    await app.register(rate_limit_1.default, {
        max: 6,
        timeWindow: "1 minute",
    });
    //routes
    await app.register(form_controller_1.formController, { prefix: "/api" });
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
