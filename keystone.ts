import { config } from "@keystone-6/core";
import { lists } from "./schemas/lists";
import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";

const { DATABASE_URL, FRONTEND_URL } = process.env;

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: { fields: ["name", "email", "password"] },
});

export default withAuth(
  config({
    server: {
      port: 8000,
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    db: { provider: "postgresql", url: DATABASE_URL! },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    lists,
    storage: {
      local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${FRONTEND_URL}/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: `public/images`,
      },
    },
    session: statelessSessions({
      secret: "3494c9e4-49c1-4834-9f4e-6b14baabb5d3",
      maxAge: 60 * 60 * 24,
    }),
    ui: {},
  })
);
