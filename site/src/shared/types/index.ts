import { AppProps } from 'next/app';
import { NextPageWithLayout } from '@shared/types/page';
import { EmotionCache } from '@emotion/react';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export interface MyAppProps extends AppPropsWithLayout {
    emotionCache?: EmotionCache;
}
