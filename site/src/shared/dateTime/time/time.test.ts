import { addTime, secondsToTime, timeToSeconds } from './time';

describe('time', () => {
    describe('addTime', () => {
        it('returns difference between two time values', () => {
            const time1 = '23:30:00';
            const time2 = '14:00:00';
            const res = addTime(time1, time2);

            expect('9:30:00').toEqual(res);
        });

        it('returns incorrect difference', () => {
            const time1 = '14:00:00';
            const time2 = '23:30:00';

            const res = addTime(time1, time2);

            expect('9:30:00').not.toEqual(res);
        });
    });

    describe('secondsToTime', () => {
        it('transforms seconds to time', () => {
            const seconds = 100000;
            const res = secondsToTime(seconds);

            expect('3:46:40').toEqual(res);
        });

        it('incorrectly transforms seconds to time format hh:mm:ss', () => {
            const seconds = -100000;
            const res = secondsToTime(seconds, 'hh:mm:ss');

            expect('03:46:40').not.toEqual(res);
        });

        it('transforms seconds to time format mm:ss', () => {
            const seconds = 100000;
            const res = secondsToTime(seconds, 'mm:ss');

            expect('46:40').toEqual(res);
        });
    });

    describe('timeToSeconds', () => {
        it('transforms time to seconds', () => {
            const time = '23:30:53';
            const res = timeToSeconds(time);

            expect(84653).toEqual(res);
        });

        it('incorrectly transforms time to seconds', () => {
            const time = '-23:30:53';
            const res = timeToSeconds(time);

            expect(84653).not.toEqual(res);
        });
    });
});
