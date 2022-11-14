import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

export const DescWrapper = styled(Typography)<{ steps: number }>`
    width: 100%;
    animation: ${({ steps }) => `typing 2s steps(${steps}), blink 0.5s step-end infinite alternate`};
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;

    @keyframes typing {
        from {
            width: 0;
        }
    }

    @keyframes blink {
        50% {
            border-color: transparent;
        }
    }
`;

export const PictureWrapper = styled(Box)`
    overflow: hidden;
    width: 100%;
    border: 2px solid #ffffff;
    border-radius: 35%;
    z-index: 10;
    padding-top: 30px;
    padding-bottom: 10px;
    height: 100%;

    div {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        border: 2px solid #ffffff;
        border-radius: 35%;
        z-index: 0;
    }

    .fade-appearance {
        animation: fade 0.5s linear;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
