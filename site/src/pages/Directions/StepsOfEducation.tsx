import { FC } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import video from './images/video.png';
import platform from './images/platform.png';
import lesson from './images/lesson.png';
import homework from './images/homework.png';
import { StepItem } from '@src/pages/Directions/StepItem';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { directionsPage } from '@translations/directionsPage';

export const steps = [
    { image: video, title: 'Смотрите видео-урок' },
    { image: platform, title: 'Выполните тренировочное задание на платформе' },
    { image: lesson, title: 'Приходите на онлайн-урок для отработки выученной темы' },
    { image: homework, title: 'Выполните домашнее задание для следующего урока' }
];

export const StepsOfEducation: FC = () => {
    const { locale } = useRouter();
    const t = transition(directionsPage, locale);

    return (
        <Container maxWidth="xl">
            <Box py={4} px={{ xs: 0, md: 4 }} display="flex" flexDirection="column">
                <Typography variant="h2" mb={3}>
                    {t.stepsTitle}
                </Typography>
                <Stack
                    display="grid"
                    justifyItems="center"
                    gridTemplateColumns={{
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr 1fr'
                    }}
                    gap={4}
                    direction="row"
                    width="100%">
                    {steps.map((step, index) => (
                        <StepItem key={index} step={step} />
                    ))}
                </Stack>
            </Box>
        </Container>
    );
};
