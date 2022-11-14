import { GetServerSideProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { gql } from '@apollo/client';
import { Link } from '@src/shared/lib/apollo/types';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!ctx.params?.id) return { notFound: true };

    const id = ctx.params.id;

    if (!id) return { notFound: true };

    const { data } = await client.query<{ link: Link }>({
        variables: { id },
        query: gql`
            query ($id: ID!) {
                link(where: { id: $id }) {
                    status
                    link
                }
            }
        `
    });
    if (!data.link) return { notFound: true };
    if (data.link.status !== 'active') return { notFound: true };

    return {
        redirect: {
            statusCode: 302,
            destination: data.link.link as string
        }
    };
};

export default function LinkRedirect() {}
