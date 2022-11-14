import { FC } from "react";
import { Direction } from "@src/shared/lib/apollo/types";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { transition } from "@src/shared/lib/transition";
import { directionPage } from "@translations/directionPage";
import { ILanguages } from "@src/shared/modules/constants";

export const Goals: FC<Pick<Direction, 'goals'>> = ({ goals }) => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(directionPage, locale as ILanguages);

    return (
        <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A200} pb={4}>
            <Container maxWidth="xl">
                <Box py={4} px={{ xs: 0, md: 4 }} display="flex" flexDirection="column">
                    <Typography variant="h2">{t.goalsTitle}</Typography>
                    <Box mt={2} display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr 1fr' }} gap={3}>
                        {goals?.map(({ name, image, id }) => (
                            <Box key={id} textAlign="center">
                                <Box position="relative" height={300} width="100%" minHeight={300}>
                                    <img
                                        src={image?.url as string}
                                        alt={name as string}
                                        width="100%"
                                        height="100%"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                <Typography variant="h6">{name}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
