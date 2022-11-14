import { getDisplayedTimeZoneElement } from './formatTimeZone';

describe('formatTimeZone', () => {
    it('returns UTC with timezone', function () {
        const timeZone = { utcOffset: '+03:00' };
        const res = getDisplayedTimeZoneElement(timeZone);

        expect('UTC+03').toEqual(res);
    });

    it('returns UTC with timezone and name', function () {
        const timeZone = { name: 'Московское время', utcOffset: '+03:00' };
        const res = getDisplayedTimeZoneElement(timeZone);

        expect('UTC+03 · Московское время').toEqual(res);
    });

    it("returns empty string if name or utcOffset weren't passed", function () {
        const timeZone = {};
        const res = getDisplayedTimeZoneElement(timeZone);

        expect('').toEqual(res);
    });

    it('returns empty string if utcOffset is invalid', function () {
        const timeZone = { utcOffset: '+' };
        const res = getDisplayedTimeZoneElement(timeZone);

        expect('').toEqual(res);
    });
});
