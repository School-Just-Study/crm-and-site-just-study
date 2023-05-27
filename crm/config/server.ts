import { KeystoneConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import { SERVER_PORT } from './index';
import bodyParser from 'body-parser';
import { handleYooKassa } from '../utils/handleYooKassa';
import { handleStudentCalendar } from '../utils/handleStudentCalendar';
import { handleTeacherCalendar } from '../utils/handleTeacherCalendar';
import { handleNotificationStudentLesson } from '../schemas/lessons/notifications/handleNotificationStudentLesson';
import { handleCheckUserSubscription } from '../utils/handleCheckUserSubscription';
import { getStudents } from '../utils/getStudents';
import { getManagers } from '../utils/getManagers';
import { handlePayture } from '../utils/handlePayture';
import { handleNotificationStudentMissYou } from '../utils/handleNotificationStudentMissYou';
import { handleSyncCalendarManagers } from '../utils/handleSyncCalendarManagers';
import { updateCurrency } from '../utils/updateCurrency';

export const server: KeystoneConfig['server'] = {
    port: SERVER_PORT,
    healthCheck: {
        path: '/check',
        data: () => ({
            status: 'healthy',
            timestamp: Date.now(),
            uptime: process.uptime()
        })
    },
    extendExpressApp: (app, createContext) => {
        app.use(bodyParser.json());

        handleYooKassa?.(app, createContext);
        handlePayture?.(app, createContext);
        handleStudentCalendar?.(app, createContext);
        handleTeacherCalendar?.(app, createContext);
        handleNotificationStudentLesson?.(app, createContext);
        handleCheckUserSubscription?.(app, createContext);
        getStudents?.(app, createContext);
        getManagers?.(app, createContext);
        handleNotificationStudentMissYou?.(app, createContext);
        handleSyncCalendarManagers?.(app, createContext);
        updateCurrency?.(app, createContext);
    }
};
