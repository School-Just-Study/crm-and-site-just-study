import FullCalendar, { BusinessHoursInput, EventSourceInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Button, Stack } from '@mui/material';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@apollo/client';
import { Query } from '@src/shared/lib/apollo/types';
import { QUERY_TEACHER } from '@src/pages/Profile/TeacherCabinet/Schedule/query';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { formatBusinessHours, formatSchedule } from '@src/pages/Profile/TeacherCabinet/Schedule/utils';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScheduleData } from '@src/pages/Profile/TeacherCabinet/Schedule/types';
import { setSettingsEvent } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/model/model';
import { SettingEvent } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent';
import './model/init';
import {
    $schedule,
    againGetScheduleParams,
    setScheduleParams
} from '@src/pages/Profile/TeacherCabinet/Schedule/model/model';
import { NotifyOtherTimeZone } from './NotifyOtherTimeZone';
import { AddCutoff } from '@src/pages/Profile/TeacherCabinet/Schedule/AddCutoff';
import jstz from 'jstz';
import { getScheduleFx } from '@src/pages/Profile/TeacherCabinet/Schedule/model/effects';

export const Schedule = () => {
    const [businessHours, setBusinessHours] = useState<BusinessHoursInput | undefined>();
    const [otherTimeZone, setOtherTimeZone] = useState(false);
    const [events, setEvents] = useState<EventSourceInput | undefined>();
    const [period, setPeriod] = useState({ start: new Date(), end: new Date() });
    const user = useUnit($user);
    const schedule = useUnit($schedule);
    const queryTeacher = useQuery<Query>(QUERY_TEACHER, { variables: { id: user?.manager?.id } });
    const loading = useUnit(getScheduleFx.pending);

    useEffect(() => {
        if (user?.manager?.id) {
            setScheduleParams({ teacherId: user?.manager?.id, ...period });
        }
    }, [period, user?.manager?.id, queryTeacher.data]);

    useEffect(() => {
        setOtherTimeZone(jstz.determine().name() !== queryTeacher.data?.manager?.timeZone);
    }, [queryTeacher.data]);

    useEffect(() => {
        if (queryTeacher.data?.manager?.workTime) {
            const formatHours = formatBusinessHours(
                queryTeacher.data.manager.workTime,
                queryTeacher.data.manager.timeZone as string
            );
            setBusinessHours(formatHours);
        }
    }, [queryTeacher.data]);

    useEffect(() => {
        if (schedule) {
            const formatEvents = formatSchedule(schedule as ScheduleData);
            setEvents(formatEvents);
        }
    }, [schedule]);

    const initialView = window.innerWidth < 700 ? 'timeGridDay' : 'timeGridWeek';

    const handleCLick = () => {
        if (queryTeacher.data?.manager?.linkOnlineLesson) {
            window.open(queryTeacher.data?.manager?.linkOnlineLesson, '_blank');
        }
    };

    return (
        <Box height="650px">
            <Stack direction="row" mb={1} gap={1}>
                <Button onClick={() => againGetScheduleParams()}>Обновить</Button>
                <AddCutoff />
                <Button variant="contained" color="success" onClick={handleCLick}>
                    Войти на урок
                </Button>
            </Stack>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView={initialView}
                loading={() => loading}
                headerToolbar={{ center: 'today prev,next', end: 'timeGridDay,timeGridWeek' }}
                locale="ru"
                height="100%"
                events={events}
                scrollTime="08:00"
                nowIndicator
                // editable
                businessHours={businessHours}
                firstDay={1}
                eventClick={({ event }) => {
                    setSettingsEvent({ id: event.id, type: event.extendedProps.type });
                }}
                datesSet={({ start, end }) => {
                    setPeriod({ start, end });
                }}
            />
            <SettingEvent />
            <NotifyOtherTimeZone
                open={otherTimeZone}
                timeZone={user?.manager?.timeZone as string}
                onClose={() => setOtherTimeZone(false)}
            />
        </Box>
    );
};
