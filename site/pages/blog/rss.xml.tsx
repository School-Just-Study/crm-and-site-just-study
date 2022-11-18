import { Post } from '@src/shared/lib/apollo/types';
import { GetServerSideProps } from 'next';
import client from '@src/shared/lib/apollo/apolloClient';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import routes from '@src/routes';
import { FRONTEND_URL } from '../../config';
import * as ReactDOMServer from 'react-dom/server';
import { FC } from 'react';
import { QUERY_BLOG_PAGE_FOR_RSS } from '@src/shared/lib/apollo/rssBlogPage';

const ContentTurbo: FC<{ post: Post }> = ({ post }) => {
    return (
        <>
            <header>
                <h1>{post.title}</h1>
                <h2>{post.description}</h2>
                <figure>
                    <img src={post.cover?.image?.url} alt={post.title as string} />
                </figure>
                <menu>
                    <a href={`${FRONTEND_URL}${routes.directions}`}>Курсы</a>
                    <a href={`${FRONTEND_URL}${routes.blog}`}>Блог</a>
                </menu>
            </header>
            <DocumentRenderer document={post.content?.document} />
        </>
    );
};

const blogPostsRssXml = (blogPosts: Post[]) => {
    let latestPostDate = '';
    let rssItemsXml = '';
    blogPosts.forEach((post) => {
        const description = ReactDOMServer.renderToString(<DocumentRenderer document={post.content?.document} />);
        const contentTurbo = ReactDOMServer.renderToString(<ContentTurbo post={post} />);
        const postDate = Date.parse(post.createdAt);
        const link = `${FRONTEND_URL}/ru${routes.blog}/${post.id}`;
        if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
            latestPostDate = post.createdAt;
        }
        rssItemsXml += `
      <item turbo="true">
      <turbo:extendedHtml>true</turbo:extendedHtml>
        <title>${post.title}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${new Date(post.createdAt).toISOString()}</pubDate>
        <description><![CDATA[${description}]]></description>
        <turbo:content><![CDATA[${contentTurbo}]]></turbo:content>
    </item>`;
    });
    return {
        rssItemsXml,
        latestPostDate
    };
};

const getRssXml = (blogPosts: Post[]) => {
    const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
    return `<?xml version="1.0" encoding="utf-8"?>
              <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
                <channel>
                    <title>Онлайн-школа английского Just Study</title>
                    <link>https://juststudy.online/ru/blog</link>
                    <atom:link href="${FRONTEND_URL}/ru/blog/rss.xml" rel="self"></atom:link>
                    <description>Рассказываем лайфхаки в обучении, полезные советы и т.д.</description>
                    <language>ru</language>
                    <turbo:analytics type="Yandex" id="85933094"></turbo:analytics>
                    <lastBuildDate>${new Date(latestPostDate).toISOString()}</lastBuildDate>
                    ${rssItemsXml}
                </channel>
            </rss>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => {
    const lang = locale;
    const { data } = await client.query<{ posts: Post[] }>({
        query: QUERY_BLOG_PAGE_FOR_RSS,
        variables: { lang },
        fetchPolicy: 'network-only'
    });

    const blogPosts = data.posts;

    if (!blogPosts.length) {
        return { notFound: true };
    }

    res.setHeader('Content-Type', 'text/xml');
    res.write(getRssXml(blogPosts));
    res.end();
    return { props: {} };
};

export default function RssXml() {}
