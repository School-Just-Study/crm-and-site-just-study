import { FC } from 'react';
import { Direction } from '@src/shared/lib/apollo/types';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CourseCard } from '@src/pages/Directions/CourseCard';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { directionsPage } from '@translations/directionsPage';
import { useQuery } from '@apollo/client';
import { QUERY_DIRECTIONS } from '@src/pages/Directions/query';

export const Courses: FC = () => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(directionsPage, locale);
    const { data } = useQuery<{ directions: Direction[] }>(QUERY_DIRECTIONS, {
        variables: { lang: locale },
        fetchPolicy: 'cache-and-network'
    });

    if (!data) return null;
    if (!data.directions.length) return null;

    return (
        <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A200} pb={4}>
            <Container maxWidth="xl">
                <Box py={4} px={{ xs: 0, md: 4 }} display="flex" flexDirection="column">
                    <Typography variant="h2" mb={3}>
                        {t.coursesTitle}
                    </Typography>
                    <Stack
                        display="grid"
                        justifyItems="center"
                        gridTemplateColumns={{
                            xs: '1fr',
                            sm: '1fr 1fr',
                            md: '1fr 1fr 1fr'
                        }}
                        gap={4}
                        direction="row"
                        width="100%">
                        {data.directions.map((direction) => (
                            <CourseCard key={direction.id} direction={direction} />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};
