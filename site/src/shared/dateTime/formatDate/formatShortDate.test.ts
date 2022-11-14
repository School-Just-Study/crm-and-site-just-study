import { formatShortDate } from '@shared/dateTime';

describe('formatShortDate', () => {
    it('should transforms Date to string', function () {
        const date = new Date(2000, 1, 1);
        const res = formatShortDate(date);

        expect('2000-02-01').toEqual(res);
    });
});
