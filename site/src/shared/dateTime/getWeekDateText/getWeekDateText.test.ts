import { getWeekDateText } from './getWeekDateText';

describe('getWeekDateText', () => {
    it('returns start and end of week', () => {
        const date = '2022-06-10T21:00:00.000Z';
        const res = getWeekDateText(date);

        expect('6 — 12 июня').toEqual(res);
    });

    it('throw an error, if invalid date is passed', () => {
        expect(() => {
            const date = 'invalid date';
            getWeekDateText(date);
        }).toThrow();
    });
});
