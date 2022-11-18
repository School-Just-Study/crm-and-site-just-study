import * as React from 'react';
import { AboutGeorge } from '@src/pages/Home/AboutGeorge/AboutGeorge';
import { FormForLeads } from '@shared/components/FormForLeads/FormForLeads';
import { Advantages } from '@shared/components/Advantages/Advantages';
import { Reviews } from '@shared/components/Reviews/Reviews';
import { FAQ } from '@shared/components/FAQ/FAQ';
import { LastPosts } from '@shared/components/LastPosts';
import { SEO } from '@src/shared/components/SEO/SEO';
import { MainBanner } from '@src/pages/Home/MainBanner/MainBanner';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { homePage } from '@translations/homePage';
import { ILanguages } from '@src/shared/modules/constants';
import { MainLayout } from '@src/layouts/MainLayout';
import { NextPageWithLayout } from '@shared/types/page';

const Home: NextPageWithLayout = () => {
    const { locale } = useRouter();
    const t = transition(homePage, locale as ILanguages);

    return (
        <>
            <SEO title={t.title} description={t.description} />
            <MainBanner />
            <AboutGeorge />
            <FormForLeads />
            <Advantages />
            <Reviews />
            <LastPosts />
            <FAQ />
            <FormForLeads />
        </>
    );
};

Home.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export default Home;
