import { formatToStandart, viewDate } from './formatDate';

describe('formatToStandart', () => {
    it('transforms Date to string with local format', () => {
        const date = new Date(2000, 1, 1);
        const res = formatToStandart(date);

        expect('01 февраля 2000').toEqual(res);
    });
});

describe('viewDate', () => {
    it('transforms Date to string with shortcut day of week', function () {
        const date = new Date('2022-08-10T13:51:12.760Z');
        const res = viewDate(date);

        expect('10.08.2022 13:51, ср').toEqual(res);
    });
});
