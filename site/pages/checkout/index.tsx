import { SEO } from '@shared/components/SEO/SEO';
import { Box, Container, Stack } from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { cartPage } from '@translations/cartPage';
import { MainLayout } from '@src/layouts/MainLayout';
import { Cart } from '@src/pages/Checkout/Cart';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { Orders } from '@shared/components/Orders/Orders';
import { MakingOrder } from '@src/pages/Checkout/Cart/MakingOrder';
import { useGate, useUnit } from 'effector-react';
import { $user, authWithTokenFx, getAuthTokenWithEmailFx, getUserFx } from '@shared/storage/user';
import '@src/pages/Checkout/Cart/model/init';
import { CartGate, updateUserCartFx } from '@src/pages/Checkout/Cart/model';

const Checkout: NextPage = () => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(cartPage, locale);
    const user = useUnit($user);
    const loading = useUnit(
        getUserFx.pending || getAuthTokenWithEmailFx.pending || authWithTokenFx.pending || updateUserCartFx.pending
    );
    useGate(CartGate);

    return (
        <MainLayout>
            <SEO title={t.title} noIndex />
            <Box bgcolor={theme.palette.primary.main} px={{ xs: 0.5, md: 6 }} py={{ xs: 2, md: 6 }}>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <SpinnerWrapper loading={loading} color="warning">
                        <Stack gap={3}>
                            {user?.id && <Orders userId={user.id} />}
                            {user?.cart?.items && user?.cart?.items?.length > 0 && <Cart />}
                            <MakingOrder />
                        </Stack>
                    </SpinnerWrapper>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default dynamic(() => Promise.resolve(Checkout), {
    ssr: false
});
