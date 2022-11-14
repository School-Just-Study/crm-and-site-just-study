import { getDateOfWeek } from './getDateOfWeek';

describe('getDateOfWeek', () => {
    it('Returns date by given year and week', () => {
        const week = 23;
        const year = 2022;
        const res = getDateOfWeek(week, year);

        expect('2022-06-11T00:00:00.000Z').toEqual(res.toISOString());
    });
});
