import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery
} from '@mui/material';
import * as React from 'react';
import { FC, useState } from 'react';
import { ReschedulingLesson } from '@shared/components/ReschedulingLesson';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { ReschedulingButtonProps } from './types';

export const ReschedulingButton: FC<ReschedulingButtonProps> = ({ id, noFilter, ...props }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Button variant="contained" color="secondary" fullWidth {...props} onClick={handleClickOpen}>
                Перенести
            </Button>
            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}>
                    <CloseIcon />
                </IconButton>
                <DialogTitle>Перенос урока</DialogTitle>
                <DialogContent>
                    <Box width={{ xs: '100%', sm: 400 }}>
                        <ReschedulingLesson id={id} handleClose={handleClose} noFilter={noFilter} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
