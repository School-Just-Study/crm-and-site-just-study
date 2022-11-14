import { selectDaysOfWeek } from './selectDaysOfWeek';

describe('selectDaysOfWeek', () => {
    it('returns array of days of week for given period', function () {
        const startDate = new Date('2022-08-03');
        const endDate = new Date('2022-08-06');
        const res = selectDaysOfWeek(startDate, endDate);

        expect([3, 4, 5, 6]).toEqual(res);
    });
});
