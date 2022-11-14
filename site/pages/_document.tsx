import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/createEmotionCache';
import { withFork } from 'effector-next';
import { theme } from '@src/shared/modules/brandingTheme';

const enhance = withFork({ debug: false });

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                    <link rel="manifest" href="/icons/site.webmanifest" />
                    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2750c5" />
                    <link rel="shortcut icon" href="/icons/favicon.ico" />
                    <meta name="apple-mobile-web-app-title" content="Just Study" />
                    <meta name="application-name" content="Just Study" />
                    <meta name="msapplication-TileColor" content="#2750c5" />
                    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <style data-href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"></style>
                    {(this.props as any).emotionStyleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                }
        });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents Emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags
    };
};

export default enhance(MyDocument);
