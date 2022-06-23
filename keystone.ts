import { config } from "@keystone-6/core";
import { lists } from "./schemas/lists";

export default config({
  db: { provider: "postgresql", url: "file:./app.db" },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists,
});
