import * as React from 'react';
import { FC } from 'react';
import { Lesson } from '@src/shared/lib/apollo/types';
import { Box, Chip, Divider, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { dateFormatWithTimeToString } from '@shared/dateTime/dateFormatWithTimeToString';
import { addMinutes, isAfter } from 'date-fns';
import { ReschedulingButton } from '@src/pages/Profile/StudentCabinet/WidgetNextLesson/ReschedulingButton';
import { ButtonCancelLesson } from '@src/pages/Profile/StudentCabinet/WidgetNextLesson/ButtonCancelLesson';
import { LessonStatus } from '@shared/enums/lesson-status';

export const LessonItem: FC<{ lesson: Lesson }> = ({ lesson }) => {
    const title = lesson.title || 'Урок';
    const date = dateFormatWithTimeToString(new Date(lesson.startTime));
    const teachersString = lesson.teachers?.map(({ name }) => name)?.join(', ');
    const timeForEditIsOver = isAfter(new Date(), addMinutes(new Date(lesson.startTime), -1440));

    return (
        <>
            <ListItem alignItems="flex-start">
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Stack alignItems="flex-start">
                        <ListItemText primary={title} secondary={`${date} - ${teachersString}`} />
                        {lesson.description && <Typography>{lesson.description}</Typography>}
                        <Stack direction="row" gap={1}>
                            {lesson.trial && <Chip label="Пробный" size="small" variant="outlined" />}
                            {lesson.statusLesson === LessonStatus.Completed && !lesson.burned && (
                                <Chip label="Проведен" size="small" variant="outlined" color="success" />
                            )}
                            {lesson.burned && <Chip label="Сгорел" size="small" variant="outlined" color="error" />}
                        </Stack>
                    </Stack>
                    {!timeForEditIsOver && lesson.statusLesson !== LessonStatus.Completed && (
                        <Stack gap={1}>
                            <ReschedulingButton id={lesson.id} variant="outlined" size="small" />
                            <ButtonCancelLesson id={lesson.id} variant="outlined" size="small" />
                        </Stack>
                    )}
                </Box>
            </ListItem>
            <Divider component="li" />
        </>
    );
};
