import { Box, Button, Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Query } from '@src/shared/lib/apollo/types';
import { QUERY_TEACHER } from './query';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { formatBusinessHours, formatSchedule } from './utils';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { setSettingsEvent } from './SettingEvent/model/model';
import { SettingEvent } from './SettingEvent';
import './model/init';
import { $schedule, againGetScheduleParams, setScheduleParams } from './model/model';
import { NotifyOtherTimeZone } from './NotifyOtherTimeZone';
import { AddCutoff } from './AddCutoff';
import jstz from 'jstz';
import { BusinessHoursInput, EventSourceInput } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleData } from './types';

export const Schedule = () => {
    const [businessHours, setBusinessHours] = useState<BusinessHoursInput | undefined>();
    const [otherTimeZone, setOtherTimeZone] = useState(false);
    const [events, setEvents] = useState<EventSourceInput | undefined>();
    const user = useUnit($user);
    const schedule = useUnit($schedule);
    const queryTeacher = useQuery<Query>(QUERY_TEACHER, { variables: { id: user?.manager?.id } });

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
                    setScheduleParams({ start, end });
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
