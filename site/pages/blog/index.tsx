import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { Post, Tag } from '@src/shared/lib/apollo/types';
import { useTheme } from '@mui/material/styles';
import routes from '@src/routes';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { blogPage } from '@translations/blogPage';
import { FormForLeads } from '@shared/components/FormForLeads/FormForLeads';
import { SEO } from '@src/shared/components/SEO/SEO';
import * as React from 'react';
import { NextPageWithLayout } from '@shared/types/page';
import { MainLayout } from '@src/layouts/MainLayout';
import { QUERY_BLOG_PAGE } from '@src/shared/lib/apollo/blogPage';
import { useQuery } from '@apollo/client';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import Image from 'next/image';

interface IQueryBlogPage {
    posts: Post[];
    tags: Tag[];
}

const BlogPage: NextPageWithLayout = () => {
    const theme = useTheme();
    const { push, locale } = useRouter();
    const t = transition(blogPage, locale);
    const { data, loading } = useQuery<IQueryBlogPage>(QUERY_BLOG_PAGE, { variables: { lang: locale } });

    return (
        <>
            <SEO title={t.title} description={t.description} />
            <Box
                bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100}
                px={{ xs: 0.5, md: 6 }}
                py={{ xs: 2, md: 6 }}>
                <Container maxWidth="xl" sx={{ p: 1 }}>
                    <Typography px={1} variant="h1">
                        {t.title}
                    </Typography>
                    <SpinnerWrapper loading={loading}>
                        <Box
                            py={4}
                            px={{ xs: 0, md: 4 }}
                            display="grid"
                            gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}
                            gap={{ xs: 3, md: 4 }}>
                            {data?.posts.map(({ title, id, cover }, index) => (
                                <Card
                                    key={id}
                                    sx={{
                                        backgroundColor:
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.grey['800']
                                                : theme.palette.background.paper
                                    }}>
                                    <Stack
                                        gap={1}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => push(`${routes.blog}/${id}`)}>
                                        {cover && (
                                            <Image
                                                src={cover.image?.url as string}
                                                alt={title as string}
                                                width={300}
                                                height={270}
                                                priority={index < 8}
                                                style={{
                                                    objectFit: 'cover',
                                                    width: 'auto',
                                                    height: '270px'
                                                }}
                                            />
                                        )}
                                        <Typography fontSize={20} fontWeight="bold" p={2} pt={0}>
                                            {title}
                                        </Typography>
                                    </Stack>
                                </Card>
                            ))}
                        </Box>
                    </SpinnerWrapper>
                </Container>
            </Box>
            <FormForLeads />
        </>
    );
};

BlogPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export default BlogPage;
