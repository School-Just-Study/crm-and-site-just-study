import * as React from 'react';
import { FC } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { homePage } from '@translations/homePage';
import { FRONTEND_URL } from '../../../../config';

interface IHead {
    title: string;
    description?: string;
    disableAlternateLocale?: boolean;
    largeCard?: boolean;
    noIndex?: boolean;
    language?: string;
}

export const SEO: FC<IHead> = (props) => {
    const { locale, asPath, locales } = useRouter();
    const t = transition(homePage, locale);
    const {
        description = t.description,
        disableAlternateLocale = false,
        largeCard = true,
        title,
        noIndex = false,
        language = locale
    } = props;
    const textTitle = `${title} | Just Study`;

    const path = asPath.replace(/\?.*/, '');

    const searchImage = encodeURI(`lang=${locale}&title=${title}&desc=${description}`);
    // TODO: вынесли в отдельный микросервис по генерации изображения
    // const preview = `${FRONTEND_URL}/api/og-image?${searchImage}`;
    const preview = `https://storage.yandexcloud.net/sitejuststudy/default.png`;

    return (
        <NextHead>
            <title>{textTitle}</title>
            <meta name="description" content={description} />
            {/* Twitter */}
            <meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:site" content="@JustStudy" />
            {/* #major-version-switch */}
            <meta name="twitter:title" content={textTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={preview} />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={textTitle} />
            {/* #major-version-switch */}
            <meta property="og:url" content={`${FRONTEND_URL}${path}`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={preview} />
            <meta property="og:ttl" content="604800" />
            {/* Algolia */}
            <meta name="docsearch:language" content={locale} />
            {/* #major-version-switch */}
            <meta name="docsearch:version" content="master" />
            <link rel="canonical" href={`${FRONTEND_URL}${`/${language}`}${path}`} />

            {noIndex && <meta name="robots" content="none" />}

            {disableAlternateLocale
                ? null
                : locales?.map((lang) => (
                      <link key={lang} rel="alternate" href={`${FRONTEND_URL}${`/${lang}`}${path}`} hrefLang={lang} />
                  ))}
        </NextHead>
    );
};
