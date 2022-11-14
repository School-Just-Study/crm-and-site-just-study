import { NextPageWithLayout } from '@shared/types/page';
import * as React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Link from '@shared/ui/Link';
import { transition } from '@src/shared/lib/transition';
import { errorPage } from '@translations/errorPage';
import SvgJustStudyLogo from '@src/shared/icons/SvgJustStudyLogo';
import { useRouter } from 'next/router';
import { SEO } from '@shared/components/SEO/SEO';

const Custom505Page: NextPageWithLayout<{ statusCode?: number }> = ({ statusCode = 502 }) => {
    const { locale } = useRouter();
    const t = transition(errorPage, locale);

    return (
        <>
            <SEO title={`Error ${statusCode}`} description={"We can't seem to find the page you're looking for."} />
            <Container maxWidth="lg" sx={{ m: 'auto' }}>
                <Stack direction="row" gap={2} alignItems="center">
                    <SvgJustStudyLogo width={60} height={60} />
                    <Typography fontSize={50} fontWeight="bold">
                        Just Study
                    </Typography>
                </Stack>
                <Typography mt={3} variant="h1" component="h1" gutterBottom>
                    {t['500'].title}
                </Typography>
                <Typography variant="h2">{t['500'].description}</Typography>
                <Link mt={3} variant="h5" href="https://t.me/juststudy_help_bot">
                    {t['500'].support}
                </Link>
                <Typography my={2} variant="body2">
                    {t.codeText} {statusCode}
                </Typography>
            </Container>
        </>
    );
};

export default Custom505Page;
