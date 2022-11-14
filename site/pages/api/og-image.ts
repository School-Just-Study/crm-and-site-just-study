import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import { getHtml } from './_lib/template';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function OGImage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const parsedReq = parseRequest(req);
        const html = getHtml(parsedReq);
        const file = await getScreenshot(html);
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/png`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
