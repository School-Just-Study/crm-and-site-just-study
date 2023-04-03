import { Marketing } from '@src/shared/lib/apollo/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { SEO } from '@src/shared/components/SEO/SEO';
import { Banner } from '@shared/components/Banner/Banner';
import { Box, Container, Stack, Typography } from '@mui/material';
import { InstagramAvatar } from '@src/pages/Marketing/style';
import { FormForLeads } from '@shared/components/FormForLeads/FormForLeads';
import { AboutGeorge } from '@src/pages/Home/AboutGeorge/AboutGeorge';
import { Advantages } from '@shared/components/Advantages/Advantages';
import { Reviews } from '@shared/components/Reviews/Reviews';
import client from '@src/shared/lib/apollo/apolloClient';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import SvgJustStudyLogo from '@src/shared/icons/SvgJustStudyLogo';
import { QUERY_MARKETING_PAGE, QUERY_MARKETINGS } from '@src/shared/lib/apollo/marketingPage';
import { ViewStatus } from '@shared/enums/view-status';
import { DISABLED_BUILD_STATIC_PATHS } from '../../config';
import routes from '@src/routes';

interface IQueryMarketingPage {
    marketing: Marketing;
}

const MarketingPage: NextPage<{ data: IQueryMarketingPage }> = ({ data }) => {
    const theme = useTheme();
    const { push } = useRouter();
    const { marketing } = data;

    return (
        <>
            <SEO
                title={marketing.title as string}
                description={marketing?.description as string}
                noIndex
                disableAlternateLocale
            />
            <Box bgcolor={theme.palette.primary.main}>
                <Container maxWidth="xl" sx={{ display: 'flex' }}>
                    <Box py={2} px={{ xs: 0, md: 4 }}>
                        <Stack
                            alignItems="center"
                            gap={1}
                            direction="row"
                            p={1}
                            bgcolor={theme.palette.background.paper}
                            onClick={() => push(routes.home)}
                            borderRadius={20}>
                            <SvgJustStudyLogo width={40} />
                            <Typography variant="h2">Just Study</Typography>
                        </Stack>
                    </Box>
                </Container>
            </Box>
            <Banner
                alignPicture="left"
                title={marketing.title as string}
                desc={
                    <Typography color="white" variant="h3">
                        {marketing.description}
                    </Typography>
                }
                buttonText="Оставить заявку"
                picture={
                    marketing?.image?.url && (
                        <InstagramAvatar>
                            <div>
                                <img
                                    src={marketing.image.url}
                                    alt={marketing.title as string}
                                    width="100%"
                                    height="100%"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </InstagramAvatar>
                    )
                }
            />
            <FormForLeads title={'Запишись и получи бонусы!'} />
            {marketing.aboutGeorge && <AboutGeorge />}
            {marketing.advantages && <Advantages />}
            {marketing.reviews && <Reviews />}
            <FormForLeads />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    if (DISABLED_BUILD_STATIC_PATHS) {
        return {
            paths: [],
            fallback: 'blocking'
        };
    } else {
        const { data } = await client.query<{ marketings: Marketing[] }>({
            query: QUERY_MARKETINGS
        });

        const paths = data.marketings.map((marketing) => ({
            params: { slug: marketing.slug as string },
            locale: marketing?.language as string
        }));

        return {
            paths,
            fallback: 'blocking'
        };
    }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const slug = ctx.params?.slug;
    const { data } = await client.query<IQueryMarketingPage>({
        query: QUERY_MARKETING_PAGE,
        variables: { slug }
    });

    const notFound = data.marketing?.statusView !== ViewStatus.Show;

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

export default MarketingPage;
