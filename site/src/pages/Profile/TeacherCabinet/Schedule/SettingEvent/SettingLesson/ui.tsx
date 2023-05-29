import * as React from 'react';
import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LESSON } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/SettingLesson/query';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { Lesson } from '@src/shared/lib/apollo/types';
import { Alert, Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { dateFormatWithTimeToString } from '@shared/dateTime/dateFormatWithTimeToString';
import { formatDateToTimeString } from '@shared/dateTime';
import { SetStatusLesson } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/SettingLesson/SetStatusLesson';
import { ReschedulingButton } from '@src/pages/Profile/StudentCabinet/WidgetNextLesson/ReschedulingButton';
import { ButtonCancelLesson } from '@src/pages/Profile/StudentCabinet/WidgetNextLesson/ButtonCancelLesson';

export const SettingLesson: FC<{ id: string }> = ({ id }) => {
    const { data, loading } = useQuery<{ lesson: Lesson }>(QUERY_LESSON, { variables: { id } });
    const theme = useTheme();

    if (!data?.lesson) {
        return <Alert severity="warning">Урок не найден</Alert>;
    }

    const date = `${dateFormatWithTimeToString(new Date(data.lesson.startTime))}-${formatDateToTimeString(
        new Date(data.lesson.endTime)
    )}`;

    return (
        <SpinnerWrapper loading={loading}>
            <Stack gap={2}>
                <Box display="flex" justifyContent="space-between">
                    <Stack>
                        <Typography>№ {data.lesson.id}</Typography>
                        <Typography>{date}</Typography>
                    </Stack>
                    <SetStatusLesson lesson={data.lesson} />
                </Box>

                {data.lesson.subscriptions?.map(({ id, student, name }) => (
                    <Box
                        key={id}
                        p={2}
                        borderRadius={2}
                        display="flex"
                        bgcolor={
                            theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[200]
                        }
                        gap={1}>
                        <Avatar variant="rounded" src={student?.avatar?.image?.url} />
                        <Stack>
                            <Typography fontWeight="bold">{student?.name}</Typography>
                            <Typography>{student?.client?.goal}</Typography>
                            <Typography>{student?.client?.profession}</Typography>
                            <Typography>
                                Абонемент №{id} - {name}
                            </Typography>
                        </Stack>
                    </Box>
                ))}

                <Stack gap={1}>
                    <Typography fontWeight="bold">Настройки</Typography>
                    <Stack gap={1}>
                        <ReschedulingButton id={id} variant="outlined" noFilter />
                        <ButtonCancelLesson id={id} variant="outlined" />
                    </Stack>
                </Stack>
            </Stack>
        </SpinnerWrapper>
    );
};
