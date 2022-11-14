import { addDays } from 'date-fns';

import { dateFormatWithTimeToString } from './dateFormatWithTimeToString';

describe('dateFormatWithTimeToString', () => {
    it('transforms date of today to string', function () {
        const date = new Date();
        date.setHours(13, 8);
        const res = dateFormatWithTimeToString(date);

        const string = 'Сегодня в 13:08';
        expect(string).toEqual(res);
    });

    it('transforms date of yesterday to string', function () {
        const date = addDays(new Date(), -1);
        date.setHours(13, 8);
        const res = dateFormatWithTimeToString(date);

        const string = 'Вчера в 13:08';
        expect(string).toEqual(res);
    });
});
