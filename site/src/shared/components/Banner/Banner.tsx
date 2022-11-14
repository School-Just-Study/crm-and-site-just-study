import { FC, ReactNode } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BoxProps } from '@mui/material/Box/Box';

interface IBanner extends BoxProps {
    title: string;
    desc?: ReactNode | string;
    picture?: ReactNode;
    buttonText?: string;
    alignPicture?: 'left' | 'right';
}

export const Banner: FC<IBanner> = ({ title, desc, picture, buttonText, alignPicture = 'right', ...boxProps }) => {
    const theme = useTheme();

    const gridTemplateColumns = picture
        ? alignPicture === 'right'
            ? { xs: '1fr', md: '1fr 40%', lg: '1fr 30%' }
            : { xs: '1fr', md: '40% 1fr ', lg: '30% 1fr ' }
        : { xs: '1fr' };

    return (
        <Box bgcolor={theme.palette.primary.main}>
            <Container maxWidth="xl">
                <Box py={4} px={{ xs: 0, md: 4 }}>
                    <Box
                        display="grid"
                        gridTemplateColumns={gridTemplateColumns}
                        gap={4}
                        alignItems="center"
                        {...boxProps}>
                        {alignPicture === 'left' && picture}
                        <Stack
                            direction="column"
                            gap={2}
                            alignItems="flex-start"
                            color="white"
                            display="flex"
                            overflow="auto">
                            <Typography variant="h1" color="white">
                                {title}
                            </Typography>
                            {desc && <Box>{desc}</Box>}
                            {buttonText && (
                                <Button
                                    variant="contained"
                                    sx={{ px: 5 }}
                                    color="success"
                                    size="large"
                                    href="#form-lead">
                                    {buttonText}
                                </Button>
                            )}
                        </Stack>
                        {picture && alignPicture === 'right' && picture}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
