import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export default (req: NextApiRequest, res: NextApiResponse) =>
    process.env.NODE_ENV === 'development'
        ? httpProxyMiddleware(req, res, {
              target: 'http://localhost:8000'
          })
        : res.status(404).send(null);
