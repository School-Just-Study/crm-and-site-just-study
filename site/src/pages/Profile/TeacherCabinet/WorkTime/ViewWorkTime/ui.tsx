import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { useQuery } from '@apollo/client';
import { GET_WORK_TIME } from '@src/pages/Profile/TeacherCabinet/WorkTime/query';
import { Box, TableCell, TableRow } from '@mui/material';
import { Query } from '@src/shared/lib/apollo/types';
import { formatDayOfWeek } from '@shared/dateTime';
import { formatDateForString } from '@src/pages/Profile/TeacherCabinet/Schedule/utils';

export const ViewWorkTime = () => {
    const user = useUnit($user);
    const { data } = useQuery<Query>(GET_WORK_TIME, { variables: { id: user?.manager?.id } });

    const timeZone = data?.manager?.timeZone || 'Europe/Moscow';

    return (
        <>
            {data?.workTimes?.map(({ id, dayOfWeek, isDayOff, startTime, endTime }) => (
                <TableRow key={id}>
                    <TableCell>{formatDayOfWeek(dayOfWeek as number)}</TableCell>
                    <TableCell>{isDayOff ? 'Выходной' : 'Рабочий'}</TableCell>
                    <TableCell hidden={isDayOff as boolean}>
                        {!isDayOff && <Box>{formatDateForString(startTime as string, timeZone)}</Box>}
                    </TableCell>
                    <TableCell hidden={isDayOff as boolean}>
                        {!isDayOff && <Box>{formatDateForString(endTime as string, timeZone)}</Box>}
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};
