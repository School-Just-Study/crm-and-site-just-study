import { Alert, AlertTitle, Typography } from '@mui/material';
import { FC } from 'react';
import jstz from 'jstz';
import { NotifyOtherTimeZoneProps } from './types';

export const NotifyOtherTimeZone: FC<NotifyOtherTimeZoneProps> = ({ timeZone }) => {
    const newTimeZone = jstz.determine().name();

    return (
        <Alert color="warning">
            <AlertTitle>Внимание</AlertTitle>
            {timeZone && (
                <Typography>
                    График работы настроен по часовому поясу "{timeZone}", на устройства обнаружен часовой пояс "
                    {newTimeZone}". Вам необходимо обновить рабочее расписание.
                </Typography>
            )}
        </Alert>
    );
};
