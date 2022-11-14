import { getTimeHoursRanges } from './getTimeHoursRanges';

describe('getTimeHoursRanges', () => {
    it('returns array of hours', () => {
        const interval = 300;
        const res = getTimeHoursRanges(interval);

        expect(['00:00', '05:00', '10:00', '15:00', '20:00']).toEqual(res);
    });

    it('returns array of hours including 24:00', () => {
        const interval = 300;
        const res = getTimeHoursRanges(interval, true);

        expect(['00:00', '05:00', '10:00', '15:00', '20:00', '24:00']).toEqual(res);
    });

    it('returns array of hours starting from 02:00', () => {
        const interval = 300;
        const res = getTimeHoursRanges(interval, false, 2);

        expect(['02:00', '07:00', '12:00', '17:00', '22:00']).toEqual(res);
    });
});
