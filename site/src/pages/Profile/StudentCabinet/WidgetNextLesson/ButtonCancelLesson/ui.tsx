import { FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ButtonCancelLessonProps } from './types';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CANCEL_LESSON } from '@src/pages/Profile/StudentCabinet/WidgetNextLesson/ButtonCancelLesson/query';
import { againGetScheduleParams } from '@src/pages/Profile/TeacherCabinet/Schedule/model/model';
import { resetSettingsEvent } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/model/model';
import { QUERY_STUDENT_CABINET } from '@shared/components/Orders/query';

export const ButtonCancelLesson: FC<ButtonCancelLessonProps> = ({ id, ...props }) => {
    const [open, setOpen] = useState(false);
    const user = useUnit($user);
    const [cancelLesson, { loading, error, data }] = useMutation(CANCEL_LESSON, {
        variables: { id },
        refetchQueries: [{ query: QUERY_STUDENT_CABINET, variables: { userId: user!.id } }]
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error) {
            enqueueSnackbar('Произошла ошибка при отмене урока', { variant: 'error' });
        }
        if (data) {
            enqueueSnackbar('Урок отменен', { variant: 'success' });
        }
    }, [error, data]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancel = async () => {
        await cancelLesson();
        setOpen(false);
        againGetScheduleParams();
        resetSettingsEvent();
    };

    return (
        <>
            <LoadingButton variant="contained" color="error" fullWidth {...props} onClick={handleClickOpen}>
                Отменить
            </LoadingButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Подтвердите отмену урока</DialogTitle>
                <DialogContent>
                    <DialogContentText>Вы уверены, что хотите отменить урок?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <LoadingButton color="error" onClick={handleCancel} loading={loading} disabled={loading}>
                        Отменить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};
