import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';

export const CalloutStyled = styled(Alert)`
    p {
        font-size: 16px;
        margin: 0;
        &:first-child {
            margin-top: -4px;
        }
    }
`;
