import { KeystoneConfig } from "@keystone-6/core/dist/declarations/src/types/config";
import { FRONTEND_URL, SERVER_PORT } from "./index";
import bodyParser from "body-parser";
import { handleYooKassa } from "../utils/handleYooKassa";
import { handleStudentCalendar } from "../utils/handleStudentCalendar";
import { handleTeacherCalendar } from "../utils/handleTeacherCalendar";
import { handleNotificationStudentLesson } from "../utils/handleNotificationStudentLesson";
import { handleCheckUserSubscription } from "../utils/handleCheckUserSubscription";
import { getStudents } from "../utils/getStudents";
import { getManagers } from "../utils/getManagers";

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

    if (handleYooKassa) {
      handleYooKassa(app, createContext);
    }
    if (handleStudentCalendar) {
      handleStudentCalendar(app, createContext);
    }
    if (handleTeacherCalendar) {
      handleTeacherCalendar(app, createContext);
    }
    if (handleNotificationStudentLesson) {
      handleNotificationStudentLesson(app, createContext);
    }
    if (handleCheckUserSubscription) {
      handleCheckUserSubscription(app, createContext);
    }
    if (getStudents) {
      getStudents(app, createContext);
    }
    if (getManagers) {
      getManagers(app, createContext);
    }
  },
};
