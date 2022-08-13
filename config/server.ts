import { KeystoneConfig } from "@keystone-6/core/dist/declarations/src/types/config";
import { FRONTEND_URL, SENTRY_DNS, SERVER_PORT } from "./index";
import configProject from "../package.json";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import bodyParser from "body-parser";
import { Payment } from "@a2seven/yoo-checkout/lib/models/payment";
import { PaymentStatus } from "../enums/payment-status.enum";
import { IPaymentStatus } from "@a2seven/yoo-checkout/lib/types";

const statusPayment = (status: IPaymentStatus) => {
  switch (status) {
    case "canceled":
      return PaymentStatus.Cancelled;
    case "pending":
    case "waiting_for_capture":
      return PaymentStatus.Created;
    case "succeeded":
      return PaymentStatus.Successfully;
  }
};

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
  extendExpressApp: (app, createContext) => {
    app.use(bodyParser.json());

    app.post("/api/yookassa", async (req, res) => {
      console.log("/api/yookassa", req.body);

      const context = await createContext(req, res);

      const paymentYooKassa: Payment = req.body.object;
      const paymentId = paymentYooKassa.metadata.paymentId;
      const statusYooKassa = paymentYooKassa.status;

      const payment = await context.query.Payment.findOne({
        where: { id: paymentId },
        query: "id",
      });

      if (payment) {
        await context.query.Payment.updateOne({
          where: { id: paymentId },
          data: {
            status: statusPayment(statusYooKassa),
          },
        });
      }

      res.sendStatus(200);
    });
  },
};
