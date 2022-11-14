import { timeStringToNumber } from './timeStringToNumber';

describe('timeStringToNumber', () => {
    it('returns time as number', function () {
        const res = timeStringToNumber('15:48');

        expect(15.8).toEqual(res);
    });

    it("returns 0, if time wasn't defined", function () {
        const res = timeStringToNumber('');

        expect(0).toEqual(res);
    });
});
