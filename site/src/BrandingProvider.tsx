import { ReactNode, useMemo } from 'react';
import { deepmerge } from '@mui/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from '@src/shared/modules/brandingTheme';
import NextNProgress from 'nextjs-progressbar';
import { CssBaseline } from '@mui/material/';

interface BrandingProviderProps {
    children: ReactNode;
    mode: 'light' | 'dark';
}

export default function BrandingProvider({ children, mode }: BrandingProviderProps) {
    const theme = useMemo(() => {
        const designTokens = getDesignTokens(mode);
        let newTheme = createTheme(designTokens);
        newTheme = deepmerge(newTheme, getThemedComponents(newTheme));
        return newTheme;
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <NextNProgress
                color={theme.palette.primary.main}
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
