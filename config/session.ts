import { KeystoneConfig } from "@keystone-6/core/dist/declarations/src/types/config";
import { statelessSessions } from "@keystone-6/core/session";
import { SESSION_SECRET } from "./index";

export const session: KeystoneConfig["session"] = statelessSessions({
  secret: SESSION_SECRET,
  maxAge: 60 * 60 * 24,
});
