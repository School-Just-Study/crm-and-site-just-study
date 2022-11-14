import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import * as React from 'react';
import { FC, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { UserSubscription } from '@src/shared/lib/apollo/types';
import { formatShortDate } from '@shared/dateTime';
import CloseIcon from '@mui/icons-material/Close';
import { CardHovered } from '@shared/ui/CardHovered';
import { LessonItem } from './LessonItem';
import InfoIcon from '@mui/icons-material/Info';

export const Subscription: FC<{ subscription: UserSubscription }> = ({ subscription }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const start = formatShortDate(new Date(subscription.beginDate));
    const end = formatShortDate(new Date(subscription.endDate as string));
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => setOpen(false);

    return (
        <>
            <CardHovered raised sx={{ p: 2, cursor: 'pointer' }} onClick={() => setOpen(true)}>
                <Stack direction="row" gap={2}>
                    <Box bgcolor={theme.palette.primary.main} borderRadius="50%" p={1} display="flex" height="100%">
                        <CastForEducationIcon sx={{ color: 'white' }} fontSize="medium" />
                    </Box>
                    <Stack gap={1}>
                        <Typography fontWeight="bold">Абонемент: "{subscription.name}"</Typography>
                        {subscription.unlimited ? (
                            <Typography>Количество уроков: &#8734;</Typography>
                        ) : (
                            <Typography>
                                Осталось уроков: {subscription.lastCount} из {subscription.visitCount}
                            </Typography>
                        )}
                        <Typography>
                            Период: {start} - {end}
                        </Typography>
                        <Button variant="contained" startIcon={<InfoIcon />}>
                            Все уроки и записи
                        </Button>
                    </Stack>
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
                <DialogTitle mt={1}>Уроки</DialogTitle>
                <DialogContent>
                    <Box width={{ xs: '100%', sm: 400 }}>
                        <List sx={{ width: '100%' }}>
                            {subscription.lessons?.map((lesson) => (
                                <LessonItem key={lesson.id} lesson={lesson} />
                            ))}
                        </List>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
