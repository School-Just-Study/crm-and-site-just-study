import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { RecordForLesson } from '@shared/components/RecordForLesson';
import CloseIcon from '@mui/icons-material/Close';
import { CardHovered } from '@shared/ui/CardHovered';

export const WidgetRecordLesson = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => setOpen(false);

    return (
        <>
            <CardHovered
                raised
                sx={{ p: 2, height: '100%', display: 'flex', cursor: 'pointer' }}
                onClick={() => setOpen(true)}>
                <Stack gap={1} m="auto 0">
                    <Typography fontWeight="bold" fontSize="larger">
                        ✍🏻 Записаться на урок
                    </Typography>
                </Stack>
            </CardHovered>
            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
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
                <DialogTitle mt={1}>✍🏻 Запись на урок</DialogTitle>
                <DialogContent>
                    <Box width={{ xs: '100%', sm: 400 }}>
                        <RecordForLesson handleClose={handleClose} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
