import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const QuoteStyled = styled(Card)`
    padding: 4px 16px 16px 48px;
    position: relative;
    border-radius: 6px;
    background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100};

    &::after {
         {
            content: '\\201C';
            position: absolute;
            top: 0;
            left: 16px;
            font-size: 4rem;
        }
    }
`;
