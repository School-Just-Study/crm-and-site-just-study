import { Box, CircularProgress } from '@mui/material';
import { FC, ReactNode } from 'react';
import { CircularProgressProps } from '@mui/material/CircularProgress/CircularProgress';

interface TSpinnerWrapper extends CircularProgressProps {
    loading?: boolean;
    centerMode?: boolean;
    children?: ReactNode;
}

export const SpinnerWrapper: FC<TSpinnerWrapper> = ({ loading, children, centerMode, ...spinnerProps }) => {
    const height = centerMode ? '70vh' : 'auto';
    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', m: 'auto', justifyContent: 'center' }} height={height}>
                    <CircularProgress sx={{ m: 'auto' }} {...spinnerProps} />
                </Box>
            ) : (
                children
            )}
        </>
    );
};
