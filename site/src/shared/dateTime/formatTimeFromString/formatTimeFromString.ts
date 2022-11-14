export const formatTimeFromString = (ts: string) => {
    const [hr, min] = ts.split(':').map(Number);

    const date = new Date();
    date.setHours(hr);
    date.setMinutes(min);
    date.setMilliseconds(0);
    return date;
};
