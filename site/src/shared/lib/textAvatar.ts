import { theme } from '@src/shared/modules/brandingTheme';

export function stringAvatar(name?: string) {
    if (!name) name = 'Example Name';

    const first = name.split(' ')?.[0]?.[0] || '';
    const second = name.split(' ')?.[1]?.[0] || '';

    return {
        sx: {
            bgcolor: theme.palette.primary.main
        },
        children: `${first}${second && second}`
    };
}
