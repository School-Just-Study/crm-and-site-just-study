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

    const notEnoughSubs = data.lesson.subscriptions?.length !== data.lesson.students?.length;

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
                {notEnoughSubs && <Alert color="warning">Не все ученики имеют активный абонемент</Alert>}

                {data.lesson.students?.map(({ id, avatar, name, client }) => {
                    const sub = data?.lesson.subscriptions?.find(({ student }) => student?.id === id);
                    return (
                        <Box
                            key={id}
                            p={2}
                            borderRadius={2}
                            display="flex"
                            bgcolor={
                                theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[200]
                            }
                            gap={1}>
                            <Avatar variant="rounded" src={avatar?.image?.url} />
                            <Stack>
                                <Typography fontWeight="bold">{name}</Typography>
                                <Typography>{client?.goal}</Typography>
                                <Typography>{client?.profession}</Typography>
                                {sub ? (
                                    <>
                                        <Typography fontWeight="bold">
                                            Абонемент №{sub.id} - {sub.name}
                                        </Typography>
                                        <Typography>Осталось уроков {sub.unlimited ? '∞' : sub.lastCount}</Typography>
                                    </>
                                ) : (
                                    <Alert color="warning">Отсутствует активный абонемент</Alert>
                                )}
                            </Stack>
                        </Box>
                    );
                })}

                <Stack gap={1}>
                    <Typography fontWeight="bold">Настройки</Typography>
                    <Stack gap={1}>
                        <ReschedulingButton id={id} variant="outlined" />
                        <ButtonCancelLesson id={id} variant="outlined" />
                    </Stack>
                </Stack>
            </Stack>
        </SpinnerWrapper>
    );
};
