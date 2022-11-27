import { Box, Stack, Typography } from '@mui/material';
import SvgJustStudyLogo from '@src/shared/icons/SvgJustStudyLogo';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export const Logo = () => {
    const theme = useTheme();

    return (
        <Box bgcolor={theme.palette.primary.main} position="absolute">
            <Box py={2} px={0} display="flex">
                <Stack
                    alignItems="center"
                    gap={1}
                    direction="row"
                    p={1}
                    bgcolor={theme.palette.background.paper}
                    borderRadius={20}>
                    <SvgJustStudyLogo width={60} />
                    <Typography variant="h2">Just Study</Typography>
                </Stack>
            </Box>
        </Box>
    );
};
