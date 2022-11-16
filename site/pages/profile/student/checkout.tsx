import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { PaymentResponse } from '@shared/lib/apollo/types';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { MUTATION_CART } from '@src/pages/Checkout/Cart/graphql';

const CheckoutPage: NextPage = () => {
    const { query, push } = useRouter();
    const [pay, { loading, error, data }] = useMutation<{ cart: PaymentResponse }>(MUTATION_CART);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error) {
            enqueueSnackbar('Произошла ошибка при оплате', { variant: 'error' });
        }
    }, [error]);

    useEffect(() => {
        const currency = query.currency;
        const email = query.email;
        if (currency) {
            pay({ variables: { data: { currency, email } } });
        }
    }, [query]);

    useEffect(() => {
        if (data?.cart.status) {
            push(data.cart.redirectUrl);
        }
    }, [data]);

    return <SpinnerWrapper loading={loading} centerMode></SpinnerWrapper>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const currency = query?.currency;
    const email = query.email;

    if (!currency || !email) {
        return {
            notFound: true
        };
    }

    return { props: {}, notFound: false };
};

export default CheckoutPage;
