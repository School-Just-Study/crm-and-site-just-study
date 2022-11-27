const { withEffectorReactAliases } = require('effector-next/tools');

const enhance = withEffectorReactAliases();

/** @type {import('next').NextConfig} */
const nextConfiguration = {
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2
    },
    poweredByHeader: false,
    compress: true,
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        localeDetection: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        minimumCacheTTL: 31536000,
        formats: ['image/avif', 'image/webp'],
        domains: [
            'storage.yandexcloud.net',
            'sitejuststudy.storage.yandexcloud.net',
            'localhost:3000',
            'www.juststudy.online',
            'juststudy.online'
        ]
    }
};

module.exports = enhance(nextConfiguration);
