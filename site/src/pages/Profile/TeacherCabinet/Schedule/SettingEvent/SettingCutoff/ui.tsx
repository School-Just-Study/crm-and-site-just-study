import * as React from 'react';
import { FC } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WorkTimeCutoff } from '@src/shared/lib/apollo/types';
import { QUERY_CUTOFF, UPDATE_CUTOFF } from './query';
import { Alert, Box, Stack, Typography } from '@mui/material';
import { dateFormatWithTimeToString } from '@shared/dateTime/dateFormatWithTimeToString';
import { formatDateToTimeString } from '@shared/dateTime';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { LoadingButton } from '@mui/lab';
import { ViewStatus } from '@shared/enums/view-status';
import { againGetScheduleParams } from '@src/pages/Profile/TeacherCabinet/Schedule/model/model';
import { resetSettingsEvent } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/model/model';

export const SettingCutoff: FC<{ id: string }> = ({ id }) => {
    const { data, loading } = useQuery<{ workTimeCutoff: WorkTimeCutoff }>(QUERY_CUTOFF, { variables: { id } });
    const [updateCutoff, updateCutoffState] = useMutation(UPDATE_CUTOFF);

    if (!data?.workTimeCutoff) {
        return <Alert severity="warning">Cutoff не найден</Alert>;
    }

    const date = `${dateFormatWithTimeToString(new Date(data.workTimeCutoff.startTime))}-${formatDateToTimeString(
        new Date(data.workTimeCutoff.endTime)
    )}`;

    const handleCancel = async () => {
        await updateCutoff({ variables: { id, data: { statusView: ViewStatus.Hide } } });
        againGetScheduleParams();
        resetSettingsEvent();
    };

    return (
        <SpinnerWrapper loading={loading}>
            <Stack gap={2}>
                <Box display="flex" justifyContent="space-between">
                    <Stack>
                        <Typography>№ {data.workTimeCutoff.id}</Typography>
                        <Typography>{date}</Typography>
                    </Stack>
                    <LoadingButton
                        color="error"
                        loading={updateCutoffState.loading}
                        disabled={updateCutoffState.loading}
                        onClick={handleCancel}>
                        Удалить
                    </LoadingButton>
                </Box>
            </Stack>
        </SpinnerWrapper>
    );
};
