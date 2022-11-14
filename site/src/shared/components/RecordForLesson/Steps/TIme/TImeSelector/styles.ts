import { styled } from '@mui/material';

export const BoxTimeSelector = styled('div')`
    .calendarClassName {
        .react-datepicker__time-list-item {
            &:hover {
                background-color: ${(styles) =>
                    styles.theme.palette.mode === 'dark'
                        ? styles.theme.palette.grey.A700
                        : styles.theme.palette.grey.A100};
            }
        }
    }
`;
