import { GetServerSideProps, NextPage } from 'next';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { PaymentResponse } from '@src/shared/lib/apollo/types';
import { MUTATION_GET_PAY } from '@shared/components/Orders/query';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const PayPage: NextPage = () => {
    const { query, push } = useRouter();
    const [pay, { loading, error, data }] = useMutation<{ payment: PaymentResponse }>(MUTATION_GET_PAY);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error) {
            enqueueSnackbar('Произошла ошибка при оплате', { variant: 'error' });
        }
    }, [error]);

    useEffect(() => {
        const orderId = query.orderid;
        const currency = query.currency;
        if (orderId) {
            pay({ variables: { orderId, currency } });
        }
    }, [query]);

    useEffect(() => {
        if (data?.payment.status) {
            push(data.payment.redirectUrl);
        }
    }, [data]);

    return <SpinnerWrapper loading={loading} centerMode></SpinnerWrapper>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const orderId = query?.orderid;

    if (!orderId) {
        return {
            notFound: true
        };
    }

    return { props: {}, notFound: false };
};

export default PayPage;
