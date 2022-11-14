import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useState } from 'react';
import { againGetScheduleParams } from '@src/pages/Profile/TeacherCabinet/Schedule/model/model';
import { resetSettingsEvent } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/model/model';
import { useMutation } from '@apollo/client';
import { CREATE_CUTOFF } from '@src/pages/Profile/TeacherCabinet/Schedule/AddCutoff/query';
import { useForm } from 'react-hook-form';
import { DateTimePickerElement } from 'react-hook-form-mui';
import { WorkTimeCutoffForm } from '@src/pages/Profile/TeacherCabinet/Schedule/AddCutoff/types';
import { localeDate } from '@src/shared/lib/localeDate';
import { useRouter } from 'next/router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';

export const AddCutoff = () => {
    const [open, setOpen] = useState(false);
    const [addCutoff, { loading }] = useMutation(CREATE_CUTOFF);
    const { control, handleSubmit, reset } = useForm<WorkTimeCutoffForm>();
    const { locale } = useRouter();
    const user = useUnit($user);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = handleSubmit(async (data) => {
        await addCutoff({ variables: { data: { ...data, manager: { connect: { id: user?.manager?.id } } } } });
        setOpen(false);
        againGetScheduleParams();
        resetSettingsEvent();
        reset();
    });

    return (
        <>
            <LoadingButton onClick={handleClickOpen} color="secondary">
                Добавить перерыв
            </LoadingButton>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={onSubmit}>
                    <DialogTitle>Добавить перерыв</DialogTitle>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeDate(locale as string)}>
                        <DialogContent>
                            <Stack my={1} direction="row" gap={1}>
                                <DateTimePickerElement
                                    control={control}
                                    disablePast
                                    name="startTime"
                                    label="Старт"
                                    validation={{ required: 'Введите дату и время' }}
                                />
                                <DateTimePickerElement
                                    disablePast
                                    control={control}
                                    name="endTime"
                                    label="Конец"
                                    validation={{ required: 'Введите дату и время' }}
                                />
                            </Stack>
                        </DialogContent>
                    </LocalizationProvider>

                    <DialogActions>
                        <Button onClick={handleClose} color="inherit">
                            Закрыть
                        </Button>
                        <LoadingButton type="submit" loading={loading} disabled={loading}>
                            Создать
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
