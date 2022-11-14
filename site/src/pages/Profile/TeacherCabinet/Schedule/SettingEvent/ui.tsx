import { useUnit } from 'effector-react';
import { $settingsEvent, resetSettingsEvent } from './model/model';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { EventType } from '@src/pages/Profile/TeacherCabinet/Schedule/types';
import { SettingLesson } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/SettingLesson';
import { SettingCutoff } from '@src/pages/Profile/TeacherCabinet/Schedule/SettingEvent/SettingCutoff';

export const SettingEvent = () => {
    const settingsEvent = useUnit($settingsEvent);
    const title = settingsEvent?.type === EventType.Lesson ? 'Урок' : 'Перерыв';

    const handleClose = () => resetSettingsEvent();

    return (
        <Dialog open={Boolean(settingsEvent)} onClose={handleClose}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500]
                }}>
                <CloseIcon />
            </IconButton>
            <DialogTitle mt={1}>{title}</DialogTitle>
            <DialogContent>
                <Box width={{ xs: '100%', sm: 400 }}>
                    {settingsEvent?.type === EventType.Lesson && <SettingLesson id={settingsEvent.id} />}
                    {settingsEvent?.type === EventType.Cutoff && <SettingCutoff id={settingsEvent.id} />}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};
