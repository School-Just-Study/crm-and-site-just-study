import "dotenv/config";
import { config } from "@keystone-6/core";
import { lists } from "./schemas/lists";
import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";
import { DATABASE_URL, SERVER_PORT } from "./config";
import { storage } from "./config/storage";
import { insertSeedData } from "./seed-data";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: { fields: ["name", "email", "phone", "role", "password"] },
});

export default withAuth(
  config({
    server: {
      port: SERVER_PORT,
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    db: {
      provider: "mysql",
      url: DATABASE_URL,
      idField: { kind: "autoincrement" },
      async onConnect(context) {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        } else {
          return;
        }
      },
    },
    experimental: {
      enableNextJsGraphqlApiEndpoint: true,
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    lists,
    storage,
    session: statelessSessions({
      secret: "3494c9e4-49c1-4834-9f4e-6b14baabb5d3",
      maxAge: 60 * 60 * 24,
    }),
  })
);
