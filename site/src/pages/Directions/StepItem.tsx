import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { steps } from '@src/pages/Directions/StepsOfEducation';
import Image from 'next/image';

export const StepItem: FC<{ step: typeof steps[0] }> = ({ step }) => {
    const { image, title } = step;
    return (
        <Stack gap={3} textAlign="center">
            <Box sx={{ minHeight: 270, position: 'relative' }}>
                <Image src={image} alt={title} fill style={{ objectFit: 'contain' }} />
            </Box>
            <Typography fontSize="large" fontWeight="bold">
                {title}
            </Typography>
        </Stack>
    );
};
