import { GetServerSideProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { Query } from '@src/shared/lib/apollo/types';
import { ISitemapField } from 'next-sitemap/dist/@types/interface';
import { FRONTEND_URL } from '../../../config';
import { getServerSideSitemap } from 'next-sitemap';
import { gql } from '@apollo/client';

export const GET_ALL_PAGES = gql`
    query {
        pages(where: { statusView: { equals: "show" } }) {
            slug
            language
            lastModification
        }
    }
`;

export async function GET() {
    const { data } = await client.query<Query>({
        query: GET_ALL_PAGES,
        fetchPolicy: 'no-cache'
    });

    const fields: ISitemapField[] = [];

    if (data.pages) {
        data.pages.map(({ language, slug, lastModification }) => {
            fields.push({
                loc: `${FRONTEND_URL}/${language}/p/${slug}`,
                lastmod: new Date(lastModification).toISOString(),
                changefreq: 'daily',
                priority: 0.7
            });
        });
    }

    return getServerSideSitemap(fields);
}
