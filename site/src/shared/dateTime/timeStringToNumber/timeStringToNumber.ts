export function timeStringToNumber(time?: string) {
    if (!time) return 0;

    const [hoursStr, minutesStr] = time.split(/[.:]/);
    const hours = Number.parseInt(hoursStr, 10);
    const minutes = minutesStr ? Number.parseInt(minutesStr, 10) : 0;
    return hours + minutes / 60;
}
