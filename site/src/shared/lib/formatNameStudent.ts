/**
 * Возвращаем только имя студента
 * @param string
 */
export const formatNameStudent = (string?: string): string => {
    if (!string) return '';
    return string.split(' ')[0];
};
