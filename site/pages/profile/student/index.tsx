import { NextPage } from 'next';
import { Box, Container, Grid } from '@mui/material';
import * as React from 'react';
import { WidgetNextLesson } from '@src/pages/Profile/StudentCabinet/WidgetNextLesson';
import { WidgetRecordLesson } from '@src/pages/Profile/StudentCabinet/WidgetRecordLesson';
import { WidgetSubscription } from '@src/pages/Profile/StudentCabinet/WidgetSubscription';
import { WidgetPayment } from '@src/pages/Profile/StudentCabinet/WidgetPayment';
import { Authorization } from '@shared/components/Authorization/ui';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { useQuery } from '@apollo/client';
import { Query } from '@src/shared/lib/apollo/types';
import { QUERY_STUDENT_CABINET } from '@shared/components/Orders/query';
import { AccountWrapper } from '@src/layouts/AccountWrapper';
import dynamic from 'next/dynamic';
import { WidgetSupport } from '@src/pages/Profile/StudentCabinet/WidgetSupport';
import { WidgetCart } from '@src/pages/Profile/StudentCabinet/WidgetCart';

const StudentCabinet: NextPage = () => {
    const user = useUnit($user);
    const { data } = useQuery<Query>(QUERY_STUDENT_CABINET, {
        variables: { userId: user?.id }
    });

    return (
        <AccountWrapper title="Кабинет ученика">
            <Box mb={6} p={{ xs: 1, sm: 0 }}>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <Authorization>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <WidgetRecordLesson />
                            </Grid>
                            {data?.nextStudentLesson && (
                                <Grid item xs={12}>
                                    <WidgetNextLesson nextStudentLesson={data.nextStudentLesson} />
                                </Grid>
                            )}
                            {data?.orders && data?.orders?.length !== 0 && (
                                <Grid item xs={12}>
                                    <WidgetPayment orders={data.orders} />
                                </Grid>
                            )}
                            {user?.cart?.items && user?.cart?.items?.length > 0 && (
                                <Grid item xs={12}>
                                    <WidgetCart />
                                </Grid>
                            )}
                            {data?.userSubscriptions && (
                                <Grid item xs={12}>
                                    <WidgetSubscription userSubscriptions={data.userSubscriptions} />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <WidgetSupport />
                            </Grid>
                        </Grid>
                    </Authorization>
                </Container>
            </Box>
        </AccountWrapper>
    );
};

export default dynamic(() => Promise.resolve(StudentCabinet), {
    ssr: false
});
