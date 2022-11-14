import { Box, Container, Stack } from '@mui/material';
import BrandingProvider from '@src/BrandingProvider';
import * as React from 'react';
import { FC } from 'react';
import { Description, Title } from '@shared/components/OGImage/styles';
import { Logo } from '@shared/components/OGImage/Logo';
import { ImageContainer } from '@shared/components/OGImage/ImageContainer';
import { QueryParams } from '@pages/api/_lib/types';
import { transition } from '@src/shared/lib/transition';
import { homePage } from '@translations/homePage';

const CoverImage: FC<QueryParams> = ({ lang, title, desc }) => {
    const t = transition(homePage, lang || 'en');

    const defaultTitle = t.title;
    const defaultDescription = t.description;

    return (
        <Box height="100%" width="100%" p={6} position="relative">
            <ImageContainer />
            <Container maxWidth="xl" sx={{ position: 'relative' }}>
                <Logo />
                <Stack height="100%" justifyContent="center" maxWidth={900}>
                    <Stack mt={3} gap={2} alignSelf="flex-start" mb={0}>
                        <Title variant="h1" color="white">
                            {title || defaultTitle}
                        </Title>
                        <Description variant="h2" color="white">
                            {desc || defaultDescription}
                        </Description>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export function OGImage(props: QueryParams) {
    return (
        <BrandingProvider mode="light">
            <CoverImage {...props} />
        </BrandingProvider>
    );
}
