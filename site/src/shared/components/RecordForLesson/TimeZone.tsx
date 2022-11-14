import { Alert } from '@mui/material';
import { format } from 'date-fns';
import jstz from 'jstz';

export const TimeZone = () => {
    const timeZone = jstz.determine().name();
    const utc = format(new Date(), 'OOOO');

    return (
        <Alert severity="warning" style={{ marginBottom: 10 }}>
            Указаны временные слоты по вашему местному времени {timeZone} ({utc})
        </Alert>
    );
};
