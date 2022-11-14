import { getWeekRange } from './getWeekRange';

describe('getWeekRange', () => {
    it('returns start and end of week', () => {
        const date = new Date(2022, 1, 1);
        const res = getWeekRange(date);

        expect(
            JSON.stringify({
                startWeekDate: '2022-01-31T00:00:00.000Z',
                endWeekDate: '2022-02-06T23:59:59.999Z'
            })
        ).toEqual(JSON.stringify(res));
    });
});
