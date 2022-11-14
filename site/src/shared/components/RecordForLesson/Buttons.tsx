import { Button, Stack } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { $activeStep, nextActiveStep, previousActiveStep } from '@shared/components/RecordForLesson/model/model';
import { useUnit } from 'effector-react';

export interface IButtons {
    disableNext?: boolean;
    disablePrevious?: boolean;
}

export const Buttons: FC<IButtons> = ({ disableNext, disablePrevious }) => {
    const activeStep = useUnit($activeStep);

    return (
        <Stack direction="row">
            <Button variant="contained" onClick={() => nextActiveStep()} sx={{ mt: 1, mr: 1 }} disabled={disableNext}>
                Продолжить
            </Button>
            <Button
                onClick={() => previousActiveStep()}
                sx={{ mt: 1, mr: 1 }}
                disabled={activeStep === 0 || disablePrevious}>
                Назад
            </Button>
        </Stack>
    );
};
