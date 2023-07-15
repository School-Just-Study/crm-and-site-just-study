import {
    Alert,
    Box,
    Button,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { columns, defaultWorkTime } from './const';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_WORK_TIME, GET_WORK_TIME, UPDATE_WORK_TIME } from '@src/pages/Profile/TeacherCabinet/WorkTime/query';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { EditWorkTime } from './EditWorkTime';
import { ViewWorkTime } from './ViewWorkTime';
import { Query } from '@src/shared/lib/apollo/types';
import { FormProvider, useForm } from 'react-hook-form';
import { WorKCalendarForm } from '@src/pages/Profile/TeacherCabinet/WorkTime/types';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { formatSchedule, formatUpdateSchedule } from '@src/pages/Profile/TeacherCabinet/WorkTime/EditWorkTime/lib';
import { LoadingButton } from '@mui/lab';
import jstz from 'jstz';

export const WorkTime = () => {
    const [viewEdit, setViewEdit] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const methods = useForm<WorKCalendarForm>({
        defaultValues: defaultWorkTime
    });
    const {
        handleSubmit,
        setValue,
        formState: { isDirty }
    } = methods;
    const user = useUnit($user);
    const { data, loading: loadingSchedule } = useQuery<Query>(GET_WORK_TIME, { variables: { id: user?.manager?.id } });
    const [createWorkTime, createWorkTimeState] = useMutation(CREATE_WORK_TIME, {
        refetchQueries: [{ query: GET_WORK_TIME, variables: { id: user?.manager?.id } }]
    });
    const [updateWorkTime, updateWorkTimeState] = useMutation(UPDATE_WORK_TIME, {
        refetchQueries: [{ query: GET_WORK_TIME, variables: { id: user?.manager?.id } }]
    });

    useEffect(() => {
        setViewEdit(!data?.workTimes?.length);
        if (data?.workTimes?.length) {
            setValue('workTime', data.workTimes);
            setIsUpdate(true);
        }
    }, [data, loadingSchedule]);

    const onSubmit = handleSubmit(async (data) => {
        if (!isUpdate) {
            const formatData = formatSchedule(data, user!.manager!.id);
            const timeZone = jstz.determine().name();
            await createWorkTime({ variables: { data: formatData, id: user?.manager?.id, timeZone } });
        } else {
            const formatData = formatUpdateSchedule(data, user!.manager!.id);
            const timeZone = jstz.determine().name();
            await updateWorkTime({ variables: { data: formatData, id: user?.manager?.id, timeZone } });
        }
        setViewEdit(false);
    });

    const loading = createWorkTimeState.loading || updateWorkTimeState.loading;
    const timeZoneLocal = jstz.determine().name();

    return (
        <SpinnerWrapper loading={loadingSchedule}>
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <Alert>Время указано по местному часовому поясу {timeZoneLocal}</Alert>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map(({ title }, index) => (
                                        <TableCell key={index}>{title}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>{viewEdit ? <EditWorkTime /> : <ViewWorkTime />}</TableBody>
                        </Table>
                    </TableContainer>
                    <Box mt={1} display="flex" justifyContent="end">
                        {viewEdit ? (
                            <Stack gap={1} direction="row">
                                <Button color="error" onClick={() => setViewEdit(false)}>
                                    Отменить
                                </Button>
                                <LoadingButton type="submit" loading={loading} disabled={loading || !isDirty}>
                                    Сохранить
                                </LoadingButton>
                            </Stack>
                        ) : (
                            <Button onClick={() => setViewEdit(true)}>Изменить</Button>
                        )}
                    </Box>
                </form>
            </FormProvider>
        </SpinnerWrapper>
    );
};
