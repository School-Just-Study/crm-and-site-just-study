import { Button, Card, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { Lesson } from '@src/shared/lib/apollo/types';
import { dateFormatWithTimeToString } from '@shared/dateTime/dateFormatWithTimeToString';
import { ButtonCancelLesson } from './ButtonCancelLesson';
import { ReschedulingButton } from '@src/pages/Profile/StudentCabinet/WidgetNextLesson/ReschedulingButton';
import { addMinutes, isAfter } from 'date-fns';

export const WidgetNextLesson: FC<{ nextStudentLesson: Lesson }> = ({ nextStudentLesson }) => {
    const date = dateFormatWithTimeToString(new Date(nextStudentLesson.startTime));
    const timeForEditIsOver = isAfter(new Date(), addMinutes(new Date(nextStudentLesson.startTime), -1440));

    const handleCLick = () => {
        if (nextStudentLesson?.teachers?.[0]?.linkOnlineLesson) {
            window.open(nextStudentLesson.teachers[0]?.linkOnlineLesson, '_blank');
        }
    };

    return (
        <Card raised sx={{ p: 2, height: '100%', display: 'flex' }}>
            <Stack gap={1} justifyItems="center">
                <Typography fontWeight="bold">📝 Следующий урок</Typography>
                <Typography>{date}</Typography>
                {!timeForEditIsOver ? (
                    <Stack direction="row" gap={1}>
                        <ReschedulingButton id={nextStudentLesson.id} />
                        <ButtonCancelLesson id={nextStudentLesson.id} />
                    </Stack>
                ) : (
                    <Button variant="contained" color="success" onClick={handleCLick}>
                        Войти на урок
                    </Button>
                )}
            </Stack>
        </Card>
    );
};
