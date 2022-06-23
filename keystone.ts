import { config } from "@keystone-6/core";
import { lists } from "./schemas/lists";

const { DATABASE_URL, BACKEND_URL } = process.env;

const url =
  DATABASE_URL || "postgres://juststudy:juststudy@localhost:5432/juststudy";

export default config({
  db: { provider: "postgresql", url, enableLogging: true },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists,
  storage: {
    local_images: {
      kind: "local",
      type: "image",
      generateUrl: (path) => `${BACKEND_URL}/images${path}`,
      serverRoute: {
        path: "/images",
      },
      storagePath: `public/images`,
    },
  },
});
