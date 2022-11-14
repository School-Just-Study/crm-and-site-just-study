import { Alert, AlertTitle, Backdrop, Button, Card, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useRouter } from 'next/router';
import jstz from 'jstz';
import { NotifyOtherTimeZoneProps } from './types';

export const NotifyOtherTimeZone: FC<NotifyOtherTimeZoneProps> = ({ open, timeZone, onClose }) => {
    const { push } = useRouter();

    const handleClose = () => {
        push(`?tab=2`);
    };

    const newTimeZone = jstz.determine().name();

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Card sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Alert color="warning">
                    <AlertTitle>Внимание</AlertTitle>
                    <Typography>Вам необходимо обновить рабочее расписание.</Typography>
                    {timeZone && (
                        <Typography>
                            Установлен часовой пояс "{timeZone}", на устройства обнаружен часовой пояс "{newTimeZone}".
                        </Typography>
                    )}
                    <Typography>
                        Нажмите на кнопку "Обновить расписание" и установите новый график работы, по вашему местному
                        времени.
                    </Typography>
                </Alert>
                <Stack direction="row" gap={2} mt={1}>
                    <Button onClick={handleClose}>Обновить расписание</Button>
                    <Button onClick={onClose}>Закрыть</Button>
                </Stack>
            </Card>
        </Backdrop>
    );
};
