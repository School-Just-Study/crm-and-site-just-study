import { ParsedRequest } from './types';
import { renderToString } from 'react-dom/server';
import { OGImage } from '@shared/components/OGImage/OGImage';

export function getHtml(parsedReq: ParsedRequest) {
    const { title, desc, lang } = parsedReq;

    return renderToString(<OGImage lang={lang} title={title} desc={desc} />);
}
