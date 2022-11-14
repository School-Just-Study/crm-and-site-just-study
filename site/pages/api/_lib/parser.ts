import { ParsedRequest } from './types';
import { NextApiRequest } from 'next';

export function parseRequest(req: NextApiRequest) {
    const { title, desc, lang } = req.query as unknown as ParsedRequest;

    const parsedRequest: ParsedRequest = {
        title,
        desc,
        lang
    };
    return parsedRequest;
}
