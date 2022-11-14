import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { Query } from '@src/shared/lib/apollo/types';
import { ISitemapField } from 'next-sitemap/dist/@types/interface';
import { FRONTEND_URL } from '../../config';
import routes from '@src/routes';
import { getServerSideSitemap } from 'next-sitemap';

export const GET_ALL_DIRECTIONS = gql`
    query {
        directions(where: { statusView: { equals: "show" } }) {
            slug
            language
            lastModification
        }
    }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data } = await client.query<Query>({
        query: GET_ALL_DIRECTIONS,
        fetchPolicy: 'no-cache'
    });

    const fields: ISitemapField[] = [];

    if (data.directions) {
        data.directions.map(({ language, slug, lastModification }) => {
            fields.push({
                loc: `${FRONTEND_URL}/${language}${routes.directions}/${slug}`,
                lastmod: new Date(lastModification).toISOString(),
                changefreq: 'daily',
                priority: 0.7
            });
        });
    }

    return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
