import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

export const Title = styled(Typography)`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

export const Description = styled(Typography)`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const ImageWrapper = styled(Box)`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 1100px;
    border-top-right-radius: 300px;
    border-bottom-right-radius: 300px;
`;
