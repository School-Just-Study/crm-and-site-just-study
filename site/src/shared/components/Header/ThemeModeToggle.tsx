import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { useStore } from 'effector-react';
import { $theme, setTheme } from '../../../../model/theme';

export default function ThemeModeToggle() {
    const theme = useStore($theme);
    const checked = theme === 'light';

    const handleChangeTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <Tooltip title={checked ? 'Turn on the light' : 'Turn off the light'}>
            <IconButton color="primary" disableTouchRipple onClick={handleChangeTheme}>
                {checked ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
            </IconButton>
        </Tooltip>
    );
}
