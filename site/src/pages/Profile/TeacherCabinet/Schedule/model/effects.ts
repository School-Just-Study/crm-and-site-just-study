import { createEffect } from 'effector';
import { GetTeacherScheduleResponse } from '@src/shared/lib/apollo/types';
import client from '@src/shared/lib/apollo/apolloClient';
import { QUERY_SCHEDULE } from '@src/pages/Profile/TeacherCabinet/Schedule/query';
import { ApolloQueryResult } from '@apollo/client';
import { GetTeacherScheduleData } from './types';
import { ApolloError } from '@apollo/client/errors';

export const getScheduleFx = createEffect<
    GetTeacherScheduleData,
    ApolloQueryResult<{ getTeacherSchedule: GetTeacherScheduleResponse }>,
    ApolloError
>(async (props) => {
    return await client.query({ query: QUERY_SCHEDULE, variables: { data: props } });
});
