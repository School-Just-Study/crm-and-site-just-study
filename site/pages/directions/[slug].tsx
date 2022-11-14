import { NextPageWithLayout } from '@shared/types/page';
import { MainLayout } from '@src/layouts/MainLayout';
import * as React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { Direction } from '@src/shared/lib/apollo/types';
import { QUERY_ALL_DIRECTIONS, QUERY_DIRECTION_PAGE } from '@src/shared/lib/apollo/directionPage';
import { SEO } from '@src/shared/components/SEO/SEO';
import { MainBanner } from '@src/pages/DirectionItemPage/MainBanner';
import { Goals } from '@src/pages/DirectionItemPage/Goals';
import { FormForLeads } from '@shared/components/FormForLeads/FormForLeads';
import { Result } from '@src/pages/DirectionItemPage/Result';
import { Courses } from '@src/pages/DirectionItemPage/Courses';
import { Reviews } from '@shared/components/Reviews/Reviews';
import { FAQ } from '@shared/components/FAQ/FAQ';
import { useRouter } from 'next/router';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { DISABLED_BUILD_STATIC_PATHS } from '../../config';

interface IQueryDirectionItemPage {
    directions: Direction[];
}

const DirectionItemPage: NextPageWithLayout<{ data: IQueryDirectionItemPage }> = ({ data }) => {
    const { isFallback } = useRouter();

    if (isFallback) {
        return <SpinnerWrapper loading centerMode />;
    }

    const { directions } = data;
    const { name, description, image, goals, results, products } = directions[0];

    return (
        <>
            <SEO title={name as string} description={description as string} />
            <MainBanner name={name} description={description} image={image} />
            {goals && <Goals goals={goals} />}
            {results && <Result results={results} />}
            {products && <Courses products={products} />}
            <Reviews />
            <FormForLeads />
            <FAQ />
        </>
    );
};

DirectionItemPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    if (DISABLED_BUILD_STATIC_PATHS) {
        return {
            paths: [],
            fallback: true
        };
    } else {
        const { data } = await client.query<{ directions: Direction[] }>({
            query: QUERY_ALL_DIRECTIONS
        });

        const paths = data.directions.map((direction) => ({
            params: { slug: direction.slug as string },
            locale: direction?.language as string
        }));

        return {
            paths,
            fallback: true
        };
    }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    if (!ctx.params?.slug) return { notFound: true };

    const lang = ctx.locale;
    const slug = ctx.params.slug;
    const { data } = await client.query<IQueryDirectionItemPage>({
        query: QUERY_DIRECTION_PAGE,
        variables: { lang, slug }
    });

    const notFound = data.directions.length === 0;

    if (notFound) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data
        },
        revalidate: 86400
    };
};

export default DirectionItemPage;
