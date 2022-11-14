import * as React from 'react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { SEO } from '@shared/components/SEO/SEO';
import { MainLayout } from '@src/layouts/MainLayout';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccountWrapperProps } from './types';
import { useRouter } from 'next/router';
import { setTheme } from '../../../model/theme';

export const AccountWrapper: FC<PropsWithChildren<AccountWrapperProps>> = ({ children, title, hideLayout }) => {
    const theme = useTheme();
    const { query } = useRouter();

    const hideWrapper = query.onlyWidgets === 'true';

    useEffect(() => {
        if (hideWrapper) setTheme('light');
    }, [hideWrapper]);

    if (hideWrapper || hideLayout) {
        return <>{children}</>;
    }

    return (
        <MainLayout>
            <SEO title={title} noIndex />
            <Box
                bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100}
                px={{ xs: 1, md: 6 }}
                py={{ xs: 1, md: 6 }}>
                {children}
            </Box>
        </MainLayout>
    );
};
