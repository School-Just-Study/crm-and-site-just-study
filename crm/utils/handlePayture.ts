import { ServerConfig } from "@keystone-6/core/dist/declarations/src/types/config";

export const handlePayture: ServerConfig<any>["extendExpressApp"] = (
  app,
  createContext
) => {
  app.post("/api/payture", async (req, res) => {
    console.info(new Date(), "post payture");

    console.log("body", "/api/payture", req.body);
    console.log("query", "/api/payture", req.query);

    res.sendStatus(200);
  });
};
