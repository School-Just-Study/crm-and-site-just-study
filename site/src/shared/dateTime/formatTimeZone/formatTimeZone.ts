export const offsetPrefix: 'GMT' | 'UTC' = 'UTC';

/**
 * Формирует название элемента временной зоны для select списка
 * При некорректном значении utcOffset возвращает пустую строку
 */
export const getDisplayedTimeZoneElement = (timeZone: { name?: string; utcOffset?: string }): string => {
    const { name, utcOffset } = timeZone;

    if (!utcOffset) {
        return '';
    }

    const [hours, minutes] = utcOffset.split(':');

    if (!hours || !minutes) {
        return '';
    }

    const formattedMinutes = +minutes === 0 ? '' : `:${minutes}`;

    return `${offsetPrefix}${hours}${formattedMinutes}${name ? ` · ${name}` : ''}`;
};
