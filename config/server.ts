import { KeystoneConfig } from "@keystone-6/core/dist/declarations/src/types/config";
import { FRONTEND_URL, SERVER_PORT } from "./index";
import bodyParser from "body-parser";
import { handleYooKassa } from "../utils/handleYooKassa";
import { handleStudentCalendar } from "../utils/handleStudentCalendar";
import { handleTeacherCalendar } from "../utils/handleTeacherCalendar";

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

    handleYooKassa!(app, createContext);
    handleStudentCalendar!(app, createContext);
    handleTeacherCalendar!(app, createContext);
  },
};
