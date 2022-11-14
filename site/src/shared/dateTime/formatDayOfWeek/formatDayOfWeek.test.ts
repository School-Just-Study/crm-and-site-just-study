import { formatDayOfWeek } from './formatDayOfWeek';

describe('formatDayOfWeek', () => {
    it('transforms Monday in the nominative case', function () {
        const res = formatDayOfWeek(1);
        expect('Понедельник').toEqual(res);
    });

    it('transforms Sunday in the nominative case', function () {
        const res = formatDayOfWeek(7);
        expect('Воскресенье').toEqual(res);
    });

    it('transforms Friday in the genitive case', function () {
        const res = formatDayOfWeek(5, 'accusative');
        expect('Пятницу').toEqual(res);
    });
});
