import { styled } from '@mui/system';
import { Card } from '@mui/material';

export const CardHovered = styled(Card)`
    transition: all 200ms linear;
    &:hover {
        background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? theme.palette.primaryDark['700'] : theme.palette.grey.A200};
    }
`;
