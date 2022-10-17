import { ServerConfig } from "@keystone-6/core/dist/declarations/src/types/config";

export const handleYooKassa: ServerConfig<any>["extendExpressApp"] = (
  app,
  createContext
) => {
  app.post("/api/payture", async (req, res) => {
    console.log("body", "/api/payture", req.body);
    console.log("query", "/api/payture", req.query);

    // const context = await createContext(req, res);
    //
    // const paymentYooKassa: Payment = req.body.object;
    // const paymentId = paymentYooKassa.metadata.paymentId;
    // const statusYooKassa = paymentYooKassa.status;
    //
    // const payment = await context.query.Payment.findOne({
    //   where: { id: paymentId },
    //   query: "id",
    // });
    //
    // if (payment) {
    //   await context.query.Payment.updateOne({
    //     where: { id: paymentId },
    //     data: {
    //       status: getStatusPayment(statusYooKassa),
    //     },
    //   });
    // }
    //
    // res.sendStatus(200);
  });
};
