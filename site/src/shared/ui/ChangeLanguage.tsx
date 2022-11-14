import { FC, MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Menu, MenuItem } from '@mui/material';

export const ChangeLanguage: FC = () => {
    const { locales, locale, push, pathname, query, asPath } = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = async (locale: string) => {
        await push({ pathname, query }, asPath, { locale });
        handleClose();
    };

    return (
        <Box>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                size="small">
                {locale?.toLocaleUpperCase()}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                id="basic-menu"
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}>
                {locales?.map((locale) => (
                    <MenuItem key={locale} onClick={() => changeLanguage(locale)}>
                        {locale.toLocaleUpperCase()}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};
