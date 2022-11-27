import * as React from 'react';
import { FC } from 'react';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { Post } from '@src/shared/lib/apollo/types';
import { useTheme } from '@mui/material/styles';
import Link from '@shared/ui/Link';
import routes from '@src/routes';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { blogPage } from '@translations/blogPage';
import { useQuery } from '@apollo/client';
import { QUERY_LAST_POSTS } from '@shared/components/LastPosts/query';

export const LastPosts: FC = () => {
    const theme = useTheme();
    const { push, locale } = useRouter();
    const t = transition(blogPage, locale);
    const { data } = useQuery<{ posts: Post[] }>(QUERY_LAST_POSTS, { variables: { lang: locale } });

    if (!data) return null;
    if (!data.posts.length) return null;

    return (
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h2">{t.title}</Typography>
                <Link href={routes.blog}>
                    {t.linkMore} <ArrowForwardOutlinedIcon />
                </Link>
            </Box>
            <Box
                py={4}
                px={{ xs: 0, md: 4 }}
                display="grid"
                gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}
                gap={{ xs: 3, md: 4 }}>
                {data.posts.map(({ title, id, cover }) => (
                    <Card
                        key={id}
                        sx={{
                            backgroundColor:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey['800']
                                    : theme.palette.background.paper
                        }}>
                        <Stack gap={1} sx={{ cursor: 'pointer' }} onClick={() => push(`${routes.blog}/${id}`)}>
                            {cover && (
                                <img
                                    src={cover.image?.url}
                                    alt={title as string}
                                    width="100%"
                                    height={270}
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                            <Typography fontSize={20} fontWeight="bold" p={2} pt={0}>
                                {title}
                            </Typography>
                        </Stack>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};
