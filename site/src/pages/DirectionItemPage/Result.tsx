import { FC } from 'react';
import { Direction } from '@src/shared/lib/apollo/types';
import { Box, Container, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { directionPage } from '@translations/directionPage';
import { ILanguages } from '@src/shared/modules/constants';

export const Result: FC<Pick<Direction, 'results'>> = ({ results }) => {
    const { locale } = useRouter();
    const t = transition(directionPage, locale as ILanguages);

    return (
        <Container maxWidth="xl">
            <Box py={4} px={{ xs: 0, md: 4 }}>
                <Typography variant="h2">{t.resultTitle}</Typography>
                <Box mt={2} display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3}>
                    {results?.map(({ id, name }) => (
                        <Stack key={id} gap={1} direction="row">
                            <CheckCircleIcon color="success" />
                            <Typography alignItems="center">{name}</Typography>
                        </Stack>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};
