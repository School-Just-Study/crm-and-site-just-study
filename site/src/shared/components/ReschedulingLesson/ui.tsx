import { useGate, useUnit } from 'effector-react';
import { $activeStep, ActiveStepGate, setActiveStep } from '@shared/components/RecordForLesson';
import { FormProvider, useForm } from 'react-hook-form';
import { $user } from '@shared/storage/user';
import * as React from 'react';
import { FC, useEffect } from 'react';
import { ReschedulingLessonForm, ReschedulingLessonProps } from './types';
import { Duration } from '@shared/components/RecordForLesson/Steps/Duration';
import { Step, Stepper } from '@mui/material';
import { DateLesson } from '@shared/components/RecordForLesson/Steps/Date';
import { Time } from '@shared/components/RecordForLesson/Steps/TIme';
import { Final } from '@shared/components/RecordForLesson/Steps/Final';
import '../RecordForLesson/model/init';
import { Teacher } from '@shared/components/RecordForLesson/Steps/Teachers';
import { formatDataUpdateLesson } from '@shared/components/ReschedulingLesson/utils';
import { useMutation, useQuery } from '@apollo/client';
import { MUTATION_UPDATE_LESSON, MUTATION_UPDATE_LESSON_FOR_PLAN, QUERY_LESSON } from './query';
import { useSnackbar } from 'notistack';
import { againGetScheduleParams } from '@src/pages/Profile/TeacherCabinet/Schedule/model/model';
import { QUERY_STUDENT_CABINET } from '@shared/components/Orders/query';
import { Lesson, LessonCreateInput } from '@shared/lib/apollo/types';

export const ReschedulingLesson: FC<ReschedulingLessonProps> = ({ id, handleClose }) => {
    const activeStep = useUnit($activeStep);
    const dataLesson = useQuery<{ lesson: Lesson }>(QUERY_LESSON, { variables: { id } });
    const methods = useForm<ReschedulingLessonForm>();
    const { handleSubmit } = methods;
    const user = useUnit($user);
    const { enqueueSnackbar } = useSnackbar();
    const mutationForUpdate = dataLesson.data?.lesson.notAlert
        ? MUTATION_UPDATE_LESSON_FOR_PLAN
        : MUTATION_UPDATE_LESSON;
    const userSubscription = dataLesson?.data?.lesson.subscriptions?.[0];

    const [createLesson, { loading, error, data }] = useMutation(mutationForUpdate, {
        refetchQueries: [{ query: QUERY_STUDENT_CABINET, variables: { userId: user?.id } }]
    });

    useEffect(() => {
        if (dataLesson.data?.lesson.teachers) {
            methods.setValue('teacher', dataLesson.data?.lesson.teachers?.[0]);
            setActiveStep(1);
        } else {
            if (dataLesson.error?.message)
                enqueueSnackbar(`Произошла ошибка при загрузке данных ${dataLesson.error?.message}`, {
                    variant: 'error'
                });
        }
    }, [dataLesson.data]);

    useGate(ActiveStepGate);

    useEffect(() => {
        if (error) enqueueSnackbar('Произошла ошибка при переносе урока', { variant: 'error' });
        if (data) enqueueSnackbar('Вы успешно перенесли урок', { variant: 'success' });
    }, [error, data]);

    const onSubmit = handleSubmit(async (data) => {
        const formatData = formatDataUpdateLesson(data);
        if (dataLesson.data?.lesson.notAlert) {
            const updatedData: LessonCreateInput = {
                ...formatData,
                students: {
                    connect: dataLesson.data.lesson.students?.map(({ id }) => {
                        return { id };
                    })
                },
                teachers: {
                    connect: dataLesson.data.lesson.teachers?.map(({ id }) => {
                        return { id };
                    })
                }
            };
            await createLesson({ variables: { data: updatedData, id } });
        } else {
            await createLesson({ variables: { data: formatData, id } });
        }
        handleClose();
        againGetScheduleParams();
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step hidden>
                        <Teacher />
                    </Step>
                    <Step>
                        <Duration hideBackButton duration={userSubscription?.durationLessons as number[]} />
                    </Step>
                    <Step>
                        <DateLesson />
                    </Step>
                    <Step>
                        <Time />
                    </Step>
                    <Step>
                        <Final loading={loading} />
                    </Step>
                </Stepper>
            </form>
        </FormProvider>
    );
};
