const excludePages = ['/marketing/*', '/success', '/checkout', '/checkout/*', '/l/*'];

const sitemaps = ['directions.xml', 'pages.xml', 'posts.xml', 'courses.xml'];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    autoLastmod: true,
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    exclude: excludePages,
    robotsTxtOptions: {
        policies: [{ disallow: excludePages, userAgent: '*', allow: '/' }],
        additionalSitemaps: sitemaps.map((map) => `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap/${map}`)
    }
};
