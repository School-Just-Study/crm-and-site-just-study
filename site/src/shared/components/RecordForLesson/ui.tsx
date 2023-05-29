import * as React from 'react';
import { FC, useEffect } from 'react';
import { Alert, AlertTitle, Step, Stepper } from '@mui/material';
import { Duration } from './Steps/Duration';
import { DateLesson } from './Steps/Date';
import { FormProvider, useForm } from 'react-hook-form';
import { useGate, useUnit } from 'effector-react';
import { $activeStep, ActiveStepGate } from './model/model';
import { Final } from './Steps/Final';
import { Teacher } from './Steps/Teachers/ui';
import { LessonForm, RecordForLessonProps } from './types';
import { useMutation, useQuery } from '@apollo/client';
import { $user } from '@shared/storage/user';
import { useSnackbar } from 'notistack';
import { MUTATION_CREATE_LESSON, QUERY_SUBSCRIPTION_ACTIVE } from './query';
import { formatDataCreateLesson } from './utils';
import { Authorization } from '@shared/components/Authorization/ui';
import { Query } from '@src/shared/lib/apollo/types';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import './model/init';
import { QUERY_STUDENT_CABINET } from '@shared/components/Orders/query';
import { Time } from './Steps/TIme';

export const RecordForLesson: FC<RecordForLessonProps> = ({ handleClose }) => {
    const activeStep = useUnit($activeStep);
    const methods = useForm<LessonForm>();
    const { handleSubmit } = methods;
    const user = useUnit($user);
    const [createLesson, createLessonState] = useMutation(MUTATION_CREATE_LESSON, {
        refetchQueries: [{ query: QUERY_STUDENT_CABINET, variables: { userId: user?.id } }]
    });
    const { enqueueSnackbar } = useSnackbar();
    const userSubscriptions = useQuery<Query>(QUERY_SUBSCRIPTION_ACTIVE, { variables: { userId: user?.id } });
    const userSubscription = userSubscriptions?.data?.userSubscriptions?.[0];
    useGate(ActiveStepGate);

    useEffect(() => {
        if (createLessonState.error)
            enqueueSnackbar('Произошла ошибка при записи на урок. Пожалуйста, выберите другое время или дату урока.', {
                variant: 'error'
            });
    }, [createLessonState]);

    const onSubmit = handleSubmit(async (data) => {
        const formatData = formatDataCreateLesson(data, user!, userSubscription);
        await createLesson({ variables: { data: formatData } });
    });

    if (createLessonState.data?.createLesson.id) {
        if (handleClose) {
            setTimeout(() => handleClose(), 1000);
        }
        return (
            <Alert severity="success">
                <AlertTitle>Вы успешно записались на урок.</AlertTitle>
                На почту пришло письмо с подтвердением и деталями урока.
            </Alert>
        );
    }

    if (user && userSubscriptions.data?.userSubscriptions?.length === 0) {
        return (
            <Alert severity="warning">
                У вас нет активных абонементов. Вы не можете записаться на урок. Обратитесь к менеджеру для покупки
                нового абонемента.
            </Alert>
        );
    }

    return (
        <Authorization>
            <SpinnerWrapper loading={userSubscriptions.loading}>
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step>
                                <Teacher />
                            </Step>
                            <Step>
                                <Duration duration={userSubscription?.durationLessons as number[]} />
                            </Step>
                            <Step>
                                <DateLesson />
                            </Step>
                            <Step>
                                <Time />
                            </Step>
                            <Step>
                                <Final loading={createLessonState.loading} />
                            </Step>
                        </Stepper>
                    </form>
                </FormProvider>
            </SpinnerWrapper>
        </Authorization>
    );
};
