export const transliteration = (str: string) => {
    const keys = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'g',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'j',
        з: 'z',
        и: 'i',
        й: 'i',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'h',
        ц: 'c',
        ч: 'ch',
        ш: 'sh',
        ь: '',
        ы: 'y',
        э: 'e',
        ю: 'u',
        я: 'ya',
        щ: 'shch',
        ъ: '',

        А: 'A',
        Б: 'B',
        В: 'V',
        Г: 'G',
        Д: 'D',
        Е: 'E',
        Ё: 'E',
        Ж: 'J',
        З: 'Z',
        И: 'I',
        К: 'K',
        Л: 'L',
        М: 'M',
        Н: 'N',
        О: 'O',
        П: 'P',
        Р: 'R',
        С: 'S',
        Т: 'T',
        У: 'U',
        Ф: 'F',
        Х: 'H',
        Ц: 'C',
        Ч: 'Ch',
        Ш: 'Sh',
        Ь: '',
        Ы: 'Y',
        Э: 'E',
        Ю: 'U',
        Я: 'Ya',
        Щ: 'Shch',
        Ъ: ''
    };

    return (
        str
            .split('')
            // @ts-ignore
            .map((char) => (typeof keys[char] === 'undefined' ? char : keys[char]))
            .join('')
            .replace(/[^a-zа-яё0-9 ]/gi, '')
            .toLowerCase()
            .trim()
            .replace(/\s/g, '-')
    );
};
