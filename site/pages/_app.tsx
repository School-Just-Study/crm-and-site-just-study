import * as React from 'react';
import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@src/shared/lib/apollo/apolloClient';
import BrandingProvider from '@src/BrandingProvider';
import { withHydrate } from 'effector-next';
import { useGate, useStore } from 'effector-react';
import { $theme, setTheme } from '../model/theme';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { homePage } from '@translations/homePage';
import { useMediaQuery } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { fork, Scope, serialize } from 'effector';
import { Provider } from 'effector-react/scope';
import { Analytics } from '@src/shared/lib/Analytics';
import { CheckAuthGate, setEmailAuth } from '@shared/storage/user';
import '@src/styles.css';
import 'shared/storage/user/init';
import { MyAppProps } from '@shared/types';

const clientSideEmotionCache = createEmotionCache();
const enhance = withHydrate();

let clientScope: Scope;

function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const appTheme = useStore($theme);
    const { locale, query } = useRouter();
    const t = transition(homePage, locale);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const hideWrapper = query.onlyWidgets === 'true';
    const getLayout = Component.getLayout ?? ((page) => page);
    const Layout = Component.layout ?? Fragment;
    const apolloClient = useApollo(pageProps.initialApolloState);

    useEffect(() => {
        if (!hideWrapper) {
            setTheme(prefersDarkMode ? 'dark' : 'light');
        }
    }, [prefersDarkMode]);

    const scope = fork({
        values: {
            ...(clientScope && serialize(clientScope)),
            // @ts-ignore
            ...pageProps.initialState
        }
    });
    if (typeof window !== 'undefined') clientScope = scope;

    useGate(CheckAuthGate);

    useEffect(() => {
        if (query.setEmail) setEmailAuth(query.setEmail as string);
    }, [query.setEmail]);

    return (
        <ApolloProvider client={apolloClient}>
            <CacheProvider value={emotionCache}>
                <Provider value={scope}>
                    <Head>
                        <title>{t.title}</title>
                        <meta name="description" content={t.description} />
                        <meta
                            name="viewport"
                            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                        />
                        <meta name="yandex-verification" content="130c5d01fa060396" />
                    </Head>
                    <Analytics />
                    <BrandingProvider mode={appTheme}>
                        <SnackbarProvider>
                            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
                        </SnackbarProvider>
                    </BrandingProvider>
                </Provider>
            </CacheProvider>
        </ApolloProvider>
    );
}

export default enhance(MyApp);
