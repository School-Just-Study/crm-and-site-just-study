import { NextPageWithLayout } from '@shared/types/page';
import * as React from 'react';
import { SEO } from '@src/shared/components/SEO/SEO';
import { Banner } from '@shared/components/Banner/Banner';
import { FormForLeads } from '@shared/components/FormForLeads/FormForLeads';
import { FAQ } from '@shared/components/FAQ/FAQ';
import { Typography } from '@mui/material';
import { Courses } from '@src/pages/Directions/Courses';
import { Reviews } from '@shared/components/Reviews/Reviews';
import { MainLayout } from '@src/layouts/MainLayout';
import { StepsOfEducation } from '@src/pages/Directions/StepsOfEducation';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { directionsPage } from '@translations/directionsPage';

const DirectionsPage: NextPageWithLayout = () => {
    const { locale } = useRouter();
    const t = transition(directionsPage, locale);

    return (
        <>
            <SEO title={t.title} description={t.description} />
            <Banner
                maxWidth={900}
                title={t.title}
                desc={
                    <Typography color="white" variant="h4">
                        {t.description}
                    </Typography>
                }
            />
            <StepsOfEducation />
            <Courses />
            <Reviews />
            <FormForLeads />
            <FAQ />
        </>
    );
};

DirectionsPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export default DirectionsPage;
