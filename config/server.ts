import { KeystoneConfig } from "@keystone-6/core/dist/declarations/src/types/config";
import { FRONTEND_URL, SENTRY_DNS, SERVER_PORT } from "./index";
import configProject from "../package.json";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

export const server: KeystoneConfig["server"] = {
  port: SERVER_PORT,
  healthCheck: {
    path: "/check",
    data: () => ({
      status: "healthy",
      timestamp: Date.now(),
      uptime: process.uptime(),
    }),
  },
  cors: {
    origin: [FRONTEND_URL],
    credentials: true,
  },
  extendExpressApp: (app) => {
    Sentry.init({
      dsn: SENTRY_DNS,
      tracesSampleRate: 1.0,
      release: configProject.version,
      environment: process.env.NODE_ENV,
      autoSessionTracking: true,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
      ],
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
    app.use(Sentry.Handlers.errorHandler());
  },
};
