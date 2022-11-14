import { ILanguages } from '@src/shared/modules/constants';

export type FileType = 'png';

export interface ParsedRequest {
    lang: ILanguages;
    title?: string;
    desc?: string;
}

export type QueryParams = Pick<ParsedRequest, 'title' | 'desc' | 'lang'>;
