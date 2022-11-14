import { formatGetDay } from './formatGetDay';

describe('formatGetDay', () => {
    it('transforms 1 to 1', function () {
        const res = formatGetDay(1);

        expect(1).toEqual(res);
    });

    it('transforms 0 to 7', function () {
        const res = formatGetDay(0);

        expect(7).toEqual(res);
    });
});
