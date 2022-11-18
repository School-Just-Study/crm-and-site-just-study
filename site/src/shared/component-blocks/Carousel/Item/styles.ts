import { styled } from '@mui/system';
import { Card } from '@mui/material';

export const CarouselItem = styled(Card)`
    scroll-snap-align: center;
    scroll-snap-stop: always;
    padding: 8px;
    box-sizing: border-box;
    height: 100%;
    border-radius: 6px;
    background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100};
    box-shadow: none;
`;
