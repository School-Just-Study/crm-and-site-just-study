import { GetStaticPaths, GetStaticProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { Post } from '@src/shared/lib/apollo/types';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { post } from '@translations/post';
import { localeDate } from '@src/shared/lib/localeDate';
import { format } from 'date-fns';
import { FormForLeads } from '@shared/components/FormForLeads/FormForLeads';
import { SEO } from '@src/shared/components/SEO/SEO';
import * as React from 'react';
import { NextPageWithLayout } from '@shared/types/page';
import { MainLayout } from '@src/layouts/MainLayout';
import { QUERY_ALL_POST, QUERY_POST } from '@src/shared/lib/apollo/postPage';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { DISABLED_BUILD_STATIC_PATHS } from '../../config';
import { CustomRenderer } from '@shared/component-blocks/CustomRenderer/CustomRenderer';

const PostBlogPage: NextPageWithLayout<{ data: Post }> = ({ data }) => {
    const { locale, isFallback } = useRouter();
    const theme = useTheme();

    if (isFallback) {
        return <SpinnerWrapper loading centerMode />;
    }

    const { title, content, description, cover, author, createdAt, language } = data;
    const t = transition(post, locale);

    const localeForDate = localeDate(locale || 'en');

    const authorText = `${t.author}: ${author?.name}`;

    console.log(data);

    return (
        <>
            <SEO
                title={title as string}
                description={description as string}
                language={language as string}
                disableAlternateLocale
            />
            <Box
                bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100}
                px={{ xs: 0.5, md: 6 }}
                py={{ xs: 2, md: 6 }}>
                <Container maxWidth="md" sx={{ p: 0 }}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
                        <Typography variant="h1" mb={{ xs: 1, md: 3 }} style={{ wordBreak: 'break-word' }}>
                            {title}
                        </Typography>

                        {description && (
                            <Typography variant="h5" mb={3} color={theme.palette.primary.main} fontWeight="bold">
                                {description}
                            </Typography>
                        )}
                        {cover && (
                            <img
                                src={cover.image?.url}
                                alt={title as string}
                                width="100%"
                                height="100%"
                                style={{ borderRadius: 20 }}
                            />
                        )}
                        {content && <CustomRenderer document={content.document} />}
                        <Stack mb={2} gap={3} direction="row" color={theme.palette.grey.A700}>
                            <Typography>
                                {format(new Date(createdAt), 'dd MMMM yyyy, HH:mm', { locale: localeForDate })}
                            </Typography>
                            {author && <Typography variant="body1">{authorText}</Typography>}
                        </Stack>
                    </Card>
                </Container>
            </Box>
            <FormForLeads />
        </>
    );
};

PostBlogPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    if (DISABLED_BUILD_STATIC_PATHS) {
        return {
            paths: [],
            fallback: true
        };
    } else {
        const { data } = await client.query<{ posts: Post[] }>({
            query: QUERY_ALL_POST
        });

        const paths = data?.posts?.map((post) => ({
            params: { id: post.id },
            locale: post?.language as string
        }));

        return {
            paths,
            fallback: true
        };
    }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const id = ctx.params?.id;
    const { data } = await client.query<{ post: Post }>({
        query: QUERY_POST,
        variables: { id }
    });

    const notFound = !data.post;

    if (notFound) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: data.post
        },
        revalidate: 86400
    };
};

export default PostBlogPage;
