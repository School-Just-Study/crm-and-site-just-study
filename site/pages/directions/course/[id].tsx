import { NextPageWithLayout } from '@shared/types/page';
import { MainLayout } from '@src/layouts/MainLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { QUERY_COURSE, QUERY_COURSES } from '@src/shared/lib/apollo/CoursePage';
import { Product } from '@src/shared/lib/apollo/types';
import { SEO } from '@src/shared/components/SEO/SEO';
import * as React from 'react';
import { useEffect } from 'react';
import { Banner } from '@shared/components/Banner/Banner';
import { Typography } from '@mui/material';
import { FormForLeads } from '@shared/components/FormForLeads/FormForLeads';
import { AboutCourse } from '@src/pages/Course/AboutCourse';
import { StepsOfEducation } from '@src/pages/Directions/StepsOfEducation';
import { Reviews } from '@shared/components/Reviews/Reviews';
import { FAQ } from '@shared/components/FAQ/FAQ';
import { Advantages } from '@shared/components/Advantages/Advantages';
import { setFormLeadData } from '@shared/components/FormForLeads/model';
import { useRouter } from 'next/router';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { DISABLED_BUILD_STATIC_PATHS } from '../../../config';

interface IQueryCoursePage {
    product: Product;
}

const CoursePage: NextPageWithLayout<{ data: IQueryCoursePage }> = ({ data }) => {
    const { isFallback } = useRouter();

    if (isFallback) {
        return <SpinnerWrapper loading centerMode />;
    }

    const { product } = data;
    const { name, description, subscriptions, id, language } = product;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setFormLeadData(`Курс: ${name}`);
    }, [id, name]);

    const idHideRecord = subscriptions && subscriptions.length > 0;

    return (
        <>
            <SEO
                title={name as string}
                description={description as string}
                language={language as string}
                disableAlternateLocale
            />
            <Banner my={5} title={name as string} desc={<Typography variant="h2">{description}</Typography>} />
            <AboutCourse product={product} />
            <StepsOfEducation />
            <Advantages />
            {!idHideRecord && <FormForLeads />}
            <Reviews productId={[id]} />
            <FAQ />
        </>
    );
};

CoursePage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    if (DISABLED_BUILD_STATIC_PATHS) {
        return {
            paths: [],
            fallback: true
        };
    } else {
        const { data } = await client.query<{ products: Product[] }>({
            query: QUERY_COURSES
        });

        const paths = data?.products?.map((product) => ({
            params: { id: product.id },
            locale: product?.language as string
        }));

        return {
            paths,
            fallback: true
        };
    }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    if (!ctx.params?.id) return { notFound: true };

    const id = ctx.params.id;
    const { data } = await client.query<IQueryCoursePage>({
        query: QUERY_COURSE,
        variables: { id }
    });

    const notFound = !data.product;

    if (notFound) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data
        },
        revalidate: 10
    };
};

export default CoursePage;
