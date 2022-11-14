import { formatSelectedDate } from './formatSelectedDate';

describe('formatSelectedDate', () => {
    it('returns correct ISO date', function () {
        const res = formatSelectedDate(2022, '2022-08-10');

        expect(new Date('2022-08-10T00:00:00.000Z')).toEqual(res);
    });

    it('returns null if date is invalid', function () {
        const res = formatSelectedDate(2022, '');

        expect(null).toEqual(res);
    });
});
