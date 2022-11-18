import React, { ReactNode } from 'react';
import { QuoteStyled } from '@shared/component-blocks/Quote/styles';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type QuoteProps = {
    attribution: ReactNode;
    content: ReactNode;
};

export function Quote({ attribution, content }: QuoteProps) {
    const theme = useTheme();

    return (
        <QuoteStyled>
            <Typography fontStyle="italic">{content}</Typography>
            <Typography fontWeight="bold" color={theme.palette.grey['600']}>
                — {attribution}
            </Typography>
        </QuoteStyled>
    );
}
