import { ButtonProps } from '@mui/material/Button/Button';

export interface ReschedulingButtonProps extends ButtonProps {
    id: string;
    noFilter?: boolean;
}
