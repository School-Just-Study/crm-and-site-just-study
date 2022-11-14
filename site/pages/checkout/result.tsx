import { MainLayout } from '@src/layouts/MainLayout';
import * as React from 'react';
import { NextPageWithLayout } from '@shared/types/page';
import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { Payment } from '@src/shared/lib/apollo/types';
import { SuccessPayment } from '@src/pages/CheckPayment/SuccessPayment';
import { ErrorPayment } from '@src/pages/CheckPayment/ErrorPayment';
import { SEO } from '@src/shared/components/SEO/SEO';
import routes from '@src/routes';

interface IResultPage {
    status: Payment['status'];
}

const QUERY_CHECK_PAYMENT = gql`
    query ($paymentId: String!) {
        checkPayment(paymentId: $paymentId) {
            status
        }
    }
`;

const ResultPage: NextPageWithLayout<IResultPage> = ({ status }) => {
    return (
        <>
            <SEO title="Статус оплаты" noIndex />
            {status === 'successfully' ? <SuccessPayment /> : <ErrorPayment url={routes.checkout} />}
        </>
    );
};

ResultPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { orderid } = ctx.query;

    const notFound = !orderid;

    if (notFound) {
        return {
            notFound,
            props: {}
        };
    }

    const { data } = await client.query({
        variables: { paymentId: orderid },
        query: QUERY_CHECK_PAYMENT,
        fetchPolicy: 'no-cache'
    });

    return {
        props: {
            status: data.checkPayment.status
        }
    };
};

export default ResultPage;
