import * as React from 'react';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';
import { Alert, Button } from '@mui/material';
import { UnavailableTimesRes } from './types';
import { format, getMinutes } from 'date-fns';
import { useQuery } from '@apollo/client';
import { QUERY_GET_UNAVAILABLE_TIMES } from './query';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { UnavailableTimesForRecordLessonResponse } from '@shared/lib/apollo/types';
import { setActiveStep } from '@shared/components/RecordForLesson';
import { formatTimes } from './utils';

export const TimeSelector: FC = () => {
  const { setValue, watch } = useFormContext<LessonForm>();
  const date = watch('date');
  const teacherId = watch('teacher')?.id;
  const duration = watch('duration');

  const dateWithoutTime = format(date, 'yyyy-MM-dd');
  const variables = { data: { date: dateWithoutTime, teacherId, duration } };
  const { loading, data, error, refetch } = useQuery<UnavailableTimesRes>(
    QUERY_GET_UNAVAILABLE_TIMES,
    { variables }
  );

  useEffect(() => {
    refetch(variables);
  }, [date, teacherId, duration]);

  const onChange = (slot: UnavailableTimesForRecordLessonResponse) => {
    setValue('startTime', new Date(slot.start));
    setValue('endTime',   new Date(slot.end));
    setActiveStep(4);
  };

  return (
    <>
      {error && <Alert severity="error">Произошла ошибка при загрузке</Alert>}
      <SpinnerWrapper loading={loading}>
        {data?.unavailableTimesForRecordLesson?.length === 0 ? (
          <Alert severity="warning">
            К сожалению, свободного времени нет. Пожалуйста, выберите другую дату.
          </Alert>
        ) : (
          data!.unavailableTimesForRecordLesson
            .filter(slot => getMinutes(new Date(slot.start)) === 0)
            .map((slot, i) => (
              <Button key={i} sx={{ width: 116 }} onClick={() => onChange(slot)}>
                {formatTimes(slot.start)} – {formatTimes(slot.end)}
              </Button>
            ))
        )}
      </SpinnerWrapper>
    </>
  );
};
