import * as React from 'react';
import { FC } from 'react';
import { Button, StepContent, StepLabel, Typography } from '@mui/material';
import { previousActiveStep } from '@shared/components/RecordForLesson/model/model';
import { LoadingButton } from '@mui/lab';

export const Final: FC<{ loading: boolean }> = ({ loading }) => {
    return (
        <>
            <StepLabel>
                <Typography fontWeight="bold">Подтверждение</Typography>
            </StepLabel>
            <StepContent>
                <LoadingButton
                    loading={loading}
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}>
                    Записаться
                </LoadingButton>
                <Button onClick={() => previousActiveStep()} sx={{ mt: 1, mr: 1 }}>
                    Назад
                </Button>
            </StepContent>
        </>
    );
};
