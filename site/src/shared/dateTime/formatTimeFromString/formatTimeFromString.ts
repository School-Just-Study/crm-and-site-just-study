export const formatTimeFromString = (ts: string) => {
    const [hr, min] = ts.split(':').map(Number);

    const date = new Date();
    date.setHours(hr);
    date.setMinutes(min);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};
